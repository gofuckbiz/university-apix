
import { db } from '../data/index.js';

// GET /api/teachers
export const getTeachers = (req, res) => {
    const { age, subject } = req.query;
    let filteredTeachers = [...db.teachers];

    if (age) {
        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum)) {
            return res.status(400).json({ message: "Параметр 'age' должен быть числом." });
        }
        filteredTeachers = filteredTeachers.filter(t => t.age === ageNum);
    }

    if (subject) {
        filteredTeachers = filteredTeachers.filter(t => t.subject && t.subject.toLowerCase().includes(subject.toLowerCase()));
    }

    if (filteredTeachers.length === 0 && (age || subject)) {
        return res.status(404).json({ message: "Преподаватели по указанным параметрам не найдены." });
    }

    res.status(200).json(filteredTeachers);
};

// POST /api/teachers
export const createTeacher = (req, res) => {
    const { name, age, subject } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === "") {
        return res.status(400).json({ message: "Поле 'name' обязательно и должно быть непустой строкой." });
    }
    if (age === undefined || typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ message: "Поле 'age' обязательно и должно быть положительным числом." });
    }
    if (!subject || typeof subject !== 'string' || subject.trim() === "") {
        return res.status(400).json({ message: "Поле 'subject' обязательно и должно быть непустой строкой." });
    }

    const newTeacher = {
        id: db.helpers.generateId(),
        name,
        age,
        subject
    };
    db.teachers.push(newTeacher);
    res.status(201).json({ message: "Преподаватель успешно создан.", teacher: newTeacher });
};

// PUT /api/teachers/:id
export const updateTeacher = (req, res) => {
    const { id } = req.params;
    const { age, subject, name } = req.body;

    const teacherIndex = db.teachers.findIndex(t => t.id === id);

    if (teacherIndex === -1) {
        return res.status(404).json({ message: "Преподаватель с таким ID не найден." });
    }

    // Валидация входных данных 
    if (age !== undefined) {
        if (typeof age !== 'number' || age <= 0) {
            return res.status(400).json({ message: "Поле 'age' должно быть положительным числом." });
        }
        db.teachers[teacherIndex].age = age;
    }
    if (subject !== undefined) {
        if (typeof subject !== 'string' || subject.trim() === "") {
            return res.status(400).json({ message: "Поле 'subject' должно быть непустой строкой." });
        }
        db.teachers[teacherIndex].subject = subject;
    }
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === "") {
            return res.status(400).json({ message: "Поле 'name' должно быть непустой строкой." });
        }
        db.teachers[teacherIndex].name = name;
    }

    res.status(200).json({ message: "Данные преподавателя успешно обновлены.", teacher: db.teachers[teacherIndex] });
};

// DELETE /api/teachers/:id
export const deleteTeacher = (req, res) => {
    const { id } = req.params;
    const initialLength = db.teachers.length;
    db.teachers = db.teachers.filter(t => t.id !== id);

    if (db.teachers.length === initialLength) {
        return res.status(404).json({ message: "Преподаватель с таким ID не найден." });
    }

    res.status(200).json({ message: "Преподаватель успешно удален." });
};