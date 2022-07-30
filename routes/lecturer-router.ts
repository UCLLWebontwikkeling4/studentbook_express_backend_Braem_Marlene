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

/**
 * @swagger
 * /lecturers/{id}:
 *   get:
 *      summary: Get a lecturer by ID
 *      responses:
 *         200:
 *           description: A lecturer
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Lecturer'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Lecturer ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
// lecturerRouter.get('/:id', (req: Request, res: Response) => {
//     const lecturerId = parseInt(req.params.id);
//     lecturerModel.getLecturer(lecturerId, (error: Error, lecturer: Lecturer) => {
//         if (error) {
//             res.status(500).json({ status: 'error', errorMessage: error.message });
//         } else {
//             res.status(200).json(lecturer);
//         }
//     });
// });

 export { messageRouter };
