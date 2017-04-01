window.addEventListener('load', function() {

	document.addEventListener('touchstart', function(e) {
		e.preventDefault();
	})

	var myScroll = new Mscroll('.wrapper', {
		bounce: true,
		scrollBar: true,
		// scrollBounce:true,
	
		scrollMove: function() {
			// Header透明度
			var mHeader = document.querySelector('.m-header');
			var mPics = document.querySelector('.m-pics');
			var HY = mPics.offsetHeight - mHeader.offsetHeight;
			var sBtn = document.querySelector('.scroll-to-top');
			var opacity = -cssTransform(myScroll.scroller, 'translateY') / HY;
			if (opacity >= 5) {
				show(sBtn);
			} else {
				hide(sBtn);
			}
			opacity = opacity > 1 ? 1 : opacity;
			mHeader.style.background = 'rgba(226,27,43,' + opacity + ')';
			lazyLoad();
			// setTimeout(function(){
			myScroll.refresh();
			// }, 30);
		}
	});

	setHeight();
	picLoad();
	picTab();
	scrollInfo();
	popAnimate();
	timer();
	scrolltoTop();
	loginPage();
	mine();
	classify();
	var input = document.querySelectorAll('input');
	for (var i = 0; i < input.length; i++) {
		input[i].addEventListener(
			'touchstart', //阻止冒泡
			function(e) {
				e.stopPropagation();
			}
		)
	}
})



//信息滚动
function scrollInfo() {
	var info = document.querySelector('.info');
	var scroll = info.children[0];
	var scrollItem = scroll.getElementsByTagName('li');
	var num = 0;
	scroll.innerHTML += scroll.innerHTML;
	cssTransform(scroll, 'translateZ', 0.01);
	scroll.timer = setInterval(function() {
		if (num == 0) {
			num = 3;
		} else if (num == scrollItem.length - 1) {
			num = 2;
		}
		scroll.style.transition = 'none';
		cssTransform(scroll, 'translateY', -num * info.offsetHeight);
		setTimeout(function() {
			num++;
			scroll.style.transition = '1s';
			cssTransform(scroll, 'translateY', -num * info.offsetHeight);
		}, 30)
	}, 2000)
}

//图片轮播
function picTab() {
	// 图片数据加载
	var picsURL = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg"];
	var pics = document.querySelector('.pics');
	var dot = document.querySelector('.dot');
	var str = '';
	for (var i = 0; i < picsURL.length; i++) {
		pics.innerHTML += '<li><a href="#"><img src=' + picsURL[i] + '></a></li>';
		str += '<span></span>';
	}
	pics.innerHTML += pics.innerHTML;
	dot.innerHTML = str;
	var aLi = pics.getElementsByTagName('li');
	pics.style.width = aLi[0].offsetWidth * aLi.length + 'px';
	var aDot = dot.getElementsByTagName('span');
	var now = 0;
	aDot[now].className = 'active';

	//滑动
	var startX = 0;
	var timer = null;
	var isUpright = false;
	var isFirst = true;
	var lastPointX = 0;
	var lastTime = 0;
	var Dis = 0;
	var TimeDis = 0;
	cssTransform(pics, 'translateZ', 0.01);
	pics.addEventListener(
		'touchstart',
		function(e) {
			clearInterval(timer);
			startPointX = e.changedTouches[0].pageX;
			startPointY = e.changedTouches[0].pageY;
			pics.style.transition = 'none';
			startX = cssTransform(pics, 'translateX');
			now = Math.round(-startX / aLi[0].offsetWidth);
			if (now == aLi.length - 1) {
				now = aDot.length - 1;
			} else if (now == 0) {
				now = aDot.length;
			}
			cssTransform(pics, 'translateX', -now * aLi[0].offsetWidth);
			startX = cssTransform(pics, 'translateX');
			isUpright = false;
			isFirst = true;
			lastPointX = startPointX;
			lastTime = new Date().getTime();
			Dis = 0;
			TimeDis = 0;
		}
	)

	pics.addEventListener(
		'touchmove',
		function(e) {
			if (isUpright) return;
			nowPointX = e.changedTouches[0].pageX;
			nowPointY = e.changedTouches[0].pageY;
			disX = nowPointX - startPointX;
			disY = nowPointY - startPointY;
			if (isFirst) {
				isFirst = false;
				if (Math.abs(disX) < Math.abs(disY)) {
					isUpright = true;
					return;
				}
			}
			Dis = nowPointX - lastPointX;
			lastPointX = nowPointX;
			nowTime = new Date().getTime();
			TimeDis = nowTime - lastTime;
			lastTime = nowTime;
			nowX = startX + disX;
			if (!isUpright) {
				cssTransform(pics, 'translateX', nowX);
			}
		}
	)

	pics.addEventListener(
		'touchend',
		function(e) {
			//autoPlay();
			var speed = Dis / TimeDis;
			if (speed > 0.7) {
				now--;
				play();
			}
			if (speed < -0.7) {
				now++;
				play();
			}
			nowX = cssTransform(pics, 'translateX');
			now = Math.round(-nowX / aLi[0].offsetWidth);
			pics.style.transition = '0.5s';
			cssTransform(pics, 'translateX', -now * aLi[0].offsetWidth);
			play();
			autoPlay();
		}
	)

	autoPlay();

	function autoPlay() {
		timer = setInterval(function() {
			if (now == aLi.length - 1) {
				now = aDot.length;
				pics.style.transition = 'none';
				cssTransform(pics, 'translateX', -now * aLi[0].offsetWidth);
			}
			setTimeout(function() {
				now++;
				play();
			}, 30);
		}, 3000);
	}

	function play() {
		pics.style.transition = '0.5s';
		cssTransform(pics, 'translateX', -now * aLi[0].offsetWidth);
		for (var i = 0; i < aDot.length; i++) {
			aDot[i].className = '';
		}
		aDot[now % aDot.length].className = 'active';
	}
}

