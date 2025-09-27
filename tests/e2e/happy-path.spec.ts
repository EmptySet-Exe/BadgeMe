import { test, expect } from "./fixtures/midnight-wallet-mock";

test("happy path - mint & gated action", async ({ page, frontendUrl }) => {
  // Navigate to homepage
  await page.goto(frontendUrl);
  
  // Connect wallet
  const connectButton = page.getByText("Connect Wallet");
  await expect(connectButton).toBeVisible();
  await connectButton.click();
  await expect(page.getByText("mock-wallet-addr")).toBeVisible();

  // Start KYC process
  const kycButton = page.getByText("Start KYC");
  await expect(kycButton).toBeVisible();
  await kycButton.click();
  await expect(page.getByText("KYC in progress")).toBeVisible();

  // Mint badge
  const mintButton = page.getByText("Mint Badge");
  await expect(mintButton).toBeEnabled();
  await mintButton.click();
  await expect(page.getByText("Badge Minted")).toBeVisible();

  // Join pool (gated action)
  const joinButton = page.getByText("Join Pool");
  await expect(joinButton).toBeEnabled();
  await joinButton.click();
  await expect(page.getByText("Joined successfully")).toBeVisible();
});

// Add error case test
test("handles connection failure", async ({ page, frontendUrl }) => {
  await page.goto(frontendUrl);
  await page.route('**/api/connect', route => route.abort());
  
  const connectButton = page.getByText("Connect Wallet");
  await connectButton.click();
  
  await expect(page.getByText("Connection failed")).toBeVisible();
});