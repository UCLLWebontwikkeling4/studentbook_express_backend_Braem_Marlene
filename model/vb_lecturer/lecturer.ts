import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToLecturers from './lecturer-mapper';
import { Lecturer } from '../types';
import { connectionPool } from '../database';

const getLecturers = async (onResult: (error: Error, lecturers: Lecturer[]) => void) => {
    const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToLecturers(rows));
     *  })().catch((err) => onResult(err));
     */
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToLecturers(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getLecturer = async (
    lecturerId: number,
    onResult: (error: Error, lecturer: Lecturer) => void
) => {
    const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = ?
  AND l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    try {
        const [row] = await connectionPool.execute(query, [lecturerId]);
        onResult(null, mapToLecturers(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};

export { getLecturers, getLecturer };
