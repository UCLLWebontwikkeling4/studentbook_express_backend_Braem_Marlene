import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { User } from '../types';
import { connectionPool } from '../database';
import { exit } from 'process';


//Story login a user (02)
const loginUser = async (
    userName: string,
    onResult: (status: boolean, userName: string) => void
    ) => {
    const query = `SELECT u.name AS user_name
    FROM user AS u
    WHERE u.name like ?`;

    const [row] = await connectionPool.execute(query, [userName]);

    if (row[0] != undefined){
        onResult(true, userName);
    }else {
        onResult(false, userName);
    }
};


//Story change user status (03)
const changeUserStatus = async (
    username: string,
    status: string,
    onResult: (error: Error, status: string, check: string) => void
    ) => {
    
        const query = `UPDATE user
        SET 
            status = ?
        WHERE
            name = ?`;
    
            let check  = await checkUser(username);
            if(check != "false"){
                const [row] = await connectionPool.execute(query, [status, username]);
                onResult(null, status, check);
            }else{
                onResult(new Error('User not found'), null, check);
            }
                           
        
}

//check if user exists
const checkUser = async (
    username: string,
    ) => {
        const query = `SELECT u.name
        from user as u
        where u.name = ?`;
    
        try {
            let res = await connectionPool.execute(query, [username]);
            return(username + res[0][0].name);
        } catch (error) {
            return("false");
        }
}




export { loginUser, changeUserStatus };
