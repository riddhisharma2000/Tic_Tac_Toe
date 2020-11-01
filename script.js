

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// for all the winning combinations 

const WINNING_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6] 
]

const cellElements = document.querySelectorAll('[data-cell]')

/* selecting all cells using querySelectorAll using selector data-cell*/

//for setBoardHoverClass()..
const board = document.getElementById('board')

const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn



startGame()

restartButton.addEventListener('click', startGame)
// restartButton.addEventListener('click',handleClick , {once: true})

function startGame() {
 //starting from false means starting from x.
  circleTurn = false


  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click' , handleClick, {once: true})
  })
  
  /* foreach will select all elements from cellelements .here once true means this will run for 
  once and not again*/

  setBoardHoverClass()

  // to remove show method after restart button
  winningMessageElement.classList.remove('show')
  
}




function handleClick(e) {

    /* things these functions will do:-*/
// placemark
// check for win
//check for draw
//switch turns


    const cell = e.target

    // getting value of cell using target.
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

   //check for win
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()
    }
  }

  function endGame(draw) {
    if(draw)
    {
      winningMessageTextElement.innerText = 'Draw!'
    }
    else
    {
      winningMessageTextElement.innerText = `${circleTurn ? "0's" : "X's"}Wins!`
    }
    winningMessageElement.classList.add('show')
  }
   
  // dstructuring the cellekements to use every cell.
  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)      
    })
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }

  // swap terms is for switching terms 

  function swapTurns() {
      circleTurn = !circleTurn
  }

  function setBoardHoverClass() {
    //we want hover class to be on whose turn it is currently

    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if(circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    }
    else
    {
      board.classList.add(X_CLASS)
    }

  }


  function checkWin(currentClass) {

   // some is used to check is some of the WINNING_COMBINATIONS are met
   // cheking for every index to be same.

   //if this current class is in all three cells(by combination) then we are the winner 
     return WINNING_COMBINATIONS.some(combination => {
       return combination.every(index => {
         return cellElements[index].classList.contains(currentClass)
       })
     })
  }