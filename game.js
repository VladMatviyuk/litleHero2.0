let hero,
  bullet,
  bullet2,
  bullet3,
  bullet4,
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  startPlatform,
  bullets = [],
  score,
  bonusCoin,
  elementsInGame = [];
start = false;

let heroOptions = {
  width: 35,
  height: 45,
  color: "hero.gif",
  startX: 400,
  startY: 250,
  speed: 5,
};

let startPlatformoptions = {
  width: 80,
  height: 80,
  color: "yellow",
  x: 200,
  y: 200,
};

function getRandomCoordinate(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

// Функция запуска игры и добавление в ней контента
function gameStart(cornelGame) {
  hero = new component(
    heroOptions.width,
    heroOptions.height,
    heroOptions.color,
    heroOptions.startX,
    heroOptions.startY,
    "image"
  );

  bullet = new component(20, 20, "bullet.png", heroOptions.startX, 0, "image");
  bullet2 = new component(20, 20, "bullet.png", 0, heroOptions.startY, "image");
  bullet3 = new component(
    20,
    20,
    "fireball.png",
    heroOptions.startX + 50,
    500,
    "image"
  );
  bullet4 = new component(20, 20, "fireball.png", 800, hero.y, "image");
  bonusCoin = new component(
    20,
    20,
    "coin.png",
    getRandomCoordinate(0 + 40, 800 - 40),
    getRandomCoordinate(0 + 40, 500 - 40),
    "image"
  );

  enemy1 = new component(35, 40, "ork.png", heroOptions.startX, 0, "image");
  enemy2 = new component(
    35,
    40,
    "ork.png",
    0,
    cornelGame.canvas.height - 40,
    "image"
  );
  enemy3 = new component(
    35,
    40,
    "ork.png",
    heroOptions.startX + 50,
    465,
    "image"
  );
  enemy4 = new component(35, 40, "ork.png", 780, 35, "image");

  startPlatform = new component(
    startPlatformoptions.width,
    startPlatformoptions.height,
    startPlatformoptions.color,
    startPlatformoptions.x,
    startPlatformoptions.y
  );
  score = new component("30px", "Consolas", "black", 10, 35, "text");
  bullets = [bullet, bullet2, bullet3, bullet4];
  cornelGame.start();
}

// Шаблон элементов игры
function component(width, height, color, x, y, type) {
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = cornelGame.context;

    switch (type) {
      case "image":
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        break;
      case "text":
        ctx.font = this.width + " " + this.height;
        ctx.font = '28px "ARCADECLASSIC"';
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
        break;
      default:
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        break;
    }
  };
  this.takeCoin = function (element) {
    let heroLeft = this.x;
    let heroRight = this.x + this.width;
    let heroTop = this.y;
    let heroBottom = this.y + this.height;

    let bulletLeft = element.x;
    let bulletRright = element.x + element.width;
    let bulletTop = element.y;
    let bulletBottom = element.y + element.height;
    let takeCoin = true;
    if (
      heroBottom < bulletTop ||
      heroTop > bulletBottom ||
      heroRight < bulletLeft ||
      heroLeft > bulletRright
    ) {
      takeCoin = false;
    }
    return takeCoin;
  };
  this.deadHero = function (bullet) {
    let heroLeft = this.x;
    let heroRight = this.x + this.width;
    let heroTop = this.y;
    let heroBottom = this.y + this.height;

    let bulletLeft = bullet.x;
    let bulletRright = bullet.x + bullet.width;
    let bulletTop = bullet.y;
    let bulletBottom = bullet.y + bullet.height;
    let heroLife = false;
    if (
      heroBottom < bulletBottom ||
      heroTop > bulletTop ||
      heroRight < bulletRright ||
      heroLeft > bulletLeft
    ) {
      heroLife = true;
    }
    return heroLife;
  };
}

// Ядро игры
let cornelGame = {
  // Создание тега canvas на экране
  canvas: document.createElement("canvas"),
  // Ффункция иницилиазации игры
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Функция обновления экрана
    this.interval = setInterval(updateGame, 15);
    this.timeToStart = 3;
    // Обработчики событый нажатия клавишы
    window.addEventListener("keydown", function (e) {
      cornelGame.keys = cornelGame.keys || [];
      cornelGame.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
      cornelGame.keys[e.keyCode] = false;
      if (e.keyCode == 32) {
        start = !start;
      }
      if (e.keyCode == 13) {
        document.location.reload();
        // gameStart(cornelGame);
      }
    });
    // Регистраиция события клика мышью
    // window.addEventListener('click', function (e) {
    // 	let canvasElem = document.querySelector("canvas");
    // 	let rect = canvasElem.getBoundingClientRect();
    // 	cornelGame.x = e.clientX - rect.left;
    // 	cornelGame.y = e.clientY - rect.top;
    // })
  },
  scoreCount: 0,
  // Очистка экрана
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
  startNow: function () {},
};

