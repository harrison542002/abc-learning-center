$(document).ready(function () {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const contact = document.getElementById("contact");
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let contactError = document.getElementById("contactError");
    let formData = JSON.parse(localStorage.getItem("student")) || [];

    $("form").submit(function (event) {
        event.preventDefault()
        let error1, error2, error3, error4, error5 = ''

        //Email Regex
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let contactRegex = /^\+65(6|8|9)\d{7}$/

        //Name Validation
        function nameValidator(value){

            if(value.length < 5)//length specific
                error1 = "Name need to be at least 5 characters.";

            else
                error1 = ''
        }

        //Email Validation
        function emailValidator(value){
            if(!regex.test(value))
                error2 = "Please Enter Valid Email";

            else 
                error2 = ''
        }

        //Contact Validation
        function contactValidator(value){
            if(!contactRegex.test(value))
                error3 = "Please Enter Valid Phone Number";

            else if(checkDuplicate("contact",value,formData)){
                error3 = "Contact no. duplicated, please try another value"
                }

            else
                error3  = ''
        }
        
        nameValidator(name.value);
        emailValidator(email.value);
        contactValidator(contact.value);

        if (error1.length > 0 || error2.length > 0 || error3.length > 0) {
            nameError.innerHTML = error1;
            emailError.innerHTML = error2;
            contactError.innerHTML = error3;
        }

        else{
            nameError.remove()
            emailError.remove()
            contactError.remove()
        }

        if (error1.length <= 0 && error2.length <= 0 && error3.length <= 0) {
            formData.push({
                name : name.value,
                email : email.value,
                contact : contact.value,
                course : $("#courses :selected").text(),
                country: $("#country :selected").text(),
            })
            
            localStorage.setItem("student", JSON.stringify(formData))
            alert('Add user information success')
        }
    })
})

//check Duplicate Value
function checkDuplicate(dataType, value, localData) {
    let i = 0;
    localData.forEach(element => {
        if (element[dataType] === value) {
            i++;
        }
    })
    if (i > 0) {
        return true;
    }
}