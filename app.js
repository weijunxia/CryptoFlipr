// variables
let cards = [...document.querySelectorAll('.card')]
let deck = [...document.getElementsByClassName('deck')]
let newGame = document.getElementById('newGame')
let flipCount = document.getElementById('flipCount')
let flips = 0
let timer = document.querySelector('#timer')
let seconds = 0
let interval
let flippedCards = []

// event listeners

// functions

// Durstenfeld shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function startGame() {
  // shuffles deck
  cards = shuffleArray(cards)
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = ''
    cards[i].classList.remove('test')
    cards[i].classList.add('visible')
  }
  // reset flip count
  timer = 0
  flips = 0
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = seconds + 's'
    seconds++
  }, 1000)
}

function flipCounter() {
  flips++
  flipCount.innerHTML = flips
  if (flips === 1) {
    startTimer()
  }
}

function flipCard() {
  flippedCards.push(this)
  flipCounter()
  if (flippedCards.length === 2) {
    if (flippedCards[0].type === flippedCards[1].type) {
      flippedCards[0].classList.add('match', 'disabled')
      flippedCards[1].classList.add('match', 'disabled')
      flippedCards[0].classList.remove('match', 'disabled')
      flippedCards[1].classList.remove('match', 'disabled')
      flippedCards = []
    } else {
      unmatched()
    }
  }
}

// event listeners
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard)
}

newGame.addEventListener('click', startGame)
