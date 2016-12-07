//贮存数据
var nowData = []
var data = ''
var bu = 0
var count = 0
var countr = 0

//获取输入数据
function getData() {
	var text = document.getElementsByTagName('input')[0];
		data = text.value;
}

//对相应操作绘制图标
function createImages(opt,a) {
  var div = document.getElementsByTagName('div')[0];
  opt;
  if (div.children[0] != undefined) {
    div.innerHTML = ''
  }
  var span = document.createElement('span');
    span.style.width = 1;
    span.style.height = 150;
    span.style.background = 'white'
    div.appendChild(span);
  for (var i = 0; i < nowData.length; i++) {
    var span = document.createElement('span');
    span.style.height = nowData[i];
    div.appendChild(span)
    span.onclick = function() {
      div.removeChild(this)
      clickDel()
    }
  } 
  if (bu == 1 && countr == 1) {
    setTimeout(function(){document.getElementsByTagName('button')[5].click()},80)
    countr = 0
  }  
}


//左侧入
function leftIn() {
  if (parseInt(data) >= 10 && parseInt(data) <= 100) {
    if (nowData.length > 59) {
    alert('队列元素不能超出60个！')
    return ;
  }
    var a = nowData.unshift(data)
    bu = 0
    createImages(a)
  } else{
    return
  }
}

//右侧入
function rightIn() {
  if (parseInt(data) >= 10 && parseInt(data) <= 100) {
    if (nowData.length > 59) {
    alert('队列元素不能超出60个！')
    return ;
  }
    var a = nowData.push(data)
    bu = 0
    createImages(a)
  } else{
    return
  }
}

//左侧出
function leftOut() {
    var a = nowData.shift(data)
    bu = 0
    createImages(a)
    alert('剩余元素：' + nowData[0])
}

//右侧出
function rightOut() {
    var a = nowData.pop(data)
    bu = 0
    createImages(a)
    alert('剩余元素：' + nowData[-1])
}

//点击删除队列
function clickDel() {
	var div = document.getElementsByTagName('div')[0];
	var span = div.getElementsByTagName('span');
	var newData = []
	for (var i = 1; i < span.length; i++) {
    newData.push(span[i].style.height);
	}
	nowData = newData
  alert(nowData)
}

//绑定触发事件
function click() {
  var bt = document.getElementsByTagName('button');
  var method = {'0':leftIn,'1':rightIn,'2':leftOut,'3':rightOut}
  for (var i = 0; i < bt.length; i++) {
    bt[i].onclick = function() {
      if (this.innerHTML == '左侧入') {
          countr = 0
          getData()
          leftIn()
      } else if (this.innerHTML == '右侧入') {
          countr = 0
          getData()
          rightIn()
      } else if (this.innerHTML == '左侧出') {
          countr = 0
          getData()
          leftOut()
      } else if (this.innerHTML == '右侧出') {
          countr = 0
          getData()
          rightOut()
      } else if (this.innerHTML == '随机') {
          countr = 0
          nowData = []
          for (var i = 0; i < 50; i++) {
            var ran = parseInt(Math.random()*91 + 10); 
            nowData.push(ran)
          }
          bu = 0
          createImages(nowData)
      } else if (this.innerHTML == '冒泡') {
          bu = 1
          countr = 1
          var len = nowData.length - 1;
          var i = 0;
          function xx() {
          while (i < len) {
            if (nowData[i] > nowData[i+1]) {
              var a1 = nowData[i];
              var a2 = nowData[i+1];
              nowData[i] = a2;
              nowData[i+1] = a1;
              createImages(nowData,i)()
            } else {
              i += 1;
              setTimeout(function(){xx()},100)
              }
          }
        }
        xx()
      }
    }
  }
}

function init() {
  click()

}
init()