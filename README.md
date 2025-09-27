# BadgeMe

A decentralized platform for issuing and managing digital badges and credentials.

## Features

- Web-based badge issuance interface
- Secure wallet integration
- KYC verification process
- Badge minting capabilities
- Gated access control
- Zero-knowledge proof integration

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker and Docker Compose

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EmptySet-Exe/BadgeMe.git
cd BadgeMe
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development environment:
```bash
cd infrastructure
docker-compose up -d
```

### Development

The project consists of three main components:

- `web/`: Frontend Next.js application (port 3000)
- `issuer/`: Backend Fastify service (port 4000)
- `zk-stub/`: Zero-knowledge proof stub service (port 5000)

## Testing

Run end-to-end tests:
```bash
npx playwright test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository.