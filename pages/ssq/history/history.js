
const app = getApp()

Page({
 
  data: {
    records: [],
    hasMore: true
  },

  onLoad: function (options) {

    this.page = 1
    this.PER_PAGE = 50
    this.getData()

  },

  getData(){

    

    app.get('/ssq', {page: this.page}, res => {
      res.data.data.forEach(record => {
        record.red = record.red.split(',')
        record.blue = record.blue.split(',')
      })
      this.page++
      this.setData({
        records: this.data.records.concat(res.data.data),
        hasMore: res.data.data.length >= this.PER_PAGE
      })
    })
  },

  onReachBottom: function () {
    if (this.data.hasMore) {
      this.getData()
    }
  },

  onShareAppMessage: function () {

  }
})