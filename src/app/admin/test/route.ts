import { getAuthenticatedApolloClient } from "~/lib/auth/helpers";
import { GET_USER } from "~/lib/auth/queries";

export async function GET() {
  try {
    const client = await getAuthenticatedApolloClient();
    const { data } = await client.query({ query: GET_USER });
    return Response.json(data);
  } catch {
    return new Response("Not authenticated", { status: 401 });
  }
}
