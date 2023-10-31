import { auth } from "~/lib/auth/config";

import { LoginButton, LogoutButton } from "./login-button";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return (
      <div>
        You are not authenticated. <LoginButton />
      </div>
    );
  }
  return (
    <div>
      You are authenticated (id = {JSON.stringify(session)}). <LogoutButton />
    </div>
  );
}
