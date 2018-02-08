const app = getApp();
Page({
	data:{
		UserImg:"",
		nickname:"",
		hiddenLoading:false
	},
	onLoad:function(options){
      this.footer = this.selectComponent("#footer");
		const that=this; 
		try{
			var value=wx.getStorageSync('user').msg;  
			if (value) {
				that.setData({
				UserImg:value.avatarUrl,
				nickname:value.nickName
			    })
			}
		}catch(e){}
	},
	bindFocus: function () {  
	   wx.navigateTo({  
	     title:"goback",  
	     url: './myinfo/myinfo'  
	   })  
	 },  
	_redirectHome(){
	this.footer.redirect("../index/index");
	},
	_redirectLogs(){
	this.footer.redirect("../logs/logs");
	},
	_redirectPersonal(){
	this.footer.redirect("../personal/personal");
	}, 
})		