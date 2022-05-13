$("document").ready(function () {
    $('#navbar').load("navbar.html")
    $('#footer').load("footer.html")
    //make navigation appear with user scrolling
    $(window).scroll(function () {
        $('nav').css("background-color", "#e4e8eb")
        $('nav .search input').css("background-color", "#e4e8eb")
        $('ul.navigation li a').css("color", "#292929")
        $('ul.navigation li a:hover').css("border-bottom", "1px solid #000000")
        $('nav .search span').css("color", "black")
        $('nav').css("top", "0")
    })

    //jquery tabs ui for course's content
    $("#tabs").tabs();
    console.log($("#price").val())
    //selectmenu jquery ui
    $("#currency").selectmenu({
        select: currencyExchange,
    });
});

//curreny exchange process
function currencyExchange(event, ui) {
    //Some variables
    let USDPrice, USDPrice1;

    //Ajax 
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost/source_code/javascript/pricelist.json",
        success: function (data) {

            //Parese array-object and fetch USD price
            data.priceInUSD.forEach(element => {
                let courseNum = Object.keys(element)[0]
                if (courseNum.indexOf("1") !== -1)
                    USDPrice = element[courseNum]
                else
                    USDPrice1 = element[courseNum]
            });

            let selectElement = ui.item.value;
            let price;
            let price1;

            //Switch cases for processing price
            switch (selectElement) {
                case "USD":
                    price = USDPrice.toString();
                    price1 = USDPrice1.toString();
                    modifyContent("#price", price, selectElement);
                    modifyContent("#price1", price1, selectElement);
                    break;
                case "SGD":
                    price = calculateRate(USDPrice, selectElement);
                    price1 = calculateRate(USDPrice1, selectElement);
                    modifyContent("#price", price, selectElement);
                    modifyContent("#price1", price1, selectElement);
                    break;
                case "MMK":
                    price = calculateRate(USDPrice, selectElement);
                    price1 = calculateRate(USDPrice1, selectElement);
                    modifyContent("#price", price, selectElement);
                    modifyContent("#price1", price1, selectElement);
                    break;
            }
        }
    })
}
//Calculate rate using value and currencyUnit
function calculateRate(val, currencyUnit) {
    if (currencyUnit === "SGD")
        return (Math.floor(val * 1.36)).toString();
    if (currencyUnit === "MMK")
        return (Math.floor(val * 1854.37)).toString();
}

//Modify Content
function modifyContent(tagName, val, currencyUnit) {
    $(tagName).text(val + ' ' + currencyUnit)
}
