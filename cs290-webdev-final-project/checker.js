//const { FailedDependency } = require("http-errors")


var board = document.getElementsByClassName('board')[0]
var boardRows = board.rows // gets table rows
let pos = createPositionArray(8, 8)
let game = new Game()
var firstPlayer = new Player('Player 1', 'white')
var secondPlayer = new Player('Player 2 (CPU)', 'red')
document.getElementById('p1Captured').innerHTML = "Player 1: 0"
document.getElementById('p2Captured').innerHTML = "Player 2: 0"

document.getElementById('start-game').addEventListener('click', handleStartGame)

var gameInProgress = false;
var pieceMoving = false;

function Game() {
    this.turnStatus = 'waiting'  // turn status is either waiting, selected, or done
    this.turn = 0 // player 1 is 0 and player 2 is 1
    this.pieceSelected = false
    this.inProgress = false
}

function Player(name, color) { // prototype for player object
    this.name = name
    this.color = color
    this.pieces = 12
    this.captured = 0
}

function Piece(x, y, color, isKing) {
    this.x = x
    this.y = y
    this.color = color
    this.isKing = isKing
}

function isEven(num) {
    if(num % 2 == 0) {
        return true
    }
    return false
}

function createPositionArray(cols, rows) {
    let pos = new Array(cols) // creates the x position array
    for(var i = 0; i < rows; i++) {
        pos[i] = new Array(rows) // creates y position array
    }
    initPositionBoard(pos)
    return pos
}

function initPositionBoard(posArray) {
    var length = posArray.length
    for(var i = 0; i < length; i++) {
        var innerLen = posArray[i].length
        for(var j = 0; j < innerLen; j++) {
            posArray[i][j] = 'none'
        }
    }
}

function getPieceColor(rowIndex) {
    if(rowIndex <= 2) {
        return 'white'
    }
    if(rowIndex >= 5) {
        return 'red'
    }
    return 'none'
}

function isPieceNext(evenStart, x) {
    if(evenStart) { // still gotta figure out a way to clean up duplicate code
        if(isEven(x)) {
            return true
        }
        return false
    }
    else {
        if(!isEven(x)) {
            return true
        }
        return false
    }
}

function setupBoard(rows, cols) {
    var evenStart = true
    for(var i = 0; i < cols; i++) { // traverses the columns
        for(var j = 0; j < rows; j++) {  // traverses the rows
            if(isPieceNext(evenStart, j)) { // finds where to put the next piece of either player 1 or 2
                //pos[i][j] = new Piece(i, j, getPieceColor(j))  // adds the player's piece to array
                if(j != 3 && j != 4) {
                    createPiece(i, j, getPieceColor(j), false)  // adds the player's piece to table
                }
                boardRows[j].cells[i].addEventListener('click', handlePieceSetting)
            }
            if((j + 1) == rows) { // if at end of row, switch the starting locating of the next row
                evenStart = !evenStart
            }
        }
    }
}

function createPiece(x, y, color, boolKing) {
    var piece = document.createElement('span') // creates checkerboard piece
    piece.classList.add('piece')
    if (boolKing == true) {
        piece.classList.add('isKing')
        pos[x][y] = new Piece(x, y, color, true)
    }
    else {
        pos[x][y] = new Piece(x, y, color, false)
    }
    piece.style.backgroundColor = color
    var cell = boardRows[y].cells[x]
    cell.appendChild(piece) // adds piece element to specific cell at (x,y)
    cell.firstElementChild.addEventListener('click', handlePieceMoving)
    //pos[x][y] = new Piece(x, y, color)
}

function deletePiece(x, y) {
    boardRows[y].cells[x].firstElementChild.remove() // deletes piece span from DOM
    pos[x][y] = 'none' // sets pos value at x and y to none.
}

