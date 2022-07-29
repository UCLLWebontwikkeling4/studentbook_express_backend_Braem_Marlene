import { RowDataPacket } from 'mysql2';
import { Lecturer, Course } from '../types';

const mapToLecturers = (rows: RowDataPacket[]): Lecturer[] => {
    const result: Lecturer[] = [];

    rows.forEach(
        ({
            lecturer_id,
            lecturer_name,
            course_id,
            course_name,
            course_description,
            course_phase,
        }) => {
            const course: Course = {
                id: course_id,
                name: course_name,
                description: course_description,
                phase: course_phase,
            };
            const lecturer: Lecturer = { id: lecturer_id, name: lecturer_name, courses: [course] };

            const existing = result.find((el) => el.id === lecturer_id);
            if (!existing) {
                result.push(lecturer);
            } else {
                existing.courses.push(course);
            }
        }
    );

    return result;
};

export default mapToLecturers;
