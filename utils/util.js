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
  } else if (settedKey === "searchResult") {
    slogan = "搜索结果";
  }
  return slogan;
}

const formatRating = rating => {
  return rating === 0 ? "暂无" : rating.toFixed(1);
}

const formatTitle = (title, remainNum=6) => {
  return title.length > remainNum ? title.substr(0, remainNum) + "..." : title
}
const http = (url, callBack, method="GET", data={}) => {
  wx.request({
    url: url,
    method: method,
    header: {
      'Content-Type': 'Application/json'
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

const covertToNameString = (roleArr)=>{
  let nameArr = roleArr.map(role=>role.name);
  let nameStr = nameArr.join("/");
  return nameStr;
}

const covertToCastInfo = (castArr)=>{
  let castInfoArr = castArr.map(role=>{
    return {
      name: role.name,
      img: role.avatars?role.avatars.large:""
    }
  });
  return castInfoArr;
}

module.exports = {
  converToStarsArray: converToStarsArray,
  parseSlogan: parseSlogan,
  formatRating: formatRating,
  formatTitle: formatTitle,
  http:http,
  covertToNameString: covertToNameString,
  covertToCastInfo: covertToCastInfo
}