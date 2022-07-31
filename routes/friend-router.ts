/**
 * @swagger
 *   components:
 *    schemas:
 *      friend:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            friendname:
 *              type: string
 *            
 * 
 */
import express, { Request, Response, Handler } from 'express';
import * as friendModel from '../model/friend';
import { Friend,  User } from '../types';

const friendRouter = express.Router();

/**
 * @swagger
 * /friends:
 *   post:
 *      summary: add a friend
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/friend'
 *      responses:
 *         200:
 *            description: Friend has been added
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 *         404:
 *            description: User name doesn't exists
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
 friendRouter.post('/', (req: Request, res: Response) => {
    const friend = <Friend>req.body;

    friendModel.addFriend(friend.username,friend.friendname, (error: string, message: string) => {
        if (error !== "success") {
            res.status(404).json({ status: error});
        } else {
            res.status(200).json({ status: "success " + message});
        }
    });
});


/**
 * @swagger
 * /friends/{username}:
 *   get:
 *      summary: Get all friends of a user by name
 *      responses:
 *         200:
 *           description: A list of users/friends
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user'
 *      parameters:
 *        - name: username
 *          in: path
 *          description: Username
 *          required: true
 *          schema:
 *            type: string
 *            format: int64
 */

 friendRouter.get('/:username', (req: Request, res: Response) => {
    const username = req.params.username;
    friendModel.getAllFriends(username, (error: Error, friends: Friend[]) => {
        if (error) {
            res.status(404).json(friends);
        } else {
            res.status(200).json(friends);
        }
            
    });
});

 export { friendRouter };
