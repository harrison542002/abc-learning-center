$(document).ready(function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let passwordError = document.getElementById("passwordError");
    let emailError = document.getElementById("emailError");

    $("form").submit(function(event){
        event.preventDefault();
        let error1, error2 = ''

        //Email Regex
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        // Name Validation
        function passwordValidator(value) {
            if (value.length < 5)//length specific
                error1 = "Please Enter Validate Password";

            else
                error1 = ''
        }

        //Email Validation
        function emailValidator(value) {
            if (!regex.test(value))
                error2 = "Please Enter Valid Email";

            else
                error2 = ''
        }

        passwordValidator(password.value);
        emailValidator(email.value);

        if (error1.length > 0 || error2.length > 0) {
            passwordError.innerHTML = error1;
            emailError.innerHTML = error2;
        }

        else {
            passwordError.remove()
            emailError.remove()
        }

        if(error1.length <= 0 && error2.length <= 0){
            $.ajax({
                type: "GET",
                url: "courses.html",
                dataType: "html",
                success: function(data){
                    $("#transform").html(data)
                    $("body").css("background","#e4e8ed")
                }
            })
        }

    })
})