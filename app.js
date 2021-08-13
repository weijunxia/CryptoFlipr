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
let totalCount = 0

// functions
function shuffle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 16)
    card.style.order = random
  })
}

function startGame() {
  // shuffle deck
  shuffle()
  // remove classes
  for (let i = 0; i < cards.length; i++) {
    deck.innerHTML = ''
    cards[i].classList.add('visible')
    cards[i].classList.remove('flip', 'disabled', 'match', 'selected', 'unflip')
  }
  addCardEventListeners()
  timer.innerHTML = 0
  clearInterval(seconds)
  flips = 0
  flipCount.innerHTML = flips
  totalCount = 0
}

function startTimer() {
  timer.innerHTML = 0
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
  flippedCards[0].classList.add('disabled', 'selected', 'flip')
  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.crypto === flippedCards[1].dataset.crypto) {
      totalCount++
      flippedCards[0].classList.add('match', 'disabled')
      flippedCards[1].classList.add('match', 'disabled')
      flippedCards[0].classList.remove('selected')
      flippedCards[1].classList.remove('selected')
      flippedCards[0].removeEventListener('click', flipCard)
      flippedCards[1].removeEventListener('click', flipCard)
      flippedCards = []
      checkWin()
    } else {
      flippedCards[0].classList.remove('disabled', 'selected', 'flip')
      flippedCards = []
    }
  }
}
function checkWin() {
  if (totalCount === 8) {
    alert('you win')
    clearInterval(interval)
  }
}
// event listeners
;(window.onload = addCardEventListeners()), shuffle()

function addCardEventListeners() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard)
  }
}

newGame.addEventListener('click', startGame)
