export default function Badge({verified = true, flags = ['OVER18'], badge = null, region = null, expiryDate = null, addressInfo = null}){
    const formatExpiryDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const formatRegion = (regionCode) => {
        const regionMap = {
            '0x5553': 'US',
            '0x4341': 'CA', 
            '0x4742': 'GB',
            '0x4445': 'DE',
            '0x4652': 'FR',
            '0x4553': 'ES',
            '0x4954': 'IT',
            '0x4155': 'AU',
            '0x4e4c': 'NL',
            '0x5345': 'SE',
            '0x4e4f': 'NO',
            '0x4a50': 'JP',
            '0x434e': 'CN',
            '0x494e': 'IN',
            '0x4252': 'BR',
            '0x4d58': 'MX'
        };
        return regionMap[regionCode] || regionCode;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-4">
                <div className={`mb-2 p-2 rounded-full inline-block ${verified ? 'bg-green-100': 'bg-red-100'}`}>
                    <span className={verified ? 'text-green-600': 'text-red-600'}> {verified ? '✅' : '❌'} </span>
                </div>
                <h2 className={`text-lg font-semibold ${verified ? 'text-green-800' : 'text-red-800'}`}>
                    {verified ? 'KYC Verified' : 'Not Verified'}
                </h2>
            </div>
            
            {/* Address Validation Info */}
            {addressInfo && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-blue-600">🔍</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-blue-800">
                                Address Validation: {addressInfo.isValid ? 'Valid' : 'Invalid'}
                            </p>
                            <p className="text-xs text-blue-600">
                                Method: {addressInfo.validationMethod} | Format: {addressInfo.format || 'Unknown'}
                            </p>
                            {addressInfo.error && (
                                <p className="text-xs text-red-600 mt-1">
                                    Error: {addressInfo.error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {verified && badge && (
                <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Flags:</span>
                            <div className="text-gray-600">{flags.join(', ')}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Region:</span>
                            <div className="text-gray-600">{formatRegion(badge.region)}</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Expiry:</span>
                            <div className="text-gray-600">{formatExpiryDate(badge.expiry)}</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-700">Status:</span>
                            <div className={`font-medium ${badge.revoked ? 'text-red-600' : 'text-green-600'}`}>
                                {badge.revoked ? 'Revoked' : 'Active'}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium text-gray-700">Claims Hash:</span>
                        <div className="text-gray-600 font-mono text-xs break-all">
                            {badge.claimsHash}
                        </div>
                    </div>
                </div>
            )}
            
            {!verified && (
                <div className="text-center text-gray-500">
                    <p>No KYC badge found for this wallet address.</p>
                    {addressInfo && !addressInfo.isValid && (
                        <p className="text-sm mt-2 text-red-500">
                            Please enter a valid Midnight wallet address.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};