var body = document.getElementsByTagName('body')[0];
var culturMenu = document.querySelectorAll('.nav-culture-sub')[0];
var sightMenu = document.querySelectorAll('.nav-sight-sub')[0];
var foodMenu = document.querySelectorAll('.nav-food-sub')[0];
var asideLeft = document.querySelectorAll('.aside-left')[0];
var asideRight = document.querySelectorAll('.aside-right')[0];
var asideRightContent = document.querySelectorAll('.aside-right-content')[0];
var asideLeftContent = document.querySelectorAll('.aside-left-content')[0];
var footer = document.querySelectorAll('.footer button')[0];
var footerbg = document.querySelectorAll('.footer')[0];
var down = document.querySelectorAll('#down')[0];
var main = document.querySelectorAll('.main')[0];
var firstPart = document.querySelectorAll('.land-vedio')[0];
var culture = document.querySelectorAll('.culture')[0];
var sight = document.querySelectorAll('.sight')[0];
var wrapper = document.querySelectorAll('.middle-wrapper')[0];
var mobile = document.querySelectorAll('.mobile')[0];
var enter = document.querySelectorAll('#enter')[0];
var firstenter = document.querySelectorAll('#firstEnter')[0];
var videoplay = document.querySelectorAll('#videoPlay')[0];
var firstword = document.querySelectorAll('.land-vedio .info')[0];
var firstbg = document.querySelectorAll('.wrapper-background-video')[0];
var mobilemenu = document.querySelectorAll('#mobile-menu')[0];
var moreinfo = document.querySelectorAll('#moreInfo')[0];



var picPos,
    bodyWidth,
    currentScrollTop,
    picMove = true,
    mapEnter = true,
    enterCount,
    moreInfoSwitch = true,
    zoomCount;
var pic = document.querySelectorAll(".pic"),
    link = document.querySelectorAll("#map a"),
    map = document.getElementById('map'),
    mapBg = document.getElementById('mapBg'),
    exit = document.getElementById('exit');

if (!firstPart) {
	firstPart = document.querySelectorAll('.culture')[0];
}

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
    bodyHeight = window.innerHeight
    if (firstPart.className != 'land-vedio') {
    	footerbg.style.display = 'none'
    }
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
    	var picPos1 = parseInt(window.getComputedStyle(firstPart, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 + (4 - remainder2) + picPos_1
        var picPos_3 = picPos2 + (4 - remainder2) + picPos_2
        var picPos_4 = picPos_3 + picPos2 + (4 - remainder2)
        if (i == undefined) {
    		i = scrollTop
    	}

    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    		    calculateScroll(i,picPos_1)
    		    i = picPos_1
    		    footer.style.display = ''
    		    if (firstPart.className != 'land-vedio') {
    		    	footerbg.style.display = 'none'
    		    }
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScroll(i,picPos_2)
    		    i = picPos_2
    		    footer.style.display = ''
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScroll(i,picPos_3)
    		    i = picPos_3
    		    footer.style.display = ''
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScroll(i,picPos_4)
    		    i = picPos_4
    		    footer.style.display = 'none'
    	}
     	    	    	


}
EventUtil.addHandler(down,"click",nextPage);


