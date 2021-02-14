let hero;

let heroOptions = {
	width: 30,
	height: 30,
	color: 'blue',
	startX: 10,
	startY: 120,
	speed: 3,
}

// Функция запуска игры и добавление в ней контента 
function gameStart() {
	hero = new component(heroOptions.width, heroOptions.height, heroOptions.color, heroOptions.startX, heroOptions.startY);

	cornelGame.start();
}

// Шаблон элементов игры
function component(width, height, color, x, y,) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function () {
		ctx = cornelGame.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

// Ядро игры
let cornelGame = {
	// Создание тега canvas на экране 
	canvas: document.createElement('canvas'),
	// Ффункция иницилиазации игры
	start: function () {
		this.canvas.width = 800;
		this.canvas.height = 500;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		// Функция обновления экрана 
		this.interval = setInterval(updateGame, 20);
		// Обработчики событый нажатия клавишы
		window.addEventListener('keydown', function (e) {
			cornelGame.keys = (cornelGame.keys || []);
			cornelGame.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			cornelGame.keys[e.keyCode] = false;
		})
		// Регистраиция события клика мышью 
		// window.addEventListener('click', function (e) {
		// 	let canvasElem = document.querySelector("canvas");
		// 	console.log(canvasElem);
		// 	let rect = canvasElem.getBoundingClientRect();
		// 	cornelGame.x = e.clientX - rect.left;
		// 	cornelGame.y = e.clientY - rect.top;
		// })

	},
	// Очистка экрана
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
};

// Функция цикла игры
function updateGame() {
	cornelGame.clear();
	// Проверка обработки события
	if (cornelGame.keys && cornelGame.keys[37]) { hero.x -= heroOptions.speed; }
	if (cornelGame.keys && cornelGame.keys[39]) { hero.x += heroOptions.speed; }
	if (cornelGame.keys && cornelGame.keys[38]) { hero.y -= heroOptions.speed; }
	if (cornelGame.keys && cornelGame.keys[40]) { hero.y += heroOptions.speed; }

	// Обработка события клика мышью 
	// if (cornelGame.x && cornelGame.y) {
	// 	console.log('cornelGame.x', cornelGame.x, 'cornelGame.y', cornelGame.y);
	// 	console.log('hero.x', hero.x, 'hero.y', hero.y);
	// 	hero.x = cornelGame.x;
	// 	hero.y = cornelGame.y;
	// }
	hero.update();
}

// Запуск игры
gameStart()