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

// const getMessage = async (
//     lecturerId: number,
//     onResult: (error: Error, lecturer: Lecturer) => void
// ) => {
//     const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
//   FROM lecturer AS l, course AS c, lecturer_course AS lc
//   WHERE l.id = ?
//   AND l.id = lc.lecturer_id
//   AND c.id = lc.course_id`;

//     try {
//         const [row] = await connectionPool.execute(query, [lecturerId]);
//         onResult(null, mapToLecturers(<RowDataPacket[]>row)[0]);
//     } catch (error) {
//         onResult(error, null);
//     }
// };

export { getMessages };
