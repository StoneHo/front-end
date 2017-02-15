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
var enter = document.querySelectorAll('#enter')[0];
var firstenter = document.querySelectorAll('#firstEnter')[0];
var videoplay = document.querySelectorAll('#videoPlay')[0];
var firstword = document.querySelectorAll('.land-vedio .info')[0];
var firstbg = document.querySelectorAll('.wrapper-background-video')[0];

var picPos,
    bodyWidth,
    picMove = true,
    mapEnter = true,
    enterCount,
    zoomCount;
var pic = document.querySelectorAll(".pic"),
    link = document.querySelectorAll("#map a"),
    map = document.getElementById('map'),
    mapBg = document.getElementById('mapBg'),
    exit = document.getElementById('exit'),
    borderWidth = map.clientWidth,
    borderHeight = map.clientHeight;

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
    var picPos_1 = picPos - remainder * 1;
    var picPos_2 = (picPos - remainder) * 2;
    var picPos_3 = (picPos - remainder) * 3;
    var picPos_4 = (picPos) * 4;
            if (bodyWidth < 960) {
                picPos_1 = picPos_1 + 92;
                picPos_2 = picPos_2 + 92 * 2;
                picPos_3 = picPos_3 + 92 * 3;
                picPos_4 = picPos_4 + 92 * 4;
                
            }
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
    if (bodyWidth > 768) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    var remainder =  picPos % 4 
    var picPos_1 = picPos - remainder * 1;
    var picPos_2 = (picPos - remainder) * 2;
    var picPos_3 = (picPos - remainder) * 3;
    var picPos_4 = (picPos) * 4
            if (bodyWidth < 960) {
                picPos_1 = picPos_1 + 92;
                picPos_2 = picPos_2 + 92 * 2;
                picPos_3 = picPos_3 + 92 * 3;
                picPos_4 = picPos_4 + 92 * 4;
                
            }
    if (event.wheelDelta == -120 && body.style.overflowY == '') {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
     if (event.wheelDelta == 120 && body.style.overflowY == '') {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
        if (picPos_4 - scrollTop == 10) {
            scrollTop += 10
        }
        if (scrollTop == picPos_4) {
                calculateScrollReduce(i,picPos_3)
                i = picPos_3
                
        } 
        if (scrollTop > picPos_4) {
                calculateScrollReduce(i,picPos_3)
                i = picPos_3

        }                       
    }   
    }
}
EventUtil.addHandler(document,"mousewheel",nextPageWheel);

var scrollMouseUp = function( event ) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        currentScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentScrollTop - preScrollTop != 0 && pageStop) {
        var remainder =  picPos % 4 
        var picPos_1 = picPos - remainder * 1;
        var picPos_2 = (picPos - remainder) * 2;
        var picPos_3 = (picPos - remainder) * 3;
        var picPos_4 = (picPos) * 4;
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
EventUtil.addHandler(window,"mouseup",scrollMouseUp);

var scrollMouseDown = function( event ) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        preScrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        
};
EventUtil.addHandler(window,"mousedown",scrollMouseDown);

moveImg(mapBg,map,link);

//移动设备
var touchst,touched
var touchStart = function(event) {
    event = EventUtil.getEvent(event);
    touchst = event.touches[0].clientY;
    EventUtil.preventDefault(event)
}
EventUtil.addHandler(wrapper,"touchstart",touchStart);

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

var touchEnd = function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    EventUtil.preventDefault(event)
    touched = event.changedTouches[0].clientY;
    if (touched - touchst < 0 && picMove) {
        var picPos1 = parseInt(window.getComputedStyle(landVideo, null).height)
        var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
     if (touched - touchst > 0 && picMove) {
        var picPos1 = parseInt(window.getComputedStyle(landVideo, null).height)
        var picPos2 = parseInt(window.getComputedStyle(culture, null).height)
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
                calculateScrollReduce(i,picPos_3)
                i = picPos_3
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
    }  

}
EventUtil.addHandler(wrapper,"touchend",touchEnd);