var nextPageWheel = function(event) {
	if (bodyWidth > 768 && firstPart.className == 'land-vedio') {
	event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    	var picPos1 = parseInt(window.getComputedStyle(firstPart, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 + (4 - remainder2) + picPos_1
        var picPos_3 = picPos2 + (4 - remainder2) + picPos_2
        var picPos_4 = picPos_3 + picPos2 + (4 - remainder2)
        if (i == undefined) {
    		i = scrollTop
    	}
    if (event.wheelDelta == -120 && body.style.overflowY == '') {
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    		    calculateScroll(i,picPos_1)
    		    i = picPos_1
    		    footer.style.display = ''
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScroll(i,picPos_2)
    		    i = picPos_2
    		    footer.style.display = ''
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScroll(i,picPos_3)
    		    i = picPos_3
    		    footer.style.display = ''
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScroll(i,picPos_4)
    		    i = picPos_4
    		    footer.style.display = 'none'
    	}
    }
     if (event.wheelDelta == 120 && body.style.overflowY == '') {
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	if (scrollTop < picPos_1) {
    		    i = scrollTop
    	}
    	if (scrollTop == picPos_1) {
    		    calculateScrollReduce(i,0)
    		    i = 0
    		    footer.style.display = ''
    	}    	
    	if (scrollTop == picPos_2) {
    		    calculateScrollReduce(i,picPos_1)
    		    i = picPos_1
    		    footer.style.display = ''
    	}
    	if (scrollTop == picPos_3) {
    		    calculateScrollReduce(i,picPos_2)
    		    i = picPos_2
    		    footer.style.display = ''

    	}
    	//uc bug
    	if (picPos_4 - scrollTop == 10) {
    		scrollTop += 10
    	}
    	if (scrollTop == picPos_4) {
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    		    footer.style.display = ''
    		    
    	} 
    	if (scrollTop > picPos_4) {
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
                footer.style.display = ''
    	}    	    	    	
    }   
    }
    if (bodyWidth > 768 && firstPart.className != 'land-vedio') {
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (i == undefined) {
    		i = scrollTop
    	}
    	if (scrollTop == 0) {
    		footerbg.style.display = 'block'
    	}
    	if (scrollTop > 0 ) {
    		footerbg.style.display = 'none'
    	}
    }
}
EventUtil.addHandler(document,"mousewheel",nextPageWheel);

var scrollMouseUp = function( event ) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        currentScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentScrollTop - preScrollTop != 0 && pageStop  && firstPart.className == 'land-vedio') {
    	var picPos1 = parseInt(window.getComputedStyle(firstPart, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 + (4 - remainder2) + picPos_1
        var picPos_3 = picPos2 + (4 - remainder2) + picPos_2
        var picPos_4 = picPos_3 + picPos2 + (4 - remainder2)
        var point = parseInt(picPos/2)
        var remainder =  scrollTop % 4
        if (i == undefined) {
    		i = scrollTop
    	}

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
EventUtil.addHandler(window,"mouseup",scrollMouseUp);

var scrollMouseDown = function( event ) {
	    event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        preScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        
};
EventUtil.addHandler(window,"mousedown",scrollMouseDown);


if (map) {
	borderWidth = map.clientWidth,
    borderHeight = map.clientHeight;
var getNatural = function(element) {
    var img = document.createElement('img');
    var src = element.src
    img.setAttribute('src',src);
    var imageWidth = img.width;
    var imageHeight = img.height;
    img = null;
    return {
        width: imageWidth,
        height: imageHeight
    }

}
if (mapBg.nodeName == 'IMG') {
    imgWidth = (getNatural(mapBg)).width;
    imgHeight = (getNatural(mapBg)).height;
}

(function() {
    if(mapBg.nodeName !== 'IMG') {
        var re=/.*url\((.*)\)/g,
            theCSSprop;
        if (window.getComputedStyle) {
            theCSSprop = window.getComputedStyle(mapBg, null).backgroundImage
        } else {
            theCSSprop = mapBg.currentStyle.backgroundImage;
        }
        theCSSprop = theCSSprop.replace(/"/g,'')
        var src = (re.exec(theCSSprop))[1];
        src = src.slice(src.lastIndexOf('/')+1);
        var img = document.createElement('img');
        img.setAttribute('src',src); 
        imgWidth = img.width;
        imgHeight = img.height;
        img = null;

    }
})()

var dd = imgWidth / borderWidth;
var ddd = imgHeight / borderHeight;

var resetPicSize = function(ele) {
    for (var i = 0; i < ele.length;i++) {
        ele[i].style.width = 'auto';
        ele[i].style.height = 'auto';

    }
}

function getStyle (obj,attr) {

return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];

}



var changePicPositionPreLeftTouch = function(aLink,ratio) {
    for (var i = 0; i < aLink.length;i++) {
        var preLeft = window.getComputedStyle(aLink[i], null).left
        if (preLeft.slice(-1) == 'x') {
            aLink[i].style.left = parseInt(preLeft) * ratio + 'px'
        } else {
            aLink[i].style.left = parseInt(preLeft) * bodyWidth * ratio  / 100 + 'px'
        }
    }
}

var changePicPositionPreTopTouch = function(aLink,ratio) {
    for (var i = 0; i < aLink.length;i++) {
        var preTop = window.getComputedStyle(aLink[i], null).top
        if (preTop.slice(-1) == 'x') {
            aLink[i].style.top = parseInt(preTop) * ratio + 'px'

        } else {
            aLink[i].style.top = parseInt(preTop) * bodyHeight * ratio  / 100 + 'px'
        }
    }
}

var changePicPositionLeft = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        aLink[i].style.position = 'absolute'
        var preLeft = window.getComputedStyle(aLink[i], null).left
        aLink[i].style.left = parseInt(preLeft) + positionChange + 'px'
    }
}

var changePicPositionTop = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        aLink[i].style.position = 'absolute'
        var preTop = window.getComputedStyle(aLink[i], null).top
        aLink[i].style.top = parseInt(preTop) + positionChange + 'px'
    }
}

