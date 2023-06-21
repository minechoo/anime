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
	});
});

function anime(selector, option) {
	startTime = performance.now();
	console.log('시작시간', startTime);
	requestAnimationFrame(move);

	function move(time) {
		//timelast : 각 사이클 마다 걸리는 누적시간
		let timelast = time - startTime;

		//매 반복횟수마다 현재 걸리는 누적시간값을 전체시간으로 나누면 0~1사이의 실수로 반환 가능
		//progress : 설정한 시간되비 현재 반복되는 모션 진행상황을 0~1사이의 소수점으로 나타내주는 진행률 (x100 -백분율)
		let progress = timelast / option.duration;
		console.log('누적시간', timelast);
		console.log('진행률', progress);
		console.log('반복횟수', count++);

		if (progress < 1) {
			requestAnimationFrame(move);
		}
		//고정되어 있는 반복횟수안에서 제어할 수 있는건 각 반복 사이클마다의 변화량이기때문에
		//변경하려고 하는 targetValue 값에 진행율을 곱해서 변화량을 제어
		selector.style[option.prop] = option.value * progress + 'px';
	}
}
