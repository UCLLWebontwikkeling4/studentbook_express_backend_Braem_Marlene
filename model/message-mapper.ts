import { RowDataPacket } from 'mysql2';
import { Message} from '../types';

const mapToMessages = (rows: RowDataPacket[]): Message[] => {
    const result: Message[] = [];

    rows.forEach(
        ({
            message_id,
            message_text,
            message_dateSent,
            message_author,
            message_type,
        }) => {
            const message: Message = {
                id: message_id,
                text: message_text,
                dateSent: message_dateSent,
                author: message_author,
                type: message_type,
            };

            const existing = result.find((el) => el.id === message_id);
            if (!existing) {
                result.push(message);
            }
        }
    );

    return result;
};

export default mapToMessages;
