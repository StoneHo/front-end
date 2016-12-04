/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }

  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var timeChange = {'day':0,'week':1,'month':2}
  var bjd = chartData[pageState.nowSelectCity][timeChange[pageState.nowGraTime]];
  var div = document.getElementsByTagName('div')[0]
  div.style.position = 'relative'
  div.style.marginLeft = '30.9%'
  var can = document.createElement('canvas');
  var div1 = document.createElement('div');
  div1.style.width = '550px';
  div1.style.height = '520px';
  div1.style.position = 'absolute';
  div1.style.top = '0';
  div1.style.zIndex = '1'
  can.setAttribute('width','550');
  can.setAttribute('height','520');
  ctx = can.getContext('2d');
  if (div.getElementsByTagName('div').length == 1) {
    div.removeChild(div.children[0])
    div.removeChild(div.children[0])
  }  
  div.appendChild(can);
  div.appendChild(div1);

  for (var i = 0; i < bjd.length; i++) {
    var db = parseInt(bjd[i].substring(10))
    var dt = bjd[i].substring(0,10);
    var span = document.createElement('span')
    span.style.position = 'absolute';
    span.style.display = 'block';
    span.style.bottom = '0';
    if (pageState.nowGraTime == 'day') {
    var picStart = 1+ 6 * i
    var picWidth = 5
    span.style.left = 6 * i + 'px';
    span.style.width = '5px';
  } else if (pageState.nowGraTime == 'week') {
    var picStart = 170+ 16 * i
    var picWidth = 15
    span.style.left = 170 + 16 * i + 'px';
    span.style.width = '16px'
    db = parseInt(bjd[i].substring(21))
    dt = bjd[i].substring(0,21);
  } else if (pageState.nowGraTime == 'month') {
    var picStart = 220+ 31 * i
    var picWidth = 30
    span.style.left = 220 + 30 * i + 'px';
    span.style.width = '30px'
    db = parseInt(bjd[i].substring(21))
    dt = bjd[i].substring(0,21);
  }
    span.style.height = db + 'px';
    span.setAttribute('title','日期：' + dt + ' ' + '指数：' + db)
    div1.appendChild(span);
    if (db <= 99) {
      ctx.fillStyle = 'green';
    } else if (db <= 200) {
      ctx.fillStyle = 'blue';
    } else if (db <= 300) {
      ctx.fillStyle = 'red';
    } else if (db <= 400) {
      ctx.fillStyle = 'purple';
    }else if (db > 400) {
      ctx.fillStyle = 'black';
    }

    ctx.fillRect(picStart, 520 - db, picWidth, db);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var gra = document.getElementsByTagName('input');
  for (var i = 0; i < gra.length; i++) {
      if (gra[i].checked == true) {
        pageState.nowGraTime = gra[i].value
        renderChart()
      }
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var op = document.getElementsByTagName('option');
  for (var i = 0; i < op.length; i++) {
    if (op[i].selected == true) {
      pageState.nowSelectCity = op[i].innerHTML
      renderChart()
    }
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var gra = document.getElementsByTagName('input');
  var graTime = document.getElementById('form-gra-time')
  graTime.onclick = function() {
    graTimeChange()
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var citySelect = document.getElementById('city-select');
  for (var i in aqiSourceData) {
    if (i != '北京') {
      var city = document.createElement('option');
      city.innerHTML = i;
      citySelect.appendChild(city);
    }
  }
  citySelect.onclick = function() {
    citySelectChange()
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var dd = [],
      wdc = 0,
      wd = [],
      md = [],
      mdc = 0;
      
  for (var key in aqiSourceData) {
    countw = 1
    for (var i in aqiSourceData[key]) {
      dd.push(i + aqiSourceData[key][i])
      wdc += aqiSourceData[key][i]
      mdc += aqiSourceData[key][i]
      var dat = new Date(i);
      var m = dat.getMonth() + 1;
      if (countw % 7 == 0 && countw <= 91) {
        dat.setDate(dat.getDate() - 6);
        dat = getDateStr(dat)
        wd.push(dat + '到' + i + Math.round(wdc / 7))
        wdc = 0;
      } else if (countw == 31) {
        var dat = new Date(i);
        dat.setDate(dat.getDate() - 30);
        dat = getDateStr(dat)
        md.push(dat + '到' + i + Math.round(mdc / 31))
        mdc = 0;
      } else if (countw == 60) {
        var dat = new Date(i);
        dat.setDate(dat.getDate() - 28);
        dat = getDateStr(dat)
        md.push(dat + '到' + i + Math.round(mdc / 29))
        mdc = 0;
      }
      if (countw == 91) {
        var dat = new Date(i);
        dat.setDate(dat.getDate() - 30);
        dat = getDateStr(dat)
        md.push(dat + '到' + i + Math.round(mdc / 31))
        mdc = 0;

      }
      if (countw == 91){
        chartData[key] = [dd,wd,md];
        dd = [];
        wd = [];
        md = [];
      }
      countw += 1;
    }
  }
  return chartData;

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart()
}

init();