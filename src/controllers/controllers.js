// src/controllers/about.controller.js
import { db } from '../data/index.js';

export const getAboutInfo = (req, res) => {
    res.status(200).send(db.universityInfo);
};

export const updateAboutInfo = (req, res) => {
    const { text } = req.body;
    if (!text && typeof text !== 'string') { // Проверяем, что text есть и это строка (даже пустая)
        return res.status(400).json({ message: "Необходим 'text' в теле запроса." });
    }
    db.universityInfo = text;
    res.status(200).json({ message: "Информация о ВУЗе успешно обновлена.", newInfo: db.universityInfo });
};