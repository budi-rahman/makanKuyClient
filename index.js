function login(){
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        url: 'http://localhost:3000/user/login',
        method: 'POST',
        data: {
            email,
            password
        } 
    })
    .done(response => {
        localStorage.setItem('access_token',response.access_token)
        mainPage()
    })
    .fail((xhr,textstatus) => {
        console.log(xhr.responseJSON, textstatus)
    })
    .always(_ => {
        $("#email").val("")
        $("#password").val("")
    })
}

function register(){
    const name = $("#name-register").val()
    const email = $("#email-register").val()
    const password = $("#password-register").val()
    $.ajax({
        url: 'http://localhost:3000/user/register',
        method: 'POST',
        data: {
            name,
            email,
            password
        } 
    })
    .done(response => {
        loginPage()
    })
    .fail((xhr,textstatus) => {
        console.log(xhr.responseJSON, textstatus)
    })
    .always(_ => {
        $("#name-register").val("")
        $("#email-register").val("")
        $("#password-register").val("")
    })
}

function fetchDataCovid() {
    $.ajax({
        url: "http://localhost:3000/corona/indonesia",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response.data)
            $("#card-covid-data").append(`
            <p><b>confirmed:</b> ${response.data.confirmed}</p>
            <p><b>deaths:</b> ${response.data.deaths}</p>
            <p><b>recovered:</b> ${response.data.recovered}</p>
            <p><b>last updates on:</b> ${response.data.lastUpdate.slice(0,10)}</p>
            `)
    })
    .fail(error => {
        console.log(error)
    })
}

function fetchCuisines(){
    $.ajax({
        url: "http://localhost:3000/zomato/cuisines",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        for(let i = 0; i < response.data.length; i++) {
            $("#cuisines-select").append(`
            <option value="${response.data[i].cuisine_id}">${response.data[i].cuisine_name}</option>
            `)
        } 
    })
    .fail(error => {
        console.log(error)
    })
}

function fetchEstablishments(){
    $.ajax({
        url: "http://localhost:3000/zomato/establishments",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        for(let i = 0; i < response.data.length; i++) {
            $("#establisments-select").append(`
            <option value="${response.data[i].establishment_id}">${response.data[i].establishment_name}</option>
            `)
        } 
    })
    .fail(error => {
        console.log(error)
    })
}

