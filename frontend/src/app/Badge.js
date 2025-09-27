export default function Badge({verified = true, flags = ['OVER18']}){
    return (
        <div className="p-4 bg-white rounded-lg shadow-md text-center" >
            <div className={`mb-2 p-2 rounded-full inline-block ${verified ? 'bg-green-100': 'bg-red-100'}`}>
                <span className={verified ? 'text-green-600': 'text-red-600'}> {verified ? '✅' : '❌'} </span>
            </div>
            <h2 className={`text-lg font-semibold ${verified ? 'text-green-800' : 'text-red-800'}`}>
                {verified ? 'Verified' : 'Not Verified'}
            </h2>
            <p className="text-sm text-gray-600">Flags: {flags.join(', ')}</p>
        </div>
    );
};