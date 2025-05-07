
const errorHandler = (err, req, res, next) => {
    console.error("================ ERROR ================");
    console.error("Время:", new Date().toISOString());
    console.error("Маршрут:", req.method, req.originalUrl);
    if (req.body && Object.keys(req.body).length > 0) {
        console.error("Тело запроса:", JSON.stringify(req.body, null, 2));
    }
    if (req.params && Object.keys(req.params).length > 0) {
        console.error("Параметры маршрута:", JSON.stringify(req.params, null, 2));
    }
    if (req.query && Object.keys(req.query).length > 0) {
        console.error("Параметры запроса:", JSON.stringify(req.query, null, 2));
    }
    console.error("Ошибка:", err.message);
    console.error("Стек ошибки:", err.stack);
    console.error("=====================================");


    // Если заголовки уже отправлены, просто кидаем ошибку
    if (res.headersSent) {
        return next(err);
    }

    // Отправляем ответ об ошибке
    res.status(err.status || 500).json({
        message: err.message || "Произошла внутренняя ошибка сервера.",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Включаем стэк  в режиме разработки
    });
};

export default errorHandler;