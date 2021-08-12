// variables
let cards = [...document.querySelectorAll('.card')]
let deck = [...document.getElementsByClassName('deck')]
let newGame = document.getElementById('newGame')
let flipCount = document.getElementById('flipCount')
let flips = 0
let timer = document.querySelector('#timer')
let seconds = 0
let interval
let flippedCard = []

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
  flips = 0
  flipCounter()
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
  flippedCard.push(this)
  if (flippedCard.length === 2) {
    flipCounter()
    if (flippedCard[0].type === flippedCard[1].type) {
      flippedCard[0].classList.add('match', 'disabled')
      flippedCard[1].classList.add('match', 'disabled')
      flippedCard[0].classList.remove('match', 'disabled')
      flippedCard[1].classList.remove('match', 'disabled')
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
