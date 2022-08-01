import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Message } from '../types';
import { connectionPool } from '../database';


//Story get list of messages (01)
const getMessages = async (onResult: (error: Error, lecturers: Message[]) => void) => {
    const query = `SELECT id AS message_id, text AS message_text, dateSent AS message_dateSent, author_id AS message_author, type AS message_type
        FROM message
        where type = 'public'
        ORDER BY dateSent DESC, id DESC
        limit 5`;

    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToMessages(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

// Story add message (06)
const addMessage = async ( author: string ,text: string,type: string,dateSent: Date,
    onResult: (error: boolean,message: string) => void
) => {
     const query = `INSERT INTO studentBook.message (dateSent, author_id,text,type) 
    VALUES (?, ?, ?,?);`;


         try{
             const [row] = await connectionPool.execute(query,[dateSent,author,text,type]);    
            onResult(null,"success");
         } catch (error){
            onResult(error,error.text);
    } 
};

export { getMessages, addMessage };
