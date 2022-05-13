$(document).ready(function () {
    $('#navbar').load("./navbar.html")
    let studentInformation = JSON.parse(localStorage.getItem("student"))


    if (studentInformation) {
        let leadsData = document.querySelector('tbody');
        leadsData.innerHTML = "";
        studentInformation.forEach((element, index) => {
            leadsData.innerHTML += `<tr id=row${index}>
            <td>${index}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.contact}</td>
            <td>${element.course}</td>
            <td>${element.country}</td>
            <td>
                <button id=edit${index} class="edit"><a href='edit.html?name=${element.name}&email=${element.email}&contact=${element.contact}&course=${element.course}&country=${element.country}&index=${index}'>Edit</a></button>
                <button id=remove${index} class="remove">Remove</button>
            </td>
                </tr>`

            $('[id^=remove]').click(function () {
                let value = ($(this).attr("id")).replace(/[^0-9]/ig, "")
                $(`#row${value}`).hide()
                studentInformation.splice(value, 1)
                localStorage.setItem("student", JSON.stringify(studentInformation))
            })
        });
    }


})