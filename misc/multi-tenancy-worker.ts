function getRedirectResponse(url: string) {
  return new Response(null, { headers: { Location: url }, status: 308 });
}

export default {
  fetch(request: Request): Response {
    const hostname = request.headers.get("host");
    if (!hostname) return new Response("Missing host header", { status: 400 });

    const subdomain = hostname.split(".")[0];
    const url = new URL(request.url);

    switch (subdomain) {
      case "anime":
      case "cuid2":
      case "irasuto":
      case "link":
      case "tategaki":
        return getRedirectResponse(`https://joulev.dev/apps/${subdomain}${url.pathname}${url.search}`);
      case "chat":
        return getRedirectResponse("https://joulev.dev/admin/chat");
      case "l":
        if (url.pathname === "/") return getRedirectResponse("https://joulev.dev/apps/link");
        return getRedirectResponse(`https://joulev.dev/apps/link/l${url.pathname}${url.search}`);
      case "p":
        if (url.pathname === "/") return getRedirectResponse("https://joulev.dev/apps/snippets");
        return getRedirectResponse(`https://joulev.dev/p${url.pathname}${url.search}`);
      default:
        return new Response(`You accessed ${hostname}!`);
    }
  },
};
