/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById('aqi-city-input');
  var air = document.getElementById('aqi-value-input');
  var lab1 = document.getElementsByTagName('label')[0];
  var lab2 = document.getElementsByTagName('label')[1];
  city = city.value;
  air = air.value;
  //去空格处理
  city = city.replace(/ /g, "");
  air = air.replace(/ /g, "");
  /*利用正则表达式进行筛选
  * re1只选择中英文字符
  * re2只选择整数
  */    
  var re1 = /^[\u4E00-\u9FA5\uF900-\uFA2DA-Za-z]+$/;
  var re2 = /^-?[0-9]+$/;
  //添加警示
  var alarm1 = document.createElement('span')
  var alarm2 = document.createElement('span')
  if (!re1.test(city) && lab1.getElementsByTagName('span').length == 0) {
    alarm1.innerHTML = '提示：城市名必须为中英文字符';
    alarm1.style.color = 'red';
    alarm1.style.fontSize = '10px';
    lab1.appendChild(alarm1)
  }else if (!re1.test(city) && lab1.getElementsByTagName('span').length == 1) {
    lab1.removeChild(lab1.lastChild)
    alarm1.innerHTML = '提示：城市名必须为中英文字符';
    alarm1.style.color = 'red';
    alarm1.style.fontSize = '10px';
    lab1.appendChild(alarm1)
  }
  else if (re1.test(city) && lab1.lastChild.nodeName == 'INPUT'){
    alarm1.innerHTML = 'ok';
    alarm1.style.color = 'red';
    lab1.appendChild(alarm1)
  }else if (re1.test(city) && lab1.lastChild.nodeName == 'SPAN'){
    lab1.removeChild(lab1.lastChild);
    alarm1.innerHTML = 'ok';
    alarm1.style.color = 'red';
    lab1.appendChild(alarm1)
  }
  if (!re2.test(air) && lab2.getElementsByTagName('span').length == 0) {
    alarm2.innerHTML = '提示：空气质量指数必须为整数';
    alarm2.style.color = 'red';
    alarm2.style.fontSize = '10px';
    lab2.appendChild(alarm2)
  }else if (!re2.test(air) && lab2.getElementsByTagName('span').length == 1) {
    lab2.removeChild(lab2.lastChild)
    alarm2.innerHTML = '提示：空气质量指数必须为整数';
    alarm2.style.color = 'red';
    alarm2.style.fontSize = '10px';
    lab2.appendChild(alarm2)
  }
  else if (re2.test(air) && lab2.lastChild.nodeName == 'INPUT'){
    alarm2.innerHTML = 'ok';
    alarm2.style.color = 'red';
    lab2.appendChild(alarm2)
  }else if (re2.test(air) && lab2.lastChild.nodeName == 'SPAN'){
    lab2.removeChild(lab2.lastChild);
    alarm2.style.color = 'red';
    alarm2.innerHTML = 'ok';
    lab2.appendChild(alarm2)
  }
  //返回通过验证的数据aqiData
  if (re1.test(city) && re2.test(air)) {
    aqiData[city] = air;
    return aqiData;
  }

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var tab = document.getElementById('aqi-table');
  var tr = document.createElement('tr');
  tab.style.textAlign = 'center'
  for (var key in aqiData) {
    if (tab.getElementsByTagName('tr')[0] == undefined) {
    tr.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>'
    tab.appendChild(tr)
  }
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + key + '</td>' + '<td>' + aqiData[key] +
      '</td>' + '<td><button>删除</button></td>'
    tab.appendChild(tr)
    aqiData = {}
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
   var bt = document.getElementById('add-btn'); 
   var count = 0;
   bt.onclick = function() {
      addBtnHandle()
      count += 1
      createBtn(count)
   }
   function createBtn(count) {
     var tab = document.getElementById('aqi-table');
     var del = document.getElementById('aqi-table').getElementsByTagName('button');
     for (var i = 0; i < count; i++) {
       del[i].onclick = function() {
          tab.removeChild(this.parentNode.parentNode)
       }
     }
   }
}

init();