//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js')
var order = ['red', 'yellow', 'blue', 'green', 'red'];  
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //轮播
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    indiColor:"#9ED15B",
    interval: 5000,
    duration: 1000, 
    page:0,
    //预览图片的avatoUrls数组里面不能为对象，否则报错
    avatorUrls:[], 
    infos:[],
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏 
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏 
  }, 
  onReady: function () {
    //获得dialog组件 
    this.footer = this.selectComponent("#footer");  
    this.loadbottom();
  }, 
  loadbottom: function(e){ 
    var that=this;
    var page=this.data.page;
    var infos=this.data.infos;
    var avatorUrls=this.data.avatorUrls;
    util.httpGetRequest("allinfos?page="+page,function(data){ console.log(data) 
      if (data.status) {
        for (var i = 0; i < data.msg.length; i++) {
         infos.push(data.msg[i]);
         for (var j = 0; j <data.msg[i].file.length; j++) {
            avatorUrls.push(data.msg[i].file[j]);
         } 
        }
        page++;
        that.setData({
          page:page,
          infos:infos,
          avatorUrls:avatorUrls
        });
         that.setData({
          searchLoading:true,
          searchLoadingComplete:false
         });
      }else{
        that.setData({
          searchLoadingComplete:true,
          searchLoading:false
         }); 
      }
      
    })
  },
  // 发布圈子
  previewImage: function (e) {
    var current = e.target.dataset.index;  
    var avatorUrls = this.data.avatorUrls; 
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: avatorUrls // 需要预览的图片http链接列表  
    })
  },
  _redirectHome:function(){
    this.footer.redirect("../index/index");
  },
  _redirectLogs:function(){
    this.footer.redirect("../logs/logs");
  },
  _redirectPersonal:function(){
    this.footer.redirect("../personal/personal");
  } 
})
 