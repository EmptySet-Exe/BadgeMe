export async function GET(request) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get('wallet') || 'default';

  const verified = wallet.startsWith('0x');
  return new Response(JSON.stringify({
    verified,
    flags: verified ? ['OVER18', 'AML_OK'] : [],
    region: 'IN'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}