function everyinterval(n) {
  if ((cornelGame.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

// Функция цикла игры
function updateGame() {
  // Обработка события клика мышью
  // if (cornelGame.x && cornelGame.y) {
  // 	hero.x = cornelGame.x;
  // 	hero.y = cornelGame.y;
  // }
  // if (cornelGame.keys[32]) {  }

  if (start) {
    // Проверка обработки события
    if ((cornelGame.keys && cornelGame.keys[37]) || cornelGame.keys[65]) {
      hero.image.src = "heroL.gif";
      hero.x -= heroOptions.speed;
    }
    if ((cornelGame.keys && cornelGame.keys[39]) || cornelGame.keys[68]) {
      hero.x += heroOptions.speed;
      hero.image.src = "hero.gif";
    }
    if ((cornelGame.keys && cornelGame.keys[38]) || cornelGame.keys[87]) {
      hero.y -= heroOptions.speed;
    }
    if ((cornelGame.keys && cornelGame.keys[40]) || cornelGame.keys[83]) {
      hero.y += heroOptions.speed;
    }

    enemy1.x = hero.x;
    enemy2.y = hero.y;
    enemy3.x =
      cornelGame.canvas.width / 2 > hero.x
        ? (enemy3.x = hero.x + 150)
        : (enemy3.x = hero.x - 150);
    enemy4.y =
      cornelGame.canvas.height / 2 > hero.y
        ? (enemy4.y = hero.y + 75)
        : (enemy4.y = hero.y - 75);

    for (let i = 0; i < bullets.length; i++) {
      // bullets[i].update();
      if (!hero.deadHero(bullets[i])) {
        cornelGame.stop();
        return;
      }
    }

    for (let i = 0; i < elementsInGame.length; i++) {
      if (hero.takeCoin(elementsInGame[i])) {
        cornelGame.scoreCount += 250;
        elementsInGame = [];
      }
    }

    cornelGame.scoreCount += 0.5;

    cornelGame.clear();
    cornelGame.frameNo += 1;
    hero.update();

    enemy1.update();
    bullet.update();
    bullet.y += 5;

    if (bullet.y > cornelGame.canvas.height) {
      bullet.y = 0;
      bullet.x = hero.x;
    }

    if (cornelGame.scoreCount > 1500) {
      bullet2.x += 5;
      if (bullet2.x > cornelGame.canvas.width) {
        bullet2.x = 0;
        bullet2.y = hero.y;
      }
      enemy2.update();
      bullet2.update();
    }
    if (cornelGame.scoreCount > 3500) {
      bullet3.y -= 5;
      if (bullet3.y < 0) {
        bullet3.y = cornelGame.canvas.height;
        bullet3.x =
          cornelGame.canvas.width / 2 > hero.x
            ? (bullet3.x = hero.x + 150)
            : (bullet3.x = hero.x - 150);
      }
      enemy3.update();
      bullet3.update();
    }

    if (cornelGame.scoreCount > 5500) {
      bullet4.x -= 5;
      if (bullet4.x < 0) {
        bullet4.x = cornelGame.canvas.width;
        bullet4.y =
          cornelGame.canvas.height / 2 > hero.y
            ? bullet4.y + 75
            : (bullet4.y = hero.y - 75);
      }
      enemy4.update();
      bullet4.update();
    }

    let x, y;
    if (everyinterval(300)) {
      if (elementsInGame.length == 0) {
        x = getRandomCoordinate(40, cornelGame.canvas.width - 40);
        y = getRandomCoordinate(40, cornelGame.canvas.height - 40);
        elementsInGame.push(new component(25, 25, "coin.png", x, y, "image"));
      } else {
        elementsInGame = [];
      }
    }
    for (let i = 0; i < elementsInGame.length; i++) {
      elementsInGame[i].update();
    }

    score.text = "score: " + Math.floor(cornelGame.scoreCount);
    score.update();
  }
}

// Запуск игры
gameStart(cornelGame);
