export async function GET() {
  
  return new Response(JSON.stringify({
    verified: true,
    flags: ['OVER18', 'AML_OK'],
    region: 'IN'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}