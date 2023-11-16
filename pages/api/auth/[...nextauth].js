import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';
import NextAuth from 'next-auth/next';
import CredentialsProviders from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProviders({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log(credentials);
        await mongooseConnect();
        const response = await User.findOne({ email: credentials.email });
        console.log(response);

        if (
          credentials.email !== response.email ||
          credentials.password !== response.password
        ) {
          var user = null;
        } else {
          var user = response;
        }

        if (user) {
          return user;
        } else {
          throw new Error('Invaild email or password!');
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    session: async ({ session }) => {
      if (session?.user) {
        await mongooseConnect();
        const response = await User.findOne({ email: session.user.email });
        if (response) {
          session.user._id = response._id;
        }
      }
      return session;
    },
  },
});
