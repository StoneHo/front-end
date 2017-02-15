var moveImg = function(move,border,link,zoom){
var dragged,
x,
y,
a,
b,
imgWidth,
imgHeight,
tx = 0,
ty = 0,
zoomCount = true,
touchZoom = false,
zoomBig = false,
onImg = false,
imgMove = false,
borderLeft,
borderTop,
imgUp = false,
borderWidth = border.clientWidth,
borderHeight = border.clientHeight;
var body = document.getElementsByTagName('body')[0];


if (window.outerHeight) {
    body.style.height = window.outerHeight + 'px'
} else {
    body.style.height = document.documentElement.clientHeight + 'px'
}

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
if (move.nodeName == 'IMG') {
    imgWidth = (getNatural(move)).width;
    imgHeight = (getNatural(move)).height;
}

(function() {
    if(move.nodeName !== 'IMG') {
        var re=/.*url\((.*)\)/g,
            theCSSprop;
        if (window.getComputedStyle) {
            theCSSprop = window.getComputedStyle(move, null).backgroundImage
        } else {
            theCSSprop = move.currentStyle.backgroundImage;
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
function getStyle (obj,attr) {

return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];

}

var changePicSize = function(ele,widthRatio,heightRatio) {
    for (var i = 0; i < ele.length;i++) {
        //var currentWidth = window.getComputedStyle(ele[i], null).width
        var currentWidth = getStyle(ele[i],'width')

        ele[i].style.width = parseInt(currentWidth) / dd + 'px';

    }
}
changePicSize(link,dd,ddd)

var resetPicSize = function(ele) {
    for (var i = 0; i < ele.length;i++) {
        ele[i].style.width = 'auto';
        ele[i].style.height = 'auto';

    }
}

var changePicPositionLeft = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        aLink[i].style.position = 'absolute'
        var preLeft = window.getComputedStyle(aLink[i], null).left
        aLink[i].style.left = parseInt(preLeft) + positionChange + 'px'
    }
}

var changePicPositionPreLeft = function(aLink,ratio) {
    for (var i = 0; i < aLink.length;i++) {
        var preLeft = window.getComputedStyle(aLink[i], null).left
        aLink[i].style.left = parseInt(preLeft) * ratio + 'px'
    }
}

var changePicPositionTop = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        aLink[i].style.position = 'absolute'
        var preTop = window.getComputedStyle(aLink[i], null).top
        aLink[i].style.top = parseInt(preTop) + positionChange + 'px'
    }
}

var changePicPositionPreTop = function(aLink,ratio) {
    for (var i = 0; i < aLink.length;i++) {
        var preTop = window.getComputedStyle(aLink[i], null).top
        aLink[i].style.top = parseInt(preTop) * ratio + 'px'
    }
}

var resetPicPosition = function(aLink) {
    for (var i = 0; i < aLink.length;i++) {
        aLink[i].style.left = ''
        aLink[i].style.top = ''

    }
}

var dragPicPositionLeft = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        var preLeft = window.getComputedStyle(aLink[i], null).left
        aLink[i].style.left = parseInt(preLeft) + positionChange + 'px'
    }
}

var dragPicPositionTop = function(aLink,positionChange) {
    for (var i = 0; i < aLink.length;i++) {
        var preTop = window.getComputedStyle(aLink[i], null).top
        aLink[i].style.top = parseInt(preTop) + positionChange + 'px'
    }
}



if (zoom == undefined || zoom == true) {
  zoom = true;
} else {
  zoom = false;
}

