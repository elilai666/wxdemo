Page({
    onLoad: function(e){
       
    },
    onTap: function(e) {
        wx.switchTab({
            url: '../posts/posts',
        });
        // wx.navigateTo({
        //   url: '',
        // })
    },
    /**
     * 页面的初始数据
     */
    data: {

    },
})