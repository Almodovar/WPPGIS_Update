window.$ = window.jQuery = require('jquery');

var loginBtn = document.getElementById("login");



loginBtn.addEventListener("click", function(evt) {
    var n = document.getElementById("username").value;
    var p = document.getElementById("password").value;

    var c = {
        name: n,
        password: p,
    };

    var client = JSON.stringify(c);
    $.ajax({
            url: '/redirect',
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
            }
            if (r == "USERNAME WARNING!") {
                console.log("222");
                document.getElementById("username").value = "";
                document.getElementById("username").placeholder = r;
                document.getElementById("username").classList.add("warning");
            }            
        })
        .fail(function(r) {
            console.log("error");
        })
        .always(function(r) {
            console.log("complete");
        });
});
