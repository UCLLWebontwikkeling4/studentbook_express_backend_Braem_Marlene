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
            friend_username,
        }) => {
            
            const message: Message = {
                id: message_id,
                text: message_text,
                dateSent: message_dateSent,
                author: message_author,
                type: message_type,
            };
            const friend: Friend = {
                username: user_name,
                friendname: friend_friendName,
                status: user_status,
            };
            const chat: Chat = {
                Users: [],
                Messages: [],
            };
            const user: User = {
                username: user_name,
                status: user_status,
                loggedIn: user_loggedIn,
                messages: [message],
                friends: [friend],
                chats: [chat]
            };

            const existing = result.find((el) => el.username === user_name);
            if (!existing) {
                result.push(user);
            }else{
                existing.messages.push(message);
                existing.friends.push(friend);
                existing.chats.push(chat);
            }
        }
    );

    return result;
};

export default mapToUsers;
