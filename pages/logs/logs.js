//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  data:{
    content:"",
    imgUrl:[],
    hasUserInfo: false,
    userinfo:{}, 
    toastHidden: false, //吐司  
    toastText: '',//吐司文本  
    disabled:"",
    showToast:false
  },
  onLoad:function(options){ 

  },
  onReady:function(){
    
  }, 
  clicktext:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  back:function(){ 
    if (this.data.content) {
     wx.showModal({ 
        content: '退出此处编辑？',
        success: function(res) {
          if (res.confirm) {
            wx.redirectTo({
              url:'../../pages/index/index'
            }); 
          } 
        }
      })
    }else{
      wx.redirectTo({
        url:'../../pages/index/index'
      });
    } 
  },
  chooseImg:function(){
    var that=this;
    var url=app.globalData.api;  
     wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths ;  
                that.data.imgUrl.push(tempFilePaths[0]); 
                that.setData({
                  imgUrl:that.data.imgUrl
                }); 
            }
        })
  },
  previewImage:function(e){
    var current = e.target.dataset.index;  
    var avatorUrls = this.data.imgUrl; 
    wx.previewImage({
      current: avatorUrls[current], // 当前显示图片的http链接  
      urls: avatorUrls // 需要预览的图片http链接列表  
    })
  },
  formSubmit:function(){  
    var that=this;
    if (!that.data.content) {
      that.setData({
       showToast:true
      });
      setTimeout(function(){ 
        that.setData({
       showToast:false
      });
      },2000)
      return
    }
    this.setData({disabled:"disabled"});
     try{
       var value = wx.getStorageSync('user').msg;  
        if (value) {
          var infos={
              "nickName": value.nickName,
              "gender": value.gender,   // 1代表男，0代表女 
              "country": value.country,
              "avatarUrl":value.avatarUrl,
              "content":this.data.content,
              "file":this.data.imgUrl,
              "openid":value.openid
          };  
          util.httpPostRequest("info",infos,function(res){ 
            var Ress=res;
            if (Ress.status) {
               wx.showModal({ 
                  content: Ress.msg,
                  success: function(data) {
                    if (data.confirm) {
                      wx.redirectTo({
                        url:'../../pages/index/index'
                      }); 
                    } 
                  }
                })
             }else{
                wx.showToast({
                  title: Ress.msg , 
                  duration: 2000
                })
             } 
          })
        }
    }catch(e){

    }
  }
})    
