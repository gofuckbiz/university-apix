
import { db } from '../data/index.js';

// GET /api/students?age=17&course=1
export const getStudents = (req, res) => {
    const { age, course } = req.query;
    let filteredStudents = [...db.students];

    if (age) {
        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum)) {
            return res.status(400).json({ message: "Параметр 'age' должен быть числом." });
        }
        filteredStudents = filteredStudents.filter(s => s.age === ageNum);
    }

    if (course) {
        const courseNum = parseInt(course, 10);
        if (isNaN(courseNum)) {
            return res.status(400).json({ message: "Параметр 'course' должен быть числом." });
        }
        filteredStudents = filteredStudents.filter(s => s.course === courseNum);
    }

    if (filteredStudents.length === 0 && (age || course)) {
        return res.status(404).json({ message: "Студенты по указанным критериям не найдены." });
    }

    res.status(200).json(filteredStudents);
};

// POST /api/students
export const createStudent = (req, res) => {
    const { name, age, course } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === "") {
        return res.status(400).json({ message: "Поле 'name' обязательно и должно быть непустой строкой." });
    }
    if (age === undefined || typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ message: "Поле 'age' обязательно и должно быть положительным числом." });
    }
    if (course === undefined || typeof course !== 'number' || course <= 0) {
        return res.status(400).json({ message: "Поле 'course' обязательно и должно быть положительным числом." });
    }

    const newStudent = {
        id: db.helpers.generateId(),
        name,
        age,
        course
    };
    db.students.push(newStudent);
    res.status(201).json({ message: "Студент успешно создан.", student: newStudent });
};

// PUT /api/students/:id
export const updateStudent = (req, res) => {
    const { id } = req.params;
    const { age, course, name } = req.body;

    const studentIndex = db.students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Студент с таким ID не найден." });
    }

    if (age !== undefined) {
        if (typeof age !== 'number' || age <= 0) {
            return res.status(400).json({ message: "Поле 'age' должно быть положительным числом." });
        }
        db.students[studentIndex].age = age;
    }
    if (course !== undefined) {
        if (typeof course !== 'number' || course <= 0) {
            return res.status(400).json({ message: "Поле 'course' должно быть положительным числом." });
        }
        db.students[studentIndex].course = course;
    }
     if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === "") {
            return res.status(400).json({ message: "Поле 'name' должно быть непустой строкой." });
        }
        db.students[studentIndex].name = name;
    }


    res.status(200).json({ message: "Данные студента успешно обновлены.", student: db.students[studentIndex] });
};

// DELETE /api/students/:id
export const deleteStudent = (req, res) => {
    const { id } = req.params;
    const initialLength = db.students.length;
    db.students = db.students.filter(s => s.id !== id);

    if (db.students.length === initialLength) {
        return res.status(404).json({ message: "Студент с таким ID не найден." });
    }

    res.status(200).json({ message: "Студент успешно удален." });
};