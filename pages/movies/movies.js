const util = require('../../utils/util');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 需要有初始值，不然初始化出错
        inTheaters: {},
        comingSoon: {},
        top250:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let baseUrl = app.globalData.doubanBase;
        let inTheatersUrl = baseUrl + "/v2/movie/in_theaters";
        let comingSoonUrl = baseUrl + "/v2/movie/coming_soon";
        let top250Url = baseUrl + "/v2/movie/top250";
        this.getMovieListData(inTheatersUrl, "inTheaters");
        this.getMovieListData(comingSoonUrl, "comingSoon");
        this.getMovieListData(top250Url, "top250");
    },

    /**
     * 根据url获取所需电影数据
     * @param {string} url 获取数据的url
     * @param {string} settedKey  用于数据绑定的key
     */
    getMovieListData: function (url, settedKey) {
        let _this = this;
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            data : {
                start: 0,
                count: 3
            },
            success: function(res) {
                if (res.statusCode === 200) {
                    _this.processDoubanData(res.data, settedKey);
                } else {
                    console.error(res)
                }
            },
            fail: function(res) {
                console.error(res)
            }
        })
    },

    processDoubanData: function (movieDatas, settedKey) {
        let movies = [];
        for (let idx in movieDatas.subjects) {
            let subject = movieDatas.subjects[idx];
            let {title: title, 
                id:id, 
                rating: {
                    average: rating, 
                    stars: stars
                }, 
                images:{
                    large: imgUrl
                } 
            } = subject;
            if (title.length > 6) title = title.substr(0,6) + "...";
           
            movies.push({
                title: title, 
                id:id, 
                average: util.formatRating(rating),
                stars: util.converToStarsArray(stars),
                coverageUrl: imgUrl
            })
        }
        let tmpObj = new Object();
        tmpObj[settedKey] = {
            movies: movies,
            slogan: util.parseSlogan(settedKey)
        };
        this.setData(tmpObj);
    },

    /**
     * "更多"点击事件
     */
    onMoreTap: function(e){
        let category = e.currentTarget.dataset.category
        wx.navigateTo({
            url: 'more-movie/more-movie?category='+category
        })
    },
    onBindFocus: function (e) {
        
    },
    onBindConfirm: function (e) {
        
    }
})