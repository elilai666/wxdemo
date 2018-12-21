const postsData = require('../../../data/posts-data.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let postId = options.id;
        this.setData(postsData.postList[postId]);
        // 缓存
        let postsCollected = wx.getStorageSync('postsCollected');
        if (!postsCollected) {
            wx.setStorageSync('postsCollected', new Object())
        } 
        this.setData({
            'collected': Boolean(postsCollected[postId])
        })
    },

    onColectionTap: function(e) {
        // 更新缓存
        let postsCollected = wx.getStorageSync('postsCollected');
        wx.showToast({
            title: postsCollected[this.data.postId] ? "取消收藏成功" : "收藏成功",
            icon: "success",
            duration: 1000,
        })
        postsCollected[this.data.postId] = !postsCollected[this.data.postId];
        wx.setStorageSync('postsCollected', postsCollected);
        //设置页面data状态
        this.setData({
            'collected': !this.data.collected
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
       
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})