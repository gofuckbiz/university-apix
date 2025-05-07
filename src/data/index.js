
import { v4 as uuidv4 } from 'uuid';

let universityInfo = "Это информация о нашем   ВУЗе.";

let teachers = [
    { id: uuidv4(), name: "Иван Петров", age: 45, subject: "Математика" },
    { id: uuidv4(), name: "Анна Сидорова", age: 37, subject: "Физика" }
];

let students = [
    { id: uuidv4(), name: "Олег Иванов", age: 20, course: 3 },
    { id: uuidv4(), name: "Елена Кузнецова", age: 19, course: 2 }
];

export const db = {
    universityInfo,
    teachers,
    students,
    helpers: { 
        generateId: uuidv4
    }
};