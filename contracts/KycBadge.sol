// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract KycBadge {
    // errors
    error NotIssuer();
    error BadSig();
    error Replay();

    // flags
    uint8 public constant OVER18 = 1;
    uint8 public constant OVER21 = 2;
    uint8 public constant AML_OK = 4;

    address public issuer; // signer address for attestations
    mapping(address => mapping(bytes32 => bool)) public usedNonces;

    struct Badge {
        uint64  expiry;
        uint8   flags;
        bytes2  region;
        bool    revoked;
        bytes32 claimsHash;
    }
    mapping(address => Badge) public badges;

    event IssuerChanged(address indexed newIssuer);
    event Issued(address indexed holder, uint64 expiry, uint8 flags, bytes2 region, bytes32 claimsHash);
    event Revoked(address indexed holder);

    constructor(address _issuer) { issuer = _issuer; }

    function setIssuer(address _issuer) external {
        if (msg.sender != issuer) revert NotIssuer();
        issuer = _issuer;
        emit IssuerChanged(_issuer);
    }

    function issueBadge(
        address holder,
        bytes32 claimsHash,
        uint64 expiry,
        uint8 flags,
        bytes2 region,
        bytes32 nonce,
        uint8 v, bytes32 r, bytes32 s
    ) external {
        if (usedNonces[holder][nonce]) revert Replay();
        bytes32 digest = keccak256(abi.encodePacked(holder, claimsHash, expiry, flags, region, nonce));
        address recovered = ecrecover(digest, v, r, s);
        if (recovered != issuer) revert BadSig();
        badges[holder] = Badge(expiry, flags, region, false, claimsHash);
        usedNonces[holder][nonce] = true;
        emit Issued(holder, expiry, flags, region, claimsHash);
    }

    function revokeBadge(address holder) external {
        if (msg.sender != issuer) revert NotIssuer();
        badges[holder].revoked = true;
        emit Revoked(holder);
    }

    function hasBadge(address holder, uint8 requiredFlags) external view returns (bool) {
        Badge memory b = badges[holder];
        if (b.revoked) return false;
        if (b.expiry < block.timestamp) return false;
        return (b.flags & requiredFlags) == requiredFlags;
    }

    function getBadge(address holder) external view returns (Badge memory) {
        return badges[holder];
    }
}
