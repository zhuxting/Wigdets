/*
显示比例：
小图 ：大图   或者    透明Div ：显示框
*/
	var oDiv = document.getElementById('div');
	var oBox = document.getElementById('Box');
	var oBox2 = document.getElementById('Box2');
	var img2 = document.getElementById('img2');
	//alert(img2)
	oBox.onmouseover = function(){
		oDiv.style.display = 'block';
		img2.style.display = 'block';
		document.onmousemove = function(a){
			//console.log(111)
			var e = a||event;
			/*
			oDiv.style.left = e.clientX-oDiv.offsetWidth/2+'px';
			oDiv.style.top = e.clientY-oDiv.offsetWidth/2+'px';*/
			//鼠标的移动距离
			//oDiv.offsetWidth:透明div的宽度（包括边框）
			//oBox.clientWidth:小图的div宽度（不包括边框）
			//e.clientX：鼠标移动的x的值
			/*var l = e.clientX - oDiv.offsetWidth/2;
			var t = e.clientY - oDiv.offsetHeight/2;*/

			/*
			相对父级定位，父级为oBox（小图的div为父级）
				minX = S当前鼠标的X坐标 - 边框到可视区域的X - 透明Div/2
			*/
			var l = e.clientX - offset(oBox).left-oDiv.offsetWidth/2-parseInt(getStyle(oBox,'borderLeftWidth'));
			var t = e.clientY -offset(oBox).top-oDiv.offsetHeight/2-parseInt(getStyle(oBox,'borderTopWidth'));
			console.log(l)
			//相对于oBox，透明Div的最小移动范围为0;
			//最大移动范围为oBox.clientWidth(黑框div的宽度)-透明Div的宽度。

			if(l<=0){
				l = 0;
			}
			if(t<=0){
				t = 0;
			}
			
			if(l>=oBox.clientWidth - oDiv.offsetWidth){
				l = oBox.clientWidth - oDiv.offsetWidth
			}
			if(t>=oBox.clientHeight - oDiv.offsetHeight){
				t = oBox.clientHeight - oDiv.offsetHeight
			}
			oDiv.style.left = l+'px';
			oDiv.style.top = t+'px';

			Box2.style.display = 'block';
			img2.style.left =- (l*3)+'px';
			img2.style.top =- (t*3)+'px';
		}
	}
	oBox.onmouseout = function(){
		document.onmousemove = null;
		oDiv.style.display = 'none';
		img2.style.display = 'none';
		oBox2.style.display = 'none';
	}

