import React from "react";
import { SignOutButton } from "@/components/SignOutButton";
import { getServerAuthSession, SessionUser } from "@/backend/authentication/auth";

export default async function Profile() {
  const session = await getServerAuthSession();
  const user = session?.user as SessionUser;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user?.name}</p>
      { user?.isChild ? <p>You are a child.</p> : <p>You are an adult.</p>}
      <SignOutButton />
    </div>
  );
}