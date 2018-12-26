const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const converToStarsArray = stars => {
  let fullStarsNum = parseInt(stars.toString().substr(0, 1));
  let halfStarNum = stars.toString().substr(1, 1) === "5" ? 1 : 0;
  let starsArr = [];
  for (let index = 0; index < 5; index++) {
    if (fullStarsNum > 0) {
      starsArr.push(1)
      fullStarsNum--;
    } else if (halfStarNum > 0) {
      starsArr.push(2)
      halfStarNum--;
    } else {
      starsArr.push(0)
    }
  }
  return starsArr;
}

const parseSlogan = settedKey => {
  let slogan;
  if (settedKey === "inTheaters") {
    slogan = "正在热映";
  } else if (settedKey === "comingSoon") {
    slogan = "即将上映";
  } else if (settedKey === "top250") {
    slogan = "Top250";
  }
  return slogan;
}

const formatRating = rating => {
  return rating === 0 ? "暂无" : rating.toFixed(1);
}

const formatTitle = title => {
  return title.length > 6 ? title.substr(0, 6) + "..." : title
}

const http = (url, callBack, method="GET", data={}) => {
  wx.request({
    url: url,
    method: method,
    header: {
      'Content-Type': 'application/json'
    },
    data: data,
    success: function (res) {
      callBack(res.data)
    },
    fail: function (res) {
      console.error(res)
    }
  })
}


module.exports = {
  formatTime: formatTime,
  converToStarsArray: converToStarsArray,
  parseSlogan: parseSlogan,
  formatRating: formatRating,
  formatTitle: formatTitle,
  http:http
}