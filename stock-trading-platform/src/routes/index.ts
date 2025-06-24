import { Router, Express, Request, Response } from 'express';
import MarketMaker from '../services/MarketMaker';
import OrderBook from '../components/OrderBook';

const router = Router();
const marketMaker = new MarketMaker();
const orderBook = new OrderBook();

export function setRoutes(app: Express) {
    router.post('/create-market', (req: Request, res: Response) => {
        const { symbol, initialPrice } = req.body;
        if (!symbol || typeof initialPrice !== 'number') {
            return res.status(400).send('Invalid market data');
        }
        try {
            marketMaker.createMarket(symbol, initialPrice);
            res.status(201).send('Market created');
        } catch (e: any) {
            res.status(400).send(e.message);
        }
    });

    router.post('/add-order', (req: Request, res: Response) => {
        const { type, price, quantity } = req.body;
        if ((type !== 'bid' && type !== 'ask') || typeof price !== 'string' || typeof quantity !== 'number') {
            return res.status(400).send('Invalid order data');
        }
        try {
            orderBook.addOrder(type, price, quantity);
            res.status(201).send('Order added');
        } catch (e: any) {
            res.status(400).send(e.message);
        }
    });

    router.get('/orders', (req: Request, res: Response) => {
        const { type } = req.query;
        if (type !== 'bid' && type !== 'ask') {
            return res.status(400).send('Query param "type" must be "bid" or "ask"');
        }
        const orders = orderBook.getOrders(type as 'bid' | 'ask');
        res.status(200).json(Object.fromEntries(orders));
    });

    router.post('/execute-trade', (req: Request, res: Response) => {
        const { symbol, order } = req.body;
        if (!symbol || !order) {
            return res.status(400).send('Invalid trade data');
        }
        try {
            marketMaker.executeTrade(symbol, order);
            res.status(200).send('Trade executed');
        } catch (e: any) {
            res.status(400).send(e.message);
        }
    });

    app.use('/api', router);
}