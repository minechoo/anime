/*
  peformance.now();
  1ms단위로 정밀한 시간계산이 가능
  브라우저가 로딩된 순간부터 해당 구문이 호출된 시점까지의 시간을 ms단위로 반환
  정밀한 시간계산이 필요할때 활용됨

  특정시간동안 특정수치값의 변경
  반복횟수 X : 고정된 반복횟수안에서 변화량을 제어 O
*/

//1초동안 500px 이동
const btn = document.querySelector('button');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
	anime(box, {
		prop: 'margin-left',
		value: 500,
		duration: 1000,
		callback: () => {
			console.log('end');
		},
	});
});

function anime(selector, option) {
	startTime = performance.now();
	console.log('시작시간', startTime);
	requestAnimationFrame(move);

	function move(time) {
		//timelast : 각 사이클 마다 걸리는 누적시간
		let timelast = time - startTime;
		let progress = timelast / option.duration;

		//progress값이 시작이 음수로 떨어지거나 혹은 종료시 1이 넘어서는 경우를 각각 0, 1로 보정
		//progress값이 적용되는 targetValue값도 딱 정수로 떨어짐 (px단위에서 중요함)
		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1 && requestAnimationFrame(move);
		console.log('누적시간', timelast);
		console.log('진행률', progress);
		// console.log('반복횟수', count++);

		//고정되어 있는 반복횟수안에서 제어할 수 있는건 각 반복 사이클마다의 변화량이기때문에
		//변경하려고 하는 targetValue 값에 진행율을 곱해서 변화량을 제어
		selector.style[option.prop] = option.value * progress + 'px';
	}
}
