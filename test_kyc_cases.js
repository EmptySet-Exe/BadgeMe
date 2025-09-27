// KYC Frontend Testing Script with Midnight Wallet SDK
// Run this in your browser's developer console at http://localhost:3000

console.log("🧪 Starting KYC Verification Tests with Midnight Wallet SDK...\n");

const testCases = [
    // Valid Midnight wallet addresses (should return verified: true)
    {
        name: "Valid Midnight Address Format 1",
        wallet: "midnight1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "US", validationMethod: "midnight-sdk" }
    },
    {
        name: "Valid Midnight Address Format 2", 
        wallet: "midnight1qwertyuiopasdfghjklzxcvbnm1234567890",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "US", validationMethod: "midnight-sdk" }
    },
    
    // Invalid cases (should return verified: false)
    {
        name: "Ethereum-style address (0x prefix)",
        wallet: "0x1234567890abcdef1234567890abcdef12345678",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Address without midnight prefix",
        wallet: "1234567890abcdef1234567890abcdef12345678",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Empty string",
        wallet: "",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Random text",
        wallet: "hello world",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Numbers only",
        wallet: "123456789",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Invalid midnight format",
        wallet: "midnight123",
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    },
    {
        name: "Null input",
        wallet: null,
        expected: { verified: false, flags: [], region: null, validationMethod: "midnight-sdk" }
    }
];

async function testKYCAPI(wallet) {
    try {
        const response = await fetch(`/api/status?wallet=${encodeURIComponent(wallet || '')}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return { verified: false, error: error.message };
    }
}

async function runTests() {
    let passed = 0;
    let failed = 0;
    
    for (const testCase of testCases) {
        console.log(`\n🔍 Testing: ${testCase.name}`);
        console.log(`   Input: "${testCase.wallet}"`);
        
        const result = await testKYCAPI(testCase.wallet);
        console.log(`   Result:`, result);
        
        const isVerifiedCorrect = result.verified === testCase.expected.verified;
        const areFlagsCorrect = JSON.stringify(result.flags) === JSON.stringify(testCase.expected.flags);
        const isRegionCorrect = result.region === testCase.expected.region;
        
        if (isVerifiedCorrect && areFlagsCorrect && isRegionCorrect) {
            console.log(`   ✅ PASS`);
            passed++;
        } else {
            console.log(`   ❌ FAIL`);
            console.log(`   Expected:`, testCase.expected);
            failed++;
        }
    }
    
    console.log(`\n📊 Test Results:`);
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
}

// Run the tests
runTests();

