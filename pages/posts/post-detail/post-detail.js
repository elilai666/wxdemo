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
  onLoad: function (options) {
    let postId = options.id;
    let thisPostItem = postsData.postList[postId];
    this.setData(thisPostItem);
    // 缓存
    let postsCollected = wx.getStorageSync('postsCollected');
    if (!postsCollected) {
      wx.setStorageSync('postsCollected', new Object())
    }
    this.setData({
      'collected': Boolean(postsCollected[postId])
    });
    //阅读+1
    let postsRead = wx.getStorageSync('postsRead');
    postsRead[postId] = +postsRead[postId] + 1
    wx.setStorageSync('postsRead', postsRead)
    // 初始化音乐状态
    let musicManager = wx.getBackgroundAudioManager();
    musicManager.title = thisPostItem.music.title;
    musicManager.singer = thisPostItem.music.singer;
    musicManager.src = thisPostItem.music.url;
    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    let musicManager = wx.getBackgroundAudioManager();
    // 播放状态监听
    musicManager.onPlay(() => this.setData({
      isPlayingMusic: true
    }))
    musicManager.onPause(() => this.setData({
      isPlayingMusic: false
    }));
    musicManager.onStop(() => this.setData({
      isPlayingMusic: false
    }));
  },
  /**
   * 点击音乐播放事件
   */
  onMusicTap: function (e) {
    let musicManager = wx.getBackgroundAudioManager();
    musicManager.paused ? musicManager.play() : musicManager.pause();
  },
  /**
   * 点击收藏按钮事件
   */
  onColectionTap: function (e) {
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
  onShareTap: function (e) {
    let shareArr = ["微信好友", '朋友圈', 'QQ', '微博']
    wx.showActionSheet({
      itemList: shareArr,
      itemColor: "#405f80",
      success: function (res) {
        wx.showModal({
          title: '用户分享到' + shareArr[res.tapIndex],
          content: '确认？'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //离开页面的时候关闭音乐
    console.log("unload page")
    wx.getBackgroundAudioManager().stop();
  },

})