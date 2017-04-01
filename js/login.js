window.addEventListener('load', function() {
	
	var myScroll = new Mscroll('#m-login',{
		bounce:true
	});

	scrollHeight();
	checkShow();
	showPass();
	imgCode();
})




function checkShow() {
	var check = document.querySelector('.check');
	var checkbox = document.querySelector('.checkbox');
	var flag = true;
	var Rem = 67.5;
	check.addEventListener(
		'touchend',
		function() {
			if (flag) {
				flag = false;
				checkbox.style.backgroundPosition = -5 / Rem + 'rem ' + -330 / Rem + 'rem';
			} else {
				flag = true;
				checkbox.style.backgroundPosition = -5 / Rem + 'rem ' + -268 / Rem + 'rem';
			}
		}
	)
}

function scrollHeight() {
	var wrap = document.querySelector('#m-login');
	var loginHeader = document.querySelector('.login-header');
	var loginContent = document.querySelector('.loginContent');
	loginContent.style.height = wrap.offsetHeight + loginHeader.offsetHeight + 'px';
}

function showPass() {
	var passBtn = document.querySelector('.show-password');
	var showBtn = document.querySelector('.show-btn');
	var width = passBtn.clientWidth / 2;
	passBtn.addEventListener(
		'touchend',
		function() {
			if (cssTransform(showBtn, 'translateX') == 0) {
				passBtn.style.transition = '300ms background';
				passBtn.style.background = '#f23030';
				showBtn.style.transition = '50ms';
				cssTransform(showBtn, 'translateX', width);
			} else {
				passBtn.style.transition = '300ms background';
				passBtn.style.background = '#fff';
				showBtn.style.transition = '50ms';
				cssTransform(showBtn, 'translateX', 0);
			}
		}
	)
}


function imgCode() {
	var imgCodeUrl = ['img/authcode1.jpg', 'img/authcode2.jpg', 'img/authcode3.jpg'];
	var imgCode = document.querySelector('.imgCode');
	var i = 0;
	imgCode.src = imgCodeUrl[i];
	imgCode.addEventListener(
		'touchend',
		function() {
			i++;
			i %= imgCodeUrl.length;
			imgCode.src = imgCodeUrl[i]
		}
	)
}