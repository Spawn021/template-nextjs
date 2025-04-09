import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import { APP_PROVIDER } from '@/constants'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET),
    }),
    TwitterProvider({
      clientId: String(process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET),
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.id
      session.accessToken = token.accessToken
      session.tokenSecret = token.tokenSecret
      session.provider = token.provider

      return session
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.provider = account?.provider
      }
      if (account) {
        switch (account.provider) {
          case APP_PROVIDER.TWITTER:
            token.accessToken = account.oauth_token
            token.tokenSecret = account.oauth_token_secret
            break
          default:
            token.accessToken = account.access_token
            break
        }
      }
      return token
    },
  },
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