function fetchDataRestaurant(){
    $("#restaurant-card").empty()
    const cuisines = $("#cuisines-select").val()
    const establishment = $("#establisments-select").val()
    if (cuisines == 0 & establishment !== 0) {
        $.ajax({
            url: "http://localhost:3000/zomato/search/establishment/" + establishment,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for(let i = 0; i < response.data.length; i++) {
                $("#restaurant-card").append(`
                <div class="card col-3 mt-5 ml-4 shadow p-3 mb-5 bg-white rounded">
                    <img class="card-img-top" src="${response.data[i].featured_image}" style="width: 16.1rem; height: 16.1rem; margin-left: -15.2px; margin-top: -15.5px;" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[i].name}</h5>
                        <p class="card-text"> <b>address:</b> ${response.data[i].address}</p>
                        <p class="card-text"><b>food type:</b> ${response.data[i].cuisines} </p>
                        <p class="card-text"><b>average price for two:</b> ${response.data[i].average_cost_for_two} </p>
                        <p class="card-text"><b>open time:</b> ${response.data[i].timings} </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><b>Rating:</b> ${response.data[i].user_rating}</small>
                    </div>
                </div>
                `)
            }
        })
        .fail(error => {
            console.log(error)
        })
    } else if (cuisines !== 0 & establishment == 0) {
        
        $.ajax({
            url: "http://localhost:3000/zomato/search/cuisine/" + cuisines,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for(let i = 0; i < response.data.length; i++) {
                $("#restaurant-card").append(`
                <div class="card col-3 mt-5 ml-4 shadow p-3 mb-5 bg-white rounded">
                    <img class="card-img-top" src="${response.data[i].featured_image}" style="width: 16.1rem; height: 16.1rem; margin-left: -15.2px; margin-top: -15.5px;" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[i].name}</h5>
                        <p class="card-text"> <b>address:</b> ${response.data[i].address}</p>
                        <p class="card-text"><b>food type:</b> ${response.data[i].cuisines} </p>
                        <p class="card-text"><b>average price for two:</b> ${response.data[i].average_cost_for_two} </p>
                        <p class="card-text"><b>open time:</b> ${response.data[i].timings} </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><b>Rating:</b> ${response.data[i].user_rating}</small>
                    </div>
                </div>
                `)
            }
        })
        .fail(error => {
            console.log(error)
        })
    } else if (cuisines !== "0" & establishment !== "0") {
        $.ajax({
            url: `http://localhost:3000/zomato/search/${cuisines}/${establishment}`,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for(let i = 0; i < response.data.length; i++) {
                $("#restaurant-card").append(`
                <div class="card col-3 mt-5 ml-4 shadow p-3 mb-5 bg-white rounded">
                    <img class="card-img-top" src="${response.data[i].featured_image}" style="width: 16.1rem; height: 16.1rem; margin-left: -15.2px; margin-top: -15.5px;" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[i].name}</h5>
                        <p class="card-text"> <b>address:</b> ${response.data[i].address}</p>
                        <p class="card-text"><b>food type:</b> ${response.data[i].cuisines} </p>
                        <p class="card-text"><b>average price for two:</b> ${response.data[i].average_cost_for_two} </p>
                        <p class="card-text"><b>open time:</b> ${response.data[i].timings} </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><b>Rating:</b> ${response.data[i].user_rating}</small>
                    </div>
                </div>
                `)
            }
        })
        .fail(error => {
            console.log(error)
        })
    } else if (cuisines == "0" & establishment == "0"){
        $.ajax({
            url: `http://localhost:3000/zomato/all`,
            method: "GET",
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            for(let i = 0; i < response.data.length; i++) {
                $("#restaurant-card").append(`
                <div class="card col-3 mt-5 ml-4 shadow p-3 mb-5 bg-white rounded">
                    <img class="card-img-top" src="${response.data[i].featured_image}" style="width: 16.1rem; height: 16.1rem; margin-left: -15.2px; margin-top: -15.5px;" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[i].name}</h5>
                        <p class="card-text"> <b>address:</b> ${response.data[i].address}</p>
                        <p class="card-text"><b>food type:</b> ${response.data[i].cuisines} </p>
                        <p class="card-text"><b>average price for two:</b> ${response.data[i].average_cost_for_two} </p>
                        <p class="card-text"><b>open time:</b> ${response.data[i].timings} </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><b>Rating:</b> ${response.data[i].user_rating}</small>
                    </div>
                </div>
                `)
            }
        })
        .fail(error => {
            console.log(error)
        })
    }
    
}




$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        mainPage()
    } else {
        loginPage()
    }
    $("#buttonSearch").click(function(e){
        e.preventDefault();
        fetchDataRestaurant()
    });
    $("#logout-btn").click(function(e){
        e.preventDefault();
        localStorage.clear()
        loginPage()
    });
    $("#form-login").on("submit", function(e){
        e.preventDefault();
        login()
    });
    $("#form-register").on("submit", function(e){
        e.preventDefault();
        register()
    });
    $("#to-login").click(function(e){
        e.preventDefault();
        loginPage()
    });
    $("#to-register").click(function(e){
        e.preventDefault();
        registerPage()
    });
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
    $("#form-login").hide();
    $("#form-register").hide();
    $("#formFooter-login").hide();
    $("#formFooter-register").hide();
    $("#register-sign").hide();
    fetchCuisines()
    fetchEstablishments()
    fetchDataCovid()
}