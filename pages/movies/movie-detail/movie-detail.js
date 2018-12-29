const UTIL = require('../../../utils/util');
const APP = getApp();
const BASEURL = APP.globalData.doubanBase;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let movieId = options.id;
        let url = BASEURL + "/v2/movie/subject/" + movieId;
        UTIL.http(url, this.processDoubanData, "GET");
    },

    processDoubanData: function (movieData) {
        if (!movieData) {
            console.error("Can not get movie data");
            return;
        }
        let {
            title: title,
            original_title: original_title,
            id: id,
            summary: summary,
            directors: directors,
            casts: casts,
            countries: countries,
            genres: genres,
            year: year,
            reviews_count: reviews_count,
            wish_count: wish_count,
            rating: {
                average: rating,
                stars: stars
            },
            images: {
                large: imgUrl
            }
        } = movieData;

        let movie = {
            title: title,
            originalTitle: UTIL.formatTitle(original_title, 20) ,
            id: id,
            summary: summary,
            countries: countries.join("、"),
            genres: genres.join("、"),
            average: UTIL.formatRating(rating),
            stars: UTIL.converToStarsArray(stars),
            coverageUrl: imgUrl,
            directors: UTIL.covertToNameString(directors),
            castsName: UTIL.covertToNameString(casts),
            castsInfo: UTIL.covertToCastInfo(casts),
            year: year,
            reviewsCount: reviews_count,
            wishCount: wish_count
        }
     
        this.setData({
            movie: movie
        });
    },

    viewMoviePostImg: function (e) {
        let imgUrl = e.currentTarget.dataset.src;
        console.log(imgUrl);
        wx.previewImage({
            current: imgUrl,
            urls: [imgUrl],
        });
    }
})