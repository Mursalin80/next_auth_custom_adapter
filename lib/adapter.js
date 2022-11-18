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
      let acc = await Account.create(account);
      return account;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },

    async createSession({ sessionToken, userId, expires }) {
      console.log('Create-session:', sessionToken);
      await db();
      if (!userId) {
        return { sessionToken, userId, expires };
      }
      let session = await Session.create({ sessionToken, userId, expires });
      return session;
    },

    async getSessionAndUser(sessionToken) {
      console.log('get-session:', sessionToken);
      await db();
      let session = await Session.findOne({ sessionToken });
      let user = await User.findById(session?.userId);
      console.log('getSessionAndUser: ', session);
      console.log('getSessionAndUser: ', user);
      if (!session && user) {
        // throw new Error('No session or User found!');
        return;
      }

      return;
    },
    async updateSession({ sessionToken }) {
      // console.log('updtae sess:', sessionToken);

      return;
    },

    async deleteSession(sessionToken) {
      // await db();
      // let del = await Session.deleteOne({ sessionToken });
      // console.log('Adapter:');

      return;
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
