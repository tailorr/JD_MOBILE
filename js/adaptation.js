window.addEventListener('load', function() {
	//viewport适配
	var scale = 1 / window.devicePixelRatio;
	var meta = document.createElement('meta');
	meta.setAttribute('name', "viewport");
	meta.setAttribute('content', "user-scalable=no,initial-scale=" + scale + ",minimum-scale=" + scale + ",maximum-scale=" + scale);
	document.head.appendChild(meta);

	setRem();
	window.addEventListener("orientationchange", setRem);
	window.addEventListener("resize", setRem);

	//rem适配
	function setRem() {
		var html = document.querySelector('html');
		var width = html.getBoundingClientRect().width;
		html.style.fontSize = width / 16 + "px";
	}

	// document.addEventListener(
	// 	'touchstart', //阻止默认事件
	// 	function(e) {
	// 		e.preventDefault();
	// 	}
	// )
})