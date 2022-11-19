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
      return await User.findById(id);
    },

    async getUserByEmail(email) {
      await db();
      return await User.findOne({ email });
    },

    async getUserByAccount({ providerAccountId, provider }) {
      await db();
      let account = await Account.findOne({ providerAccountId, provider });
      let user = await User.findById(account?.userId);
      if (!user) {
        // throw new Error(`User by Provider:${provider} not found`);
        return;
      }
      return user;
    },

    async updateUser(user) {
      await db();
      return await User.findByIdAndUpdate(user.id, { ...user }, { new: true });
    },

    async deleteUser(userId) {
      await db();
      return await User.findByIdAndDelete(userId);
    },

    async linkAccount(account) {
      await db();
      return await Account.create(account);
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await db();
      return await Account.findOneAndDelete({
        providerAccountId,
        provider,
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      await db();
      if (!userId) {
        return;
      }
      return await Session.create({ sessionToken, userId, expires });
    },

    async getSessionAndUser(sessionToken) {
      await db();
      let session = await Session.findOne({ sessionToken });
      let user = await User.findById(session?.userId);

      if (!session && !user) {
        // throw new Error('No session or User found!');
        return;
      }

      return { session, user };
    },

    async updateSession({ sessionToken }) {
      await db();

      return await Session.findOneAndUpdate(
        { sessionToken },
        { sessionToken },
        { new: true }
      );
    },

    async deleteSession(sessionToken) {
      await db();
      return await Session.deleteOne({ sessionToken });
    },

    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}
