import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Message } from '../types';
import { connectionPool } from '../database';


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

export { loginUser };
