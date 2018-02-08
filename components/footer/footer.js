// components/Dialog/dialog.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: { 
  	home :{
      type : String ,
      value : ''
    },
    msg:{
      type : String ,
      value : ''
    },
    personal:{
      type : String ,
      value : ''
    },
    homeactive:{
      type : String ,
      value : ''
    },
    msgactive:{
      type : String ,
      value : ''
    },
    personalactive:{
      type : String ,
      value : ''
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    home:'',
    msg:'',
    personal:''
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */ 
     redirect(url){
       wx.redirectTo({
        url:url
       })
     },
     /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
     _redirectHome(){
      //触发取消回调
      this.triggerEvent("redirectHome");
    },
     _redirectLogs(){
      //触发取消回调
      this.triggerEvent("redirectLogs");
    },
     _redirectPersonal(){
      //触发取消回调
      this.triggerEvent("redirectPersonal");
    },
  }
})