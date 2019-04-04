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
  const pacmanDeathVoice = new Audio("assets/music/pacman_death.wav")
  const eatPineappleWav = new Audio("assets/music/pacman_chomp.wav")
  const eatCherryWav = new Audio('assets/music/pacman_eatfruit.wav')
  const pacmanIntroMusic = new Audio("assets/music/pacman_beginning.wav")



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
  let playerEatingGhostIndex = 0

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

  function playIntroMusic() {
    pacmanIntroMusic.play()
    countIntroMusic--
    if (countIntroMusic === 0) {
      pacmanIntroMusic.pause()
      clearInterval(introMusicTimer)
    }
  }
  // const introMusicTimer = setInterval(playIntroMusic, 1000)

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

  function createFoods() {
    console.log('hii')
    return squares.forEach(square => {
      if (square.classList.contains('way') && !square.classList.contains('player') && !square.classList.contains('ghost') && !square.classList.contains('ghost2') && !square.classList.contains('ghost3')) square.classList.add('pineapple')

    })
  }
  createMaze()
  //  createFood()
  squares[playerIndex].classList.add('player')
  createGhosts()
  createFoods()

  function calculateDistanceAndPositionForGhost() {
    realMoves = availableMoves.filter(availableMove => {
      return (!squares[ghostStep + availableMove].classList.contains('wall') && !squares[ghostStep + availableMove].classList.contains('ghost2') && !squares[ghostStep + availableMove].classList.contains('ghost3') && !squares[ghostStep + availableMove].classList.contains('ghostSick'))
    })
    //  console.log('Real moves for ghost ' + realMoves)
    distances = realMoves.map(realMove => {
      return Math.abs(ghostStep + realMove - playerIndex)
    })
    //  console.log('real distance ' + distances)
    realMoves2 = availableMoves.filter(availableMove2 => {
      return (!squares[ghostStep2 + availableMove2].classList.contains('wall') && !squares[ghostStep2 + availableMove2].classList.contains('ghost1') && !squares[ghostStep2 + availableMove2].classList.contains('ghost3') && !squares[ghostStep2 + availableMove2].classList.contains('ghostSick'))
    })
    //  console.log('Real moves for ghost2 ' + realMoves2)
    distances2 = realMoves2.map(realMove2 => {
      return Math.abs(ghostStep2 + realMove2 - playerIndex)
    })
    //  console.log('real distance2 ' + distances2)
    realMoves3 = availableMoves.filter(availableMove3 => {
      return (!squares[ghostStep3 + availableMove3].classList.contains('wall') && !squares[ghostStep3 + availableMove3].classList.contains('ghost1') && !squares[ghostStep3 + availableMove3].classList.contains('ghost2') && !squares[ghostStep3 + availableMove3].classList.contains('ghostSick'))
    })
    //    console.log('Real moves for ghost3 ' + realMoves3)
    distances3 = realMoves3.map(realMove3 => {
      return Math.abs(ghostStep3 + realMove3 - playerIndex)
    })
    //  console.log('real distance3 ' + distances3)

  }

  function removeGhosts() {
    squares[ghostStep].classList.remove('ghost')
    squares[ghostStep2].classList.remove('ghost2')
    squares[ghostStep3].classList.remove('ghost3')
  }

  function addGhosts() {
    squares[ghostStep].classList.add('ghost')
    squares[ghostStep2].classList.add('ghost2')
    squares[ghostStep3].classList.add('ghost3')
  }

  function addGhostSicks() {
    squares[ghostStep].classList.add('ghostSick')
    squares[ghostStep2].classList.add('ghostSick')
    squares[ghostStep3].classList.add('ghostSick')
  }

  function addPineApples() {
    squares[ghostStep].classList.add('pineapple')
    squares[ghostStep2].classList.add('pineapple')
    squares[ghostStep3].classList.add('pineapple')
  }

  function addCherries() {
    squares[ghostStep].classList.add('cherry')
    squares[ghostStep2].classList.add('cherry')
    squares[ghostStep3].classList.add('cherry')
  }



  function moveGhosts() {
    console.log('movin')
    removeGhosts()
    // checkCherryAndPineAppleForGhost()
    calculateDistanceAndPositionForGhost()
    ghostStep += realMoves[distances.indexOf(Math.min(...distances))]
    ghostStep2 += realMoves2[distances2.indexOf(Math.min(...distances2))]
    ghostStep3 += realMoves3[distances3.indexOf(Math.min(...distances3))]
    //  console.log(ghostStep)
    //  console.log(ghostStep2)
    //  console.log(ghostStep3)

    // if (!squares[ghostStep].classList.contains('wall')) {
    //   if (squares[ghostStep].classList.contains('cherry')) {
    //     isCherry1 = true
    //     squares[ghostStep].classList.remove('cherry')
    //
    //   } else if (squares[ghostStep].classList.contains('pineapple')) {
    //     squares[ghostStep].classList.remove('pineapple')
    //     isPineApple = true
    //   }
    // }
    //
    // if (!squares[ghostStep2].classList.contains('wall')) {
    //   if (squares[ghostStep2].classList.contains('cherry')) {
    //     squares[ghostStep2].classList.remove('cherry')
    //     isCherry2 = true
    //   } else if (squares[ghostStep2].classList.contains('pineapple')) {
    //     squares[ghostStep2].classList.remove('pineapple')
    //     isPineApple2 = true
    //   }
    // }
    // if (!squares[ghostStep3].classList.contains('wall')) {
    //   if (squares[ghostStep3].classList.contains('cherry')) {
    //     squares[ghostStep3].classList.remove('cherry')
    //     isCherry3 = true
    //
    //   } else if (squares[ghostStep3].classList.contains('pineapple')) {
    //     squares[ghostStep3].classList.remove('pineapple')
    //     isPineApple3 = true
    //   }
    // }
    addGhosts()

    if (squares[ghostStep].classList.contains('player') || squares[ghostStep2].classList.contains('player') || squares[ghostStep3].classList.contains('player')) {
      resultGame.innerText = 'Game over'
      clearInterval(timerId)
      timeResult = 0
      time.innerText = timeResult
      clearInterval(timerGhostId)
      clearInterval(timerGhostAway)
      pacmanDeathVoice.play()
      isGamePlay = false
    }
  }

  function removeGhostSick() {
    squares[ghostStep].classList.remove('ghostSick')
    squares[ghostStep2].classList.remove('ghostSick')
    squares[ghostStep3].classList.remove('ghostSick')
  }



  function ghostAway() {
    if (isGhostSick && isGamePlay) {
      removeGhosts()
      removeGhostSick()

      calculateDistanceAndPositionForGhost()
      ghostStep += realMoves[distances.indexOf(Math.max(...distances))]
      ghostStep2 += realMoves2[distances2.indexOf(Math.max(...distances2))]
      ghostStep3 += realMoves3[distances3.indexOf(Math.max(...distances3))]
      console.log(ghostStep)
      console.log(ghostStep2)
      console.log(ghostStep3)
      if (!squares[ghostStep].classList.contains('wall') && !squares[ghostStep2].classList.contains('wall') && !squares[ghostStep3].classList.contains('wall')) {


        addGhostSicks()
      }

      if (squares[ghostStep].classList.contains('player') || squares[ghostStep2].classList.contains('player') || squares[ghostStep3].classList.contains('player')) {
        pacmanDeathVoice.play()
        resultGame.innerText = 'Game over'
        squares[playerIndex].classList.remove('player')
        squares[playerIndex].classList.add('deathpacman')
        clearInterval(timerId)
        timeResult = 0
        time.innerText = timeResult
        isGamePlay = false

      }
      ghostAwayCount--
      if (ghostAwayCount === 0) {
        clearInterval(timerGhostAway)
        removeGhostSick()
        ghostAwayCount = 8
        if (ghostStep !== playerEatingGhostIndex || ghostStep2 !== playerEatingGhostIndex || ghostStep3 !== playerEatingGhostIndex)
          addGhosts()
        if (ghostStep === playerEatingGhostIndex)
          squares[ghostStep].classList.remove('ghost')

        if (ghostStep2 === playerEatingGhostIndex)
          squares[ghostStep2].classList.remove('ghost2')
        if (ghostStep3 === playerEatingGhostIndex)
          squares[ghostStep3].classList.remove('ghost3')

        timerGhostId = setInterval(moveGhosts, 1000)

        isGhostSick = false
        return
      }
    }
  }

  function updateScore() {
    if (squares[playerIndex].classList.contains('cherry')) {
      scoreResult += 5
      squares[playerIndex].classList.remove('cherry')
      eatCherryWav.play()
    } else if (squares[playerIndex].classList.contains('pineapple')) {
      scoreResult += 1
      eatPineappleWav.play()
      squares[playerIndex].classList.remove('pineapple')
    }
    score.innerText = scoreResult
  }

  const timerCheckScore = setInterval(updateScore, 60)

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

      if (squares[playerIndex].classList.contains('cherry')) {
        //  scoreResult += 5
        //  squares[playerIndex].classList.remove('cherry')
        //  eatCherryWav.play()
        timeResult += 5
        timerGhostAway = setInterval(ghostAway, 1000)
        clearInterval(timerGhostId)
        isGhostSick = true

      } else if (squares[playerIndex].classList.contains('pineapple')) {
        //  scoreResult += 1
        //  eatPineappleWav.play()
        //    squares[playerIndex].classList.remove('pineapple')
      } else if (squares[playerIndex].classList.contains('ghostSick')) {
        squares[playerIndex].classList.remove('ghostSick')
        playerEatingGhostIndex = playerIndex
        console.log('I ate you')
      }

      mazeArray[playerIndex] = 0

      if(scoreResult===180){
        resultGame.classList.add('winner')
        clearInterval(timerGhostId)
        clearInterval(timerGhostAway)
        
      }



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
  startButton.addEventListener('click', () => {
    console.log('start button clicked...')
    document.addEventListener('keydown', keyInputs)
    pacmanIntroMusic.pause()
    // clearInterval(introMusicTimer)
    timer()
    timerGhostId = setInterval(moveGhosts, 1000)
  })

  resetButton.addEventListener('click', () => {

    score.innerText = 0
    scoreResult = 0
    timeResult = 60
    time.innerText = 60
    isGamePlay = true
    clearInterval(timerId)
    timer()
    timerGhostId = setInterval(moveGhosts, 1000)
  })
})
