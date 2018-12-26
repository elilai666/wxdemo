const util = require('../../../utils/util');
const baseUrl = getApp().globalData.doubanBase;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataIdx: 0,
        // showLoading: false,
        // noneNewData: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let category = options.category;
        this.data.category = category;
        let dataUrl;
        switch (category) {
            case "正在热映":
                dataUrl = baseUrl + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = baseUrl + "/v2/movie/coming_soon";
                break;
            case "Top250":
                dataUrl = baseUrl + "/v2/movie/top250";
                break;
            default:
                break
        }
        this.dataUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData, "GET", {
            start: this.data.dataIdx,
            count: 20
        })
    },

    processDoubanData: function (movieDatas) {
        let originMovies = [];
        if (this.data.movies) {
            originMovies = this.data.movies;
        }
        if (movieDatas.count === 0) {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            // this.setData({
            //     noneNewData: true,
            //     showLoading: false
            // })
        } else {
            let movies = [];
            for (let idx in movieDatas.subjects) {
                let subject = movieDatas.subjects[idx];
                let {
                    title: title,
                    id: id,
                    rating: {
                        average: rating,
                        stars: stars
                    },
                    images: {
                        large: imgUrl
                    }
                } = subject;

                movies.push({
                    title: util.formatTitle(title),
                    id: id,
                    average: util.formatRating(rating),
                    stars: util.converToStarsArray(stars),
                    coverageUrl: imgUrl
                })
            }
            
            this.setData({
                movies: originMovies.concat(movies),
                dataIdx: this.data.dataIdx + movieDatas.count,
                // showLoading: false
            });
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        wx.setNavigationBarTitle({
            title: this.data.category,
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        wx.showNavigationBarLoading()
        // this.setData({
        //     showLoading: true,
        //     noneNewData: false
        // });
        util.http(this.dataUrl, this.processDoubanData, "GET", {
            start: this.data.dataIdx,
            count: 20
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        // 数据清除
        this.data.movies = null;
        this.data.dataIdx = 0;

        util.http(this.dataUrl, this.processDoubanData, "GET", {
            start: 0,
            count: 20
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    

    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})