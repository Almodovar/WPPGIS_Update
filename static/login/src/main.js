window.$ = window.jQuery = require('jquery');
var loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", function(evt) {
    var n = document.getElementById("username").value;
    var p = document.getElementById("password").value;

    var c = {
        name: n,
        password: p,
        role: "",
    };

    var client = JSON.stringify(c);
    $.ajax({
            url: '/authorization',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: client,
            dataType: 'json',
        })
        .done(function(r) {
            console.log("success");
            if (r == "PASSWORD WARNING!") {
                console.log("111");
                document.getElementById("password").value = "";
                document.getElementById("password").placeholder = r;
                document.getElementById("password").classList.add("warning");
                // window.location.href = "/login";
            }
            if (r == "USERNAME WARNING!") {
                console.log("222");
                document.getElementById("username").value = "";
                document.getElementById("username").placeholder = r;
                document.getElementById("username").classList.add("warning");
                // window.location.href = "/login";
            }
            if (r == "adminAccept") {
                console.log("333");
                window.location.href = "/administration";
            }
            if (r == "clientAccept") {
                console.log("333");
                window.location.href = "/list/" + document.getElementById("username").value;
            }
        })
        .fail(function(r) {
            console.log("error");
        })
        .always(function(r) {
            console.log("complete");
        });
});
