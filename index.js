window.addEventListener('DOMContentLoaded', function () {

	let $start = document.querySelector('#start'),
		$gameField = document.querySelector('#game'),
		$timerInput = document.querySelector('#game-time'),			
		$timeLeft = document.querySelector('#time'),		
		$resultHeader = document.querySelector('#result-header'),
		$result = document.querySelector('#result'),
		$timeHeader = document.querySelector('#time-header'),
		gameSize = $gameField.getBoundingClientRect(),
		score = 0;
	

	function startGame() {		
		$resultHeader.classList.add('hide');
		$timeHeader.classList.remove('hide');
		
		$start.classList.add('hide');
		$gameField.style.backgroundColor = 'white';

		let timeInterval = setInterval(function () {
			let timeCounter = parseFloat($timeLeft.textContent);
			if (timeCounter <= 0) {
				clearInterval(timeInterval);
				endGame();
			} else {
				$timeLeft.textContent = (timeCounter - 0.1).toFixed(1);
			}
		}, 100);
		renderBox();
	}

	function handleBoxClick(event) {
		if (event.target.dataset.box) {
			score++;
			renderBox();
		}
	}

	function getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function renderBox() {
		let box = document.createElement('div'),
			boxSize = getRandom(30, 100),
			maxTop = gameSize.height - boxSize,
			maxLeft = gameSize.width - boxSize;
		//очищаем поле	
		$gameField.innerHTML = '';
		//рандомим размер+цвет+положение квадрата
		box.style.height = box.style.width = boxSize + 'px';
		box.style.position = 'absolute';
		box.style.backgroundColor = getRandomColor();
		box.style.top = getRandom(0, maxTop) + 'px';
		box.style.left = getRandom(0, maxLeft) + 'px';
		box.style.cursor = 'pointer';
		box.setAttribute('data-box', 'true');
		$gameField.insertAdjacentElement('afterbegin', box);
	}

	function endGame() {
		$gameField.innerHTML = '';
		$start.classList.remove('hide');
		$gameField.style.backgroundColor = '';
		timeLeftEqualInput();
		$resultHeader.classList.remove('hide');
		$timeHeader.classList.add('hide');
		$result.innerHTML = score;
		$timerInput.removeAttribute('disabled');
	}

	function timeLeftEqualInput() {
		$timeLeft.textContent = $timerInput.value;
	}


	$start.addEventListener('click', startGame);
	$start.addEventListener('click', () =>{
		$timeLeft = document.querySelector('#time');
		$timeLeft.textContent = $timerInput.value;
		$timerInput.setAttribute('disabled', '');

	});
	$gameField.addEventListener('click', handleBoxClick);
	$timerInput.addEventListener('input', timeLeftEqualInput);
});