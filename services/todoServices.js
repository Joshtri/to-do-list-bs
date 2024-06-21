const todoRepository = require('../repositories/todoRepository');

const getTodos = async (userId, status) => {
    try {
        return await todoRepository.getTodosByUserIdAndStatus(userId, status);
    } catch (error) {
        throw error;
    }
};

const getCompletedTodoCount = async (userId) => {
    try {
        return await todoRepository.countCompletedTodosByUserId(userId);
    } catch (error) {
        throw error;
    }
};

const createNewTodo = async (todo) => {
    try {
        return await todoRepository.createTodo(todo);
    } catch (error) {
        throw error;
    }
};

const deleteTodoById = async (id_todo) => {
    try {
        return await todoRepository.deleteTodo(id_todo);
    } catch (error) {
        throw error;
    }
};

const updateTodoStatusById = async (status, id_todo) => {
    try {
        return await todoRepository.updateTodoStatus(status, id_todo);
    } catch (error) {
        throw error;
    }
};

const updateTodoSubjectById = async (subject, id_todo) => {
    try {
        return await todoRepository.updateTodoSubject(subject, id_todo);
    } catch (error) {
        throw error;
    }
};

const updateUserDataById = async (userData, id_user) => {
    try {
        return await todoRepository.updateUserData(userData, id_user);
    } catch (error) {
        throw error;
    }
};

const updateUserPasswordById = async (hashedPassword, userId) => {
    try {
        return await todoRepository.updateUserPassword(hashedPassword, userId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTodos,
    getCompletedTodoCount,
    createNewTodo,
    deleteTodoById,
    updateTodoStatusById,
    updateTodoSubjectById,
    updateUserDataById,
    updateUserPasswordById,
};
