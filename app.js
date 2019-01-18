App({
    globalData: {
        doubanBase: 'https://douban.uieee.com',// http://t.yushu.im
        isClosed: true
    },
    onHide: function() {
        this.globalData.isClosed = true;
    },
})