var mapButton = function( event ) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)

    if (target.id == 'mapButton') {
        map.style.display = 'block'
        map.style.position = 'fixed'
        borderWidth = border.clientWidth
        borderHeight = border.clientHeight
        main.style.display = 'none'
        footerbg.style.display = 'none'
        body.style.overflowY = 'hidden'
        mobile.style.display = 'none'
        dd = imgWidth / borderWidth
        ddd = imgHeight / borderHeight;
        changePicSize(link,dd,ddd)
        
        if (zoomCount == false) {
            resetPicSize(link);
        }
    }
    if (target.id == 'exit') {
        map.style.display = 'none'
        map.style.position = 'absolute'
        main.style.display = 'block'
        footerbg.style.display = 'block'
        mobile.style.display = 'block'
        body.style.overflowY = ''
        resetPicSize(link);
        if (zoomCount == false) {
            resetPicSize(link);
        }
    }
};
EventUtil.addHandler(document,"click",mapButton);

/* 网页版拖动 */

var windowChange = function( event ) {
    if (window.outerHeight) {
    body.style.height = window.outerHeight + 'px'
    map.style.width = window.outerWidth * 0.95 + 'px'
    map.style.height = window.outerHeight * 0.95 + 'px'
} else {
    body.style.height = document.documentElement.clientHeight + 'px'
    map.style.width = document.documentElement.clientHeight * 0.95 + 'px'
    map.style.height = document.documentElement.clientHeight * 0.95 + 'px'
}

};
EventUtil.addHandler(window,"resize",windowChange);

var enterArea = function( event ) {
    onImg = true;
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    dragged = target;

};
EventUtil.addHandler(move,"mouseenter",enterArea);

var borderPosition = function( event ) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    borderLeft = target.offsetLeft;
    borderTop = target.offsetTop;
};
EventUtil.addHandler(border,"mouseenter",borderPosition);

var leaveArea = function( event ) {
    onImg = false;
    imgMove = false
};
EventUtil.addHandler(move,"mouseleave",leaveArea);

var mouseDown = function( event ) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    EventUtil.preventDefault(event);

    if (onImg) {
        imgMove = true;
        imgUp = true;
        x = event.pageX;
        y = event.pageY;
        target.style.cursor = '-webkit-grab'
    }
};
EventUtil.addHandler(border,"mousedown",mouseDown);

var mouseUp = function( event ) {
    if (onImg) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event)
        imgMove = false;
        imgUp = false;
        target.style.cursor = '-webkit-grab'
    }
};
EventUtil.addHandler(document,"mouseup",mouseUp);


var mouseMove = function( event ) {
        if (imgMove && onImg && imgUp) {

            var areaWidth = border.clientWidth - move.clientWidth,
                areaHeight = border.clientHeight - move.clientHeight;
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event)
            EventUtil.preventDefault(event);
            target.style.cursor = '-webkit-grabbing'
            a = event.pageX - x;
            b = event.pageY - y;
            tx = tx + a;
            ty = ty + b;
            if (target.currentStyle) {
                var currentWidth = (target.currentStyle.width).slice(0,-2),
                    currentHeight = (target.currentStyle.height).slice(0,-2);
                areaWidth = border.clientWidth - parseInt(currentWidth);
                areaHeight = border.clientHeight - parseInt(currentHeight);

            }
            if (tx < 0 && tx > areaWidth) {
                if (dragged.currentStyle) {
                } 
                dragPicPositionLeft(link,a)
                dragged.style.left = tx + 'px';

            } else {
                tx = tx - a
            }
            if (ty < 0 && ty > areaHeight) {
                dragPicPositionTop(link,b)
                dragged.style.top = ty + 'px';
            } else {
                ty = ty - b
            }
            x = a + x;
            y = b + y;
        }
        
};
EventUtil.addHandler(move,"mousemove",mouseMove);


