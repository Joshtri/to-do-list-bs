const db = require('../utils/database');

const getTodosByUserIdAndStatus = (userId, status) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT todo.user_id,
                   subjek_tugas,
                   id_todo,
                   deadline,
                   status,
                   user.username AS nama_user
            FROM todo
            JOIN user ON todo.user_id = user.id_user
            WHERE user_id = ? AND status = ?;
        `;
        db.query(query, [userId, status], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const countCompletedTodosByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT COUNT(*) AS total_selesai
            FROM todo
            WHERE user_id = ? AND status = 'selesai';
        `;
        db.query(query, [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0].total_selesai || 0);
        });
    });
};

const createTodo = (todo) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO todo SET ?";
        db.query(query, todo, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const deleteTodo = (id_todo) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM todo WHERE id_todo = ?";
        db.query(query, [id_todo], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateTodoStatus = (status, id_todo) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE todo SET status = ? WHERE id_todo = ?";
        db.query(query, [status, id_todo], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateTodoSubject = (subject, id_todo) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE todo SET subjek_tugas = ? WHERE id_todo = ?";
        db.query(query, [subject, id_todo], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateUserData = (userData, id_user) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE user SET username = ?, nama_lengkap = ?, email = ? WHERE id_user = ?";
        db.query(query, [userData.username, userData.nama_lengkap, userData.email, id_user], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const updateUserPassword = (hashedPassword, userId) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE user SET password = ? WHERE id_user = ?";
        db.query(query, [hashedPassword, userId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    getTodosByUserIdAndStatus,
    countCompletedTodosByUserId,
    createTodo,
    deleteTodo,
    updateTodoStatus,
    updateTodoSubject,
    updateUserData,
    updateUserPassword,
};
