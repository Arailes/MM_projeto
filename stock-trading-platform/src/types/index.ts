export interface Order {
    id: string;
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
}

export interface MarketData {
    symbol: string;
    bid: number;
    ask: number;
    lastPrice: number;
    volume: number;
}