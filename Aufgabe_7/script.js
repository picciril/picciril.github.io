console.log("Hallo :)");
window.alert("Press OK to Enter");
window.onload = function(){

    console.log("These are the Buttons");
    document.getElementById("B1").addEventListener("click", changingButton);
    document.getElementById("B2").addEventListener("click", wert1);
    document.getElementById("B3").addEventListener("click", wert2);
    newtext();
}
function newtext() {
    let heading = document.createElement("h1");
    let node = document.createTextNode("Headline");
    heading.appendChild(node);
    let element = document.getElementById("id1");
    element.appendChild(heading);
    let para = document.createElement("p");
    node = document.createTextNode("Text");
    para.appendChild(node);
    element = document.getElementById("id1");
    element.appendChild(para);
}

function changingButton() {
    console.log("B1 wurde gedrückt");
    document.getElementById("B1").innerHTML = "OMG"; 
}
function wert1() {
    console.log("B2 wurde gedrückt");
    document.getElementById("B2").className = "gedrückter Button"; 
    console.log("Die Klasse von B2 hat sich in gedrückter Button geändert");
}
function wert2() {
    console.log("B3 wurde gedrückt");
    let Zahl1 = 2;
    let Zahl2 = 4;
    let vorname = "Riccardo ";
    let nachname = "Piccirillo ";
    Zahl1 = 23; 
    console.log("Rechnungen");
    console.log(Zahl1 + Zahl2);
    console.log(vorname + nachname);
    console.log(nachname + Zahl2);
}




