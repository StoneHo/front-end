//贮存数据，创建变量
var nowData = []
var data = ''
var div = document.getElementsByTagName('div')[0];

//获取输入数据
function getData() {
	var text = document.getElementsByTagName('input')[0];
		data = text.value;
}

//对相应操作绘制图标
function createImages(opt) {
  opt;
  if (div.children[0] != undefined) {
    div.innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
    var span = document.createElement('span');
    span.innerHTML = nowData[i];
    div.appendChild(span)
    span.onclick = function() {
      div.removeChild(this)
      clickDel()
    }
  }  
}

//点击删除相应队列
function clickDel() {
	var span = div.getElementsByTagName('span');
	var newData = []
	for (var i = 0; i < span.length; i++) {
    newData.push(span[i].innerHTML);
	}
	nowData = newData
}

//绑定触发事件
function click() {
  var bt = document.getElementsByTagName('button');
  for (var i = 0; i < bt.length; i++) {
    bt[i].onclick = function() {
      if (this.innerHTML == '左侧入') {
          getData()
          createImages(nowData.unshift(data))
      } else if (this.innerHTML == '右侧入') {
          getData()
          createImages(nowData.push(data))
      } else if (this.innerHTML == '左侧出') {
          getData()
          alert('删除元素：' + nowData[0])
          createImages(nowData.shift(data))
      } else if (this.innerHTML == '右侧出') {
          getData()
          alert('删除元素：' +  nowData[nowData.length-1])
          createImages(nowData.pop(data))
      }
    }
  }
}

function init() {
  click()
}
init()