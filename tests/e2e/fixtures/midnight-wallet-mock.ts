import { test as base } from "@playwright/test";

// Define interface for the connector
interface MidnightConnector {
  connect(): Promise<string>;
  signMessage(message: string): Promise<string>;
}

// Extend window interface
declare global {
  interface Window {
    midnightConnector: MidnightConnector;
  }
}

export const test = base.extend({
  frontendUrl: async ({}, use) => {
    await use(process.env.FRONTEND_URL || "http://localhost:3000");
  },
  issuerUrl: async ({}, use) => {
    await use(process.env.ISSUER_URL || "http://localhost:4000");
  },
  midnightConnectorMock: async ({ page }, use) => {
    const mock: MidnightConnector = {
      async connect(): Promise<string> { 
        return "mock-wallet-addr"; 
      },
      async signMessage(message: string): Promise<string> { 
        return `sig:${Buffer.from(message).toString("base64")}`; 
      },
    };
    
    await page.addInitScript((mockConnector: MidnightConnector) => {
      window.midnightConnector = mockConnector;
    }, mock);
    
    await use(mock);
  },
});

export { expect } from "@playwright/test";