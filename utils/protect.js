// protect.js

const protect = (req, res, next) => {
    if (req.session.user) {
        // Tampilkan data admin dari session di console
        console.log('Data User:', req.session.user);
        // Jika admin sudah login, lanjutkan ke middleware berikutnya atau ke endpoint yang diminta
        next();
    } else {
        // Jika admin belum login, redirect ke halaman login
        res.redirect('/');
        console.log('Anda harus login terlebih dulu');
    }
  };
  
  module.exports = protect;