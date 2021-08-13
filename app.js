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
    cards[i].classList.add('visible', 'flip', 'disabled')
    cards[i].classList.remove('match', 'selected', 'unflip')
  }
  addCardEventListeners()
  clearInterval(seconds)
  flips = 0
  flipCount.innerHTML = flips
  totalCount = 0
  showCards()
}
function showCards() {
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('flip', 'disabled')
    })
  }, 3000)
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
}

function flipCard() {
  flippedCards.push(this)
  flipCounter()
  flippedCards[0].classList.add('disabled', 'selected', 'flip')
  flippedCards[1].classList.add('disabled', 'selected', 'flip')
  if (flippedCards.length === 2) {
    if (flippedCards[0].dataset.crypto === flippedCards[1].dataset.crypto) {
      setTimeout(() => {
        totalCount++
        flippedCards[0].classList.add('match', 'disabled')
        flippedCards[1].classList.add('match', 'disabled')
        flippedCards[0].classList.remove('selected', 'flip')
        flippedCards[1].classList.remove('selected', 'flip')
        flippedCards[0].removeEventListener('click', flipCard)
        flippedCards[1].removeEventListener('click', flipCard)
      }, 1000)
      setTimeout(() => {
        flippedCards = []
        checkWin()
      }, 1000)
    } else {
      flippedCards[1].classList.add('flip')
      cards.forEach((card) => {
        card.classList.add('disabled')
      })
      setTimeout(function disableUnmatch() {
        flippedCards[0].classList.remove('disabled', 'selected', 'flip')
        flippedCards[1].classList.remove('disabled', 'selected', 'flip')
        cards.forEach((card) => {
          card.classList.remove('disabled')
        })
        flippedCards = []
      }, 1000)
    }
  }
}
function checkWin() {
  if (totalCount === 8) {
    alert(
      `Congratulations, you've won in ${flips} turns! Press Start to play again. And learn more about these projects 🤠 🚀`
    )
    clearInterval(timer)
  }
}
// event listeners
window.onload = startGame()

function addCardEventListeners() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard)
  }
}

newGame.addEventListener('click', startGame)
