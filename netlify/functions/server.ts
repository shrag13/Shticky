import type { Context, Config } from "@netlify/functions";
// Note: This is for Netlify alternative, main deployment is Vercel

export default async (req: Request, context: Context) => {
  // Convert Netlify request to Express-compatible format
  const url = new URL(req.url);
  const path = url.pathname.replace('/.netlify/functions/server', '');
  
  return new Promise((resolve) => {
    const mockReq = {
      method: req.method,
      url: path,
      headers: Object.fromEntries(req.headers.entries()),
      body: req.body
    };
    
    const mockRes = {
      statusCode: 200,
      headers: {},
      body: '',
      status: (code: number) => { mockRes.statusCode = code; return mockRes; },
      json: (obj: any) => { mockRes.body = JSON.stringify(obj); resolve(new Response(mockRes.body, { status: mockRes.statusCode, headers: mockRes.headers })); },
      send: (data: any) => { mockRes.body = data; resolve(new Response(mockRes.body, { status: mockRes.statusCode, headers: mockRes.headers })); },
      setHeader: (key: string, value: string) => mockRes.headers[key] = value,
      end: (data?: any) => { if (data) mockRes.body = data; resolve(new Response(mockRes.body, { status: mockRes.statusCode, headers: mockRes.headers })); }
    };
    
    // Netlify function placeholder - use Vercel for production deployment
  });
};

export const config: Config = {
  path: "/api/*"
};