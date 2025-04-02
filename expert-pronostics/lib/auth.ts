import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prisma from "./prisma";

// Étendre les types de NextAuth
declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string | null;
    hasActiveSubscription: boolean;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    hasActiveSubscription: boolean;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        try {
          // Trouver l'utilisateur avec ses abonnements
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              subscriptions: true
            }
          });

          if (!user) {
            throw new Error('Utilisateur non trouvé');
          }

          const passwordMatch = await compare(credentials.password, user.password);

          if (!passwordMatch) {
            throw new Error('Mot de passe incorrect');
          }

          // Trouver l'abonnement actif
          const activeSubscription = user.subscriptions.find(
            sub => sub.active && sub.endDate > new Date()
          );

          console.log('Connexion réussie pour:', credentials.email);
          console.log('Abonnement actif:', !!activeSubscription);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            hasActiveSubscription: !!activeSubscription
          };
        } catch (error) {
          console.error('Erreur d\'authentification:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT Callback - Token avant:', token);
      console.log('JWT Callback - User:', user);
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.hasActiveSubscription = user.hasActiveSubscription;
      }

      console.log('JWT Callback - Token après:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('Session Callback - Session avant:', session);
      console.log('Session Callback - Token:', token);

      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.hasActiveSubscription = token.hasActiveSubscription;
      }

      console.log('Session Callback - Session après:', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return '/dashboard';
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
