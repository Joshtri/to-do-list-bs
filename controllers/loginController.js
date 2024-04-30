const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const config = require("../utils/database");
const saltRounds = 10;

exports.loginPage = (req, res) => {
  try {
    const locals = {
      title: "Login Page",
    };

    const messageLoginInvalid = req.flash("infoLoginInvalid");
    const messageCreateAccSuccess = req.flash("infoCreateSuccess");

    res.render("index", {
      locals,
      messageLoginInvalid,
      messageCreateAccSuccess,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createAccount = async (req, res) => {
  try {
    const db = await config();
    const { nama_depan, nama_belakang, email, username, password } = req.body;

    // Menggabungkan nama depan dan nama belakang menjadi nama lengkap
    const nama_lengkap = `${nama_depan} ${nama_belakang}`;

    // Mengenkripsi password menggunakan bcrypt
    const hash = await bcrypt.hash(password, saltRounds);

    // Generate UUID sebagai ID unik
    const id_user = uuidv4();

    // Buat objek createAccountField untuk menyimpan data pengguna baru
    const createAccountField = [
      id_user,
      nama_lengkap,
      email,
      username,
      hash, // Simpan hash password, bukan password asli
    ];

    // Lakukan pernyataan SQL INSERT untuk menyimpan pengguna baru ke dalam database
    const insertQuery =
      "INSERT INTO user (id_user,nama_lengkap,email,username,password) values(?,?,?,?,?)";
    await db.execute(insertQuery, createAccountField);
    req.flash("infoCreateSuccess", "Akun berhasil dibuat");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.loginUser = (req, res) => {
  try {
    //destructing data.
    const { username, password } = req.body;

    // Query untuk mendapatkan data admin berdasarkan username
    const queryGetUser = "SELECT * FROM user WHERE username = ?";

    db.query(queryGetUser, [username], async (err, result) => {
      if (err) {
        console.error("gagal mengambil data ", err);
        return res.status(500).send("terjadi kesalahan");
      } else if (result.length === 0) {
        req.flash("infoLoginInvalid", "username yang diinput tidak valid");
        // res.send('username yang diinput tidak valid')
        res.redirect("/");
      } else {
        //bandingkan password yang dimasukkan dengan password  yg di hash di database.
        const match = await bcrypt.compare(password, result[0].password);

        //kondisi jika value cocok.
        if (match) {
          req.session.user = {
            id_user: result[0].id_user,
            username: result[0].username,
            email: result[0].email,
            nama_lengkap: result[0].nama_lengkap,
          };
        }
        req.flash("infoLoginSuccess", "Anda berhasil login di Todo List");
        res.redirect("/user/todo");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
