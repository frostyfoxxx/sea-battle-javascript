//  Блок данных

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

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Блок модулей
const createLeftForbiddenArea = (minX, minY, lengthX, lengthY) => {
  for (let y = minY; y < lengthY + minY; y++) {
    for (let x = minX - 1; x < lengthX + minX - 1; x++) {
      field[y][x] = 2
    }
  }
}

const createRightForbiddenArea = (minX, minY, lengthX, lengthY) => {
  for (let y = minY; y < lengthY + minY; y++) {
    for (let x = minX + 1; x < lengthX + minX + 1; x++) {
      field[y][x] = 2
    }
  }
}

const createUpForbiddenArea = (minX, minY, lengthX, lengthY) => {
  for (let y = minY - 1; y < lengthY + minY - 1; y++) {
    for (let x = minX; x < lengthX + minX; x++) {
      field[y][x] = 2
    }
  }
}

const createDownForbiddenArea = (minX, minY, lengthX, lengthY) => {
  for (let y = minY + 1; y < lengthY + minY + 1; y++) {
    for (let x = minX; x < lengthX + minX; x++) {
      field[y][x] = 2
    }
  }
}

const createHorizontalForbiddenStart = (x, y,) => {
  field[y - 1][x - 1] = field[y][x - 1] = field[y + 1][x - 1] = 2
}
const createHorizontalForbiddenEnd = (x, y) => {
  field[y - 1][x + 1] = field[y][x + 1] = field[y + 1][x + 1] = 2
}
const createVerticalForbiddenStart = (x, y) => {
  field[y - 1][x - 1] = field[y - 1][x] = field[y - 1][x + 1] = 2
}
const createVerticalForbiddenEnd = (x, y) => {
  field[y + 1][x - 1] = field[y + 1][x] = field[y + 1][x + 1] = 2
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
//  Блок проверок

const checkTypeShip = (lengthX, lengthY) => {
  let type;
  let length = lengthX > lengthY ? lengthX : lengthY;
  // console.log(lenght);
  switch (length) {
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

  for (let i = 0; i < ships.length; i++) {
    if (ships[i].type == type) {
      if (ships[i].count != 0) {
        ships[i].count--
        return true
      } else {
        return false
      }
    }
  }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Функциональный блок

const createForbiddenArea = (minX, minY, lengthX, lengthY, startX, startY, endX, endY) => {
  const type = lengthX > lengthY ? 'horizontal' : 'vertical'

  switch (type) {
    case 'vertical':
      if (minX != 0) {
        console.log('лефт-ареа')
        createLeftForbiddenArea(minX, minY, lengthX, lengthY)
      }

      if (minX != 9) {
        console.log('райт-ареа')
        createRightForbiddenArea(minX, minY, lengthX, lengthY)
      }

      if (minX != 0 || minY != 0) {
        console.log('вертикал-топ')
        createVerticalForbiddenStart(startX, startY)
      }

      if (endY != 9 ) {
        console.log('вертикал-давн')
        createVerticalForbiddenEnd(endX, endY)
      }

      break;
    case 'horizontal':
      createUpForbiddenArea(minX, minY, lengthX, lengthY)
      createDownForbiddenArea(minX, minY, lengthX, lengthY)

      createHorizontalForbiddenStart(startX, startY)
      createHorizontalForbiddenEnd(endX, endY)

      break
  }
}

const checkArea = (startX, startY, endX, endY) => {

}


const createShip = (startX, startY, endX, endY) => {

  let lengthX, lengthY, minX, minY
  // Находим длину корабля
  lengthX = Math.abs(endX - startX)
  lengthY = Math.abs(endY - startY)

  // Находим начало
  minX = startX < endX ? startX : endX
  minY = startY < endY ? startY : endY

  // Итерируем длину, не равную 0, чтобы Длина стала совпадать с задаваемыми координатами
  lengthX !== 0 ? lengthX++ : lengthX
  lengthY !== 0 ? lengthY++ : lengthY

  // Добавляем +1 чтобы одна из длин не была 0 (чтобы цикл постройки корабля работал)
  lengthX === 0 ? lengthX++ : lengthX
  lengthY === 0 ? lengthY++ : lengthY



  // Проверяем, есть ли возможность установить корабль такого же типа
  let resultCheck = checkTypeShip(lengthX, lengthY)
  if (!resultCheck) {
    console.log('Исчерпан лимит установки корабля данного типа')
    return false
  }

  console.log('MinX = ' + minX + " " + 'MinY = ' + minY)
  console.log('LengthX = ' + lengthX + " " + 'LengthY = ' + lengthY)

  for (let y = minY; y < lengthY + minY; y++) {
    for (let x = minX; x < lengthX + minX; x++) {
      field[y][x] = 1
    }
  }

  createForbiddenArea(minX, minY, lengthX, lengthY, startX, startY, endX, endY)
}

// TODO: Сделать проверку на допустимое расположение кораблей, на создание корабля в той же области и сделать GUI



// Horizontal
// createShip(1, 2, 4, 2)
// Vertical

createShip(9, 6, 9, 9)


console.log(field)




