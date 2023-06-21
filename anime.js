const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(window, {
		prop: 'scroll',
		value: 1000,
		duration: 1000,
		callback: () => {
			console.log('end');
			anime(box, {
				prop: 'top',
				value: '50%',
				duration: 1000,
			});
		},
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	console.log('시작시간', startTime);
	let currentValue = null;

	option.prop === 'scroll' ? (currentValue = selector.scrollY) : parseFloat(getComputedStyle(selector)[option.prop]);

	//만약에 value 속성으로 받은 값이 문자열이면 퍼센트연산처리 해야되므로 정수가 아닌 실수로 변환
	const isString = typeof option.value;
	if (isString === 'string') {
		const parentW = parseInt(getComputedStyle(selector.parentElement).width);
		const parentH = parseInt(getComputedStyle(selector.parentElement).height);

		const x = ['left', 'right', 'width'];
		const y = ['top', 'bottom', 'height'];
		const errProps = ['margin-left', 'margin-right', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom'];

		for (let cond of errProps) if (option.prop === cond) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');

		//option.prop값으로 위의 배열로 설정한 속성이 들어오면 currentValue값을 부모요소의 크기대비 퍼센트로 변환
		for (let cond of x) option.prop === cond && (currentValue = (currentValue / parentW) * 100);
		for (let cond of y) option.prop === cond && (currentValue = (currentValue / parentH) * 100);

		option.value = parseFloat(option.value);
	}

	option.value !== currentValue && requestAnimationFrame(run);

	function run(time) {
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(run) : option.callback && option.callback();
		console.log('누적시간', timelast);
		console.log('진행률', progress);

		let result = currentValue + (option.value - currentValue) * progress;

		if (isString === 'string') selector.style[option.prop] = result + '%';
		else if (option.prop === 'opacity') selector.style[option.prop] = result;
		else if (option.prop === 'scroll') selector.scroll(0, result);
		else selector.style[option.prop] = result + 'px';
	}
}
