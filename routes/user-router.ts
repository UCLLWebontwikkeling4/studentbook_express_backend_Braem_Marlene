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

 export { userRouter };
