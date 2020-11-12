import {Request, Response} from "express";
const webpush = require('web-push');
import {User} from '../entity/User';
import {getManager} from "typeorm";

class NotificationController {
    //TODO: Make it possible to have multiple subscriptions
    static subscribe = async (req: Request, res: Response) => {
        const subscription = req.body;

        const entityManager = getManager(); // you can also get it via getConnection().manager
        const user = await entityManager.findOne(User, req.params.id);
        user.subscription = JSON.stringify(req.body);
        await entityManager.save(user);

        res.status(201).json({});
        const payload = JSON.stringify({ title: 'Stenia Doorbell', body: "This is a test notification!" });

        webpush.sendNotification(subscription, payload).catch(error => {
            console.error(error.stack);
        });
    }

    static sendNotification = async (req: Request, res: Response) => {
        const entityManager = getManager();
        const userId = req.params.id;
        const user = await entityManager.findOne(User, userId);

        webpush.sendNotification(JSON.parse(user.subscription), JSON.stringify({title: 'Stenia Doorbell', body: "Someone is ringing your doorbell!"})).catch(error => {
            console.error(error.stack)
        })

        res.json({})
    }
}

export default NotificationController
