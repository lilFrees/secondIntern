export const runtime = "edge"; // Optional for optimization in App Router

export default async function GET() {
  const robotsTxt = `
    User-agent: *
    Disallow: /admin/
    Sitemap: https://green-haven-internship.vercel.app/sitemap.xml
  `;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
