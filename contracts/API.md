# KycBadge Contract API (MVP)

_Last updated: 2025-09-26_

A minimal, **non-transferable** (soulbound-by-policy) KYC badge for gating actions off-chain/on-chain while keeping PII off-chain. Issuance is authorized by a single `issuer` address via **raw secp256k1** signature over a typed digest.

---

## Contract name
`KycBadge`

## Solidity version
`pragma solidity ^0.8.24;`

---

## Public constants (bitmask flags)

- `OVER18 = 1`
- `OVER21 = 2`
- `AML_OK = 4`

> Combine with bitwise OR. Example: `OVER18 | AML_OK = 5`.

---

## Region encoding

`region` is **ISO-3166-1 alpha-2** encoded as `bytes2` (ASCII uppercase). Examples:

| Code | bytes2 |
|------|--------|
| CA   | `0x4341` |
| US   | `0x5553` |
| GB   | `0x4742` |
| DE   | `0x4445` |
| FR   | `0x4652` |
| ES   | `0x4553` |
| IT   | `0x4954` |
| AU   | `0x4155` |
| NL   | `0x4e4c` |
| SE   | `0x5345` |
| NO   | `0x4e4f` |
| JP   | `0x4a50` |
| CN   | `0x434e` |
| IN   | `0x494e` |
| BR   | `0x4252` |
| MX   | `0x4d58` |

Front-end should validate `A–Z` only.

---

## Storage shape

```solidity
struct Badge {
  uint64  expiry;      // unix seconds
  uint8   flags;       // bitmask (see constants)
  bytes2  region;      // ISO country code
  bool    revoked;     // true if revoked by issuer
  bytes32 claimsHash;  // hash of off-chain claims (no PII)
}
mapping(address => Badge) public badges;

address public issuer; // secp256k1 address that signs attestations
mapping(address => mapping(bytes32 => bool)) public usedNonces; // replay guard


## Events
_Where this code lives:_ `contracts/KycBadge.sol` (Solidity)

```solidity
event IssuerChanged(address indexed newIssuer);
event Issued(
  address indexed holder,
  uint64 expiry,
  uint8 flags,
  bytes2 region,
  bytes32 claimsHash
);
event Revoked(address indexed holder);
