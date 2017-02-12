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
var culture = document.querySelectorAll('.culture')[0];
var sight = document.querySelectorAll('.sight')[0];
var wrapper = document.querySelectorAll('.middle-wrapper')[0];
var mobile = document.querySelectorAll('.mobile')[0];
var picPos,
    bodyWidth;

if (window.outerHeight) {
    body.style.height = window.outerHeight + 'px'
} else {
    body.style.height = document.documentElement.clientHeight + 'px'
}

if (window.outerHeight != 0) {
    picPos = window.outerHeight - 160;
    bodyWidth = window.outerWidth
} else{
    picPos = window.innerHeight - 160;
    bodyWidth = window.innerWidth
}
if (bodyWidth < 960) {
	picPos = window.innerHeight  - 60;
    bodyWidth = window.innerWidth
}

if (bodyWidth >= 960) {
var windowChange = function( event ) {
    if (window.outerHeight != 0) {
        body.style.height = window.outerHeight + 'px';
        picPos = window.outerHeight - 160;
    } else {
        body.style.height = window.innerHeight + 'px';
        picPos = window.innerHeight - 160;
    }
};
EventUtil.addHandler(window,"resize",windowChange);
}



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
var n = 0, i;
var pageStop = true;

var calculateScroll = function(i,stop) {
	var x = (function(){
        return function(){
        	i = i + 4
            window.scrollTo(0,i)
            if (i == stop) {
                clearInterval(flag)
                pageStop = true
            }

        }
    })
    var flag = setInterval(x(), 0);
}
var calculateScrollReduce = function(i,stop) {
	var x = (function(){
        return function(){

        	i = i - 4
            window.scrollTo(0,i)

            if (i == stop) {
                clearInterval(flag)
                pageStop = true
            }

        }
    })
    var flag = setInterval(x(), 0);
}

var nextPage = function(event) {
	event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    EventUtil.preventDefault(event);
    pageStop = false;
    var x = (function(){
    var remainder =  picPos % 4 
    var picPos_1 = picPos - remainder * 1 + 60;
    var picPos_2 = (picPos - remainder) * 2 + 60;
    var picPos_3 = (picPos - remainder) * 3 + 60;
    var picPos_4 = (picPos) * 4 + 60;
    var scrollTop = document.body.scrollTop
    i = scrollTop
        return function(){
        	i = i + 4
            window.scrollTo(0,i)
            if (i == picPos_1 || i == picPos_2 || i == picPos_3 || i == picPos_4) {

                clearInterval(flag)
                pageStop = true
            }
            if (i > picPos_4) {
            	clearInterval(flag)
            	pageStop = true
            }

        }
    })
    var flag = setInterval(x(), 0);
    

}
EventUtil.addHandler(down,"click",nextPage);

var nextPageWheel = function(event) {
	event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    var remainder =  picPos % 4 
    var picPos_1 = picPos - remainder * 1 + 60;
    var picPos_2 = (picPos - remainder) * 2 + 60;
    var picPos_3 = (picPos - remainder) * 3 + 60;
    var picPos_4 = (picPos) * 4 + 56
    if (event.wheelDelta == -120) {
    	var scrollTop = document.body.scrollTop
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    		    calculateScroll(i,picPos_1)
    		    i = picPos_1
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScroll(i,picPos_2)
    		    i = picPos_2
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScroll(i,picPos_3)
    		    i = picPos_3
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScroll(i,picPos_4)
    		    i = picPos_4
    	}
     	    	    	
    }
     if (event.wheelDelta == 120) {
    	var scrollTop = document.body.scrollTop
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScrollReduce(i,0)
    		    i = 0
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScrollReduce(i,picPos_1)
    		    i = picPos_1
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScrollReduce(i,picPos_2)
    		    i = picPos_2
    	}
    	if (scrollTop == picPos_4) {
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    	} 
    	if (scrollTop > picPos_4) {
    		    alert(scrollTop)
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    	}    	    	    	
    }   

}
EventUtil.addHandler(document,"mousewheel",nextPageWheel);

