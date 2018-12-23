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
        });
        // 初始化音乐状态
        let musicManager = wx.getBackgroundAudioManager();
        if (!musicManager.src) {
            musicManager.title = "寂寞先生-remix";
            musicManager.singer = "马英伦";
            musicManager.src = 'http://182.140.219.14/amobile.music.tc.qq.com/C400004MBI7M0ZigP2.m4a?guid=5766279968&vkey=25C3E2F6DB19197B60FEF368F8E177B0DA5F50BD723BC97F5377D6D81709F753101587EF2864DA92F959BA80234FA0B077006E034A6D5BB3&uin=0&fromtag=66';
            this.setData({
                isPlayingMusic: true
            })
        } else {
            this.setData({
                isPlayingMusic: !musicManager.paused
            })
        }
    },
    /**
     * 点击音乐播放事件
     */
    onMusicTap: function (e) {
        let musicManager = wx.getBackgroundAudioManager();
        musicManager.paused ? musicManager.play() : musicManager.pause();
        this.setData({
            isPlayingMusic: !musicManager.paused
        })

    },
    /**
     * 点击收藏按钮事件
     */
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
     * 点击分享按钮事件
     */
    onShareTap: function(e) {
        let shareArr = ["微信好友", '朋友圈', 'QQ', '微博']
        wx.showActionSheet({
            itemList: shareArr,
            itemColor: "#405f80",
            success: function(res) {
                wx.showModal({
                    title: '用户分享到' + shareArr[res.tapIndex],
                    content: '确认？'
                })
            }
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