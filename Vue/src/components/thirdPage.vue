<template>
    <div class="page third_page" id="thirdPage">
        <div class="third_wiper">
            <div class="third_text">好奇图鉴里的TA是谁？</div>
            <div class="third_cont">
                <div class="third_top"> 
                    <div class="gifbox" id="capture"><img src="img/_gif/01.jpg" alt=""></div> 
                    <div class="giftxt">
                        <div><b>清华MBA首场招生宣讲会</b></div>
                        <div>2019/05/05清华大学礼堂</div>
                        <div>来现场结识为梦同行的伙伴吧</div>
                    </div>
                </div>
            </div>
            <div class="third_btns">
                <div class="btn again_btn" @click="checkAgain()"></div>
                <div class="btn share_btn" @click="shareImg()"></div>
                <div class="btn activity_btn" onclick="window.location.href='http://mba.sem.tsinghua.edu.cn/dynamic/14272.html'"></div>
            </div>
        </div>

        <!-- img canvas -->
        <div class="img_canvas" v-show="flag">
            <div class="img_canvas_swiper" @click="closeShadow();">
                <div class="canvas_top" id="capture2">
                    <div class="title">清华MBA图鉴</div>
                    <div class="canvasimg"><img :src="firstUrl" alt=""></div>
                    <div class="userimg clearfix">
                        <div class="fl user_head_img"><img :src="firstUrl" alt=""></div>
                        <div class="fl">
                            <div class="username" id="userName">Mr.Sun</div>
                            <div>你是第<b id="sharenum"> {{ peopleNum }} </b>位定制专属图鉴的人</div>
                        </div>
                    </div>
                </div>
                <div class="canvas_bottom">↑ 长按保存海报，人设屹立不倒！</div>
            </div>
        </div>

        <img id="screen" v-if="flag" @click="closeShadow()" :src="lastUrl" alt="">
    </div>
</template>

<script>
import axios from 'axios';
import html2canvas from 'html2canvas';
export default {
    name:"thirdPge",
    data() {
        return {
            pngResult: [],
            flag : false,
            startNum: 1000,
            addRand: '',
            peopleNum: '',
            firstUrl: '',
            lastUrl: ''
        };
    },
    created(){
        this.pngResult =  this.$route.params.result;
        console.log('数据接收成功');
    },
    mounted() {
        this.gifMoving();
        window.addEventListener('reload',function(){
            this.$router.push('/loadPage');
        })
    },
    methods: {
        // 开始轮播
        gifMoving: function(){
            var _self = this;
            if (_self.pngResult.length === 0 || _self.pngResult == undefined) {
                console.log('未找到对应路径！');
                return false;
            } else {
                var index = 1, timer = null;
                var len = _self.pngResult.length;
                var gifShow = document.getElementById('capture').firstChild;
                gifShow.src = _self.pngResult[0].path2;
                timer = setInterval(()=>{
                    if(index > len -1){
                        index = 0;
                    }
                    gifShow.src = _self.pngResult[index].path2;
                    index ++ ;
                },3000);
            }
        },
        // 重新选择
        checkAgain: function(){
            this.$router.push({path:'/secondPage'});
        },
        // 分享图鉴(截图)
        shareImg: function(){
            var _this = this;
            _this.flag = true;
            // 增加分享人数
            _this.addRand = parseInt(Math.floor(Math.random()*5+1));
            _this.peopleNum = _this.startNum + _this.addRand;
            // 获取截图区域
            let screen = document.getElementById('capture');
            let opts = {
                logging: false, // 日志开关，便于查看html2canvas的内部执行流程
                useCORS: true,  // 【重要】开启跨域配置
                allowTaint:true
            };
            html2canvas(screen,opts).then((canvas) => {
                let dataURL = canvas.toDataURL("image/png")
                _this.firstUrl = dataURL;
                setTimeout(() => { _this.saveImg(); }, 600);
            })
        },
        // 关闭弹窗
        closeShadow: function(){
            this.flag = false;
        },
        // 截图生成页(长按保存)
        saveImg: function(){
            var _this = this;
            // 获取截图区域
            let screen = document.getElementById('capture2');
            let opts = {
                logging: false, // 日志开关，便于查看html2canvas的内部执行流程
                useCORS: true,  // 【重要】开启跨域配置
                allowTaint:true
            };
            html2canvas(screen,opts).then((canvas) => {
                let dataURL = canvas.toDataURL("image/png")
                _this.lastUrl = dataURL;
            })
        },
    }
};
</script>

<style scoped>
.third_page .third_wiper{position: absolute;top: 50%;left: 50%;height: auto;transform: translate(-50%,-50%);}
.third_page .third_top{position: relative;width: 24rem;height: 32rem; margin: 0 auto 4rem auto;border: 3px solid #333;border-radius: 0.5rem;}
.third_page .third_text{font-size: 1.5rem;color: #333;text-align: center;margin-bottom: 1.2rem;}
.third_page .third_top .gifbox{height: 100%;overflow: hidden;background-image: none;}
.third_page .third_top .giftxt{position:absolute;bottom:0;left:0;width:100%;color:#fff;font-size:1rem;line-height:1.7rem;text-align:center;padding:0.7rem;box-sizing:border-box;background-color:rgba(0,0,0,.75);z-index: 100;}
.third_page .third_top .giftxt div:nth-child(1){font-size: 1.35rem;}
.third_page .third_top .giftxt div:nth-child(2){font-size: 1.15rem;}
.third_page .third_btns{width:25rem;height:4rem;margin:0 auto;display:flex;flex-direction:row;align-items:center;justify-content:space-around;}
.third_page .third_btns .btn{width:30%;height:4rem;background-size:contain;}
.third_page .third_btns .again_btn{background-image:url(../assets/img/_temp/again-btn.png);}
.third_page .third_btns .share_btn{background-image:url(../assets/img/_temp/share-btn.png);}
.third_page .third_btns .activity_btn{background-image:url(../assets/img/_temp/activity-btn.png);}

.third_page .img_canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:999;background-color:#000}
.third_page .img_canvas .img_canvas_swiper{position:absolute;width:23rem;height:auto;top:50%;left:50%;z-index:30;transform:translate(-50%,-50%)}
.third_page .img_canvas .canvas_top{border-radius:3px;overflow:hidden;background-color:#fff}
.third_page .canvas_top .title{width:14rem;height:4rem;text-align:center;font-size:1.2rem;line-height:4rem;margin:0 auto;background-image:url(../assets/img/_temp/share-title.png);background-size:100%!important}
.third_page .canvas_top .canvasimg{position:relative;width:100%;height:31rem;overflow:hidden}
.third_page .canvas_top .canvasimg::before{position:absolute;content:"";bottom:0.8rem;right:1rem;width:5rem;height:7rem;z-index:100;background-size:contain;background-repeat:no-repeat;background-position:center;background-image:url(../assets/img/we_code.png)}
.third_page .canvas_top .userimg{width:100%;padding:.5rem 1rem;font-size:1rem;line-height:1.5rem;box-sizing:border-box}
.third_page .canvas_top .user_head_img{width:3rem;height:3rem;margin-right:.5rem;overflow:hidden;border-radius:50%;border:1px solid #e5e5e5}
.third_page .img_canvas .canvas_bottom{font-size:1rem;color:#fff;height:4rem;line-height:4rem;text-align:center}
#screen{position: fixed;top: 20%;left: 0;width: 100%;z-index: 999999;opacity: 0;}
</style>
