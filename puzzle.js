let input;
let nameOfPerson;
let button;
let winnerFound = false;
const password = 'SPECULAASPOP'; // XBLUICDDXBMB
const allNames = ["Coen", "Dorien", "Joeri", "Joyce", "Laura", "Leslie", "Lindsay", "Malou", "Marc", "Martin", "Marzia", "Sonja"];

function bindControls() {
    input = document.getElementById("codeInput");
    input.addEventListener("keyup", handleKeyUp);

    nameOfPerson = document.getElementById("nameOfPerson");
    nameOfPerson.className  = 'hiddenNameOfPerson';

    button = document.getElementById("codeEnter");
    button.addEventListener("click", handleEnterClick);
}

function handleKeyUp(event) {
    if (event.code === "Enter") {
        event.preventDefault();
        document.getElementById("codeEnter").click();
    } else if (event.keyCode >= 49 && event.keyCode <= 90) {
        replaceText(event);
    }
}

function getRandomName() {
    const min=0;
    const max=11;
    var randomNumber = Math.floor(Math.random() * (+max - +min)) + +min; 
    return allNames[randomNumber];
}

function handleEnterClick() {
    if (winnerFound) {
        return;
    }

    if (input.value == password) {
        const winner = getRandomName();
        nameOfPerson.className  = "visibleNameOfPerson";
        nameOfPerson.innerHTML = `${winner} mag beginnen<br/>Veel plezier!`;
        winnerFound = true;
        input.disabled = true;
    } else {
        nameOfPerson.className  = 'hiddenNameOfPerson';
        input.value = '';
    }
}

function getReplacementCharacter(character) {
    const upperCaseCharacter = character.toUpperCase();

    if (upperCaseCharacter == 'A') return 'Q';
    if (upperCaseCharacter == 'B') return 'P';
    if (upperCaseCharacter == 'C') return 'L';
    if (upperCaseCharacter == 'D') return 'A';
    if (upperCaseCharacter == 'E') return 'M';
    if (upperCaseCharacter == 'F') return 'D';
    if (upperCaseCharacter == 'G') return 'B';
    if (upperCaseCharacter == 'H') return 'R';
    if (upperCaseCharacter == 'I') return 'U';
    if (upperCaseCharacter == 'J') return 'T';
    if (upperCaseCharacter == 'K') return 'Z';
    if (upperCaseCharacter == 'L') return 'E';
    if (upperCaseCharacter == 'M') return 'O';
    if (upperCaseCharacter == 'N') return 'K';
    if (upperCaseCharacter == 'O') return 'H';
    if (upperCaseCharacter == 'P') return 'N';
    if (upperCaseCharacter == 'Q') return 'X';
    if (upperCaseCharacter == 'R') return 'W';
    if (upperCaseCharacter == 'S') return 'I';
    if (upperCaseCharacter == 'T') return 'F';
    if (upperCaseCharacter == 'U') return 'C';
    if (upperCaseCharacter == 'V') return 'G';
    if (upperCaseCharacter == 'W') return 'J';
    if (upperCaseCharacter == 'X') return 'S';
    if (upperCaseCharacter == 'Y') return 'V';
    if (upperCaseCharacter == 'Z') return 'Y';

    return upperCaseCharacter;
}

function replaceText( event ) {
    var target = event.target;

    // Get the current offset of the carrot / cursor. This represents the
    // location of the keydown event BEFORE the impending character has been
    // added to the input value.
    var offset = target.selectionStart;

    let replacementCharacter = getReplacementCharacter(event.key);

    event.preventDefault();

    // Calculate the substrings that come before and after the character that
    // we're about to replace.
    var beforeCharacter = target.value.slice( 0, ( offset - 1 ) );
    var afterCharacter = target.value.slice( offset );

    target.value = ( beforeCharacter + replacementCharacter + afterCharacter );

    // In order to prevent the cursor from jumping to the end of the input
    // value after we've set it programmatically, we have to explicitly
    // define the selection as staying in the same place that it was before.
    target.selectionStart = offset;
    target.selectionEnd = offset;
}
