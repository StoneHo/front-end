var body = document.getElementsByTagName('body')[0];
var culturMenu = document.getElementById('culture-menu');
var asideLeft = document.querySelectorAll('#aside-left')[0];
var asideRight = document.querySelectorAll('#aside-right')[0];
var asideRightContent = document.querySelectorAll('.aside-right-content')[0];
var asideLeftContent = document.querySelectorAll('.aside-left-content')[0];
var footer = document.querySelectorAll('.footer')[0];
var down = document.querySelectorAll('#down')[0];
var main = document.querySelectorAll('.main')[0];
var landVideo = document.querySelectorAll('.land-vedio')[0];
var wrapper = document.querySelectorAll('.middle-wrapper')[0];
var mobile = document.querySelectorAll('.mobile')[0];
var picPos = window.outerHeight - 160;

if (window.outerHeight) {
    body.style.height = window.outerHeight + 'px'
} else {
    body.style.height = document.documentElement.clientHeight + 'px'
}

var windowChange = function( event ) {
    body.style.height = window.outerHeight + 'px';
    picPos = window.outerHeight - 160;
};
EventUtil.addHandler(window,"resize",windowChange);

var changeScroll = function(ele) {
    var mouseOut = function(event) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        body.style.overflowY = ''
    } 
    var mouseEnter = function(event) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (window.getComputedStyle(asideRightContent, null).width != '0px' || 
        	window.getComputedStyle(asideLeftContent, null).width != '0px') {
            body.style.overflowY = 'hidden'
        }
    } 
EventUtil.addHandler(ele,"mouseover",mouseEnter);
EventUtil.addHandler(ele,"mouseout",mouseOut);
}
changeScroll(asideLeft);
changeScroll(asideRight);

var y;
var n = 0;
var pageStop = true;
var nextPage = function(event) {
	event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    EventUtil.preventDefault(event);

    if (n == 0) {
    	var i = 0;
    }
    if (n >= 1) {
    	var i = y
    }
    n = n + 1
    pageStop = false;
    //alert(event.pageY)
    //alert(window.outerHeight - 160)
    
    var x = (function(){
    var remainder =  picPos % 4 
    var picPos_1 = picPos - remainder * 1;
    var picPos_2 = (picPos - remainder) * 2;
    var picPos_3 = (picPos - remainder) * 3;
    var picPos_4 = (picPos) * 4; 
        return function(){
        	i = i + 4
            window.scrollTo(0,i)
            if (i == picPos_1 || i == picPos_2 || i == picPos_3 || i == picPos_4) {
            	y = i
                
                clearInterval(flag)
                pageStop = true
            }
            if (i > picPos_4) {
            	clearInterval(flag)
            	pageStop = true
            	n = 0
            }

        }
    })
    var flag = setInterval(x(), 0);
    

}
EventUtil.addHandler(down,"click",nextPage);
/*
var prePosBox = [];
var prePos;
var bodyScroll = function( event ) {
    //alert(document.documentElement.scrollHeight)
    if (pageStop) {
        prePosBox.push(window.pageYOffset)

        if (prePosBox.length == 2) {
    	    prePos = prePosBox[1]
    	    prePosBox = []
    	    var i = prePos
            //var start = window.setTimeOut(nextPage(),5000)
     
        }
    }
};
EventUtil.addHandler(window,"scroll",bodyScroll);

var pic = document.querySelectorAll(".pic"),
    link = document.querySelectorAll("#map a"),
    map = document.getElementById('map'),
    mapBg = document.getElementById('mapBg'),
    exit = document.getElementById('exit');
moveImg(mapBg,map,link);
*/