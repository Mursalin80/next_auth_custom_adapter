import Joi from 'joi';
import { hashPassword } from '../../../lib/auth';
import db from '../../../lib/dbConnect';
import User from '../../../models/User';
import Account from '../../../models/Account';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  confornPassword: Joi.ref('password'),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  let { email, password, confornPassword, name, image, username } = req.body;
  let { error, value } = schema.validate({
    email,
    password,
    confornPassword,
    name,
  });
  if (error) {
    res.send({
      user: null,
      error: 'Invalid ' + error.details[0].context.label,
    });

    return;
  }

  await db();
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    // res.redirect(`/signin?error=user already found, Please login.`, 422);
    res.send({ user: null, error: 'User already exisr, Please login' });

    return;
  }
  image = image ?? name.slice(0, 2);
  username = username ?? name;

  const hash = await hashPassword(password);
  let user = await User.create({
    name,
    email,
    password: hash,
    image,
    username,
  });

  // delete user.password;

  await Account.create({
    userId: user.id,
    type: 'credentials',
    provider: 'credentials',
    providerAccountId: user.id,
  });

  res.send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      username: user.username,
    },
    error: null,
  });
}

export default handler;