//秒杀动画
function popAnimate() {
	var popWrap = document.querySelector('.poplist'),
		scroll = popWrap.children[0],
		width = scroll.children[0].offsetWidth,
		startX = 0,
		lastTime = 0,
		lastPointX = 0,
		isUpright = false,
		isFirst = true,
		disX = 0,
		Dis = 0,
		timeDis = 1,
		callback = {
			over: function() {
				window.location.href = 'classify.html';
			}
		},
		Tween = {
			Linear: function(t, b, c, d) {
				return c * t / d + b;
			},
		};
	cssTransform(scroll, 'translateZ', 0.01);
	scroll.style.width = ((scroll.children.length - 1) * width + scroll.children[scroll.children.length - 1].offsetWidth) + 'px';
	var minY = popWrap.offsetWidth - scroll.offsetWidth;
	popWrap.addEventListener(
		'touchstart',
		function(e) {
			scroll.style.transition = 'none';
			startPoint = {
				pageX: e.changedTouches[0].pageX,
				pageY: e.changedTouches[0].pageY
			};
			startX = cssTransform(scroll, 'translateX');
			lastTime = new Date().getTime();
			lastPointX = startPoint.pageX;
			Dis = 0;
			timeDis = 0
			isUpright = false;
			isFirst = true;
		}
	)
	popWrap.addEventListener(
		'touchmove',
		function(e) {
			if (isUpright) return;
			var nowPoint = {
				pageX: e.changedTouches[0].pageX,
				pageY: e.changedTouches[0].pageY
			};
			disX = nowPoint.pageX - startPoint.pageX;
			disY = nowPoint.pageY - startPoint.pageY;

			if (isFirst) {
				isFirst = false;
				if (Math.abs(disX) < Math.abs(disY)) {
					isUpright = true;
					return;
				}
			}
			targetX = startX + disX;
			if (targetX >= 0) {
				targetX = 0;
			}
			if (!isUpright) {
				cssTransform(scroll, 'translateX', targetX);
			}
			newTime = new Date().getTime()
			Dis = nowPoint.pageX - startPoint.pageX;
			timeDis = newTime - lastTime;
			lastTime = newTime;
			lastPointX = nowPoint.pageX;
		}
	)

	popWrap.addEventListener(
		'touchend',
		function(e) {
			var speed = Dis / timeDis * 10;
			var time = Math.abs(speed * 0.5);
			var nowX = cssTransform(scroll, 'translateX');
			var now = Math.ceil(-nowX / width);
			if (disX > 0) {
				now--;
			}
			targetX = -now * width;
			if (targetX >= 0) {
				targetX = 0;
			}
			if (Math.abs(targetX) > Math.abs(minY)) {
				targetX = minY;
				type = 'Linear';
				end(targetX, type, time, callback);
			}

			scroll.style.transition = '.2s';
			cssTransform(scroll, 'translateX', targetX);
		}
	)

	function end(target, type, time, callback) {
		var t = 0;
		var b = cssTransform(scroll, 'translateY');
		var c = target - b;
		var d = Math.ceil(time / 10);
		clearInterval(scroll.timer);
		scroll.timer = setInterval(function() {
			t++;
			if (t > d) {
				if (callback && callback.over) {
					callback.over();
				}
				console.log();
				clearInterval(scroll.timer);
			} else {
				var top = Tween[type](t, b, c, d);
				cssTransform(scroll, 'translateX', top);
			}
		}, 30);
	}
}

