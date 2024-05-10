import React from "react";
import { auth, signOut } from "@/auth";

async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <div>
        <pre>{JSON.stringify(session)}</pre>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}

export default SettingsPage;
