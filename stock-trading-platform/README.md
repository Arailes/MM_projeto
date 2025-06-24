# Stock Trading Platform

This project is a stock trading platform that implements market-making functionality. It allows users to manage bid and ask orders, execute trades, and interact with the market through a defined API.

## Features

- **Order Management**: Add, remove, and retrieve orders using the `OrderBook` component.
- **Market Making**: Implement market-making strategies with the `MarketMaker` service.
- **API Routes**: Define and manage API routes for client-server communication.
- **TypeScript Support**: Built with TypeScript for type safety and better development experience.

## Project Structure

```
stock-trading-platform
├── src
│   ├── app.ts               # Entry point of the application
│   ├── components
│   │   └── OrderBook.ts     # Manages bid and ask orders
│   ├── services
│   │   └── MarketMaker.ts    # Implements market-making logic
│   ├── routes
│   │   └── index.ts         # Defines API routes
│   └── types
│       └── index.ts         # Type definitions for orders and market data
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd stock-trading-platform
   ```

3. Install the dependencies:
   ```
      "scripts": {
     "start": "ts-node src/app.ts"
   }
   ```

4. Run the application:
   ```
   npm start
   ```

## Usage

Once the application is running, you can interact with the API to manage orders and execute trades. Refer to the API documentation for detailed usage instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes. ok