var changePicSize = function(ele,widthRatio,heightRatio) {
    for (var i = 0; i < ele.length;i++) {
        //var currentWidth = window.getComputedStyle(ele[i], null).width
        var currentWidth = getStyle(ele[i],'width')

        ele[i].style.width = parseInt(currentWidth) / dd + 'px';

    }
}


changePicSize(link,dd,ddd)

moveImg(mapBg,map,link);
}




//移动设备
var touchst,touched
var touchStart = function(event) {
	event = EventUtil.getEvent(event);
	touchst = event.touches[0].clientY;
	if (firstPart.className == 'land-vedio') {
		EventUtil.preventDefault(event)
	}
}
EventUtil.addHandler(wrapper,"touchstart",touchStart);
EventUtil.addHandler(mobile,"touchstart",touchStart);


var touchEnd = function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event)
	if (firstPart.className == 'land-vedio') {
		EventUtil.preventDefault(event)
	}
	touched = event.changedTouches[0].clientY;
    if (touched - touchst < 0 && picMove  && firstPart.className == 'land-vedio') {
    	var picPos1 = parseInt(window.getComputedStyle(firstPart, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 + (4 - remainder2) + picPos_1
        var picPos_3 = picPos2 + (4 - remainder2) + picPos_2
        var picPos_4 = picPos_3 + picPos2 + (4 - remainder2)
        if (i == undefined) {
    		i = scrollTop
    	}
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
    		    footer.style.display = 'none'
    	}
     	    	    	
    }
     if (touched - touchst > 0 && picMove  && firstPart.className == 'land-vedio') {
    	var picPos1 = parseInt(window.getComputedStyle(firstPart, null).height)
    	var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
    	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    	var remainder1 =  picPos1 % 4
    	var remainder2 =  picPos2 % 4
        var picPos_1 = picPos1 + (4 - remainder1)
        var picPos_2 = picPos2 + (4 - remainder2) + picPos_1
        var picPos_3 = picPos2 + (4 - remainder2) + picPos_2
        var picPos_4 = picPos_3 + picPos2 + (4 - remainder2)
        if (i == undefined) {
    		i = scrollTop
    	}
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
    		    footer.style.display = ''
    	} 
    	if (scrollTop > picPos_4) {
    		    calculateScrollReduce(i,picPos_3)
    		    i = picPos_3
    		    footer.style.display = ''
    	}    	    	    	
    } 

    if (touched - touchst == 0) {
    	
        if (target.id == 'mapButton') {
        map.style.width = bodyWidth * 0.95 + 'px'
        map.style.display = 'block'
        map.style.position = 'fixed'
        borderWidth = map.clientWidth
        borderHeight = map.clientHeight
        dd = imgWidth / borderWidth
        ddd = imgHeight / borderHeight;
        changePicSize(link,dd,ddd)
        picMove = false
        if (zoomCount == false) {
            resetPicSize(link);
            mapEnter = false
            }
        if (zoomCount == false && enterCount != true) {
        	changePicSize(link,dd,ddd)
        	mapEnter = true
        }
        }
        if (target.id == 'exit') {
            map.style.display = 'none'
            map.style.position = 'absolute'
            resetPicSize(link);
            zoomCount = false;
            picMove = true;
            mapEnter = true;
             
            if (mapEnter == true) {
            	changePicSize(link,dd,ddd)
            }
            if (zoomCount == false) {
            resetPicSize(link);
            }
        }
        if (target.id == 'enterPic' && mapEnter) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event)
            picMove = false;
            mapEnter = false;
            enterCount = true
            borderWidth = map.clientWidth;
            borderHeight = map.clientHeight;
            resetPicSize(link);
            changePicPositionPreLeftTouch(link,dd);
            changePicPositionPreTopTouch(link,ddd);
            map.style.width = borderWidth + 'px';
            map.style.height = borderHeight + 'px';
            mapBg.style.width = imgWidth.toString() + 'px';
            mapBg.style.height = imgHeight.toString() + 'px';
            mapBg.style.backgroundSize = imgWidth.toString() + 'px' + ' ' + imgHeight.toString() + 'px';
            tx = 0;
            //changePicPositionLeft(link,tx);
            mapBg.style.left = (tx).toString() + 'px';
            ty = 0
            //changePicPositionTop(link,ty);
            mapBg.style.top = (ty).toString() + 'px';
        }
        if (target.id == 'firstEnter') {
            firstword.style.display = 'none' 

            if (videoplay.paused) {
            	videoplay.play()
            	firstword.style.display = 'block'
            }else {
            	videoplay.pause();
            	firstword.style.display = 'block'
            }
        }
        if (target.id == 'landvideo') {
            if (videoplay.paused) {
            	videoplay.play()
            }else {
            	videoplay.pause();
            }
        }
        if  (target.id == 'moreInfo') {
        	if(moreInfoSwitch == true) {
            //mobilemenu.style.animation = 'open 1s forwards ease'
            //mobilemenu.style.webkitAnimation = 'open 1s forwards ease'
            //mobilemenu.style.mozAnimation = 'open 1s forwards ease'
            //mobilemenu.style.oAnimation = 'open 1s forwards ease'
             currentScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            picMove = false
            moreinfo.innerHTML = '&#8855;'
            main.style.display = 'block'
            moreInfoSwitch = false
            
            wrapper.style.display = 'none'
            //wrapper.style.top = '1000px'
            //body.style.overflowY = 'hidden'
            }else {
            	var culturMenuHeight = window.getComputedStyle(culturMenu, null).height;
            	var sightMenuHeight = window.getComputedStyle(sightMenu, null).height;
            	var foodMenuHeight = window.getComputedStyle(foodMenu, null).height;
            	var asideLeftContentWidth = window.getComputedStyle(asideLeftContent, null).width;
            	var asideRightContentWidth = window.getComputedStyle(asideRightContent, null).width;
            	var culturMenuHeight = window.getComputedStyle(culturMenu, null).height;
            	var sightMenuHeight = window.getComputedStyle(sightMenu, null).height;
            	var foodMenuHeight = window.getComputedStyle(foodMenu, null).height;
            	var asideLeftContentWidth = window.getComputedStyle(asideLeftContent, null).width;
            	var asideRightContentWidth = window.getComputedStyle(asideRightContent, null).width;
                if (culturMenuHeight == '0px' && sightMenuHeight == '0px' && foodMenuHeight == '0px'
                	 && asideLeftContentWidth == '0px' && asideRightContentWidth == '0px') {
                	alert('ff')
                    picMove = true
                    main.style.display = 'none'
                    wrapper.style.display = 'block'
                    window.scrollTo(0,currentScrollTop)
                    moreinfo.innerHTML = '&#8801;'
                    moreInfoSwitch = true
                }
            }
        }

    }  

}
EventUtil.addHandler(wrapper,"touchend",touchEnd);
EventUtil.addHandler(mobile,"touchend",touchEnd);







