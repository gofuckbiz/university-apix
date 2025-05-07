
import express from 'express';
import aboutRoutes from './routes/about.routes.js';
import teacherRoutes from './routes/teachers.routes.js';
import studentRoutes from './routes/students.routes.js';
import logger from './middleware/logger.js'; 
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';

const app = express();

// Middleware для парсинга JSON  запросов
app.use(express.json());
// Middleware для парсинга  тел запросов
app.use(express.urlencoded({ extended: true }));


app.use(logger);

// Маршруты
app.get('/', (req, res) => {
    res.send('Добро пожаловать на API ВУЗа!');
});

app.use('/about', aboutRoutes); // host/about - для GET запроса текста о нашем вузе
app.use('/api/about', aboutRoutes);

app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);


app.use(notFoundHandler);

app.use(errorHandler);

export default app;