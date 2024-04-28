const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const protect = require('../utils/protect');


//url path.
router.get('/todo', protect, UserController.UserPage);
router.post('/post_my_todo', protect, UserController.userCreatedTodo);

router.post('/update_todo/:id_todo',protect ,UserController.updateStatusTodo);
router.post('/update_subjek_todo/:id_todo', protect, UserController.updateTodoUser);

router.delete('/delete/:id_todo', protect, UserController.UserdeleteTodo);

// Router untuk logout
router.get('/logout', protect, (req, res) => {
    // Hapus session admin
    req.session.destroy((err) => {
        if (err) {
            console.error('Error saat menghapus session:', err);
            res.redirect('/user/todo'); // Redirect ke halaman dashboard jika terjadi kesalahan
        } else {
            // Jika session berhasil dihapus, redirect ke halaman login
            res.redirect('/');
        }
    });
});


router.get('/informasi_akun', protect, UserController.informasiAkunPage);

router.post('/update_user/:id_user', protect, UserController.updateUserData)

module.exports = router;