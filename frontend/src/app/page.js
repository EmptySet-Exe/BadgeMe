import Badge from '../components/Badge';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to BadgeMe</h1>
        <p className="text-lg text-gray-600 mb-8">zk-KYC Verification Demo</p>
        <Badge verified={true} flags={['OVER18', 'AML_OK']} />
      </div>
    </main>
  );
}