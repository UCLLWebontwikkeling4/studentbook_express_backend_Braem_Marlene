/**
 * @swagger
 *   components:
 *    schemas:
 *      user:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: name of the user
 *            status:
 *              type: string
 *              description: status of the user
 *            loggedIn:
 *              type: boolean
 *              description: is the user logged in          
 */
import express, { Request, Response, Handler } from 'express';
import * as userModel from '../model/user';
import { User } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login for a User
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      name: 
 *                          type: string
 *      responses:
 *         200:
 *            description: User name exists
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 *         403:
 *            description: User name doesn't exists
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
userRouter.post('/login', (req: Request, res: Response) => {
    const userName = <string>req.body.name;
    userModel.loginUser(userName,(status: boolean, userName: string) => {
        if (status === true) {
            res.status(200).json({ 'success': 'true'});
        } else {
            res.status(403).json({ status: 'forbidden'});
        }
    });
});



/**
 * @swagger
 * /user/status:
 *   put:
 *      summary: change the status of a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                  properties:
 *                      username: 
 *                          type: string
 *                      status:
 *                          type: string 
 *      responses:
 *         200:
 *            description: User status has changed
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 *         404:
 *            description: User name couldn't be changed
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
userRouter.put('/status', (req: Request, res: Response) => {
    const username = <string>req.body.username;
    const status = <string>req.body.status;

    userModel.changeUserStatus(username, status,(error: Error, status: string, check: string) => {
        if (error) {
            res.status(404).json({ status: 'User doesn’t exist'});
        } else {
            res.status(200).json({ status: "Success"});
        }
    }
    );
}
);


 export { userRouter };
