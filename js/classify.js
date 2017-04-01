window.addEventListener('load', function() {
	document.addEventListener(
		'touchstart', //阻止默认事件
		function(e) {
			e.preventDefault();
		}
	)
	var myScroll = new Mscroll('.wrapper',{
		bounce:true,
	});

	var myScroll1= new Mscroll('.detail',{
		bounce:true,
		scrollStart:function(){
			myScroll1.refresh();
		}
	});

	setHeight();
	picLoad();
	productLoad();
	showHeader();
	backHome();
})

function backHome() {
	var oBack = document.querySelector('.back');
	oBack.addEventListener(
		'touchstart',
		function() {
			window.location.href = 'index.html';
		}
	)
}

function productLoad() {
	var wrapper = document.querySelector('.wrapper');
	var scroller = document.querySelector('.scroller');
	var maxY = wrapper.offsetHeight - scroller.offsetHeight;
	var productList = document.querySelector('.productList');
	var list = scroller.querySelectorAll('li');
	var isMove = false;
	for (var i = 0; i < list.length; i++) {
		list[i].index = i;
		var target = 0;
		list[i].addEventListener(
			'touchstart',
			function(e) {
				scroller.style.transition = 'none';
				startPageY = e.pageY;
			}
		)
		list[i].addEventListener(
			'touchmove',
			function(e) {
				disY = e.pageY - startPageY;
				if(!disY){
					isMove = true;
				}
			}
		)
		list[i].addEventListener(
			'touchend',
			function() {
				if (isMove){
					isMove = false;
					return;
				}
				for (var i = 0; i < list.length; i++) {
					list[i].children[0].className = '';
				}
				this.children[0].className = 'active';
				target = -this.index * list[1].offsetHeight;
				if (Math.abs(target) > Math.abs(maxY)) {
					target = maxY;
				}
				productList.innerHTML = '';
				console.log(productList.clientHeight);
				cssTransform(productList, 'translateY', 0);
				picLoad();
				scroller.style.transition = '0.5s';
				cssTransform(scroller, 'translateY', target);
			}
		)
	}
}

function picLoad() {
	var productList = document.querySelector('.productList');
	ajax('data/data.json', function(data) {
		var data = eval('(' + data + ')');
		for (var i = 0; i < data.list.length; i++) {
			var list = data.list[i];
			for (var j = 0; j < list.src.length; j++) {
				var item = document.createElement('li');
				item.className = 'item';
				item.src = list.src[j];
				item.description = list.description[j];
				productList.appendChild(item);
				createImg(item);
			}
		}
	});

	function createImg(item) {
		var img = new Image();
		img.src = item.src;
		img.onload = function() {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			canvas.width = item.offsetWidth;
			canvas.height = item.offsetWidth;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			item.appendChild(canvas);
			setTimeout(function() {
				canvas.style.transition = '0.1s';
				canvas.style.opacity = '1';
				loadDescription(item);
			}, 300);
		}
	}
	function loadDescription(item){
		var description = document.createElement('p');
		description.innerHTML = item.description;
		item.appendChild(description);
	}
}


function setHeight() {
	var wrap = document.querySelector('.wrap');
	var mHeader = document.querySelector('.m-header');
	var html = document.querySelector('html');
	var screenHeight = html.getBoundingClientRect().height;
	wrap.style.height = screenHeight - mHeader.offsetHeight + 'px';
}

function showHeader() {
	var oMenu = document.querySelector('.menu');
	var oNav = document.querySelector('.m-nav');
	var oWrap = document.querySelector('.wrap');
	var flag = true;
	var rem = 67.5;
	oMenu.addEventListener(
		'touchend',
		function() {
			if (flag) {
				flag = false;
				oNav.style.transition = '0.5s';
				oNav.style.height = 150 / rem + 'rem';
			} else if (!flag) {
				flag = true;
				oNav.style.height = 0;
			}
		}
	)
}