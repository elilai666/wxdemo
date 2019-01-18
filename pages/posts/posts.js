const postsData = require('../../data/posts-data.js');
const app = getApp();

// pages/posts/posts.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 缓存
        // let postsRead = wx.getStorageSync('postsRead');
        let postsState = wx.getStorageSync('postsState');
        if (!postsState) {
            let postsStateObj = {
                readArray: postsData.postList.map(
                    post => post.reading
                ),
                collectedMap: new Map()
            }
            wx.setStorageSync('postsState', postsStateObj);
        } else {
            for (const [k, post] of postsData.postList.entries()) {
                post.reading = postsState.readArray[k];
            }
        }

        // if (!postsRead) {
        //     let postsReadList = postsData.postList.map(post => post.reading);
        //     wx.setStorageSync('postsRead', postsReadList);
        // } else {
        //     for (const [k, post] of postsData.postList.entries()) {
        //         post.reading = postsRead[k];
        //     }
        // }
        this.setData({
            post_key: postsData.postList
        });
    },
    /**
     * 更新阅读数
     */
    onShow: function() {
        //只用从其他页面返回的时候才出发读取缓存
        if (!app.globalData.isClosed) {
            let postsState = wx.getStorageSync('postsState');
            let postsRead = postsState.readArray;
            for (const [k, post] of postsData.postList.entries()) {
                post.reading = postsRead[k];
            }
            this.setData({
                post_key: postsData.postList
            });
        } else {
            app.globalData.isClosed = false;
        }
    },
    /**
     * 点击banner跳转
     */
    onBannerTap: function(e) {
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + e.target.dataset.postId
        });
    },
    /**
     * 点击文章跳转
     */
    onPostTap: function(e) {
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + e.currentTarget.dataset.postId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {}
        });
    }
});
