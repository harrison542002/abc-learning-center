window.onload = function () {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const form = document.getElementById("form");
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let error1, error2 = ''

        //Email Regex
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
       
        // Name Validation
        function nameValidator(value){
            if (value === '' || value === null) //Required
                error1 = "Please Enter Your Name.";

            else if(value.length < 5)//length specific
                error1 = "Name need to be at least 5 characters.";

            else
                error1 = ''
        }

        //Email Validation
        function emailValidator(value){
            if (value === '' || value === null)//Required
                error2 = "Please Enter Your Email.";

            else if(!regex.test(value))
                error2 = "Please Enter Valid Email";

            else 
                error2 = ''
        }
        
        nameValidator(name.value);
        emailValidator(email.value);

        if (error1.length > 0 || error2.length > 0) {
            nameError.innerHTML = error1;
            emailError.innerHTML = error2;
        }

        else{
            nameError.remove()
            emailError.remove()
        }

    })
}