//放大缩小
var mouseWheel = function( event ) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event)
            EventUtil.preventDefault(event)
            borderWidth = border.clientWidth;
            borderHeight = border.clientHeight;
            if (zoom) {
            if (event.wheelDelta === 120 && zoomCount) {
                resetPicSize(link);
                changePicPositionPreLeft(link,dd);
                changePicPositionPreTop(link,ddd);
                border.style.width = borderWidth + 'px';
                border.style.height = borderHeight + 'px';
                target.style.width = imgWidth.toString() + 'px';
                target.style.height = imgHeight.toString() + 'px';
                target.style.backgroundSize = imgWidth.toString() + 'px' + ' ' + imgHeight.toString() + 'px';
                tx = -(event.pageX);
                ty = -(event.pageY);
                zoomCount = false;
                zoomBig = true;
                dqCount = false;
                if (borderLeft == undefined) {
                     borderLeft = border.offsetLeft;
                     borderTop = border.offsetTop;
                }

                tx = -(((event.pageX - borderLeft) * dd));
                ty = -(((event.pageY - borderTop) * ddd));

                if ((imgWidth - (-tx)) < (borderWidth / 2) ) {
                    tx = borderWidth - imgWidth;
                    changePicPositionLeft(link,tx)
                    target.style.left = (tx).toString() + 'px';
                } else if (-tx < (borderWidth / 2)) {
                    tx = 0;
                    changePicPositionLeft(link,tx)
                    target.style.left = (tx).toString() + 'px';
                }else {
                    tx = tx + (borderWidth / 2)
                    changePicPositionLeft(link,tx)
                    target.style.left = (tx).toString() + 'px';
                }
                if ((imgHeight - (-ty)) < (borderHeight / 2) ) {
                    ty = borderHeight-imgHeight;
                    changePicPositionTop(link,ty)
                    target.style.top = (ty).toString() + 'px';
                } else if (-ty < (borderHeight / 2)) {
                    ty = 0;
                    changePicPositionTop(link,ty)
                    target.style.top = (ty).toString() + 'px';
                }else {
                    ty = ty + (borderHeight / 2)
                    changePicPositionTop(link,ty)
                    target.style.top = (ty).toString() + 'px';
                }
            } else if (event.wheelDelta === -120) {
                target.style.left = '';
                target.style.top = '';
                target.style.width = borderWidth.toString() + 'px';
                target.style.height = borderHeight.toString() + 'px';
                target.style.backgroundSize = borderWidth.toString() + 'px' + ' ' + borderHeight.toString() + 'px';
                dqCount = true
                tx = 0;
                ty = 0;
                zoomCount = true;
                resetPicPosition(link)
                if (zoomBig) {
                changePicSize(link,dd,ddd)
                zoomBig = false;
                }
            }
        }

};
EventUtil.addHandler(move,"mousewheel",mouseWheel);


/* 触控版拖动 */
var touchStart = function( event ) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event)
    dragged = target
    //EventUtil.preventDefault(event);
    imgMove = true;
    imgUp = true;
    touchZoom = true;
    x = event.touches[0].pageX;
    y = event.touches[0].pageY;
};
EventUtil.addHandler(move,"touchstart",touchStart);

var touchEnd = function( event ) {
    imgMove = false;
    imgUp = false;
    touchZoom = false;
};
EventUtil.addHandler(move,"touchend",touchEnd);

var touchMove = function( event ) {
    var areaWidth = border.clientWidth - move.clientWidth,
        areaHeight = border.clientHeight - move.clientHeight;
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (zoomCount == false) {
            EventUtil.preventDefault(event);
        }
        if (imgMove && imgUp && touchZoom) {
          a = event.changedTouches[0].pageX - x;
          b = event.changedTouches[0].pageY - y;
          tx = tx + a;
          ty = ty + b;
          if (tx < 0 && tx > areaWidth) {
              dragPicPositionLeft(link,a)
              dragged.style.left = tx + 'px';
          } else {
              tx = tx - a
          }
          if (ty < 0 && ty > areaHeight) {
              dragPicPositionTop(link,b)
              dragged.style.top = ty + 'px';
          } else {
              ty = ty - b
          }
          x = a + x;
          y = b + y;
        }
};
EventUtil.addHandler(move,"touchmove",touchMove);

};