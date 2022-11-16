/** @return { import("next-auth/adapters").Adapter } */
import db from './dbConnect';
import Account from '../models/Account';
import Session from '../models/Session';
import User from '../models/User';
export default function MyAdapter(client, options = {}) {
  return {
    async createUser(user) {
      await db();
      let email = await User.findOne({ email: user.email });
      console.log('email >>>>> :', email);
      if (!email) {
        await User.create(user);
        return;
      }

      return;
    },
    async getUser(id) {
      console.log('Adapter:');

      return;
    },
    async getUserByEmail(email) {
      console.log('Adapter:email', email);

      return;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      console.log('Adapter:providerAccountId', providerAccountId);

      return;
    },
    async updateUser(user) {
      console.log('Adapter:');

      return;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      console.log('Adapter:');

      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log('Adapter:');

      return;
    },
    async getSessionAndUser(sessionToken) {
      console.log('Adapter:');

      return;
    },
    async updateSession({ sessionToken }) {
      console.log('Adapter:');

      return;
    },
    async deleteSession(sessionToken) {
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
