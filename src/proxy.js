import { NextResponse } from "next/server";

/**
 * @param {string} token 
 * @param {string} secret 
 * @returns {Promise<boolean>}
 */
/**
 * @param {string} str 
 * @returns {string} 
 */
function base64urlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) {
    base64 += "=".repeat(4 - pad);
  }
  return atob(base64);
}

/**
 * @param {string} token 
 * @param {string} secret 
 * @returns {Promise<boolean>} 
 */
async function verifyJWT(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, signatureB64] = parts;

    const payloadStr = base64urlDecode(payloadB64);
    const payload = JSON.parse(payloadStr);

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.warn("JWT token is expired");
      return false;
    }

    if (!secret) {
      return true;
    }

    const enc = new TextEncoder();
    const keyData = enc.encode(secret);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureStr = base64urlDecode(signatureB64);
    const signatureBin = Uint8Array.from(
      signatureStr,
      (c) => c.charCodeAt(0)
    );

    const dataBytes = enc.encode(`${headerB64}.${payloadB64}`);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBin,
      dataBytes
    );

    return isValid;
  } catch (error) {
    console.error("JWT Verification failed in Next.js Proxy:", error);
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("token");
  const token = tokenCookie?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log(`Anonymous access blocked to ${pathname}. Redirecting to login...`);
      const loginUrl = new URL("/log-in", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const jwtSecret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
    const isTokenValid = await verifyJWT(token, jwtSecret);

    if (!isTokenValid) {
      console.warn(`Invalid or expired token for route ${pathname}. Intercepting and redirecting...`);
      const loginUrl = new URL("/log-in", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

