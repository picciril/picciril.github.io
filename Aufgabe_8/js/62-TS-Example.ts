// BEISPIEL UND AUFGABE1:
// Dieses Skript soll als B1eispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.

// EINGEBAUTE FEHLER: Innerhalb jedes Programmteiles wurden ein paar fiese Fehler eingebaut!
// Diese werden vermutlich erst in der Browser-Konsole angezeigt. 
// Testet also alle Funktionen, jeden Button welchen ihr finden könnt!
// Hilfe: Benutzt auf Verdacht ein Konsolen-Log oder ruft die Variable in der Konsole des Browsers auf.
// Hilfe2: Betrachtet den umliegenden Code. Trackt die Werte von Variablen, falls euch etwas komisch vorkommt!

// ------- interfaces --------- //
// INSGESAMT EINGEBAUTE FEHLER beu den interfaces: Keine. (0 / null)

// Monster sind vielfältig und können sehr unterschiedlich sein. Dennoch werden sie durch allgemeine Attribute, wie Name und Lebenspunkte, vereint.
// Deshalb wird hier ein interface genutzt!
// Ein interface erlaubt das erstellen von einem ungefährem Haupt-Objekt.
// Object = Komplexer Datentyp auf Grundlage primitiver Datentypen

interface Monster {
    monsterName : string; // Name des Monsters
    monsterHealthPoints : number; // Lebenspunkte
    monsterExperience : number; 
    monsterModifier : string []; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
    monsterImage: string;
    monsterMoney : number;// Erfahrungspunkte bei besiegen des Monsters
    monsterLevel : number; 
}


// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)

let monsterHolder : string = "monsterHoldingCell";                                  // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.

let playerName : string = "Spielername";                                            // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP : number = 0;                                                          // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel : number = 500;
let playerLevel : number = 1;
let money : number = 0;
                                               // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.

// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.

let prefix : string[] = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) ", "Einhorniges-","Kleeblattriger-","Sonnengetünchter-","Staubliebender-","Wasserträumer-"]; // length = 6, da 6 Einträge. Von 0-5.
let monsterName : string[] = ["Ratte", "Nagetier", "Ungeziefer","Libelle","Hündchen","Feuerelfe","Salamander","Heuschrecke"]; // length = 3, da 3 Einträge. Von 0-2.
let suffix : string[] = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung","mit Zuckerwatte", "mit Blaubeeren","mit Softeis","mit Schimmel","mit Trauben"]; // length = 6, da hier 6 Einträge sind. Von 0-5.
let monsterLevel : number;
let monsterModifers : string[] = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.

let monsterImages : string []= ["b1.png","b2.png","b3.png", "b4.png", "b5.jpg", "b6.png"]
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray : Monster[] = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.


// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)

// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen


window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    document.getElementById("monsterPush").addEventListener("click", pushStuff, false);
    updatePlayerLevel(0);// Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    document.getElementById("fightAllMonsters").addEventListener("click", fightAllMonsters);
    document.getElementById("allWeakMonsters").addEventListener("click", fightAllWeakMonster); //Gegen SchwacheMonster kämpfen
    document.getElementById("weakestMonster").addEventListener("click", fightWeakestMonster);

}

//console.log(document.getElementById("monsterSpawner").innerHTML );  
 

// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster()
{
    let monsterAnzahl = getRNGNumber(3)+1;
    for(let i=0;i<monsterAnzahl;i++){    
    let newMonsterName : string = generateMonsterName();                // Eigens-gebaute Funktion, welche einen string zurück gibt.
    let newMonsterHP : number = generateMonsterHitPoints();             // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterXP : number = generateMonsterXP();                     // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterModifier : string[] = generateMonsterModifer();
    let newMonsterImage : string = generateMonsterImage();
    let newMonsterMoney : number =generateMonsterMoney();
    let newMonsterLevel : number =getRNGNumber(7);
   
           // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.

    let newMonster : Monster = {                                        // Monster wird erstellt.
        monsterName : newMonsterName, 
        monsterHealthPoints : newMonsterHP,
        monsterExperience : newMonsterXP,
        monsterModifier : newMonsterModifier,  
        monsterImage : newMonsterImage,
        monsterMoney : newMonsterMoney,
        monsterLevel : newMonsterLevel,
    };

    monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 

    //console.log(monsterArray[-1].monsterExperience);                    // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein).
    updateHTML();                                              // Triggere die Generierung von HTML
}
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(monsterCount: number)
{
    let holdingDiv : HTMLElement = document.createElement("div");       // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterCount);     // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster");                        // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); 
    
   // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

    let monsterName : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterCount - 1].monsterName;                     // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.


    let monsterMod : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterCount - 1].monsterModifier[0] + ", " +  monsterArray[monsterArray.length -1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterImg : HTMLElement = document.createElement("img");       // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", "imgs/"+ monsterArray[monsterCount - 1].monsterImage);                 // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster");            // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);                                 // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

    let monsterMon : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterMon.innerHTML = "Geld des Monsters:" + monsterArray[monsterCount - 1].monsterMoney; // Inhalt des <p>: Monster-Money
    holdingDiv.appendChild(monsterMon);

    let Monsterlvl : HTMLElement = document.createElement("p");
    Monsterlvl.innerHTML = "Level:" + monsterArray[monsterCount-1].monsterLevel;
    holdingDiv.appendChild(Monsterlvl);

    //let monsterBtn : HTMLElement = document.createElement("BUTTON");    // Erstelle ein <button>-Element
    //monsterBtn.innerHTML = "Monster bekämpfen!";                        // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    //holdingDiv.appendChild(monsterBtn);                                 // Füge den Button zu dem holding-div hinzu.

    //let monsterC : number = monsterCount;                    // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    //console.log("Aktuelle Anzahl an Monstern: " + monsterCount);

    //monsterBtn.addEventListener(                                        // Füge dem Monster eine Funktion hinzu.
    //    'click', function() {                                           // Wird bei Maus-Click ausgelöst.
     //       fightMonster(monsterCount);                                 // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
     //  },  false);                                                      // Ignoriert das false.
}


// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber : number) : number
{
    //let rngNumber : number = Math.random();                             // Macht folgendes: Generiere eine zufällige Komma-Zahl zwischen 0 - 1.
    //rngNumber = rngNumber * _maxNumber;                                 // Multipliziere diese Zahl mit der Länge des entsprechenden Array (hier: _maxNumber, ein Parameter, siehe in der runden Klammer der Funktion).
    //rngNumber = Math.floor(rngNumber);                                  // Floore diese Zahl, damit diese nun Ganzzahlig ist.                                                     // Diese Zeile ist einer der drei Fehler in den Funktionen. Ich bin mal so frei und vermerke das hier. Einfach löschen und alles wird besser.
    //return rngNumber;                                                   // Gebe diese Zahl zurück, Funktion kann ähnlich einer Variable in Rechnungen genutzt werden.
    return Math.floor(Math.random() * _maxNumber);
}


// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() : string
{
    let generatedMonsterName : string = ""; // Erstelle einen leeren String für das Monster

    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber : number = getRNGNumber(prefix.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber];                           // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length);                       // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber];                             // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length);                            // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber];                          // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    return generatedMonsterName;
}


// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP : number = 1 + getRNGNumber(10);
    return tempMonsterHP;
}


// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 350) + 100 zurück.
    let tempMonsterXP : number = 100 + getRNGNumber(3550);
    return tempMonsterXP;
}


// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() : string[]
{
    let tempMonsterMod : string[] = [];                                         // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
}

function generateMonsterImage() {
    let rngNumber = getRNGNumber(monsterImages.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    return monsterImages[rngNumber];
}


function generateMonsterMoney() : number {
    let money : number = getRNGNumber(100);
    return money;
}
// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index : number){
    if (monsterArray[_index].monsterLevel <= playerLevel + 1) {
        monsterArray[_index].monsterHealthPoints -= 5;
        playerXP += monsterArray[_index].monsterExperience;
        updateHTML();
        if(monsterArray[_index].monsterHealthPoints < 1) {
            updatePlayerLevel(0 + monsterArray[_index].monsterExperience);
            monsterArray.splice(_index, 1);
            updateHTML();
        }
    }
}

function runAway(){
    monsterArray = [];
    document.getElementById(monsterHolder).innerHTML = "";
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel(XPChange : number)
{
    playerXP = XPChange;
    if(Math.floor(playerXP / playerXPperLevel) + 1 >= 1)
    {
        playerLevel = Math.floor(playerXP / playerXPperLevel) + 1;
    }
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")";       // Baue den String für die Spieler-Info zusammen
    if(playerLevel == 20) {
        playerLevel = 1;
        playerXP == 0;
        monsterArray = [];
        updatePlayerLevel(0);
        updateHTML();
    }


}

function pushStuff ()
{ 
    let Push: string[] = [];
    console.log(Push);
    Push.push("hallo");
    console.log(Push);
    Push.push("Morgen");
    console.log(Push);
    Push.push("sommer");
    console.log(Push);
    Push.push("Frühling");
    console.log(Push);
    Push.push("Herbst");
    console.log(Push);
}

function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAll();
    getMonsterCount();
    console.log("MonsterCount: " + getMonsterCount());

}
function monsterGenerateHTMLAll() {
    for (let i = 1; i <= monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }

}    

function clearMonsterCell() {
    let monsterAnzeige = document.getElementById("monsterHoldingCell");
    let children = monsterAnzeige.children;
    let childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (monsterAnzeige.firstElementChild != null)
            monsterAnzeige.removeChild(monsterAnzeige.firstElementChild);
    }
}

function getMonsterCount() {
    return monsterArray.length;

}   

function fightAllMonsters() {
    for (let i = 0; i < monsterArray.length; i++) // FOR Schleife
     {
        fightMonster(i);
    }
}
function fightAllWeakMonster() {
    for (let i = monsterArray.length - 1; i >= 0; i--)
        if (monsterArray[i].monsterExperience < playerXPperLevel) {
            fightMonster(i);
        }
}
function fightWeakestMonster() {
    let _index = 0;
    let findweakeastmonster = monsterArray[0].monsterExperience;
    for (let i = monsterArray.length - 1; i >= 0; i--) {
        if (monsterArray[i].monsterExperience < findweakeastmonster) {
            _index = i;
            findweakeastmonster = monsterArray[i].monsterLevel;
        }
    }
    if (monsterArray[_index].monsterExperience < playerXPperLevel) {
        fightMonster(_index);
    }
}