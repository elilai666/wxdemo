const postsData = require('../../data/posts-data.js');
// pages/posts/posts.js
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 点击文章跳转
     */
    onPostTap: function (e) {
        ws:wx.navigateTo({
            url: 'post-detail/post-detail?id=' + e.currentTarget.dataset.postId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            post_key: postsData.postList
        });
    },
})