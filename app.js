document.addEventListener('DOMContentLoaded', () => {
  console.log('Js Loaded')

  const startButton = document.querySelector('.startButton')
  const resetButton = document.querySelector('.resetButton')
  const options = document.querySelector('.options')
  const maze = document.querySelector('.maze')
  const time = document.querySelector('.time')
  let timeResult = 60
  const score = document.querySelector('.score')
  const resultGame = document.querySelector('.resultGame')
  const pacmanDeathVoice = new Audio('assets/music/pacman_death.wav')
  const eatPineappleWav = new Audio('assets/music/pacman_chomp.wav')
  const eatCherryWav = new Audio('assets/music/pacman_eatfruit.wav')
  const pacmanIntroMusic = new Audio('assets/music/pacman_beginning.wav')
  const winnerText = document.querySelector('.winnerText')
  const width = 20
  let realMoves = []
  let distances = []
  let realMoves2 = []
  let distances2 = []
  let realMoves3 = []
  let distances3 = []
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
  const availableMoves = [-1, -width, 1, width]
  let ghostAwayCount = 8
  let timerGhostAway = 0
  let timerGhostId = 0
  let isGamePlay = true
  let isGhostSick = false
  let countIntroMusic = 10
  let counterReset = false
  let isGhostSick1 = false
  let isGhostSick2 = false
  let isGhostSick3 = false
  let speedGhosts = 1000
  let  timerCheckScore =0

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
  // Create maze ,Maze has got way,wall,cherry
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

  /*  function playIntroMusic() {
      pacmanIntroMusic.play()
      countIntroMusic--
      if (countIntroMusic === 0) {
        pacmanIntroMusic.pause()
        clearInterval(introMusicTimer)
      }

    }
    */
  //const introMusicTimer = setInterval(playIntroMusic, 1000)
 // Create ghosts,When it creates ghosts ,It checks places for creating ghosts
  function createGhosts() {
    while (ghostCounter < 3) {
      const randGhost = parseInt(Math.floor(Math.random() * 399)) //Try to give random position for ghosts
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
    //GhostSteps positons from ghostPositionArray
    ghostStep = ghostPositions[0]
    ghostStep2 = ghostPositions[1]
    ghostStep3 = ghostPositions[2]

  }
   // Create foods ,it checks places to create pineapple
  function createFoods() {
    console.log('hii')
    return squares.forEach(square => {
      if (square.classList.contains('way') && !square.classList.contains('player') && !square.classList.contains('ghost') && !square.classList.contains('ghost2') && !square.classList.contains('ghost3')) square.classList.add('pineapple')

    })
  }
//Clear all pineapple on the maze
  function clearFoods() {
    console.log('hii')
    return squares.forEach(square => {
      if (square.classList.contains('way') && !square.classList.contains('player') && !square.classList.contains('ghost') && !square.classList.contains('ghost2') && !square.classList.contains('ghost3')) square.classList.remove('pineapple')

    })
  }
  createMaze()
  squares[playerIndex].classList.add('player') //Add a player on the maze
  createGhosts()
  createFoods()
//trying to calculate for each ghosts their next moves and find distances(between ghosts and pacman) for availableMove
  function calculateDistanceAndPositionForGhost() {
    realMoves = availableMoves.filter(availableMove => {
      return (!isGhostSick1) ? (!squares[ghostStep + availableMove].classList.contains('wall') && !squares[ghostStep + availableMove].classList.contains('ghost2') && !squares[ghostStep + availableMove].classList.contains('ghost3') && !squares[ghostStep + availableMove].classList.contains('ghostSick')) :
        null
    })
    if (realMoves !== null) {
      distances = realMoves.map(realMove => {
        return Math.abs(ghostStep + realMove - playerIndex)
      })
    }
    realMoves2 = availableMoves.filter(availableMove2 => {
      return (!isGhostSick2) ? (!squares[ghostStep2 + availableMove2].classList.contains('wall') && !squares[ghostStep2 + availableMove2].classList.contains('ghost') && !squares[ghostStep2 + availableMove2].classList.contains('ghost3') && !squares[ghostStep2 + availableMove2].classList.contains('ghostSick')) : null
    })
    //  console.log('Real moves for ghost2 ' + realMoves2)
    if (realMoves2 !== null) {
      distances2 = realMoves2.map(realMove2 => {
        return Math.abs(ghostStep2 + realMove2 - playerIndex)
      })
    }
    realMoves3 = availableMoves.filter(availableMove3 => {
      return (!isGhostSick3) ? (!squares[ghostStep3 + availableMove3].classList.contains('wall') && !squares[ghostStep3 + availableMove3].classList.contains('ghost1') && !squares[ghostStep3 + availableMove3].classList.contains('ghost2') && !squares[ghostStep3 + availableMove3].classList.contains('ghostSick')) : null
    })
    //    console.log('Real moves for ghost3 ' + realMoves3)
    if (realMoves3 !== null) {
      distances3 = realMoves3.map(realMove3 => {
        return Math.abs(ghostStep3 + realMove3 - playerIndex)
      })
    }
  }
//Remove all ghost from maze
  function removeGhosts() {
    squares[ghostStep].classList.remove('ghost')
    squares[ghostStep2].classList.remove('ghost2')
    squares[ghostStep3].classList.remove('ghost3')
  }
//Ghosts movements,find min distance between pacman and ghosts
  function moveGhosts() {
    console.log('movin')
    removeGhosts()
    calculateDistanceAndPositionForGhost()
    if (!isGhostSick1)
      ghostStep += realMoves[distances.indexOf(Math.min(...distances))]
    else
      ghostStep = 2
    if (!isGhostSick2)
      ghostStep2 += realMoves2[distances2.indexOf(Math.min(...distances2))]
    else
      ghostStep2 = 3
    if (!isGhostSick3)
      ghostStep3 += realMoves3[distances3.indexOf(Math.min(...distances3))]
    else
      ghostStep3 = 4
    if (!isGhostSick1)
      squares[ghostStep].classList.add('ghost')
    if (!isGhostSick2)
      squares[ghostStep2].classList.add('ghost2')
    if (!isGhostSick3)
      squares[ghostStep3].classList.add('ghost3')
    if (squares[ghostStep].classList.contains('player') || squares[ghostStep2].classList.contains('player') || squares[ghostStep3].classList.contains('player')) {
      resultGame.innerText = 'Game over'
      clearInterval(timerId)
      timeResult = 0
      time.innerText = timeResult
      clearInterval(timerGhostId)
      clearInterval(timerGhostAway)
      pacmanDeathVoice.play()
      squares[playerIndex].classList.remove('player')
      squares[playerIndex].classList.add('deathpacman')

      squares[playerIndex]
      isGamePlay = false
    }
  }

  function removeGhostSick() {
    squares[ghostStep].classList.remove('ghostSick')
    squares[ghostStep2].classList.remove('ghostSick2')
    squares[ghostStep3].classList.remove('ghostSick3')
  }
//When Ghosts turn to blue ,find max distance between ghost and pacman
  function ghostAway() {
    if (isGhostSick && isGamePlay) {
      removeGhosts()
      removeGhostSick()
      calculateDistanceAndPositionForGhost()
      if (!isGhostSick1)
        ghostStep += realMoves[distances.indexOf(Math.max(...distances))]
      else
        ghostStep = 2
      if (!isGhostSick2)
        ghostStep2 += realMoves2[distances2.indexOf(Math.max(...distances2))]
      else
        ghostStep2 = 3
      if (!isGhostSick3)
        ghostStep3 += realMoves3[distances3.indexOf(Math.max(...distances3))]
      else
        ghostStep3 = 4
      if (!isGhostSick1)
        squares[ghostStep].classList.add('ghostSick')
      if (!isGhostSick2)
        squares[ghostStep2].classList.add('ghostSick2')
      if (!isGhostSick3)
        squares[ghostStep3].classList.add('ghostSick3')
      if (squares[ghostStep].classList.contains('player')) {
        squares[ghostStep].classList.remove('ghostSick')
        isGhostSick1 = true
      }
      if (squares[ghostStep2].classList.contains('player')) {
        squares[ghostStep2].classList.remove('ghostSick2')
        isGhostSick2 = true
      }
      if (squares[ghostStep3].classList.contains('player')) {
        squares[ghostStep3].classList.remove('ghostSick3')
        isGhostSick3 = true
      }
      ghostAwayCount--
      if (ghostAwayCount === 0) {
        clearInterval(timerGhostAway)
        removeGhostSick()
        ghostAwayCount = 8
        timerGhostId = setInterval(moveGhosts, speedGhosts)
        isGhostSick = false
        return
      }
    }
  }

  function displayResultWinnerAndScore() {
    resultGame.classList.add('winner')
    clearInterval(timerGhostId)
    clearInterval(timerGhostAway)
    clearInterval(timerId)
    winnerText.innerText = 'You won'
    isGamePlay = false
  }
//Updating score
  function updateScore() {
    if (squares[playerIndex].classList.contains('cherry')) {
      clearInterval(timerGhostId)
      isGhostSick = true
      if (isGhostSick)
        ghostAwayCount += 8
      speedGhosts = 1500
      timerGhostAway = setInterval(ghostAway, speedGhosts)
      scoreResult += 5
      timeResult += 5
      squares[playerIndex].classList.remove('cherry')
      eatCherryWav.play()
    } else if (squares[playerIndex].classList.contains('pineapple')) {
      scoreResult += 1
      eatPineappleWav.play()
      squares[playerIndex].classList.remove('pineapple')
    }
    score.innerText = scoreResult
  }
  timerCheckScore = setInterval(updateScore, 60)
  //Pacman movements
  function move() {
    // update the current step (should count from 0 - 4 s, then start again)
    currentStep = currentStep === 4 ? 0 : currentStep + 1
    // find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from that square
    player.classList.remove('player')
    squares[playerIndex].setAttribute('data-step', currentStep)
    // add the class of player to square the player should move to
    if (mazeArray[playerIndex] === 0 && !squares[playerIndex].classList.contains('wall') || squares[playerIndex].classList.contains('cherry') || squares[playerIndex].classList.contains('pineapple') || squares[playerIndex].classList.contains('ghostSick')) {

      if (squares[playerIndex].classList.contains('ghostSick')) {

        squares[playerIndex].classList.remove('ghostSick')
        isGhostSick1 = true
        console.log('I ate you')
      }
      if (squares[playerIndex].classList.contains('ghostSick2')) {

        squares[playerIndex].classList.remove('ghostSick2')
        //clearInterval(ghostTimerSick2)
        isGhostSick2 = true
        //  clearInterval(timerGhostAway)
        console.log('I ate you')
      }
      if (squares[playerIndex].classList.contains('ghostSick3')) {

        squares[playerIndex].classList.remove('ghostSick3')
        //clearInterval(ghostTimerSick3)
        isGhostSick3 = true
        //  clearInterval(timerGhostAway)
        console.log('I ate you')
      }
      mazeArray[playerIndex] = 0
      if (counterReset) {
        if (scoreResult === 183){
          displayResultWinnerAndScore()
          counterReset=false
        }

      }
      if (scoreResult === 180)
        displayResultWinnerAndScore()

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
  function createCherries() {
    mazeArray[61] = 3
    mazeArray[78] = 3
    mazeArray[321] = 3
    mazeArray[338] = 3
    if (mazeArray[61] === 3)
      squares[61].classList.add('cherry')
    if (mazeArray[78] === 3)
      squares[78].classList.add('cherry')
    if (mazeArray[321] === 3)
      squares[321].classList.add('cherry')
    if (mazeArray[338] === 3)
      squares[338].classList.add('cherry')
  }
  function timer() {
    clearInterval(timerId)
    timerId = setInterval(() => {
      timeResult--
      time.innerText = timeResult

      if (timeResult === 0) {
        clearInterval(timerId)
        clearInterval(timerGhostId)
        isGamePlay = false
        if (scoreResult < 180)
          resultGame.innerText = 'Game Over'
        return
      }
    }, 1000)
  }

  function keyInputs(e) {
    if (isGamePlay) {
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
    } else
      return

  }
  options.addEventListener('change', (e) => {
    if (e.target.value === 'Easy')
      speedGhosts = 1000
    else if (e.target.value === 'Medium')
      speedGhosts = 700
    else if (e.target.value === 'Hard')
      speedGhosts = 500


  })
  startButton.addEventListener('click', () => {
    console.log('start button clicked...')
    document.addEventListener('keydown', keyInputs)
    pacmanIntroMusic.pause()
    // clearInterval(introMusicTimer)
    timer()
    timerGhostId = setInterval(moveGhosts, speedGhosts)
    startButton.style.visibility = 'hidden'
  })

  resetButton.addEventListener('click', () => {
    currentStep = 0
    ghostAwayCount = 8
    isGhostSick = false
    squares[playerIndex].classList.remove('player')
    playerIndex = 21
    speedGhosts = 1000
    countIntroMusic = 10
    isGhostSick1 = false
    isGhostSick2 = false
    isGhostSick3 = false
    counterReset = true
    score.innerText = 0
    scoreResult = 0
    timeResult = 60
    time.innerText = 60
    isGamePlay = true
    createCherries()
    resultGame.classList.remove('winner')
    winnerText.innerText = ''
    removeGhostSick()
    removeGhosts()
    clearFoods()
    squares[playerIndex].classList.add('player')
    createGhosts()
    createFoods()
    clearInterval(timerCheckScore)
    clearInterval(timerId)
    clearInterval(timerGhostId)

    startButton.style.visibility = 'visible'
    clearInterval(timerGhostAway)
    timer()
    timerCheckScore = setInterval(updateScore, 60)
    timerGhostId = setInterval(moveGhosts, speedGhosts)

  })
})
