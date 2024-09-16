import { verifySession } from "../../../_lib/verify-session";
import { GithubUserResponseSchema } from "../../_containers/github-user/schema";

export async function fetchGithubUser() {
  const sessionValues = await verifySession();

  return fetch("https://api.github.com/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionValues.github.access_token}`,
    },
  }).then(async (res) => {
    if (!res.ok) {
      console.error(res.status, await res.json());
      throw new Error("failed to get github user");
    }
    return GithubUserResponseSchema.parse(await res.json());
  });
}
