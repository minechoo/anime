/*
  peformance.now();
  1ms단위로 정밀한 시간계산이 가능
  브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지의 시간을 ms단위로 반환
  정밀한 시간계산이 필요할때 활용됨

  특정시간동안 특정수치값의 변경
  반복횟수 X : 고정된 반복횟수안에서 변화량을 제어 O
*/

const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-left',
		value: 500,
		duration: 1000,
		callback: () => {
			console.log('end');
			anime(box, {
				prop: 'margin-top',
				value: 500,
				duration: 1000,
			});
		},
	});
});

function anime(selector, option) {
	const startTime = performance.now();
	console.log('시작시간', startTime);

	//현재 css에 적용되어있는 값을 가져온뒤, parseInt 를 활용해 숫자값으로 변경
	const currentValue = parseInt(getComputedStyle(selector)[option.prop]);

	if (option.value !== currentValue) requestAnimationFrame(run);

	function run(time) {
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 ? requestAnimationFrame(run) : option.callback && option.callback();
		console.log('누적시간', timelast);
		console.log('진행률', progress);

		let result = currentValue + (option.value - currentValue) * progress;
		selector.style[option.prop] = result + 'px';
	}
}
