# zk-KYC Badge

A minimal, **non-transferable** (soulbound-by-policy) KYC badge smart contract for gating actions off-chain/on-chain while keeping personally identifiable information (PII) off-chain. This project implements a zero-knowledge approach to KYC verification using cryptographic attestations.

## 🚀 Overview

The KycBadge contract allows authorized issuers to create cryptographic attestations for user addresses without storing sensitive personal information on-chain. Users can prove their KYC status through cryptographic signatures while maintaining privacy.

### Key Features

- **Privacy-Preserving**: No PII stored on-chain, only cryptographic hashes
- **Non-Transferable**: Badges are soulbound to specific addresses
- **Cryptographic Security**: Uses secp256k1 signatures for attestation verification
- **Replay Protection**: Nonce-based system prevents signature reuse
- **Flexible Flags**: Bitmask system for different verification levels
- **Regional Support**: ISO-3166-1 alpha-2 country code encoding
- **Revocation Support**: Issuers can revoke badges when needed

## 📁 Project Structure

```
midnight_hackathon/
├── contracts/
│   ├── KycBadge.sol          # Main smart contract
│   └── API.md                # Contract API documentation
├── artifacts/
│   └── KycBadge.abi.json     # Contract ABI
├── deployments/
│   ├── addresses.json        # Deployment addresses and metadata
│   └── test_vectors.template.json  # Test data template
└── README.md                 # This file
```

## 🔧 Contract Details

### Solidity Version
`pragma solidity ^0.8.24;`

### KYC Flags (Bitmask)

| Flag | Value | Description |
|------|-------|-------------|
| `OVER18` | 1 | User is over 18 years old |
| `OVER21` | 2 | User is over 21 years old |
| `AML_OK` | 4 | Anti-Money Laundering check passed |

**Example**: `OVER18 | AML_OK = 5` (binary: 101)

### Region Encoding

Regions are encoded as ISO-3166-1 alpha-2 country codes in `bytes2` format:

| Country | Code | bytes2 |
|---------|------|--------|
| Canada | CA | `0x4341` |
| United States | US | `0x5553` |
| United Kingdom | GB | `0x4742` |
| Germany | DE | `0x4445` |
| France | FR | `0x4652` |
| Spain | ES | `0x4553` |
| Italy | IT | `0x4954` |
| Australia | AU | `0x4155` |
| Netherlands | NL | `0x4e4c` |
| Sweden | SE | `0x5345` |
| Norway | NO | `0x4e4f` |
| Japan | JP | `0x4a50` |
| China | CN | `0x434e` |
| India | IN | `0x494e` |
| Brazil | BR | `0x4252` |
| Mexico | MX | `0x4d58` |

## 🔐 Contract Functions

### Core Functions

- **`issueBadge()`**: Issues a new KYC badge with cryptographic verification
- **`revokeBadge()`**: Revokes an existing badge (issuer only)
- **`hasBadge()`**: Checks if a holder has valid badges with required flags
- **`getBadge()`**: Retrieves complete badge information for a holder
- **`setIssuer()`**: Changes the issuer address (current issuer only)

### Events

- **`IssuerChanged`**: Emitted when issuer address is updated
- **`Issued`**: Emitted when a new badge is issued
- **`Revoked`**: Emitted when a badge is revoked

## 🚀 Deployment

### Supported Networks

The contract is configured for deployment on:

- **Anvil** (Local development): Chain ID 31337
- **Sepolia Testnet**: Chain ID 11155111
- **Midnight Testnet**: Chain ID 0 (placeholder for future porting)

### Deployment Configuration

Deployment addresses and metadata are stored in `deployments/addresses.json`:

```json
{
  "project": "zk-kyc-badge",
  "version": 1,
  "contracts": {
    "KycBadge": {
      "abi": "artifacts/KycBadge.abi.json",
      "deployments": {
        "anvil": { /* local deployment config */ },
        "sepolia": { /* testnet deployment config */ },
        "midnight_testnet": { /* midnight deployment config */ }
      }
    }
  }
}
```

## 🧪 Testing

Test vectors are defined in `deployments/test_vectors.template.json` with example personas:

1. **Adult Valid CA**: Over 18, over 21, AML OK, Canadian resident
2. **Underage US**: Under 18, AML OK, US resident  
3. **Revoked Adult GB**: Over 18, over 21, AML OK, UK resident (revoked after issue)

## 🔒 Security Features

### Cryptographic Verification
- Uses secp256k1 signature verification for badge issuance
- Prevents unauthorized badge creation
- Ensures only the designated issuer can create attestations

### Replay Protection
- Nonce-based system prevents signature reuse
- Each badge issuance requires a unique nonce per holder
- Prevents replay attacks and double-spending

### Access Control
- Only the issuer can revoke badges
- Only the issuer can change the issuer address
- Badge holders cannot transfer or modify their badges

## 📋 Usage Example

### Issuing a Badge

```solidity
// Issuer signs the badge data off-chain
bytes32 digest = keccak256(abi.encodePacked(
    holder, claimsHash, expiry, flags, region, nonce
));

// Badge is issued on-chain with signature verification
kycBadge.issueBadge(
    holder,
    claimsHash,
    expiry,
    flags,
    region,
    nonce,
    v, r, s  // signature components
);
```

### Checking Badge Status

```solidity
// Check if holder has required flags
bool hasRequiredFlags = kycBadge.hasBadge(holder, OVER18 | AML_OK);

// Get complete badge information
KycBadge.Badge memory badge = kycBadge.getBadge(holder);
```

## 🔮 Future Enhancements

- **Midnight Network Support**: Port to Midnight/Compact for enhanced privacy
- **Multi-Issuer Support**: Allow multiple authorized issuers
- **Badge Expiration**: Automatic cleanup of expired badges
- **Batch Operations**: Support for issuing/revoking multiple badges
- **Event Filtering**: Enhanced event indexing and filtering

## 📄 License

MIT License - see contract header for details.

## 🤝 Contributing

This project was developed for the Midnight Hackathon. Contributions and improvements are welcome!

---

**Note**: This is a minimal viable product (MVP) implementation. For production use, additional security audits and testing are recommended.
