"use server";

import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import { sessionStore } from "../../_lib/session";

export async function login() {
  const state = uuid();
  await sessionStore.start({
    status: "preauthenticated",
    state,
  });

  redirect(
    `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_CLIENT_ID}&state=${state}`,
  );
}
