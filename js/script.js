$(function() {
    let nav = $('#navbarCollapse');
    nav.on("click", "a", null, function () {
        nav.collapse('hide');
    });
});