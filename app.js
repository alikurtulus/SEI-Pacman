document.addEventListener('DOMContentLoaded', () => {
  console.log('Js Loaded')
  const startButton = document.querySelector('.startButton')
  const endButton = document.querySelector('.endButton')
  const resetButton = document.querySelector('.resetButton')
  const options = document.querySelector('.options')
  const maze = document.querySelector('.maze')
  const time = document.querySelector('.time')
  let timeResult = 60
  const score = document.querySelector('.score')
  const width = 10
  let foodCount = 0
  let ghostCount = 0
  let keyVal = 0
  let timerId =0
  const squares = []
  let scoreResult = 0
  let playerIndex = 0

  let direction = 'forward'
  let currentStep = 0
  const mazeArray = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 1, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 1, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]

  function createMaze() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('DIV')
      squares.push(square)
      maze.appendChild(square)

      if (mazeArray[i] === 1) square.classList.add('way')

      else square.classList.add('wall')

    }
  }

  function createFood() {
    while (foodCount < 4) {
      for (let i = 0; i < 5; i++) {
        const randCherry = parseInt(Math.floor(Math.random() * 99))
        console.log(foodCount)

        console.log(randCherry)

        if (squares[randCherry].classList.contains('way') && !squares[randCherry].classList.contains('player') && randCherry!==0) {

          squares[randCherry].classList.add('cherry')

          foodCount++
        }

      }
    }

  }
  function createGhosts() {
    while (ghostCount < 4) {
      for (let i = 0; i < 5; i++) {
        const randGhost = parseInt(Math.floor(Math.random() * 99))
        console.log(ghostCount)

        console.log(ghostCount)

        if (squares[randGhost].classList.contains('way') && !squares[randGhost].classList.contains('player') && !squares[randGhost].classList.contains('cherry')) {

          squares[randGhost].classList.add('ghost')

          ghostCount++
        }

      }
    }

  }

  createMaze()
  createFood()
  createGhosts()


  squares[playerIndex].classList.add('player')

  function move() {
    // update the current step (should count from 0 - 3, then start again)
    currentStep = currentStep === 3 ? 0 : currentStep + 1
    // find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from that square
    player.classList.remove('player')

    // add the class of player to square the player should move to
    if (mazeArray[playerIndex] === 1 && !squares[playerIndex].classList.contains('wall') || squares[playerIndex].classList.contains('cherry')) {

      if (squares[playerIndex].classList.contains('cherry')) {
        scoreResult++
        score.innerText = scoreResult
        foodCount--
      }

      squares[playerIndex].classList.remove('cherry')
      squares[playerIndex].classList.add('player')

    } else {
      if (keyVal === 37) {
        squares[playerIndex + 1].classList.add('player')
        playerIndex = playerIndex + 1
        return
      } else if (keyVal === 38) {
        squares[playerIndex + width].classList.add('player')
        playerIndex = playerIndex + width
        return
      } else if (keyVal === 39) {
        squares[playerIndex - 1].classList.add('player')
        playerIndex = playerIndex - 1
        return
      } else if (keyVal === 40) {
        squares[playerIndex - width].classList.add('player')
        playerIndex = playerIndex - width
        return

      }



    }

    // update the direction (for styling)
    squares[playerIndex].setAttribute('data-direction', direction)
    // update the current step (for styling)
    squares[playerIndex].setAttribute('data-step', currentStep)
  }


  function timer(){
    clearInterval(timerId)
    timerId = setInterval(() => {
      timeResult--
      time.innerText = timeResult
      if(foodCount===0)
        createFood()

      if (timeResult === 0) {
        clearInterval(timerId)

        return
      }
    }, 1000)


  }


  startButton.addEventListener('click',timer)
  if (timeResult === 0) {
    clearInterval(timerId)
    return
  }
  resetButton.addEventListener('click',()=>{
    score.innerText=0
    scoreResult=0
    timeResult=60
    time.innerText=60

    createFood()
    createGhosts()
    clearInterval(timerId)
    timer()


  })
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37:
        // left
        keyVal = 37
        if (playerIndex % width > 0) {
          playerIndex--

          direction = 'backward'
          move()
        }
        break

      case 38:
        // up
        keyVal = 38
        if (playerIndex - width >= 0) {
          playerIndex -= width

          move()
        }
        break

      case 39:
        // right
        keyVal = 39
        if (playerIndex % width < width - 1) {
          playerIndex++

          direction = 'forward'
          move()
        }
        break

      case 40:
        // down
        keyVal = 40
        if (playerIndex + width < width * width) {
          playerIndex += width

          move()
        }
        break

    }
  })


})
