const postsData = require('../../data/posts-data.js');
// pages/posts/posts.js
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
        // 缓存
        let postsRead = wx.getStorageSync('postsRead');
        if (!postsRead) {
            let postsReadList = postsData.postList.map(post=>post.reading);
            wx.setStorageSync('postsRead', postsReadList)
        } else {
            for (const [k, post] of postsData.postList.entries()) {
                post.reading = postsRead[k]
            }
        }
        this.setData({
            post_key: postsData.postList
        });
    },
    /**
     * 更新阅读数
     */
    onShow: function(options) {
        let postsRead = wx.getStorageSync('postsRead');
        for (const [k, post] of postsData.postList.entries()) {
            post.reading = postsRead[k]
        }
        this.setData({
            post_key: postsData.postList
        });
    },
    /**
     * 点击banner跳转
     */
    onBannerTap: function (e) {
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' +  e.target.dataset.postId
        })
    },
    /**
     * 点击文章跳转
     */
    onPostTap: function (e) {
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + e.currentTarget.dataset.postId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
   
})