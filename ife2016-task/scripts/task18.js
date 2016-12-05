//贮存数据
var nowData = []
var data = ''

//获取输入数据
function getData() {
	var text = document.getElementsByTagName('input')[0];
		data = text.value;
}

//预设左侧入
function InitLeftIn() {
  var bt1 = document.getElementsByTagName('button')[0];
  bt1.onclick = function() {
  	getData()
  	leftIn()
  }
}

//左侧入
function leftIn() {
  var div = document.getElementsByTagName('div')[0];
  nowData.unshift(data);
  if (div.children[0] != undefined) {
  	div.innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
  	var span = document.createElement('span');
  	span.innerHTML = nowData[i];
    div.appendChild(span);
    span.onclick = function() {
      div.removeChild(this)
      clickDel()
    }
  } 
}

//预设右侧入
function InitRightIn() {
  var bt2 = document.getElementsByTagName('button')[1];
  bt2.onclick = function() {
  	getData()
  	rightIn()
  }
}

//右侧入
function rightIn() {
  var div = document.getElementsByTagName('div')[0];
  nowData.push(data);
  if (div.children[0] != undefined) {
  	div.innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
  	var span = document.createElement('span');
  	span.innerHTML = nowData[i];
    div.appendChild(span);
    span.onclick = function() {
      div.removeChild(this)
      clickDel()
    }
  } 
}

//预设左侧出
function InitLeftOut() {
  var bt3 = document.getElementsByTagName('button')[2];
  bt3.onclick = function() {
  	getData()
  	leftOut()
  }
}

//左侧出
function leftOut() {
  var div = document.getElementsByTagName('div')[0];
  nowData.shift(data);
  alert('剩余元素：' + nowData)
  if (div.children[0] != undefined) {
  	div.innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
  	var span = document.createElement('span');
  	span.innerHTML = nowData[i];
    div.appendChild(span);
    span.onclick = function() {
    	div.removeChild(this)
      clickDel()
    }
  } 
}

//预设右侧出
function InitRightOut() {
  var bt4 = document.getElementsByTagName('button')[3];
  bt4.onclick = function() {
  	getData()
  	rightOut()
  }
}

//右侧出
function rightOut() {
  var div = document.getElementsByTagName('div')[0];
  nowData.pop(data);
  alert('剩余元素：' + nowData)
  if (div.children[0] != undefined) {
  	div.innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
  	var span = document.createElement('span');
  	span.innerHTML = nowData[i];
    div.appendChild(span);
    span.onclick = function() {
    	div.removeChild(this)
      clickDel()
    }
  } 
}

function clickDel() {
	var div = document.getElementsByTagName('div')[0];
	var span = div.getElementsByTagName('span');
	var newData = []
	for (var i = 0; i < span.length; i++) {
    newData.push(span[i].innerHTML);

	}
	nowData = newData
}

function init() {
  InitLeftIn()
  InitRightIn()
  InitLeftOut()
  InitRightOut()
}
init()