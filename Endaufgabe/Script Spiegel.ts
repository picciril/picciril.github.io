// Das Interface für die Karten.
interface Karte {
  wert: number; // Der Wert der Karte
  farbe: number; // Die Farbe
}

// Hier werden die Wertigkeiten festgelegt.
// Der Text bestimmt den Inhalt der Karte.
let wertigkeiten: string[] = [
  "6",
  "7",
  "8",
  "9",
  "Bube",
  "Dame",
  "König",
  "Ass"
];

// Hier werden die Farben festgelegt.
// Das Script wird hiermit die CSS Klassen bestimmen.
let farben: string[] = [
  "rot",
  "gruen",
  "blau",
  "gelb"
];

// Die Karten, die der Spieler zur verfügung hat.
let handSpieler: Karte[] = [];
let handSpielerElement: HTMLDivElement = <HTMLDivElement>document.getElementById("karten-spieler");

// Die Karten, die der Gegner zur verfügung hat.
let handGegner: Karte[] = [];
let handGegnerElement: HTMLDivElement = <HTMLDivElement>document.getElementById("karten-gegner");

// Das unsichtbare Deck
let deck: Karte[] = [];

// Der Stapel der gelegten Karten.
let spielStapel: Karte[] = [];
let spielfeldElement: HTMLDivElement = <HTMLDivElement>document.getElementById("spielfeld");

// Generiere alle möglichen Karten.
function generiereKarten(): Karte[] {
  let karten = [];

  // Über alle Wertigkeiten loopen.
  for (let wertigkeit = 0; wertigkeit < wertigkeiten.length; wertigkeit++) {
    // Über alle Farben loopen.
    for (let farbe = 0; farbe < farben.length; farbe++) {
      // Karte zum Deck hinzufügen.
      karten.push({ wert: wertigkeit, farbe: farbe });
    }
  }

  return karten;
}

// Mische ein Deck.
function mischen(karten: Karte[]) {
  // Die Karten werden 10 mal durch die Sort Funktion gemischt.
  //
  // Die Sort Funktion nimmt eine weitere Funktion an, die entweder eine positive
  // oder negative Zahl zurückgibt. Wenn die Zahl positiv ist, wird das Element nach
  // vorne geschoben, wenn es negativ ist, nach hinten.
  for (let i = 0; i < 10; i++) {
    karten.sort(function mische() { return Math.random() - 0.5 });
  }
}

// Nehme die unterste Karte vom Deck.
function nehmeKarte(): Karte {
  let karte: Karte = deck[0];
  deck.splice(0, 1);
  return karte;
}

// Starte das Spiel.
function starteSpiel() {
  // Initialisiere alle Werte
  handSpieler = [];
  handGegner = [];
  spielStapel = [];

  // Generiere das Deck
  deck = generiereKarten();
  mischen(deck);

  // Nehme 3 Karten pro Spieler.
  for (let i = 0; i < 3; i++) {
    handSpieler.push(nehmeKarte());
    handGegner.push(nehmeKarte());
  }

  // Aktualisiere die Oberfläche
  aktualisiereOberflaecheGegner();
  aktualisiereOberflaecheSpieler();
  aktualisiereSpielfeld();
}

// Aktualisiert das HTML für den Gegner.
function aktualisiereOberflaecheGegner() {
  // Lösche alles auf der Gegner Seite.
  handGegnerElement.innerHTML = "";

  // Generiere alle Karten für den Gegner.
  for (let i = 0; i < handGegner.length; i++) {
    handGegnerElement.appendChild(generiereLeereKarte());
  }
}

// Aktualisiert das HTML für den Spieler.
function aktualisiereOberflaecheSpieler() {
  // Lösche alles auf der Spieler Seite.
  handSpielerElement.innerHTML = "";

  // Generiere alle Karten für den Spieler.
  for (let i = 0; i < handSpieler.length; i++) {
    let karte = generiereAufgedeckteKarte(handSpieler[i]);

    // Mache die Karte anklickbar.
    karte.onclick = () => { versucheKarteZuSpielen(i) };

    // Füge die Karte zur Oberfläche hinzu.
    handSpielerElement.appendChild(karte);
  }
}

// Aktualisiert das HTML für das Spielfeld.
function aktualisiereSpielfeld() {
  // Lösche alles auf dem Spielfeld.
  spielfeldElement.innerHTML = "";

  // Zeige die oberste Karte auf dem Stapel an, wenn mehr als 0 Karten auf dem Stapel liegen.
  if (spielStapel.length !== 0) {
    spielfeldElement.appendChild(generiereAufgedeckteKarte(spielStapel[spielStapel.length - 1]));
  }
}

// Generiere eine leere Karte als div Element.
function generiereLeereKarte(): HTMLDivElement {
  // Erstelle das div Element.
  let kartenElement: HTMLDivElement = <HTMLDivElement>document.createElement("div");

  // Gebe das div Element die "karte" Klasse.
  kartenElement.className = "karte";

  return kartenElement;
}

