
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Доступные ENDPOINTS:`);
    console.log(`  GET    http://localhost:${PORT}/`);
    console.log(`  GET    http://localhost:${PORT}/about`);
    console.log(`  PUT    http://localhost:${PORT}/api/about`);
    console.log(`  GET    http://localhost:${PORT}/api/teachers`);
    console.log(`  POST   http://localhost:${PORT}/api/teachers`);
    console.log(`  PUT    http://localhost:${PORT}/api/teachers/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/teachers/:id`);
    console.log(`  GET    http://localhost:${PORT}/api/students`);
    console.log(`  POST   http://localhost:${PORT}/api/students`);
    console.log(`  PUT    http://localhost:${PORT}/api/students/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/students/:id`);
});