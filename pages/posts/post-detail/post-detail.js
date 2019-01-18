const postsData = require('../../../data/posts-data.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let postId = options.id;
        let thisPostItem = postsData.postList[postId];
        // 缓存
        let postsState = wx.getStorageSync('postsState');
        //阅读+1
        postsState.readArray[postId] = +postsState.readArray[postId] + 1;
        wx.setStorageSync('postsState', postsState)
        this.setData({
            ...thisPostItem,
            collected: Boolean(postsState.collectedMap[postId])
        });
        // 初始化音乐状态
        this.initMusic(thisPostItem.music)
        this.setMusicMonitor();
       
    },

    getPostsState: function() {
        let postsState = wx.getStorageSync('postsState');
        if (!postsState) {
            wx.setStorageSync('postsState', new Object());
        }
        return postsState;
    },

    setPostsState: function(postsState) {
        wx.setStorageSync('postsState', postsState);
    },
    initMusic: function (music) {
        let musicManager = wx.getBackgroundAudioManager();
        musicManager.title = music.title;
        musicManager.singer = music.singer;
        musicManager.src = music.url;
    },
    setMusicMonitor: function() {
        let musicManager = wx.getBackgroundAudioManager();
        // 网络情况判定
        wx.getNetworkType({
            success: result => {
                if (result.networkType !== 'wifi') {
                    musicManager.pause();
                    wx.showToast({
                        title: '非wifi网络！',
                        duration: 2000,
                        mask: false
                    });
                }
            }
        });
        // 播放状态监听
        musicManager.onPlay(() =>
            this.setData({
                isPlayingMusic: true
            })
        );
        musicManager.onPause(() =>
            this.setData({
                isPlayingMusic: false
            })
        );
        musicManager.onStop(() =>
            this.setData({
                isPlayingMusic: false
            })
        );
        musicManager.onEnded(() =>
            this.setData({
                isPlayingMusic: false
            })
        );
    },
    /**
     * 点击音乐播放事件
     */
    onMusicTap: function(e) {
        let musicManager = wx.getBackgroundAudioManager();
        if (musicManager.paused) {
            // 先尝试播放音乐，如果播放不了，证明音乐已经stop,重新设置src播放
            musicManager.play();
            if (musicManager.paused) {
                musicManager.src = this.data.music.url;
                musicManager.title = this.data.music.title;
            }
        } else {
            musicManager.pause();
        }
    },
    /**
     * 点击收藏按钮事件
     */
    onColectionTap: function(e) {
        // 更新缓存
        let postsState = wx.getStorageSync('postsState');
        let postsCollected = postsState.collectedMap;
        wx.showToast({
            title: postsCollected[this.data.postId]
                ? '取消收藏成功'
                : '收藏成功',
            icon: 'success',
            duration: 1000
        });
        postsCollected[this.data.postId] = !postsCollected[this.data.postId];
        wx.setStorageSync('postsState', postsState);
        //设置页面data状态
        this.setData({
            collected: !this.data.collected
        });
    },

    /**
     * 点击分享按钮事件
     */
    onShareTap: function(e) {
        let shareArr = ['微信好友', '朋友圈', 'QQ', '微博'];
        wx.showActionSheet({
            itemList: shareArr,
            itemColor: '#405f80',
            success: function(res) {
                wx.showModal({
                    title: '用户分享到' + shareArr[res.tapIndex],
                    content: '确认？'
                });
            }
        });
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        //离开页面的时候关闭音乐
        wx.getBackgroundAudioManager().stop();
    }
});