// Generiere eine aufgedeckte Karte als div Element.
function generiereAufgedeckteKarte(karte: Karte): HTMLDivElement {
  // Erstelle das div Element.
  let kartenElement: HTMLDivElement = <HTMLDivElement>document.createElement("div");

  // Gebe das div Element die "karte" Klasse.
  kartenElement.className = "karte karte-" + farben[karte.farbe];

  // Wenn die Karte nicht gespielt werden kann, mache sie durchsichtig.
  if (!darfKarteGespieltWerden(karte)) {
    kartenElement.className = kartenElement.className + " karte-ungueltig";
  }

  // Füge die Wertigkeit als Text hinzu.
  kartenElement.innerText = wertigkeiten[karte.wert];

  return kartenElement;
}

// Versuche die Karte zu spielen.
function versucheKarteZuSpielen(kartenNummer: number) {
  // Nimmt die gewählte Karte vom Spieler.
  let karte = handSpieler[kartenNummer];

  // Schaut nach, ob die gewählte Karte gespielt werden kann.
  if (darfKarteGespieltWerden(karte)) {
    // Nehme die Karte von der Hand und lege sie auf dem Stapel
    handSpieler.splice(kartenNummer, 1);
    spielStapel.push(karte);

    // Aktualisiere die Oberfläche für den Spieler und das Spielfeld.
    aktualisiereOberflaecheSpieler();
    aktualisiereSpielfeld();

    // Verarbeite den Spielzug.
    spielzug();
  }
}


// Karte darf nur gelegt werden, wenn es
// - die gleiche Farbe, oder
// - höhere Wertigkeit hat
function darfKarteGespieltWerden(karte: Karte): boolean {
  // Die oberste Karte auf dem Stapel.
  let obersteKarte = spielStapel[spielStapel.length - 1];

  // Wenn noch keine Karte gespielt wurde.
  if (spielStapel.length === 0) {
    return true;
  }

  // Wenn die obere Karte die gleiche Farbe hat.
  else if (obersteKarte.farbe === karte.farbe) {
    return true;
  }

  // Wenn die gewählte Karte eine höhere Wertigkeit hat.
  else if (obersteKarte.wert < karte.wert) {
    return true;
  }

  return false;
}

// Ziehe Karte aus dem Deck.
function zieheKarte(hand: Karte[]): Karte[] {
  if (deck.length !== 0) {
    let karte: Karte = deck[0];
    deck.splice(0, 1);
    hand.push(karte);
  }
  return hand;
}

// Verarbeitet den Spielzug.
function spielzug() {
  // Schaut nach, ob noch Karten da sind.
  if (deck.length === 0) {
    alert("Keine Karten mehr da. Keiner hat gewonnen!");
    starteSpiel();
    return;
  }

  // Schaut nach, ob der Spieler noch Karten auf der Hand hat.
  if (handSpieler.length === 0) {
    alert("Spieler hat gewonnen!");
    starteSpiel();
    return;
  }

  // Gegner spielt seinen Spielzug.
  gegnerSpielzug();

  // Schaut nach, ob der Gegner noch Karten auf der Hand hat.
  if (handGegner.length === 0) {
    alert("Gegner hat gewonnen!");
    starteSpiel();
    return;
  }

  // Ziehe Karte, solang keine Karte vom Spieler gelegt werden kann
  while (!kannKarteLegen(handSpieler) && deck.length !== 0) {
    handSpieler = zieheKarte(handSpieler);
    aktualisiereOberflaecheSpieler();
  }


  if (deck.length === 0) {
    alert("Keine Karten mehr da. Keiner hat gewonnen!");
    starteSpiel();
    return;
  }
}

function gegnerSpielzug() {
  // Solang keine Karte gespielt werden kann, nehme eine Karte vom Stapel.
  while (!kannKarteLegen(handGegner)) {
    // Schau nach, ob keine Karten mehr im Deck sind.
    // Wenn keine mehr da sind, hat keiner gewonnen.
    if (deck.length === 0) {
      alert("Keine Karten mehr da. Keiner hat gewonnen!");
      starteSpiel();
      return;
    }

    // Ziehe Karte.
    handGegner = zieheKarte(handGegner);
  }

  // Spiele die erstmögliche Karte die spielbar ist.
  for (let i = 0; i < handGegner.length; i++) {
    let karte: Karte = handGegner[i];

    if (darfKarteGespieltWerden(karte)) {
      handGegner.splice(i, 1);
      spielStapel.push(karte);

      aktualisiereOberflaecheGegner();
      aktualisiereOberflaecheSpieler();
      aktualisiereSpielfeld();

      return;
    }
  }
}

// Schaut nach, ob eine Hand eine legbare Karte hat.
function kannKarteLegen(hand: Karte[]): boolean {
  // Gehe durch alle Karten durch.
  for (let i: number = 0; i < hand.length; i++) {
    // Schau nach, ob die Karte gespielt werden kann.
    if (darfKarteGespieltWerden(hand[i])) {
      return true;
    }
  }

  return false;
}

starteSpiel();
