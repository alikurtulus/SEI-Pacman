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
  const width = 20

  let ghostCount = 0
  let ghostCounter = 0
  let keyVal = 0
  let timerId = 0
  const squares = []
  let scoreResult = 0
  let playerIndex = 21
  let playerMove = 1
  const ghostPositions = []
  let direction = 'forward'
  let currentStep = 0
  let ghostStep = 0
  let ghostStep2 = 0
  let ghostStep3 = 0

  const mazeArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 3, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 3, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]

  function createMaze() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('DIV')
      squares.push(square)
      maze.appendChild(square)

      if (mazeArray[i] === 0) square.classList.add('way')

      else if (mazeArray[i] === 1) square.classList.add('wall')
      else if (mazeArray[i] === 3) square.classList.add('cherry')

    }
  }

  /*  function createFood() {
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
    */

  function createGhosts() {
    while (ghostCounter < 3) {
      const randGhost = parseInt(Math.floor(Math.random() * 399))
      if (squares[randGhost].classList.contains('way') && !squares[randGhost].classList.contains('player') && !squares[randGhost].classList.contains('cherry') && randGhost !== 21) {

        ghostPositions.push(randGhost)
        ghostCounter++
      }
    }



    console.log(ghostPositions)

    while (ghostCount < 3) {

      if (ghostCount === 0) squares[ghostPositions[ghostCount]].classList.add('ghost')
      else if (ghostCount === 1) squares[ghostPositions[ghostCount]].classList.add('ghost2')
      else if (ghostCount === 2) squares[ghostPositions[ghostCount]].classList.add('ghost3')

      ghostCount++


    }

    ghostStep = ghostPositions[0]
    ghostStep2 = ghostPositions[1]
    ghostStep3 = ghostPositions[2]

  }
  createMaze()
  //  createFood()
  createGhosts()

  function moveGhosts() {

  }

  const timerGhostId = setInterval(() => {

    const availableMoves = [-1,-width,1,width]



    squares[ghostStep].classList.remove('ghost')
    squares[ghostStep2].classList.remove('ghost2')
    squares[ghostStep3].classList.remove('ghost3')

    let realMoves = availableMoves.filter(availableMove => {
      return !squares[ghostStep + availableMove].classList.contains('wall')
    })
    console.log('Real moves for ghost '+ realMoves)

    let distances = realMoves.map(realMove => {
      return Math.abs(ghostStep + realMove - playerIndex)
    })
    console.log('real distance '+distances)

    let realMoves2 = availableMoves.filter(availableMove2 => {
      return !squares[ghostStep2 + availableMove2].classList.contains('wall')
    })
    console.log('Real moves for ghost2 '+realMoves2)
    let distances2 = realMoves2.map(realMove2 => {
      return Math.abs(ghostStep2 + realMove2 - playerIndex)
    })
    console.log('real distance2 '+distances2)


    let realMoves3 = availableMoves.filter(availableMove3 => {
      return !squares[ghostStep3 + availableMove3].classList.contains('wall')
    })
    console.log('Real moves for ghost3 '+realMoves3)
    let distances3 = realMoves3.map(realMove3 => {
      return Math.abs(ghostStep3 + realMove3 - playerIndex)
    })
    console.log('real distance3 '+distances3)


    ghostStep += realMoves[distances.indexOf(Math.min(...distances))]
    ghostStep2 += realMoves2[distances2.indexOf(Math.min(...distances2))]
    ghostStep3 += realMoves3[distances3.indexOf(Math.min(...distances3))]
    console.log(ghostStep)
    console.log(ghostStep2)
    console.log(ghostStep3)
    if( !squares[ghostStep].classList.contains('wall'))
      squares[ghostStep].classList.add('ghost')
    if(!squares[ghostStep2].classList.contains('wall'))
      squares[ghostStep2].classList.add('ghost2')
    if(!squares[ghostStep3].classList.contains('wall'))
      squares[ghostStep3].classList.add('ghost3')



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
    if (mazeArray[playerIndex] === 0 && !squares[playerIndex].classList.contains('wall') || squares[playerIndex].classList.contains('cherry')) {

      if (squares[playerIndex].classList.contains('cherry')) {
        scoreResult++
        score.innerText = scoreResult
        mazeArray[playerIndex]=0

      }

      squares[playerIndex].classList.remove('cherry')
      squares[playerIndex].classList.add('player')

    } else {
      if (keyVal === 37) {
        playerIndex = playerIndex + 1
      } else if (keyVal === 38) {
        playerIndex = playerIndex + width
      } else if (keyVal === 39) {
        playerIndex = playerIndex - 1
      } else if (keyVal === 40) {
        playerIndex = playerIndex - width
      }

      squares[playerIndex].classList.add('player')


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

      //  createFood()

      if (timeResult === 0) {
        clearInterval(timerId)

        return
      }
    }, 1000)


  }


  startButton.addEventListener('click', timer)

  resetButton.addEventListener('click', () => {
    score.innerText = 0
    scoreResult = 0
    timeResult = 60
    time.innerText = 60

    //   createFood()
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
