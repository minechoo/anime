class Anime {
	constructor(selector, option) {
		this.selector = selector;
		this.option = option;
		this.startTime = performance.now();
		this.currentValue = null;

		this.option.prop === 'scroll'
			? (this.currentValue = this.selector.scrollY)
			: (this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]));

		this.isString = typeof this.option.value;
		if (this.isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			const errProps = [
				'margin-left',
				'margin-right',
				'padding-left',
				'padding-right',
				'margin-top',
				'margin-bottom',
				'padding-top',
				'padding-bottom',
			];

			for (let cond of errProps)
				if (this.option.prop === cond) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');

			for (let cond of x) this.option.prop === cond && (this.currentValue = (this.currentValue / parentW) * 100);
			for (let cond of y) this.option.prop === cond && (this.currentValue = (this.currentValue / parentH) * 100);

			this.option.value = parseFloat(this.option.value);
		}
		//프로토타입에 등록되어 있는 run메서드 안쪽에서 this객체를 못 읽는 이유
		//화살표함수 안쪽에 this객체가 있어야지 상위 코드블록의 this객체값을 참조해서 가져옴
		//특정 메서드를 화살표 함수로 wrapping처리
		//주의할점 - requestAnimationFrame은 직계 콜백함수에만 파라미터를 전달하기 때문에
		//중간에 wrapping함수로 감싸주면 파라미터값을 wrapping함수에 전달되므로 해당 값을 다시 안쪽에 재 전달해줘야함
		this.option.value !== this.currentValue && requestAnimationFrame((time) => this.run(time));
		// this.option.value !== this.currentValue && requestAnimationFrame(this.run.bind(this));
	}
	run(time) {
		console.log(this);
		let timelast = time - this.startTime;
		let progress = timelast / this.option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame((time) => this.run(time)) : this.option.callback && this.option.callback();

		let result = this.currentValue + (this.option.value - this.currentValue) * progress;

		if (this.isString === 'string') this.selector.style[this.option.prop] = result + '%';
		else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
		else if (this.option.prop === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[this.option.prop] = result + 'px';
	}
}
