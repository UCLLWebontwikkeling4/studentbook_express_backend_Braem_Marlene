import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Friend, User } from '../types';
import { connectionPool } from '../database';
import { exit } from 'process';
import mapToUsers from './user-mapper';
import mapToFriends from './friend-mapper';


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
                onResult("success", friendInfo.username + " " + friendInfo.status);
                
                
    
            } catch (error) {
                onResult("Alrready friends", "geen succes");
            }
    
        } else {
            onResult("User doesn’t exist", "geen succes");
        }
    
        }
};


// Story get list of friends (05)
const getAllFriends = async (username: string, onResult: (error: Error, friends: Friend[]) => void) => {
    const query = `SELECT  f.user_name AS user_name, friend_name as friend_friendName, u.loggedIn as user_loggedIn, u.status as user_status
    from friend as f
inner join user u on f.friend_name = u.name
where user_name = ?`;

       
        try {
            const [rows] = await connectionPool.query(query, [username]);
            let friends  = mapToUsers(<RowDataPacket[]>rows)[0].friends;
            onResult(null,friends);
            //onResult(null,[rows]);
        } catch (error) {
            onResult(error,[]);
        }
}



export { addFriend, getAllFriends };