//倒计时
function timer() {
	time();

	function time() {
		var timer = document.querySelector('.timer');
		var ms = (new Date(2017, 12, 7, 24, 0, 0)) - (new Date()); //计算剩余的毫秒数  
		var hh = parseInt(ms / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数  
		var mm = parseInt(ms / 1000 / 60 % 60, 10); //计算剩余的分钟数  
		var ss = parseInt(ms / 1000 % 60, 10); //计算剩余的秒数  
		hh = checkTime(hh);
		mm = checkTime(mm);
		ss = checkTime(ss);
		timer.innerHTML = '<span class="time-number">' + hh + '</span><span>:</span><span class="time-number">' + mm + '</span><span>:</span><span class="time-number">' + ss + '</span>';
	}
	setInterval(time, 1000);

	function checkTime(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
}

function lazyLoad() {
	var scroller = document.querySelector('.scroller');
	var clientHeight = document.body.clientHeight;
	var translateY = Math.abs(cssTransform(scroller, 'translateY'));
	var productList = document.querySelectorAll('.productList');
	var flag = true;
	var _index = getShort();

	if (getPos(productList[_index]).top + productList[_index].offsetHeight < translateY + clientHeight) {
		if (flag) {
			flag = false;
			picLoad();
		}
	}
}

function picLoad() {
	var productList = document.querySelectorAll('.productList');
	ajax('data/data.json', function(data) {
		var data = eval('(' + data + ')');

		if (data.code) flag = true;
		for (var i = 0; i < data.list.length; i++) {
			var _index = getShort();
			var list = data.list[i];
			for (var j = 0; j < list.src.length; j++) {
				var item = document.createElement('li');
				item.className = 'item';
				var img = document.createElement('img');
				img.src = list.src[j];
				item.appendChild(img);
				var span = document.createElement('span');
				span.className = 'text';
				span.innerHTML = list.description[j];
				item.appendChild(span);
				var div = document.createElement('div');
				div.className = 'price-same';
				div.innerHTML = '<span class="price"><span class="price-icon">￥</span>' + list.price[j] + '</span><a class="same" href="#">看相似</a>';
				item.appendChild(div);
				productList[_index].appendChild(item);
			}
		}
		flag = true;
	});
}

function getShort() {
	var productList = document.querySelectorAll('.productList');
	var index = 0;
	var H = productList[index].offsetHeight;
	for (var i = 0; i < productList.length; i++) {

		if (productList[i].offsetHeight < H) {
			index = i;
			H = productList[i].offsetHeight;
		}
	}
	return index;
}

//滚动到顶部
function scrolltoTop() {
	var sBtn = document.querySelector('.scroll-to-top');
	var mHeader = document.querySelector('.m-header');
	var mPics = document.querySelector('.m-pics');
	var scroller = document.querySelector('.scroller');
	var HY = mPics.offsetHeight - mHeader.offsetHeight;
	sBtn.addEventListener(
		'touchend',
		function() {
			hide(sBtn);
			scroller.style.transition = '.1s';
			cssTransform(scroller, 'translateY', 0);
			var opacity = -cssTransform(scroller, 'translateY') / HY;
			mHeader.style.background = 'rgba(226,27,43,' + opacity + ')';
		}
	)
}

//注册页面
function loginPage() {
	var loginBtn = document.querySelector('.login');
	var oLogin = document.querySelector('#m-login');
	var width = oLogin.getBoundingClientRect().width;

	var oReturn = document.querySelector('.return');
	loginBtn.addEventListener(
		'touchend',
		function() {
			oLogin.style.transition = '0.5s cubic-bezier(.34,.92,.45,1.3)';
			cssTransform(oLogin, 'translateX', 0);
			//e.stopPropagation();	
		}
	)
	oReturn.addEventListener(
		'touchend',
		function() {
			oLogin.style.transition = '0.5s cubic-bezier(.3,1.2,.5,0.8)';
			cssTransform(oLogin, 'translateX', width);
		}
	)
}

function setHeight() {
	var footer = document.querySelector('.footer');
	var wrapper = document.querySelector('.wrapper');
	wrapper.style.height = (document.body.offsetHeight - footer.offsetHeight) + 'px';
}


function mine() {
	var oMine = document.querySelector('.mine');
	var oLogin = document.querySelector('#m-login');
	var width = oLogin.getBoundingClientRect().width;
	oMine.addEventListener(
		'touchend',
		function() {
			console.log(1);
			oLogin.style.transition = '0.5s cubic-bezier(.34,.92,.58,.9)';
			cssTransform(oLogin, 'translateX', 0);
		}
	)

}

function classify() {
	var oClassify = document.querySelector('.classify');
	oClassify.addEventListener(
		'touchend',
		function() {
			window.location.href = 'classify.html';
		}
	)
}