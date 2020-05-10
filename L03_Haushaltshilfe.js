window.addEventListener("load", handleload);
function handleload(_event) {
    console.log("init");
    var priceBread = 3;
    var priceApples = 0.3;
    var priceWater = 0.4;
    var priceShopping = 10;
    var priceMowing = 5;
    var priceSquare = 0.1;
    var fieldsets = document.querySelectorAll("fieldset");
    for (var i = 0; i < fieldsets.length; i++) {
        var fieldset = fieldsets[i];
        fieldset.addEventListener("change", handleChange);
    }
}
function handleChange(_event) {
    console.log("handle change");
    drawUnits(_event);
}
function drawUnits(_event) {
    var formData = new FormData(document.forms[0]);
    console.log(formData);
    for (var _i = 0, formData_1 = formData; _i < formData_1.length; _i++) {
        var entry = formData_1[_i];
        console.log(entry);
    }
    //     let target: HTMLInputElement = <HTMLInputElement>_event.target;
    //     console.log();
    //     if (_event.type == "change")
    //         console.warn("Change: " + target.name + " = " + target.value, _event);
    //     else
    //         console.log("Input: " + target.name + " = " + target.value, _event);
}
//# sourceMappingURL=haushaltshilfe.js.map
