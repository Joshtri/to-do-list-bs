const db = require('../utils/database');


//controller untuk User Main.
exports.UserPage = (req,res)=>{
    //buat variabel dengan nilai untuk title halaman.

    try {
        const title = "To-Do List Page";

        // Dapatkan data admin dari session dan gunakan sesuai kebutuhan
        const userData = req.session.user;


        const readByIdQuery = `
            SELECT todo.user_id,
            subjek_tugas,
            id_todo,
            deadline,
            status,
            user.username AS nama_user
            FROM todo
            JOIN user ON todo.user_id = user.id_user
            WHERE user_id = '${userData.id_user}';
        `
        const messageCreate = req.flash('infoCreateTodo')

        db.query(readByIdQuery, (err,results)=>{
            if(err){
                res.status(500).json(err);
                console.log('gagal membaca read ',err);
                
            }

            else if(!err){
                res.render('todo_user',{
                    title,
                    user: userData,
                    todoData : results,
                    messageCreate
                });
            }
        })


    } catch (error) {
        console.log(error);
    }


}


//create Todo by their id.
exports.userCreatedTodo = (req,res)=>{

    const {subjek_tugas, deadline, user_id} = req.body;

    const insertQuery = "INSERT INTO todo SET ?";

    // Buat objek createAccountField untuk menyimpan data todo dari pengguna.
    const createTodoField = {
        user_id: user_id,
        subjek_tugas: subjek_tugas,
        deadline: deadline,
    };

    db.query(insertQuery, createTodoField,(err,results)=>{
        if(err){
            console.log('failed to insert ', err);
        }

        
        //test kondisi, kurang dari (<) 0.
        else if(createTodoField.subjek_tugas < 0){
            // kirim pesan info buat TODO
            req.flash('infoCreateTodo', 'Subjek Tidak boleh kosong!')
            res.redirect('/user/todo');
            // res.send('data tidak boleh kosong');
        }
        


        else{
            res.redirect('/user/todo');
            console.log('sukses tambah data.');
        }


    });
}


exports.UserdeleteTodo = (req,res)=>{
    const id_todo =  req.params.id_todo;
    const deleteQuery = "DELETE FROM todo WHERE id_todo = ?";

    db.query(deleteQuery, [id_todo], (err,result)=>{
        if (err) {
            console.error('Error deleting todo:', err);
            res.status(500).json({ err: 'Internal server error' });
            return;
        }
        else{
            // res.send('sukses hapus')
            // req.flash('deleteInfo','Data pekerjaan berhasil dihapus!')
            res.redirect('/user/todo');
            // res.status(200).json(result);
            // res.send('hapus data berhasil');

        }

    })
}

exports.updateStatusTodo = (req, res) => {
    const { status, id_todo } = req.body; // Mengambil status baru dan id dari body request

    const updateStatusQuery = "UPDATE todo SET status = ? WHERE id_todo = ?"; // Query SQL untuk memperbarui status todo

    // Jalankan query dengan parameter yang diberikan
    db.query(updateStatusQuery, [status, id_todo], (err, result) => {
        if (err) {
            // Jika terjadi kesalahan saat menjalankan query
            console.log("Error updating status:", err);
            res.status(500).json({ error: "Error updating status" });
        } else {
            // Jika berhasil memperbarui status
            console.log("Status updated successfully");
            res.redirect('/user/todo')
            // res.status(200).json({ message: "Status updated successfully" });
        }
    });
};

exports.updateTodoUser = (req, res) => {
    const { subject } = req.body; // Mengambil subjek yang baru dari body request

    const id_todo = req.params.id_todo; // Mengambil ID todo dari parameter URL

    const updateSubjectQuery = "UPDATE todo SET subjek_tugas = ? WHERE id_todo = ?"; // Query SQL untuk memperbarui subjek todo

    // Jalankan query dengan parameter yang diberikan
    db.query(updateSubjectQuery, [subject, id_todo], (err, result) => {
        if (err) {
            // Jika terjadi kesalahan saat menjalankan query
            console.log("Error updating subject:", err);
            res.status(500).json({ error: "Error updating subject" });
        } else {
            // Jika berhasil memperbarui subjek
            console.log("Subject updated successfully");
            res.status(200).json({ message: "Subject updated successfully" });
        }
    });
};


exports.informasiAkunPage = (req,res)=>{
    // Dapatkan data admin dari session dan gunakan sesuai kebutuhan
    const userData = req.session.user;

    res.render('informasi_akun',{
        user: userData
    })
}


exports.updateTodoUser = (req, res) => {
    const { subject } = req.body; // Mengambil subjek yang baru dari body request

    const id_todo = req.params.id_todo; // Mengambil ID todo dari parameter URL

    const updateSubjectQuery = "UPDATE todo SET subjek_tugas = ? WHERE id_todo = ?"; // Query SQL untuk memperbarui subjek todo

    // Jalankan query dengan parameter yang diberikan
    db.query(updateSubjectQuery, [subject, id_todo], (err, result) => {
        if (err) {
            // Jika terjadi kesalahan saat menjalankan query
            console.log("Error updating subject:", err);
            res.status(500).json({ error: "Error updating subject" });
        } else {
            // Jika berhasil memperbarui subjek
            console.log("Subject updated successfully");
            res.status(200).json({ message: "Subject updated successfully" });
        }
    });
};

exports.updateUserData = (req, res) => {
    const { username,nama_lengkap,email } = req.body; // Mengambil subjek yang baru dari body request

    const id_user = req.params.id_user; // Mengambil ID todo dari parameter URL

    const updateUserQuery = "UPDATE user SET username = ?, nama_lengkap = ?, email = ? WHERE id_user = ?"; // Query SQL untuk memperbarui subjek todo

    // Jalankan query dengan parameter yang diberikan
    db.query(updateUserQuery, [username,nama_lengkap,email, id_user], (err, result) => {
        if (err) {
            // Jika terjadi kesalahan saat menjalankan query
            console.log("Error updating userdata:", err);
            res.status(500).json({ error: "Error updating subject" });
        } else {
            // Jika berhasil memperbarui subjek
            console.log("userdata updated successfully");
            // res.status(200).json({ message: "Subject updated successfully" });
            res.redirect('/user/informasi_akun')
        }
    });
};
