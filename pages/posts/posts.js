// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  process: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let posts_data = [{
      date:'2018年12月18日',
      title:'这里是标题1',
      post_img:'/images/post/crab.png',
      content:'这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容这里是内容！！！！！！！',
      view_num:'123',
      collect_num:'23',
      author_img:'/images/avatar/1.png'
    },{
        date: '2018年12月18日',
        title: '这里是标题2',
        post_img: '/images/post/huawei.jpg',
        content: '这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容这里是内容！！！！！！！',
        view_num: '123',
        collect_num: '23',
        author_img: '/images/avatar/1.png'
      },{
        date: '2018年12月18日',
        title: '这里是标题3',
        post_img: '/images/post/news1.jpg',
        content: '这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容，这里是内容这里是内容！！！！！！！',
        view_num: '1234',
        collect_num: '23',
        author_img: '/images/avatar/1.png'
      }];
    this.setData(
      {
        post_key:posts_data
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})