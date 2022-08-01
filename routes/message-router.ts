/**
 * @swagger
 *   components:
 *    schemas:
 *      message:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            text:
 *              type: string
 *              description: text of the message
 *            datesent:
 *              type: timestamp
 *              description: date when message was sent
 *            author:           
 *              type: string
 *              description: message author
 *            type:  
 *              description: message type
 *              type: string
 */
import express, { Request, Response, Handler } from 'express';
import * as messageModel from '../model/message';
import { Message } from '../types';

const messageRouter = express.Router();

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get a list of messages (last 5 public messages)
 *     responses:
 *       200:
 *         description: A list of messages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 */
messageRouter.get('/', (req: Request, res: Response) => {
    messageModel.getMessages((err: Error, messages: Message[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(messages);
        }
    });
});

//Story add message (06)
/**
 * @swagger
 * /messages:
 *   post:
 *      summary: Adds a message
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      author: 
 *                          type: string
 *                      text: 
 *                          type: string 
 *                      type: 
 *                          type: string    
 * 
 *      responses:
 *         200:
 *            description: Message added 
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/message'
 *         403:
 *            description: Message couldnt be added
 *            content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/message'
 */
 messageRouter.post('/', (req: Request, res: Response) => {

    const author = <string>req.body.author;
    const text = <string>req.body.text;
    const type = <string>req.body.type;
    
    const dateSent = new Date(Date.now())
    
    messageModel.addMessage(author,text,type,dateSent, (error: boolean, name: string) => {
       
        if (error) {
            res.status(403).json({ status: 'Forbidden'});
        } else {
            res.status(200).json({ status: 'Success'});
        }
    });
});
 export { messageRouter };
