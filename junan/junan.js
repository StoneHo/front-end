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