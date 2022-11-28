import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import MongooseAdapter from '../../../lib/adapter';
import User from '../../../models/User';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  adapter: MongooseAdapter(),
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',

      async authorize(credentials, req) {
        let user = await User.findOne({ email: credentials.email });
        if (!user) return null;
        let valid = await verifyPassword(credentials.password, user.password);
        if (!valid) return null;
        return {
          name: user.name,
          email: user.email,
          id: user.id,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return { user, account, profile, email, credentials };
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: 'test@helloworld',
  jwt: true,
  pages: {
    signIn: '/signin',
  },
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '', // Hex color code
  },
});
