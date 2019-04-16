
const { $Message } = require('../../../iview/base/index');

Page({

  data: {
    red: [],  // 渲染用的
    blue: [],
  },

  onLoad: function (options) {

    this.redList = [] // 机选、提交用

    var red = [],
      blue = []

    for(var i=0; i<33; i++){
      red.push({ checked: false })
    }
    for (var i = 0; i < 16; i++) {
      blue.push({ checked: false })
    }

    this.setData({ red, blue })

    //首先定义一下，全局变量
    var _this = this
    var lastTime = 0; //此变量用来记录上次摇动的时间
    var lastAutoTime = 0;
    var x = 0,
    y = 0,
    z = 0,
    lastX = 0,
    lastY = 0,
    lastZ = 0; //此组变量分别记录对应 x、y、z 三轴的数值和上次的数值
    var shakeSpeed = 180; //设置阈值
    //编写摇一摇方法
    function shake(acceleration) {
      var nowTime = new Date().getTime(); //记录当前时间
      //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
      if (nowTime - lastTime > 100) {
        var diffTime = nowTime - lastTime; //记录时间段
        lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
        x = acceleration.x; //获取 x 轴数值，x 轴为垂直于北轴，向东为正
        y = acceleration.y; //获取 y 轴数值，y 轴向正北为正
        z = acceleration.z; //获取 z 轴数值，z 轴垂直于地面，向上为正
        //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
        if (speed > shakeSpeed) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
          var nowAutoTime = new Date().getTime(); //记录当前时间
          //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
          if (nowAutoTime - lastAutoTime > 1000) {
            _this.auto()
            wx.vibrateLong()
            lastAutoTime = new Date().getTime()
          }
        }
        lastX = x; //赋值，为下一次计算做准备
        lastY = y; //赋值，为下一次计算做准备
        lastZ = z; //赋值，为下一次计算做准备
      }
    }
    wx.onAccelerometerChange(shake)
  },

  slectRed(e){
    var index = e.currentTarget.dataset.index
    var red = this.data.red
    red[index].checked = !red[index].checked 
    this.setData({ red })
  },

  slectBlue(e) {
    var index = e.currentTarget.dataset.index
    var blue = this.data.blue
    blue[index].checked = !blue[index].checked
    this.setData({ blue })
  },

  auto(){
  
    var randomRed = this.random(0, 32)

    if (this.redList.length == 6) {
      var red = [],
      blue = []

      for(var i=0; i<33; i++){
        red.push({ 
          checked: this.redList.indexOf(i) != -1 ? true : false
        })
      }
      var randomBlue = this.random(0, 15)

      for (var i = 0; i < 16; i++) {
        blue.push({ 
          checked: randomBlue == i ? true : false
        })
      }
      this.setData({ red, blue })
      this.redList = []
      return false
    }
    
    if (this.redList.indexOf(randomRed ) == -1 ) {
      this.redList.push(randomRed)
    }
    this.auto()
  },

  random(x, y){
    return Math.round(Math.random() * (y - x)) + x
  },

  onShareAppMessage: function () {

  },

  onUnload(){
    wx.stopAccelerometer()
  }
})