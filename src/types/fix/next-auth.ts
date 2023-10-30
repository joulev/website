import "next-auth";

declare module "next-auth" {
  interface Session {
    user: { id: number };
  }
  interface Profile {
    id: number;
  }
  interface User {
    id: number;
  }
}
