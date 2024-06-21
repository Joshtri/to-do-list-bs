const bcrypt = require('bcrypt');
const saltRounds = 10;
const todoService = require('../services/todoServices');

// Controller untuk User Main.
exports.UserPage = async (req, res) => {
    try {
        const title = "To-Do List Page";
        const userData = req.session.user;

        const messageCreate = req.flash('infoCreateTodo');
        const messageLoginSuccess = req.flash('infoLoginSuccess');

        const fetchData = async () => {
            const [todoData, completedTodoData, totalSelesai] = await Promise.all([
                todoService.getTodos(userData.id_user, 'belum'),
                todoService.getTodos(userData.id_user, 'selesai'),
                todoService.getCompletedTodoCount(userData.id_user)
            ]);

            return { todoData, completedTodoData, totalSelesai };
        };

        const { todoData, completedTodoData, totalSelesai } = await fetchData();

        res.render('todo_user', {
            title,
            user: userData,
            todoData,
            completedTodoData,
            totalSelesai,
            messageCreate,
            messageLoginSuccess
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// Create Todo by their id.
exports.userCreatedTodo = async (req, res) => {
    const { subjek_tugas, deadline, user_id } = req.body;

    const createTodoField = {
        user_id: user_id,
        subjek_tugas: subjek_tugas,
        deadline: deadline,
    };

    try {
        await todoService.createNewTodo(createTodoField);
        res.redirect('/user/todo');
        console.log('sukses tambah data.');
    } catch (err) {
        console.log('failed to insert ', err);
        req.flash('infoCreateTodo', 'Subjek Tidak boleh kosong!');
        res.redirect('/user/todo');
    }
};

exports.UserdeleteTodo = async (req, res) => {
    const id_todo = req.params.id_todo;

    try {
        await todoService.deleteTodoById(id_todo);
        res.redirect('/user/todo');
        console.log('sukses hapus data.');
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({ err: 'Internal server error' });
    }
};

exports.updateStatusTodo = async (req, res) => {
    const { status, id_todo } = req.body;

    const newStatus = (status === 'selesai') ? status : 'belum';

    try {
        await todoService.updateTodoStatusById(newStatus, id_todo);
        res.redirect('/user/todo');
        console.log('Status updated successfully');
    } catch (err) {
        console.log("Error updating status:", err);
        res.status(500).json({ error: "Error updating status" });
    }
};

exports.updateTodoUser = async (req, res) => {
    const { subject } = req.body;
    const id_todo = req.params.id_todo;

    try {
        await todoService.updateTodoSubjectById(subject, id_todo);
        res.status(200).json({ message: "Subject updated successfully" });
    } catch (err) {
        console.log("Error updating subject:", err);
        res.status(500).json({ error: "Error updating subject" });
    }
};

exports.informasiAkunPage = (req, res) => {
    const userData = req.session.user;

    res.render('informasi_akun', {
        user: userData
    });
};

exports.updateUserData = async (req, res) => {
    const { username, nama_lengkap, email } = req.body;
    const id_user = req.params.id_user;

    try {
        await todoService.updateUserDataById({ username, nama_lengkap, email }, id_user);
        res.redirect('/user/informasi_akun');
        console.log("userdata updated successfully");
    } catch (err) {
        console.log("Error updating userdata:", err);
        res.status(500).json({ error: "Error updating userdata" });
    }
};

exports.updateUserPass = async (req, res) => {
    const userId = req.session.user.id_user;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 3) {
        return res.status(400).send('Password baru tidak valid');
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await todoService.updateUserPasswordById(hashedPassword, userId);
        res.redirect('/');
        console.log("Password updated successfully");
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Internal Server Error');
    }
};
