//贮存数据，创建变量
var nowData = []
var data = ''
var searchData = ''
var div = document.getElementsByTagName('div')[0];

//获取输入数据
function getData() {
	var text = document.getElementsByTagName('textarea')[0];
  var value = text.value
  value = value.replace(/[\r\s\,\，\、]/g,",")
  value = value.split(",")
	data = value;
}

//获取查询数据
function getSearch() {
  searchData = ''
  var text = document.getElementsByTagName('input')[0];
  searchData = text.value
}

//对相应操作绘制图标
function createImages(opt) {
  opt;
  if (div.children[0] != undefined) {
    div.innerHTML = ''
  }
  for (var k = 0; k < nowData.length; k++) {
    for (var i = 0; i < nowData[k].length; i++) {
      if (nowData[k][i] == '') {
        continue
      }
      var span = document.createElement('span');
      var v = eval('/' + searchData + '/g')
      span.innerHTML = nowData[k][i];
      nowData[k][i] = nowData[k][i].replace(/[<em>]/g,'')
      nowData[k][i] = nowData[k][i].replace(/[</em>]/g,'')
      nowData[k][i] = nowData[k][i].replace(v,"<em>" + searchData + "</em>")
      span.innerHTML = nowData[k][i]
      div.appendChild(span)
      span.onclick = function() {
        div.removeChild(this)
        clickDel()
      }
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
          createImages(nowData[0].shift())
      } else if (this.innerHTML == '右侧出') {
          getData()
          alert('删除元素：' +  nowData[nowData.length-1])
          createImages(nowData[nowData.length-1].pop())
      } else if (this.innerHTML == '查询') {
          getSearch()
          createImages(nowData)
      }
    }
  }
}

function init() {
  click()
}
init()