function toggleMenu() {
    var menuList = document.getElementById("menu-list");
    menuList.style.display = (menuList.style.display === "block") ? "none" : "block";
}

function submitForm() {
    document.getElementById("confirmationMessage").innerHTML = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.";
    document.getElementById("contactForm").reset();
}
