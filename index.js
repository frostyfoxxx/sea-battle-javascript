let field = new Array(10);
for (let i = 0; i < 10; i++) {
  field[i] = new Array(10)
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    field[i][j] = 0
  }
}

// const checkPlace = (x, y) => { // Здесь должна быть обработка ошибок 
//   if (field[x][y] === 1) {
//     console.log("Здесь уже есть корабль")
//     return false
//   }


// }

// Данные о количестве кораблей и их занимаемого пространства
let ships = [
  {
    "type": "four",
    "count": 1
  },
  {
    "type": "three",
    "count": 2
  },
  {
    "type": "two",
    "count": 3
  },
  {
    "type": "one",
    "count": 4
  },
];

const checkTypeShip = (lenghtX, lenghtY) => {
  let type;
  let lenght = lenghtX > lenghtY ? lenghtX : lenghtY;
  // console.log(lenght);
  switch (lenght) {
    case 1:
      type = "one"
      break
    case 2:
      type = "two"
      break
    case 3:
      type = "three"
      break
    case 4:
      type = 'four'
      break
    default: 
      type = undefined
      break
  }

  for(let i = 0; i < ships.length; i++) {
    if(ships[i].type == type) {
      if(ships[i].count != 0) {
        ships[i].count--
        return true
      } else {
        return false
      }
    }
  }
}

const createShip = (startX, startY, endX, endY) => {
  let lenghtX, lenghtY
  // Находим длину корабля
  lenghtX = Math.abs(endX - startX)
  lenghtY = Math.abs(endY - startY)
  lenghtX === 0 ? lenghtX++ : lenghtX
  lenghtY === 0 ? lenghtY++ : lenghtY

  // Проверяем, есть ли такой корабль
  let resultCheck = checkTypeShip(lenghtX, lenghtY)
  if (!resultCheck) {
    console.log('Исчерпан лимит установки корабля данного типа')
    return false
  }

  // Выясняем откуда заполнять поле
  let minX = startX < endX ? startX : endX
  let minY = startY < endY ? startY : endY
  console.log(minX, minY)
  console.log(lenghtX, lenghtY)

  for (let i = minY; i < lenghtY + minY; i++) {
    for (let j = minX; j < lenghtX + minX; j++) {
      field[i][j] = 1
    }
  }
}

// TODO: Сделать проверку на допустимое расположение кораблей, на создание корабля в той же области и сделать GUI

// createShip(0, 2, 4, 2)
// createShip(0, 4, 3, 4)
// createShip(0, 6, 3, 6)


console.log(field)



  // if(field[x-1][y] === 1 || field[x+1][y] === 1 || field[x][y-1] === 1|| field[x][y+1] === 1 || field[x-1][y-1] === 1 || field[x+1][y+1] === 1 || field[x+1][y-1] === 1 || field[x-1][y+1] === 1) {
  //   console.log("ЗАПРЕЩЕНО")
  //   return false
  // }