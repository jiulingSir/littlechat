//app.js
var util=require('./utils/util');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) ;
      var that=this; 
    // 获取用户信息
    wx.login({
      success:function(log){ 
        var code=log.code;
          wx.getUserInfo({
              success:function(res){
                // console.log(res.code);return
               var simpleUser = res.userInfo; 
               simpleUser.code=code; 
              util.httpPostRequest("upload",simpleUser,function(res){  
               try{
                wx.setStorageSync('avatarUrl',simpleUser.avatarUrl);
                wx.setStorageSync('user',res);
               }catch(e){

               }
               // typeof cb == "function" && cb(simpleUser); 
              })
             
              }
          });
      }
    });
  }, 
  globalData: {
    userInfo: null,
    api:"https://eknow.yaliankeji.cn/"
  }
})