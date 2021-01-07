$(document).ready(function(){
    mainPage()
});

function loginPage () {
    $("#login").show();
    $("#mainPage").hide();
    $("#form-login").show();
    $("#form-register").hide();
    $("#formFooter-login").show();
    $("#formFooter-register").hide();
    $("#register-sign").hide();
}

function registerPage () {
    $("#login").show();
    $("#mainPage").hide();
    $("#form-login").hide();
    $("#form-register").show();
    $("#formFooter-login").hide();
    $("#formFooter-register").show();
    $("#register-sign").show();
}
function mainPage () {
    $("#login").hide();
    $("#mainPage").show();
}