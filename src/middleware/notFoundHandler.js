
const notFoundHandler = (req, res, next) => {
    res.status(404).json({ message: `Даннный  Ресурс не найден: ${req.originalUrl}` });
};

export default notFoundHandler;