function movePiece(piece, x, y) {
    if(piece.x == x) {
        return false;
    }
    if(x - piece.x > 2) { // piece cannot move more t han two to the left
        return false;
    }
    if(piece.x - x > 2) { // piece cannot move more than two the right
        return false;
    }
    if(y - piece.y > 1) {
        if(!canMove(piece, true)) {
            return false;
        }
    }
    if(piece.y - y > 2) {
        if(!canMove(piece, false)) {
            return false;
        }
        return false;
    }
    if(piece.color == 'white') {
        if(y <= piece.y  && piece.isKing == false) { // standard white pieces cannot move upwards
            console.log("y <= piece.y && piece.isKing == false white")
            return false;
        }
    }
    else if(piece.color == 'red') {
        if(y >= piece.y && piece.isKing == false) { // standard red pieces cannot move downwards
            console.log("y >= piece.y && piece.isKing == false red")
            return false;
        }
    }

    deletePiece(piece.x, piece.y)

    //after deleting at old location, create new piece or king piece at new location
    if (piece.isKing == true || y == 0 || y == 7) {
        if (piece.color == 'white') {
            //if position is bottom (index 7) for white
            createPiece(x, y, 'white', true)
        }

        else if (piece.color == 'red') {
            //if position is top (index 0) for red
              createPiece(x, y, 'red', true)
        }
    }

    else { //no need to set as a king then
      createPiece(x, y, piece.color, false)
    }
    return true;

    /*
    if (piece.color == 'white') {
        //if position is bottom (index 7) for white
        if (y == 0 || piece.isKing == true) {
            createPiece(x, y, 'white', true)
        }
    }

    elseif (piece.color == 'red') {
        //if position is top (index 0) for red
        if (y == 0 || piece.isKing == true) {
            createPiece(x, y, 'red', true)
        }
    }
    else { //no need to set as a king then
        createPiece(x, y, piece.color, false)
    }*/

    return true;
}


function canMove(piece, left) {
    if(piece.color == "white") {
        if(left) {
            if(findJump(piece, -1, 1)) {
                return true;
            }
        }
        if(findJump(piece, 1, 1)) {
            return true;
        }
        return false;
    }
    if(left) {
        if(findJump(piece, -1, -1)) {
            return true;
        }
        if(findJump(piece, 1, -1)) {
            return true;
        }
    }
    return false;
}

function findJump(piece, xOperand, yOperand) {
    var firstDiagX = piece.x + xOperand
    var firstDiagY = piece.y + yOperand
    if(outOfBounds(firstDiagX, firstDiagY)) {
        return false;
    }
    if(boardRows[firstDiagY].cells[firstDiagX].firstElementChild != null) {
        if(pos[firstDiagX][firstDiagY].color != piece.color) {
            var secDiagX = firstDiagX + xOperand
            var secDiagY = firstDiagY + yOperand
            if(outOfBounds(secDiagX, secDiagY)) {
                return false;
            }
            if(boardRows[secDiagY].cells[secDiagX].firstElementChild == null) {
                //console.log(secDiagX + " and " + secDiagY)
                return true;
            }
        }
        return false;
    }
    return false;
}

function captureExists(piece, origPiece, xOperand, yOperand) { // still work in progress.
    var firstDiagX = piece.x + xOperand
    var firstDiagY = piece.y + yOperand
    if(outOfBounds(firstDiagX, firstDiagY)) {
        return false;
    }
    if(boardRows[firstDiagY].cells[firstDiagX].firstElementChild == null) {
        return false;
    }
    if(pos[firstDiagX][firstDiagY].color == piece.color) {
        return false;
    }
    var secDiagX = firstDiagX + xOperand
    var secDiagY = firstDiagY + yOperand
    if(outOfBounds(secDiagX, secDiagY)) {
        return false;
    }
    if(boardRows[secDiagY].cells[secDiagX].firstElementChild == null) {
        if(pos[secDiagX][secDiagY].x = origPiece.x && pos[secDiagX][secDiagY].y == origPiece.y) {
            deletePiece(firstDiagX, firstDiagY)
            movePiece(piece, secDiagX, secDiagY)
            if(piece.color == 'white') {
                firstPlayer.captured = firstPlayer.captured + 1
                secondPlayer.pieces = secondPlayer.pieces - 1
            }
            else {
                secondPlayer.captured = secondPlayer.captured + 1
                firstPlayer.pieces = firstPlayer.pieces - 1
            }
            return true;
        }

    }
    return false;
}


function findCapture(piece, origPiece) {
    if(piece.color == "white") {
        if(!captureExists(piece, origPiece, 1, -1)) {
            captureExists(piece, origPiece, -1, -1)
        }
    }
    else {
        if(!captureExists(piece, origPiece, 1, 1)) {
            captureExists(piece, origPiece, -1, 1)
        }
    }
}

function outOfBounds(x, y) {
    if(x < 0 || x > 7) {
        return true;
    }
    if(y < 0 || y > 7) {
        return true;
    }
    return false;
}

function handlePieceMoving(event) {
    if(event.target.tagName == 'SPAN') { // selected DOM element must be a span
        var rowIndex = event.target.parentNode.parentNode.rowIndex // row is y
        var cellIndex = event.target.parentNode.cellIndex // cell is x
        if(game.turnStatus == 'waiting' || game.turnStatus == 'selected') {
            if(game.pieceSelected) { // if piece is already selected then remove selected green border styling
                const x = game.pieceSelected.x
                const y = game.pieceSelected.y
                var cell = boardRows[y].cells[x]
                cell.firstElementChild.style.border = 'none'
            }
            setPieceSelected(cellIndex, rowIndex)
        }
    }

}

