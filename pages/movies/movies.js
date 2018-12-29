const UTIL = require('../../utils/util');
const APP = getApp();
const BASEURL = APP.globalData.doubanBase;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 需要有初始值，不然初始化出错
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        searchValue: "",
        showSearchResult: false,
        showMovieView: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let inTheatersUrl = BASEURL + "/v2/movie/in_theaters";
        let comingSoonUrl = BASEURL + "/v2/movie/coming_soon";
        let top250Url = BASEURL + "/v2/movie/top250";
        this.getMovieListData(inTheatersUrl, {
            start: 0,
            count: 3
        }, "inTheaters")
        this.getMovieListData(comingSoonUrl, {
            start: 0,
            count: 3
        }, "comingSoon")
        this.getMovieListData(top250Url, {
            start: 0,
            count: 3
        }, "top250")

    },

    /**
     * 根据url获取所需电影数据
     * @param {string} url 获取数据的url
     * @param {string} settedKey  用于数据绑定的key
     */
    getMovieListData: function (url, data, settedKey) {
        let _this = this;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'Application/json'
            },
            data: data,
            success: function (res) {
                if (res.statusCode === 200) {
                    _this.processDoubanData(res.data, settedKey);
                } else {
                    console.error(res)
                }
            },
            fail: function (res) {
                console.error(res)
            }
        })
    },

    processDoubanData: function (movieDatas, settedKey) {
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
                title: UTIL.formatTitle(title),
                id: id,
                average: UTIL.formatRating(rating),
                stars: UTIL.converToStarsArray(stars),
                coverageUrl: imgUrl
            })
        }
        let tmpObj = new Object();
        tmpObj[settedKey] = {
            movies: movies,
            slogan: UTIL.parseSlogan(settedKey)
        };
        this.setData(tmpObj);
    },

    /**
     * "更多"点击事件
     */
    onMoreTap: function (e) {
        let category = e.currentTarget.dataset.category
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category
        })
    },

/*     onBindFocus: function (e) {
        //展示搜索页
        this.setData({
            showSearchResult: true,
            showMovieView: false
        })
    },

    onCancelIcon: function (e) {
         //隐藏搜索页
         this.setData({
            showSearchResult: false,
            showMovieView: true,
            searchResult: {},
            searchValue: ""
        })
    }, */
    onMovieTap: function (e) {
        let id = e.currentTarget.dataset.movieId;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id='+id
        })
    },
    // 搜索组件逻辑
    showInput: function () {
        this.setData({
            showSearchResult: true,
            showMovieView: false
        });
    },
    hideInput: function () {
        this.setData({
            showSearchResult: false,
            showMovieView: true,
            searchResult: {},
            searchValue: ""
        });
    },
    clearInput: function () {
        this.setData({
            searchValue: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            searchValue: e.detail.value
        });
    },
    onBindConfirm: function (e) {
        let inputText = e.detail.value;
        let searchUrl = BASEURL+"/v2/movie/search"
        this.getMovieListData(searchUrl, {
            q: inputText,
        }, "searchResult")
    },

})