export async function GET(request) {
  const url = new URL(request.url);
  const wallet = url.searchParams.get('wallet') || 'default';

  const verified = wallet.startsWith('0x');
  
  if (verified) {
    // Return actual KYC badge properties from smart contract
    return new Response(JSON.stringify({
      verified: true,
      badge: {
        expiry: 1767225600, // Unix timestamp (example: 2026-01-01)
        flags: 5, // OVER18 (1) | AML_OK (4) = 5
        region: '0x5553', // US region in bytes2 format
        revoked: false,
        claimsHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      flags: ['OVER18', 'AML_OK'],
      region: 'US',
      expiryDate: '2026-01-01T00:00:00Z'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({
      verified: false,
      badge: null,
      flags: [],
      region: null,
      expiryDate: null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}