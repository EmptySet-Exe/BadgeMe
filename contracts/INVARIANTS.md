
---


```markdown
# KycBadge — Invariants, Edge Cases, and Review Checklist

_Last updated: 2025-09-26_

Authoritative behavior guarantees for audits, tests, and code reviews.

---

## Core invariants

**I1 — Authorization**
- Only the current `issuer` may call `setIssuer` and `revokeBadge`.

**I2 — Replay protection**
- Each `(holder, nonce)` pair is single-use. If `usedNonces[holder][nonce] == true`, `issueBadge` MUST revert.

**I3 — Signature correctness**
- `ecrecover(keccak256(abi.encodePacked(holder, claimsHash, expiry, flags, region, nonce)), v, r, s) == issuer`.

**I4 — Expiry enforcement**
- `hasBadge(holder, req) == false` if `badges[holder].expiry < block.timestamp`.

**I5 — Revocation enforcement**
- `hasBadge(holder, req) == false` if `badges[holder].revoked == true`.

**I6 — Flag predicate**
- `hasBadge(holder, req) == ((badges[holder].flags & req) == req)`.

**I7 — Soulbound by policy**
- No transfer functions exist; badge data is bound to `holder` via mapping.

**I8 — Issuer rotation safety**
- Changing `issuer` affects only **future** issuances. Previously issued badges remain valid; their signatures recover to the _old_ issuer.

**I9 — Claims privacy**
- On-chain state must never include raw PII. Only `claimsHash` (opaque), `flags`, `region`, `expiry`, `revoked`.

**I10 — Region format**
- `region` must be 2 uppercase ASCII letters (`A–Z`). Front-end should enforce; contract treats as bytes value.

---

## Edge cases to test

- **Bad signature**: signature not from `issuer` ⇒ `issueBadge` reverts.
- **Reused nonce**: calling `issueBadge` twice with same `(holder, nonce)` ⇒ `Replay`.
- **Issuer changed**: after `setIssuer`, old signatures no longer mint; new signatures from new `issuer` succeed.
- **Past expiry**: badge minted with `expiry < now`; `hasBadge` must return `false`.
- **Immediate revoke**: mint → revoke → `hasBadge == false`.
- **Flag mismatch**: badge missing one required bit ⇒ `hasBadge == false`.
- **Region is wrong case**: front-end should prevent; if provided, bytes still stored but off-chain validators should reject.

---

## Threat model notes (MVP)

- **Stolen attestation JSON**: Nonce + address binding prevents replay to a different holder.
- **Front-end “personal_sign” bug**: If issuer mistakenly prefixes message, on-chain recovery fails → mint blocked (safe failure).
- **Issuer key compromise**: Attacker could issue malicious badges; rotate issuer via `setIssuer` and revoke affected holders.
- **PII leakage**: Never include raw DOB/name in on-chain fields; keep off-chain, hashed into `claimsHash`.

---

## Manual review checklist (pre-merge)

- [ ] Function signatures match `contracts/API.md` exactly.
- [ ] `issueBadge` computes digest in the **same order & types** as `API.md`.
- [ ] Uses `abi.encodePacked` (not `abi.encode`) consistently for digest.
- [ ] `ecrecover` result strictly equals `issuer` (no zero-address acceptance).
- [ ] `usedNonces` updated **after** signature check and **before** external calls (there are none in MVP).
- [ ] `hasBadge` checks `revoked` and `expiry` **before** flag predicate.
- [ ] Events emitted (`Issued`, `Revoked`, `IssuerChanged`) with correct args.
- [ ] No storage of PII; only `claimsHash`, `flags`, `region`, `expiry`, `revoked`.
- [ ] Public getters present: `getBadge`, `issuer`, `usedNonces`.

---

## QA hints

- Required flags for typical gate: `OVER18 | AML_OK = 5`.
- Common regions (bytes2): CA=`0x4341`, US=`0x5553`, GB=`0x4742`.
- Nonce should be random 32 bytes per holder; issuer must enforce uniqueness off-chain too.

