/** @return { import("next-auth/adapters").Adapter } */
import db from './dbConnect';
import Account from '../models/Account';
import Session from '../models/Session';
import User from '../models/User';

export default function MongooseAdapter(client, options = {}) {
  return {
    async createUser(user) {
      await db();
      let authUser = await User.findOne({ email: user.email });
      if (!authUser) {
        authUser = await User.create(user);
      }
      return authUser;
    },

    async getUser(id) {
      await db();
      let user = await User.findById(id);
      if (!user) {
        // throw new Error(`User by ID:${id} not found!`);
        return;
      }
      return user;
    },

    async getUserByEmail(email) {
      await db();
      let user = await User.findOne({ email });
      if (!user) {
        // throw new Error(`User by email:${email} not found!`);
        return;
      }
      return user;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      // await db();
      // let user = await Account.find({ providerAccountId, provider }).populate(
      //   'user'
      // );
      // if (!user) {
      //   // throw new Error(`User by Provider:${provider} not found`);
      //   return;
      // }
      return;
    },

    async updateUser(user) {
      // await db();
      // let updatedUser = await User.findByIdAndUpdate(
      //   user.id,
      //   { ...user },
      //   { new: true }
      // );
      return;
    },

    async deleteUser(userId) {
      //   await db();
      //   let del = await User.findByIdAndDelete(userId);
      //   return del;
    },

    async linkAccount(account) {
      await db();
      let { providerAccountId, provider } = account;
      let acc = await Account.findOne({ providerAccountId, provider });
      console.log('acc:', acc);
      if (!acc) {
        acc = await Account.create(account);
      }
      return acc;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },

    async createSession({ sessionToken, userId, expires }) {
      await db();
      if (!userId) {
        return;
      }
      let session = await Session.create({ sessionToken, userId, expires });
      return session;
    },

    async getSessionAndUser(sessionToken) {
      await db();
      let session = await Session.findOne({ sessionToken });
      let user = await User.findById(session?.userId);

      if (!session && user) {
        // throw new Error('No session or User found!');
        return;
      }

      return { session, user };
    },

    async updateSession({ sessionToken }) {
      await db();
      let u = await Session.findOne({ sessionToken });
      let upSes = await Session.findOneAndUpdate(
        { sessionToken },
        { sessionToken },
        { new: true }
      );

      return upSes;
    },

    async deleteSession(sessionToken) {
      await db();
      let del = await Session.deleteOne({ sessionToken });
      console.log('Del:', del);

      return del;
    },
    async createVerificationToken({ identifier, expires, token }) {
      // console.log('Adapter:');

      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}
