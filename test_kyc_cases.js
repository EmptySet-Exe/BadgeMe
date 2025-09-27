// KYC Frontend Testing Script
// Run this in your browser's developer console at http://localhost:3000

console.log("🧪 Starting KYC Verification Tests...\n");

const testCases = [
    // Valid cases (should return verified: true)
    {
        name: "Standard Ethereum Address",
        wallet: "0x1234567890abcdef1234567890abcdef12345678",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "IN" }
    },
    {
        name: "Short Valid Address",
        wallet: "0x123",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "IN" }
    },
    {
        name: "Mixed Case Address",
        wallet: "0xAbCdEf1234567890",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "IN" }
    },
    {
        name: "Address with Special Characters",
        wallet: "0x!@#$%^&*()",
        expected: { verified: true, flags: ["OVER18", "AML_OK"], region: "IN" }
    },
    
    // Invalid cases (should return verified: false)
    {
        name: "Address without 0x prefix",
        wallet: "1234567890abcdef1234567890abcdef12345678",
        expected: { verified: false, flags: [], region: "IN" }
    },
    {
        name: "Empty string",
        wallet: "",
        expected: { verified: false, flags: [], region: "IN" }
    },
    {
        name: "Random text",
        wallet: "hello world",
        expected: { verified: false, flags: [], region: "IN" }
    },
    {
        name: "Numbers only",
        wallet: "123456789",
        expected: { verified: false, flags: [], region: "IN" }
    },
    {
        name: "Null input",
        wallet: null,
        expected: { verified: false, flags: [], region: "IN" }
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
