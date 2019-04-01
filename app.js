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
  let timerId = 0
  const squares = []
  let scoreResult = 0
  let playerIndex = 0
  let playerMove = 1
  const ghostPositions = []
  let direction = 'forward'
  let currentStep = 0
  let ghostStep =0
  let ghostStep2 =0
  let ghostI = 0
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

        if (squares[randCherry].classList.contains('way') && !squares[randCherry].classList.contains('player') && randCherry !== 0) {

          squares[randCherry].classList.add('cherry')

          foodCount++
        }

      }
    }

  }

  function createGhosts() {
    while (ghostCount < 2) {
      for (let i = 0; i < 1; i++) {
        const randGhost = parseInt(Math.floor(Math.random() * 99))
        console.log(ghostCount)

        console.log(ghostCount)

        if (squares[randGhost].classList.contains('way') && !squares[randGhost].classList.contains('player') && !squares[randGhost].classList.contains('cherry') && randGhost !== 0) {

          squares[randGhost].classList.add('ghost')

          ghostPositions.push(randGhost)

          ghostCount++
        }

      }
    }
    ghostStep = ghostPositions[0]
    ghostStep2 = ghostPositions[1]

  }

  createMaze()
  createFood()
  createGhosts()

  function moveGhosts() {

  }
  const timerGhostId = setInterval(() => {

    const availableMoves = [1, -1, width, -width]

    let val = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    let val2 = availableMoves[Math.floor(Math.random() * availableMoves.length)]

    while (squares[ghostStep + val].classList.contains('wall') ||  squares[ghostStep + val].classList.contains('cherry')) {
      val = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    }
    while (squares[ghostStep2 + val2].classList.contains('wall') ||  squares[ghostStep2 + val2].classList.contains('cherry')) {
      val2= availableMoves[Math.floor(Math.random() * availableMoves.length)]
    }

    squares[ghostStep].classList.remove('ghost')
    squares[ghostStep2].classList.remove('ghost')

    console.log(ghostStep)
    if (ghostStep < 99) {
      if (val === -1) {
        if (squares[ghostStep - 1].classList.contains('way')) {


          ghostStep -= 1

          console.log(ghostStep)

          squares[ghostStep].classList.add('ghost')
        }
      } else if (val === width) {
        if (squares[ghostStep + width].classList.contains('way')) {
          console.log('hi down')
          ghostStep +=width
          squares[ghostStep].classList.add('ghost')


        }
      } else if (val === 1) {
        if (squares[ghostStep + 1].classList.contains('way')) {
          console.log('hi forward')
          ghostStep += 1
          squares[ghostStep].classList.add('ghost')


        }
      } else if (val === -width) {
        if (squares[ghostStep - width].classList.contains('way')) {
          console.log('hi up')
          ghostStep -= width
          squares[ghostStep].classList.add('ghost')

        }
      }
    } else {
      ghostStep -= 1
      squares[ghostStep].classList.add('ghost')
    }
    if (ghostStep2 < 99) {
      if (val2 === -1) {
        if (squares[ghostStep2 - 1].classList.contains('way')) {


          ghostStep2 -= 1

          console.log(ghostStep2)

          squares[ghostStep2].classList.add('ghost')
        }
      } else if (val2=== width) {
        if (squares[ghostStep2 + width].classList.contains('way')) {
          console.log('hi down')
          ghostStep2 +=width
          squares[ghostStep2].classList.add('ghost')


        }
      } else if (val2 === 1) {
        if (squares[ghostStep2 + 1].classList.contains('way')) {
          console.log('hi forward')
          ghostStep2 += 1
          squares[ghostStep2].classList.add('ghost')


        }
      } else if (val2 === -width) {
        if (squares[ghostStep2 - width].classList.contains('way')) {
          console.log('hi up')
          ghostStep2 -= width
          squares[ghostStep2].classList.add('ghost')

        }
      }
    } else {
      ghostStep2 -= 1
      squares[ghostStep2].classList.add('ghost')
    }






  }, 1000)



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


  function timer() {
    clearInterval(timerId)
    timerId = setInterval(() => {
      timeResult--
      time.innerText = timeResult
      if (foodCount === 0)
        createFood()

      if (timeResult === 0) {
        clearInterval(timerId)

        return
      }
    }, 1000)


  }


  startButton.addEventListener('click', timer)
  if (timeResult === 0) {
    clearInterval(timerId)
    return
  }
  resetButton.addEventListener('click', () => {
    score.innerText = 0
    scoreResult = 0
    timeResult = 60
    time.innerText = 60

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
          playerMove = playerMove - 1
          direction = 'backward'
          move()
        }
        break

      case 38:
        // up
        keyVal = 38
        if (playerIndex - width >= 0) {
          playerIndex -= width
          playerMove = playerMove + width
          direction = 'upward'
          move()
        }
        break

      case 39:
        // right
        keyVal = 39
        if (playerIndex % width < width - 1) {
          playerIndex++
          playerMove = playerMove + 1
          direction = 'forward'
          move()
        }
        break

      case 40:
        // down
        keyVal = 40
        if (playerIndex + width < width * width) {
          playerIndex += width
          playerMove = playerMove - width
          direction = 'downward'
          move()
        }
        break

    }
  })


})
