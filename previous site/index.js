function dropDownMenu() {
    document.getElementById("dropDownMenu").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.menuBut')) {
        var drop = document.getElementsByClassName("menu-content");
        var i;
        for (i = 0; i < drop.length; i++) {
            var openMenu = drop[i];
            if (openMenu.classList.contains('show')) {
                openMenu.classList.remove('show');
            }
        }
    }
}
