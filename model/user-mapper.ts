import { RowDataPacket } from 'mysql2';
import { Message, User, Friend, Chat} from '../types';

const mapToUsers = (rows: RowDataPacket[]): User[] => {
    const result: User[] = [];

    rows.forEach(
        ({
            user_name,
            user_status,
            user_loggedIn,
            message_id,
            message_text,
            message_dateSent,
            message_author,
            message_type,
            friend_friendName,
        }) => {
            
            const message: Message = {
                id: message_id,
                text: message_text,
                dateSent: message_dateSent,
                author: message_author,
                type: message_type,
            };
            const friend: Friend = {
                name: user_name,
                friendName: friend_friendName,
            };
            const chat: Chat = {
                Users: [],
                Messages: [],
            };
            const user: User = {
                name: user_name,
                status: user_status,
                loggedIn: user_loggedIn,
                messages: [message],
                friends: [friend],
                chats: [chat]
            };

            const existing = result.find((el) => el.name === user_name);
            if (!existing) {
                result.push(user);
            }
        }
    );

    return result;
};

export default mapToUsers;
