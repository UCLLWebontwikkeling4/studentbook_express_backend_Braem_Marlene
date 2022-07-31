import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Friend } from '../types';
import { connectionPool } from '../database';
import { exit } from 'process';
import mapToUsers from './user-mapper';


//Story add friend (04)
const addFriend = async (
    username: string,
    friendname: string,
    onResult: (error: string, message: string) => void
    ) => {
        const checkUser = `select name as user_name, status as user_status from user where name = ?`;

        const [user] = await connectionPool.execute(checkUser, [username]);
        const [friend] = await connectionPool.execute(checkUser, [friendname]);
    
        if(username === friendname) 
        {
            onResult("You can't be friends with yourself", "geen succes");
        }
        else{
            if (user[0] != undefined && friend[0] != undefined) {
            try {
                const query = `INSERT INTO studentBook.friend (user_name,friend_name) VALUES (?,?);`;
                const [row] = await connectionPool.execute(query, [username, friendname]);
                var friendInfo = mapToUsers(<RowDataPacket[]>friend)[0]
                onResult("success", friendInfo.name + " " + friendInfo.status);
                
                
    
            } catch (error) {
                onResult("Alrready friends", "geen succes");
            }
    
        } else {
            onResult("User doesn’t exist", "geen succes");
        }
    
        }
};



export { addFriend };
