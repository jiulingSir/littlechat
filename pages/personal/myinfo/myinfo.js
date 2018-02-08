const app = getApp();
const util = require('../../../utils/util.js')
Page({
	data:{ 
    avatorUrls:[], 
    infos:[],
    page:0,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏 
    searchLoadingComplete: false //“没有数据”的变量，默认false，隐藏 
	},
	onLoad:function(options){ 
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
})		