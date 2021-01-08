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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
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