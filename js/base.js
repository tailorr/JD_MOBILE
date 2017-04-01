function ajax(url, fnOnSucc, fnOnFaild) {
	var oAjax = null;
	if (window.ActiveXObject) {
		oAjax = new ActiveXObject("Msxml2.XMLHTTP") || new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		oAjax = new XMLHttpRequest();
	}
	oAjax.open('get', url, true);
	oAjax.onreadystatechange = function() {
		if (oAjax.readyState == 4) {
			if (oAjax.status == 200) {
				if (fnOnSucc) {
					fnOnSucc(oAjax.responseText);
				}
			} else {
				if (fnOnFaild) {
					fnOnFaild(oAjax.status);
				}
			}
		}
	};
	oAjax.send();
}

//获取绝对位置函数
function getPos(obj) {
	var pos = {
		top: 0,
		left: 0
	};
	while (obj) {
		pos.top += obj.offsetTop;
		pos.left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	return pos;
}

function hide(obj) {
	obj.style.display = 'none';
}

function show(obj) {
	obj.style.display = 'block';
}