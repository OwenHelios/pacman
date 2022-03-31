const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

class Boundary {
  static width = 40
  static height = 40
  constructor({ position }) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }
  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'yellow'
    c.fill()
    c.closePath()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const map = [
  ['-', '-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', ' ', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-', '-'],
]

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}
var lastKey = ''
var keysPressed = new Set()

const boundaries = []
const player = new Player({
  position: {
    x: Boundary.width * 1.5,
    y: Boundary.height * 1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
})

map.forEach((row, rowIndex) => {
  row.forEach((symbol, columnIndex) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex,
            },
          })
        )
        break
    }
  })
})

function circleCollidesIntoRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x
  )
}

function animate() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // If no key is pressed, set lastKey to null; If one key is pressed, set it to that key
  if (keysPressed.size <= 1) {
    lastKey = keysPressed.values().next().value
  }
  switch (lastKey) {
    case 'w':
      // for (let i = 0; i < boundaries.length; i++) {
      //   const boundary = boundaries[i]
      //   if (
      //     circleCollidesIntoRectangle({
      //       circle: {
      //         ...player,
      //         velocity: {
      //           x: 0,
      //           y: -3,
      //         },
      //       },
      //       rectangle: boundary,
      //     })
      //   ) {
      //     player.velocity.y = 0
      //     break
      //   } else {
      //     player.velocity.y = -3
      //   }
      // }
      // player.velocity.x = 0
      player.velocity.y = -3
      break
    case 'a':
      // for (let i = 0; i < boundaries.length; i++) {
      //   const boundary = boundaries[i]
      //   if (
      //     circleCollidesIntoRectangle({
      //       circle: {
      //         ...player,
      //         velocity: {
      //           x: -3,
      //           y: 0,
      //         },
      //       },
      //       rectangle: boundary,
      //     })
      //   ) {
      //     player.velocity.x = 0
      //     break
      //   } else {
      //     player.velocity.x = -3
      //   }
      // }
      // player.velocity.y = 0
      player.velocity.x = -3
      break
    case 's':
      // for (let i = 0; i < boundaries.length; i++) {
      //   const boundary = boundaries[i]
      //   if (
      //     circleCollidesIntoRectangle({
      //       circle: {
      //         ...player,
      //         velocity: {
      //           x: 0,
      //           y: 3,
      //         },
      //       },
      //       rectangle: boundary,
      //     })
      //   ) {
      //     player.velocity.y = 0
      //     break
      //   } else {
      //     player.velocity.y = 3
      //   }
      // }
      // player.velocity.x = 0
      player.velocity.y = 3
      break
    case 'd':
      // for (let i = 0; i < boundaries.length; i++) {
      //   const boundary = boundaries[i]
      //   if (
      //     circleCollidesIntoRectangle({
      //       circle: {
      //         ...player,
      //         velocity: {
      //           x: 3,
      //           y: 0,
      //         },
      //       },
      //       rectangle: boundary,
      //     })
      //   ) {
      //     player.velocity.x = 0
      //     break
      //   } else {
      //     player.velocity.x = 3
      //   }
      // }
      // player.velocity.y = 0
      player.velocity.x = 3
      break
    default:
      //set velocity to 0 if lastKey is null
      player.velocity.x = 0
      player.velocity.y = 0
      break
  }

  boundaries.forEach(boundary => {
    boundary.draw()
    if (circleCollidesIntoRectangle({ circle: player, rectangle: boundary })) {
      player.velocity.x = 0
      player.velocity.y = 0
    }
  })
  player.update()
}
animate()

addEventListener('keydown', ({ key }) => {
  console.log(keysPressed.size)
  keysPressed.add(key)
  lastKey = key
})
addEventListener('keyup', ({ key }) => {
  keysPressed.delete(key)
})
