import express from 'express';
import PubSub from 'pubsub-js';
const router = express();

router.route('/login')
    .delete((req, res) => {
        PubSub.publish('LOGOUT');
        res.sendStatus(200);
    })

export default router;