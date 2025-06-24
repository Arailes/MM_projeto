class OrderBook {
    private bids: Map<string, number>;
    private asks: Map<string, number>;

    constructor() {
        this.bids = new Map();
        this.asks = new Map();
    }

    addOrder(type: 'bid' | 'ask', price: string, quantity: number): void {
        const orders = type === 'bid' ? this.bids : this.asks;
        orders.set(price, (orders.get(price) || 0) + quantity);
    }

    removeOrder(type: 'bid' | 'ask', price: string, quantity: number): void {
        const orders = type === 'bid' ? this.bids : this.asks;
        const currentQuantity = orders.get(price) || 0;

        if (currentQuantity > quantity) {
            orders.set(price, currentQuantity - quantity);
        } else {
            orders.delete(price);
        }
    }

    getOrders(type: 'bid' | 'ask'): Map<string, number> {
        return type === 'bid' ? this.bids : this.asks;
    }
}

export default OrderBook;