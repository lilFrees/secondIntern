export const runtime = "edge"; // Optional for optimization in App Router

export async function GET() {
  const robotsTxt = `
    User-agent: *
    Disallow: /admin/
    Sitemap: https://www.yourwebsite.com/sitemap.xml
  `;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
