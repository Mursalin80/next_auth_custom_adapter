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
      console.log('User:', authUser.id);
      return { ...authUser, id: authUser.id };
    },

    async getUser(id) {
      // await db();
      // let user = await User.findById(id);
      // if (!user) {
      //   throw new Error(`User by ID:${id} not found!`);
      // }
      return;
    },

    async getUserByEmail(email) {
      // await db();
      // let user = await User.findOne({ email });
      // if (!user) {
      //   throw new Error(`User by email:${email} not found!`);
      //   return;
      // }
      // console.log('Adapter:email', user);
      return;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      // let user = await User.find({ providerAccountId, provider });
      // if (!user) {
      //   throw new Error(`User by Provider:${provider} not found`);
      // }
      return;
    },

    async updateUser(user) {
      // await db();
      // let updatedUser = await User.findByIdAndUpdate(
      //   user._id,
      //   { ...user },
      //   { new: true }
      // );
      // console.log('Adapter updateUser :', updatedUser);
      return;
    },

    async deleteUser(userId) {
      // await db();
      // await User.findByIdAndDelete(userId);
      return;
    },

    async linkAccount(account) {
      console.log('Adapter:account', account);

      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      // await db();
      // let session = await Session.create({ sessionToken, userId, expires });
      // console.log('Adapter:createSession', session);
      return;
    },

    async getSessionAndUser(sessionToken) {
      // await db();
      // let session = await Session.findOne({ sessionToken });
      // let user = await User.findById(session._id);
      // console.log('Adapter:getSessionAndUser ', session);

      return;
    },
    async updateSession({ sessionToken }) {
      console.log('Adapter:updateSession');

      return;
    },
    async deleteSession(sessionToken) {
      await db();
      await Session.deleteOne({ sessionToken });
      console.log('Adapter:');

      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      console.log('Adapter:');

      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}
