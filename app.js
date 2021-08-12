// variables
let cards = [...document.querySelectorAll('.card')]
let deck = [...document.getElementsByClassName('deck')]
let newGame = document.getElementById('newGame')
let timer = document.querySelector('#timer')
let flipCount = document.getElementById('flipCount')
let flips = 0
let seconds = 0
let interval
let flippedCards = []
// functions
// Fisher-Yates shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1))
//     ;[array[i], array[j]] = [array[j], array[i]]
//   }
//   return array
// }

function shuffle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 16)
    card.style.order = random
  })
}

function startGame() {
  // shuffles deck
  shuffle()
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = ''
    cards[i].classList.add('visible')
    cards[i].classList.remove('flipped', 'disabled', 'match')
  }
  addCardEventListeners()
  timer.innerHTML = 0
  clearInterval(interval)
  // reset flip count
  flips = 0
  flipCount.innerHTML = flips
}

function startTimer() {
  timer.innerHTML = 0
  clearInterval(timer)
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
  flippedCards[0].classList.add('disabled')
  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.crypto === flippedCards[1].dataset.crypto) {
      flippedCards[0].classList.add('match', 'disabled', 'flipped')
      flippedCards[1].classList.add('match', 'disabled', 'flipped')
      flippedCards[0].removeEventListener('click', flipCard)
      flippedCards[1].removeEventListener('click', flipCard)
      flippedCards = []
    } else {
      flippedCards[0].classList.remove('disabled')
      flippedCards = []
    }
  }
  console.log(flippedCards)
}

// event listeners
;(window.onload = addCardEventListeners()), shuffle()

function addCardEventListeners() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard)
  }
}

newGame.addEventListener('click', startGame)
