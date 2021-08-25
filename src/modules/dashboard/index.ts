import express from 'express';
import PubSub from 'pubsub-js';
import middlewares from './middlewares';

const app = express();
const PORT = process.env.PORT || 3000;

//Initialize middlewares
middlewares(app);

export default function () {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/pages/index.html');
    })

    app.get('/logs', (req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache"
        });

        PubSub.subscribe("LOGGER", (msg: any, data: any) => {
            res.write('data: ' + data + "\n\n");
        })
    })
    app.listen(3000, () => {
        console.log(`Open dashboard http://localhost:${PORT} 🔥`)
    })
}