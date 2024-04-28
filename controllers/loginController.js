const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const db = require('../utils/database');
const saltRounds = 10;



exports.loginPage = (req,res)=>{
 
    try {

        const locals = {
            title : "Login Page"
        }
        res.render('index',{
            locals
        });
    } catch (error) {
        console.log(error);
    }

}


exports.createAccount = (req, res) => {
    const { nama_depan, nama_belakang, email, username, password } = req.body;

    // Menggabungkan nama depan dan nama belakang menjadi nama lengkap
    const nama_lengkap = `${nama_depan} ${nama_belakang}`;

    // Mengenkripsi password menggunakan bcrypt
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error in hashing password:', err);
            res.status(500).send('Internal Server Error');
        } else {

            // Generate UUID sebagai ID unik
            const id_user = uuidv4();

            // Buat objek createAccountField untuk menyimpan data pengguna baru
            const createAccountField = {
                id_user: id_user,
                nama_lengkap: nama_lengkap,
                email: email,
                username: username,
                password: hash // Simpan hash password, bukan password asli
            };

            // Lakukan pernyataan SQL INSERT untuk menyimpan pengguna baru ke dalam database
            const insertQuery = "INSERT INTO user SET ?";
            db.query(insertQuery, createAccountField, (err, results) => {
                if (err) {
                    console.error('Error in inserting user:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.redirect('/')
                    // res.status(201).send('Akun berhasil dibuat.');
                }
            });
        }
    });
};


exports.loginUser = (req,res)=>{
    
    try {
        //destructing data.
        const {username, password} = req.body;

        // Query untuk mendapatkan data admin berdasarkan username
        const queryGetUser = "SELECT * FROM user WHERE username = ?";

        db.query(queryGetUser,[username], async(err,result)=>{
            if(err){
                console.error('gagal mengambil data ', err);
                return res.status(500).send('terjadi kesalahan')
            }

            else if(result.length === 0){
                res.send('username yang diinput tidak valid')
            }

            else{
                //bandingkan password yang dimasukkan dengan password  yg di hash di database.
                const match = await bcrypt.compare(password, result[0].password)

                //kondisi jika value cocok.
                if(match){
                    req.session.user ={
                        id_user: result[0].id_user,
                        username: result[0].username,
                        email: result[0].email,
                        nama_lengkap: result[0].nama_lengkap,
                    }
                }
                res.redirect('/user/todo')
            }
        })




        
    } catch (error) {
        console.log(error);
    }
}