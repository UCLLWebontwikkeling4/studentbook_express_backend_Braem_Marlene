import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Message } from '../types';
import { connectionPool } from '../database';


//Story get list of messages (01)
const getMessages = async (onResult: (error: Error, messages: Message[]) => void) => {
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

//Story get messages of friend (07)
const getMessagesOfFriend = async (username: string, onResult: (error: Error, messages: Message[]) => void) => { 
  
        const query = `SELECT m.id AS message_id, m.author_id as message_author, m.dateSent as message_dateSent, m.text as message_text, m.type as message_type
    from message as m inner join user u on m.author_id = u.name
    where author_id in (
    select friend_name
    from friend
    where user_name = ? and type = 'public')
    order by m.dateSent desc, m.id desc
    LIMIT 5
     `   

    try {
        const [rows] = await connectionPool.query(query, [username]);
        let messages  = mapToMessages(<RowDataPacket[]>rows);
        onResult(null,messages);
    } catch (error) {
        onResult(error,[]);
    }
}


export { getMessages, addMessage, getMessagesOfFriend };
