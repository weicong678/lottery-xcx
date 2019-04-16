const app = getApp()
Page({

  data: {
    activeNames: ['0'],
    result: []
  },

  onLoad: function (options) {
    var red = options.red.split(','),
        blue = options.blue.split(',')

    this.setData({
      red, blue
    })

    app.loading('分析中')
    app.post('/ssq/comparer', {
      red: options.red,
      blue: options.blue,
    }, res=>{
      wx.hideLoading()
      var prize_third = res.data.data.prize_third
      var prize_fourth = res.data.data.prize_fourth

      prize_third.forEach(row=>{
        var reRed = [],
            reBlue = []
        row.red.forEach(redItem=>{
          reRed.push({
            value: redItem,
            checked: red.indexOf(redItem) != -1
          })
        })
        row.blue.forEach(blueItem => {
          reBlue.push({
            value: blueItem,
            checked: red.indexOf(blueItem) != -1
          })
        })
        row.red = reRed
        row.blue = reBlue
      })

      prize_fourth.forEach(row => {
        var reRed = [],
          reBlue = []
        row.red.forEach(redItem => {
          reRed.push({
            value: redItem,
            checked: red.indexOf(redItem) != -1
          })
        })
        row.blue.forEach(blueItem => {
          reBlue.push({
            value: blueItem,
            checked: red.indexOf(blueItem) != -1
          })
        })
        row.red = reRed
        row.blue = reBlue
      })
      
      res.data.data.prize_third = prize_third
      res.data.data.prize_fourth = prize_fourth

      this.setData({
        result: res.data.data
      })
    })
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})