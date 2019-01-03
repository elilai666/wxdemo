// component/searchbar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "标题"
        },
        placeholder: {
            type: String,
            value: "搜索"
        },
        searchIconColor: {
            type: String,
            value: ""
        },
        clearIconColor: {
            type: String,
            value: ""
        }
    },
    data: {
        inputFocused: false,
        searchValue: ""
    },
   
    /**
     * 组件的初始数据
     */
    

    /**
     * 组件的方法列表
     */
    methods: {
        showInput() {
            console.log("click")
            this.setData({
                inputFocused: true
            });
            this.triggerEvent("showInput")
        },
        hideInput() {
            console.log("hide")
            this.setData({
                inputFocused: false
            });
            this.triggerEvent("hideInput")
        },
        clearInput() {
            this.setData({
                searchValue: ""
            });
        },
        inputTyping(e) {
            this.setData({
                searchValue: e.detail.value
            });
        },
        getSearchValue(e) {
            const eventDetails = {
                value: this.data.searchValue
            };
            this.triggerEvent("search", eventDetails)
        }
    }
})