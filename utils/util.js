var _httprequest={
  request: function(obj){
    wx.request(obj);
  }
}
  
module.exports = {
  httpPostRequest : function(reqUrl,reqObj,cb){ 
    var obj={
      "url":getApp().globalData.api+reqUrl,
      data:reqObj,
      header:{"Content-Type":"application/json"},
      dataType:"json",
      method:"post",
      success:function(res) { 
          typeof cb == "function" && cb(res.data);
      }
    }; 
    _httprequest.request(obj);
  },
  httpGetRequest : function(reqUrl,cb){ 
    var obj={
      "url":getApp().globalData.api+reqUrl, 
      header:{"Content-Type":"application/json"},
      dataType:"json",
      method:"get",
      success:function(res) { 
          typeof cb == "function" && cb(res.data);
      }
    }; 
    _httprequest.request(obj);
  },
};
