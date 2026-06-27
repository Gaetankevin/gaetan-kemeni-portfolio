import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    username?: string | null;
  }

  interface Session {
    user: User & {
      id: string;
      role?: string;
      username?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    username?: string | null;
  }
}
