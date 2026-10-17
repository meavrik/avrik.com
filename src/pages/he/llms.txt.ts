import type { APIRoute } from "astro";
import { sites } from "../../i18n";
import { llms } from "../../llms";

export const GET: APIRoute = () =>
  new Response(llms(sites.he), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
