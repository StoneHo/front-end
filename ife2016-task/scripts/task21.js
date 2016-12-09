//贮存数据，创建变量
var loveData = []
var tagData = []
var data = ''
var tag = ''
var love = ''
var div = document.getElementsByTagName('div');

//获取输入数据
function getData(x,op) {
  var text = document.getElementsByTagName(x)[0];
  var value = text.value
  value = value.replace(/[\s]+/g,",")
  value = value.replace(/[\r\s\,\，\、]/g,",")
  value = value.split(",")
  for (var i = 0; i < value.length; i++) {
    if (value[i] == '') {
      value.splice(i,1)
    }
  }
  op = value
  data = op;
}

//对相应操作绘制图标
function createImages(x,nowData) {
  var nowData = nowData.concat(data)
  var cop = [];
  for (var i = 0;i< nowData.length; i++) {
    if (cop.indexOf(nowData[i]) == -1) {
      cop.push(nowData[i])
    }
  }
  nowData = cop
  if (nowData.length > 10) {
    nowData.splice(0,nowData.length - 10)
  }
  if (div[x].children[0] != undefined) {
    div[x].innerHTML = ''
  }
  for (var i = 0; i < nowData.length; i++) {
    if (nowData[i] == undefined) {
      continue
    }
    if (nowData[i] == '') {
      continue
    }
    var span = document.createElement('span');
    span.innerHTML = nowData[i]
    div[x].appendChild(span)
    span.onclick = function() {
      div[x].removeChild(this)
      clickDel(x)
    }
  } 
  if (x == 0) {
    tagData = nowData
  } else if (x == 1) {
    loveData = nowData
  }
}

//点击删除相应队列
function clickDel(x) {
  var span = div[x].getElementsByTagName('span');
  var newData = []
  for (var i = 0; i < span.length; i++) {
    newData.push(span[i].innerHTML);
  }
  if (x == 0) {
    tagData = newData
  } else if (x == 1) {
    loveData = newData
  }
}

function inputData(e) {           
    var keynum;
    keynum = window.event ? e.keyCode : e.which;
    if (keynum == 32 || keynum == 13 || keynum == 188) {
      getData('input',tag)
      createImages(0,tagData)
    }
}

//绑定触发事件
function click() {
  var bt = document.getElementsByTagName('button')[0];
  bt.onclick = function() {
    getData('textarea',love)
    createImages(1,loveData)
}
}

function init() {
  click()
}
init()