function $(selector,content){
    if( selector.charAt(0) === "#" ){
        return document.getElementById(selector.slice(1))
    }else{
        content = content || document;
        return  content.getElementsByTagName(selector);
    };
};
function getStyle( obj,attr ){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];     
};
function doMove(obj,attr,target,speed,callBack){
    var cur = parseInt( getStyle(obj,attr) );

    //速度 正负取决于 当前位置和目标点的大小
    // 当前位置  < 目标点 速度是正的
    // 当前位置  > 目标点 速度是负的
    speed = cur < target ? Math.abs(speed) : -Math.abs(speed);
    //var timer = null;
    clearInterval(obj.timer);  //先清除，在开启
    obj.timer = setInterval(function (){
        cur += speed;
        if(  cur >= target && speed > 0 ||  cur <= target && speed < 0){
            clearInterval(obj.timer);
            cur = target;
            obj.style[attr] = cur + "PX";   

            /*if( typeof callBack === "function"){
                callBack();
            }*/

            typeof callBack === "function" &&　callBack();
        }else{
            obj.style[attr] = cur + "PX";   
        }

        
    },30);
}
function shake(obj,attr,speed,callBack){
    //如果这个元素身上已经有定时器开着，那么下面代码就不执行了
    if( obj.timer ) return;
    var cur = parseInt(getStyle(obj,attr)); //找到元素的起始位置
    var arr = [];
    for( var i = speed; i > 0 ; i-=3 ){
        arr.push(-i,i);
    }
    arr.push(0);
    var n = 0;
    obj.timer = setInterval(function (){
        obj.style[attr] = arr[n]+cur + "px";
        n++;
        if( n >= arr.length ){
            clearInterval(obj.timer);
            obj.timer = null;
            if(typeof callBack === "function"){
                callBack();
            }
        }
    },30)   
}
function offset(obj) {
    var left = 0;
    var top = 0;

    var bl = parseInt(getStyle(obj,"borderLeftWidth"));
    var bt = parseInt(getStyle(obj,"borderTopWidth"));

    if( isNaN(bl) ){
        bl = 0
    }
    if( isNaN(bt) ){
        bt = 0
    }

    while(obj){
        /*console.log( getStyle(obj,"borderLeftWidth") );*/

        var l = parseInt(getStyle(obj,"borderLeftWidth"));
        var t = parseInt(getStyle(obj,"borderTopWidth"));

        if( isNaN( l ) ){
            l = 0;
        }
        if( isNaN( t ) ){
            t = 0;
        }

        left += l;
        top += t;
        left += obj.offsetLeft;
        top += obj.offsetTop;
        obj = obj.offsetParent;
    }

    return{
        left:left-bl,
        top:top-bt
    };

}