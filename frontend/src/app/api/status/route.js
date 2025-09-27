export async function GET(request) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get('wallet') || 'default';

  const validWallet = /^0x[a-fA-F0-9]+$/.test(wallet);
  return new Response(JSON.stringify({
    verified: validWallet,
    flags: validWallet ? ['OVER18', 'AML_OK'] : [],
    region: 'IN'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}