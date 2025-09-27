# BadgeMe Frontend UI (feature/frontend-ui Branch)

This branch contains the frontend UI for BadgeMe, a zk-KYC verification demo built with Next.js and Tailwind CSS. It integrates a mock API to simulate badge verification and is ready for backend integration (e.g., key gen/attest routes).

## Key Features
- Privacy-focused KYC badge UI with verified/not verified states.
- Mock API for fetching badge data (flags, region).
- Wallet input validation (starts with '0x' for mock Ethereum-style addresses).
- Re-verify button for dynamic updates.
- Responsive design with Tailwind utilities.

## Functionality Demo
<img width="1366" height="608" alt="image" src="https://github.com/user-attachments/assets/971ebc45-c871-44e1-983f-476ca07bc4e5" />

- Enter "0x123" or "0xABCDEF456" in the wallet field and submit to see a verified badge with flags (OVER18, AML_OK).
- Enter "abc" to see not verified (no flags).
- Spaces and special chars are not allowed.
- The mock API simulates zk-proof responses—replace with real backend for production.

## How to Run and Test
1. Switch to this branch:
   - git checkout feature/frontend-ui
2. Navigate to the frontend folder:
   - cd frontend
3. Install dependencies:
   - npm install
4. Start the development server:
   - npm run dev
5. Open http://localhost:3000 in your browser.
6. Test the UI:
- Enter a valid wallet (starts with '0x') and click "Verify KYC" to see green "Verified" badge.
- Enter an invalid wallet to see red "Not Verified".
- Use the "Re-Verify" button to refetch data.
- Check responsiveness on mobile (resize browser).

## Known Issues/Notes
- Mock API is temporary—needs real integration with backend (e.g., attestation endpoints).
- Wallet validation is simplified—update to Midnight's Bech32 format if needed.
- Feedback welcome—test and report issues in the PR!

## Dependencies
- Next.js for routing and API.
- Tailwind CSS for styling.
- React hooks (useState, useEffect) for interactivity.

## License
MIT License (consistent with project).

## Contributing
Contributions to this frontend branch are welcome—fork and PR!
