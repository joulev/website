import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
  interface Profile {
    id: number;
  }
  interface User {
    id: number;
  }
}
