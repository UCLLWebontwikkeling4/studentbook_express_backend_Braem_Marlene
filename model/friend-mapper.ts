import { RowDataPacket } from 'mysql2';
import { Friend} from '../types';

const mapToFriends = (rows: RowDataPacket[]): Friend[] => {
    const result: Friend[] = [];

    rows.forEach(
        ({
            user_name,
            friend_name,
        }) => {
            
            const friend: Friend = {
                username: user_name,
                friendname: friend_name,
            };
         

            const existing = result.find((el) => el.username === user_name);
            if (!existing) {
                result.push(friend);
            }
        }
    );

    return result;
};

export default mapToFriends;