var scrollMouseUp = function( event ) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        currentScrollTop = document.body.scrollTop
        if (currentScrollTop - preScrollTop != 0 && pageStop) {
        var remainder =  picPos % 4 
        var picPos_1 = picPos - remainder * 1 + 60;
        var picPos_2 = (picPos - remainder) * 2 + 60;
        var picPos_3 = (picPos - remainder) * 3 + 60;
        var picPos_4 = (picPos) * 4 + 60;
    	var scrollTop = document.body.scrollTop
        var point = parseInt(picPos/2)
        var remainder =  scrollTop % 4

    	if (scrollTop <= point) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScrollReduce(i,0)

    	} 
   	
    	if (scrollTop > point && scrollTop < picPos_1) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScroll(i,picPos_1)
    		i = picPos_1
    	}
    	if (scrollTop > picPos_1 && scrollTop <= picPos_1 + point) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScrollReduce(i,picPos_1)
    	}
    	if (scrollTop > picPos_1 + point && scrollTop < picPos_2) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScroll(i,picPos_2)
    	}
    	if (scrollTop > picPos_2 && scrollTop <= picPos_2 + point) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScrollReduce(i,picPos_2)
    	}
    	if (scrollTop > picPos_2 + point && scrollTop < picPos_3) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScroll(i,picPos_3)
    	}
    	if (scrollTop > picPos_3 && scrollTop < picPos_3 + point) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScrollReduce(i,picPos_3)
    	}
    	if (scrollTop > picPos_3 + point && scrollTop < picPos_4) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScroll(i,picPos_4)
    	}
    	if (scrollTop > picPos_4) {
    		scrollTop = scrollTop - remainder
            i = scrollTop
    		calculateScrollReduce(i,picPos_4)
    	}
    }
};
EventUtil.addHandler(document,"mouseup",scrollMouseUp);

var scrollMouseDown = function( event ) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        preScrollTop = document.body.scrollTop;

        
};
EventUtil.addHandler(document,"mousedown",scrollMouseDown);

//移动设备
alert('good')
var touchst,touched
var touchStart = function(event) {
	event = EventUtil.getEvent(event);
	touchst = event.touches[0].clientY;
    EventUtil.preventDefault(event)
}
EventUtil.addHandler(document,"touchstart",touchStart);

var touchEnd = function(event) {
	alert('ff')
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event)
	touched = event.changedTouches[0].clientY;
    if (touched - touchst < 0) {
    	var picPos1 = parseInt(window.getComputedStyle(landVideo, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	alert('hh')
    	var scrollTop = document.body.scrollTop
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 - remainder2 + picPos_1
        var picPos_3 = picPos2 - remainder2 + picPos_2
        var picPos_4 = picPos_3 + picPos2 - remainder2
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    		    calculateScroll(i,picPos_1)
    		    i = picPos_1
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScroll(i,picPos_2)
    		    i = picPos_2
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScroll(i,picPos_3)
    		    i = picPos_3
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScroll(i,picPos_4)
    		    i = picPos_4
    	}
     	    	    	
    }
     if (touched - touchst > 0) {
    	var picPos1 = parseInt(window.getComputedStyle(landVideo, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.body.scrollTop
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 - remainder2 + picPos_1
        var picPos_3 = picPos2 - remainder2 + picPos_2
        var picPos_4 = picPos_3 + picPos2 - remainder2
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScrollReduce(i,0)
    		    i = 0
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScrollReduce(i,picPos_1)
    		    i = picPos_1
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScrollReduce(i,picPos_2)
    		    i = picPos_2
    	}
    	if (scrollTop == picPos_4) {
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    	} 
    	if (scrollTop > picPos_4) {
    		    alert(scrollTop)
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    	}    	    	    	
    }   

}
EventUtil.addHandler(document,"touchend",touchEnd);
/*
var pic = document.querySelectorAll(".pic"),
    link = document.querySelectorAll("#map a"),
    map = document.getElementById('map'),
    mapBg = document.getElementById('mapBg'),
    exit = document.getElementById('exit');
moveImg(mapBg,map,link);
*/
