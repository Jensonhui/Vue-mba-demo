var indexHelper = {
    // 检测页面变化
    checkResize : function(){
        window.onresize = indexHelper.getFontSize();
    },
    // 获取页面根元素字体大小
    getFontSize: function (){
        var offWidth = window.screen.width / 30;
        var offHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';
    },
    init:function(){
        indexHelper.getFontSize();
        indexHelper.checkResize();
    }
}




export default indexHelper

