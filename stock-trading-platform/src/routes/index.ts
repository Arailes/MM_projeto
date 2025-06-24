import { Router } from 'express';
import { MarketMaker } from '../services/MarketMaker';
import { OrderBook } from '../components/OrderBook';

const router = Router();
const marketMaker = new MarketMaker();
const orderBook = new OrderBook();

export function setRoutes(app) {
    router.post('/create-market', (req, res) => {
        const marketData = req.body;
        marketMaker.createMarket(marketData);
        res.status(201).send('Market created');
    });

    router.post('/add-order', (req, res) => {
        const order = req.body;
        orderBook.addOrder(order);
        res.status(201).send('Order added');
    });

    router.get('/orders', (req, res) => {
        const orders = orderBook.getOrders();
        res.status(200).json(orders);
    });

    router.post('/execute-trade', (req, res) => {
        const tradeData = req.body;
        marketMaker.executeTrade(tradeData);
        res.status(200).send('Trade executed');
    });

    app.use('/api', router);
}