//we're passing the piece that did the capturing, aka the player that made the play
function addCaptured(color) {
  //passed color
  if (color == 'white') {
    var counter = document.getElementById("p2Captured")
    secondPlayer.captured += 1
    console.log("p2: " + secondPlayer.captured)
    counter.innerHTML = ("Player 2: " + secondPlayer.captured)
  }
  else if (color == 'red') {
    var counter = document.getElementById("p1Captured")
    firstPlayer.captured += 1
    counter.textContent = ("Player 1: " + firstPlayer.captured)
    console.log("p1: " + firstPlayer.captured)
  }
}

function checkWinner() {
  var winBox = document.getElementById("winnerBox")
  if (firstPlayer.captured == 12) {
    winBox.innerHTML = ("Player 1 Wins")
    return true;
  }
  else if (secondPlayer.captured == 12) {
    winBox.innerHTML = ("Player 2 Wins")
    return true;
  }
  else {
    return false;
  }
}

function setPieceSelected(x, y) {
    boardRows[y].cells[x].firstElementChild.style.border = "0.1900em solid #00FF7F" // adds light green border
    game.turnStatus = 'selected' // the turn status is now selected
    game.pieceSelected = pos[x][y]
}

function handlePieceSetting(event) {
    if(event.target.tagName == 'TD') {
        var rowIndex = event.target.parentNode.rowIndex // row is y
        var cellIndex = event.target.cellIndex // cell is x
        if(game.turnStatus == 'selected') { // turn status is selected
            if(event.target.firstElementChild == null) {
                const piecedMoved = movePiece(game.pieceSelected, cellIndex, rowIndex)
                if(piecedMoved) { // piece moves if desired move is valid
                    pos[game.pieceSelected.x][game.pieceSelected.y] = game.pieceSelected
                    findCapture(pos[cellIndex][rowIndex], game.pieceSelected)
                    //pos[game.pieceSelected.x][game.pieceSelected.y] = 'none'
                    game.pieceSelected = false // allows new piece to be selected
                    game.turnStatus = 'waiting' // the game is now waiting for a new piece to selected

                }
            }
        }
    }
}

function addEventListener(color) {
    var redpiece = firstPlayer.color
    var whitepiece = secondPlayer.color
    if(turn == 0) {
        //redpiece.addEventListener('click')
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++) {
                if(piece == 'red')
                firstPlayer.addEventListener('click', piece[i][j])
                console.log(" == addEventListener for red")
            }
        }
    }
    else {
        //whitepiece.addEventListener('click')
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++) {
                if(piece == 'white')
                secondPlayer.addEventListener('click', piece[i][j])
                console.log(" == addEventListener for white")
            }
        }
    }

}

function removeEventListener() {
    //var redpiece = firstPlayer.color
    //var whitepiece = secondPlayer.color
    if(turn == 0){
        //for(var i = 0; i < firstPlayer.pieces; i++){
        //redpiece.removeEventListener('click', redpiece)
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++) {
                if(piece == 'red')
                firstPlayer.color.removeEventListener('click', piece[i][j])
                console.log(" == removeEventListener for red")
            }
        }
    }
    else {
        //for(var i = )
        //whitepiece.removeEventListener('click')
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 8; j++) {
                if(piece == 'white')
                secondPlayer.color.removeEventListener('click', piece[i][j])
                console.log(" == removeEventListener for white")
            }
        }

    }

}

function checkWinner(){
    if(firstPlayer.pieces == 0) {
        document.getElementsByClassName('p2Turn').textContent = "Black Won"
        return true
    }
    else if (secondPlayer.pieces == 0) {
        document.getElementsByClassName('p1Turn').textContent = "Red Won"
        return true
    }
    else {
        return false
    }
}

function handleStartGame(event) {
    if(!game.inProgress) {
        setupBoard(8, 8) // sets up checkboard pieces
        game.inProgress = true // set's game status
    }
    else {
        alert('Cannot start game.\nGame has started.')
        //still need to work on adding a end game button
    }
}

function changeColorClass(theme){
    switch(theme){
        case 1:
            document.getElementById('whtesquare').setAttribute("class", "classicclass");
            break;
        case 2:

            document.getElementById('whtesquare').setAttribute("class", "retroclass");
           // ("whtesquare").addClass('retroclass');

            break;

        case 3:

            break;

        case 4:

            break;

        default:
    }
}
