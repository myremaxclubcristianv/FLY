import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SECURITY_TXT_CONTENT = `Contact: mailto:contact@cristianvaduva.com
Contact: tel:+436509536345
Expires: 2027-11-01T00:00:00.000Z
Preferred-Languages: en, ro
Canonical: https://fly.cristianvaduva.com/.well-known/security.txt
Policy: https://fly.cristianvaduva.com/legal
Hiring: https://fly.cristianvaduva.com/aviation/careers
Acknowledgments: https://fly.cristianvaduva.com/ecosystem
`;

export async function GET() {
  return new NextResponse(SECURITY_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
