// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.message); // Log the error for debugging

    // Default to 500 if no statusCode is set (or choose a default that fits your needs)
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : "something went wrong";


    res.status(statusCode).json({
        status: 'error',
        message: message,
    });
};

export default errorHandler;