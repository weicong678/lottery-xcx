Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
      title: '双色球',
      name: '开奖记录',
      page: 'history',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '双色球',
      name: '历史比较器',
      page: 'comparer',
      color: 'blue',
      icon: 'colorlens'
    },
    {
      title: '双色球',
      name: '好运机选',
      page: 'random',
      color: 'purple',
      icon: 'font'
    },
    {
      title: '双色球 ',
      name: '拍照识别',
      color: 'mauve',
      icon: 'icon'
    },
    // {
    //   title: '双色球',
    //   name: '好运机选',
    //   color: 'pink',
    //   icon: 'btn'
    // },
    // {
    //   title: '标签',
    //   name: 'tag',
    //   color: 'brown',
    //   icon: 'tagfill'
    // },
    // {
    //   title: '头像',
    //   name: 'avatar',
    //   color: 'red',
    //   icon: 'myfill'
    // },
    // {
    //   title: '进度条',
    //   name: 'progress',
    //   color: 'orange',
    //   icon: 'icloading'
    // },
    // {
    //   title: '边框阴影',
    //   name: 'shadow',
    //   color: 'olive',
    //   icon: 'copy'
    // },
    // {
    //   title: '加载',
    //   name: 'loading',
    //   color: 'green',
    //   icon: 'loading2'
    // },
    ],
  },
  methods: {
    onLoad() {
      let that = this;
      // 获取用户信息
      // wx.getSetting({
      //   success: res => {
      //     if (!res.authSetting['scope.userInfo']) {
      //       wx.redirectTo({
      //         url: '/pages/auth/auth'
      //       })
      //     }
      //   }
      // })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    onShareAppMessage() {
      return {
        title: 'ColorUI-高颜值的小程序UI组件库',
        imageUrl: 'https://image.weilanwl.com/color2.0/share2215.jpg',
        path: '/pages/basics/home/home'
      }
    },
  },
})