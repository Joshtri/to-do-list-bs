document.addEventListener("DOMContentLoaded", function() {
    // Periksa localStorage saat halaman dimuat
    var theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.dataset.bsTheme = "dark";
      document.getElementById("flexSwitchCheckChecked").checked = true; // Setel switch ke posisi 'checked'
    }
  });

  function toggleTheme() {
    var element = document.body;
    if (element.dataset.bsTheme === "light") {
      element.dataset.bsTheme = "dark";
      localStorage.setItem("theme", "dark");
    } else {
      element.dataset.bsTheme = "light";
      localStorage.setItem("theme", "light");
    }
}