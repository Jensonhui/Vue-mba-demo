<template>
    <div class="page second_page" id="secondPage">
        <!-- 提示区域 -->
        <div class="second_tip" id="secondTip" v-show="flag">
            <h3 id="beginTime">5</h3>
            <ul class="tip_text">
                <li>选择你的人设</li>
                <li class="right">向左滑动跳过</li>
                <li class="left">向右滑动选择</li>
                <li>你只有<b> 3 </b>次机会</li>
                <li>并且不能反悔哦</li>
                <li>你准备好了么？</li>
            </ul>
        </div>
        <!-- 选择区域 -->
        <div class="second_cont" id="secondCont">
            <div class="text_center">"左滑跳过右滑选择"</div>
            <div class="cont_top"> 
                <div class="showimg"></div> 
                <div class="choose_btn btn_left"></div>
                <div class="choose_btn btn_right"></div>
            </div>
            <div class="show_img clearfix" id="showImg">
                <div class="show_img_slider">
                    <div class="show_img_list"><div class="show_img_item"></div></div>
                    <div class="show_img_list"><div class="show_img_item"></div></div>
                    <div class="show_img_list"><div class="show_img_item"></div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : 'secondPage',
    data() {
        return {
            flag : true,
            pngArry: [], // JPG路径
            pngResult : [],  // 选中结果
        };
    },
    mounted(){
        this.countDown();
        this.getpng();
        this.chooseCard();
    },
    methods: {
        // 获取图片资源
        getpng:function(){
            axios.get('http://localhost:3000/jpg').then( res =>{
                var {status,data} = res;
                if (status === 200) {
                    this.pngArry = data;
                }
            })
        },
        // 提示倒计时
        countDown: function (){
            let tipsBox = document.getElementById('secondTip');
            let timeBox = document.getElementById('beginTime');
            let times = 6 , timer = null;
            timer = setInterval(() => {
                times -- ;
                if(times < 0){ 
                    times = 0;
                    clearInterval(timer); 
                    this.flag = false;
                }
                timeBox.innerText = times;
            }, 1000);
        },
        // 选择人设
        chooseCard: function(){
            var _self = this;
            var secondPages = document.getElementById('secondPage');
            var secondCont = document.getElementById('secondCont'); // 父容器盒子
            var box = document.getElementsByClassName('cont_top')[0]; // 滑动盒子
            var imgbox = document.getElementsByClassName('showimg')[0]; // 图片展示盒子
            var showimg = document.getElementById('showImg').getElementsByClassName('show_img_item') // 已选择列表

            var isMove = false, timer = null; // 判断是否滑动过
            var startR = 0;   // 初始移动距离
            var changeR = 0;  // 滑动距离，与startR比较，大于40px即为右滑 
            var firstIndex = 0, resultIndex = 0; // 图片初始值
            
            // 添加滑动事件
            box.addEventListener('touchstart',function(e){
                startR = e.touches[0].clientX; 
            });
            box.addEventListener('touchmove',function(e){
                var moveR = e.touches[0].clientX;
                changeR = moveR - startR;
                isMove = true;
            })
            box.addEventListener('touchend',function(e){
                if (isMove&& Math.abs(changeR) > 30) {
                    if (changeR < 0) {
                        firstIndex ++;
                        if(firstIndex > _self.pngArry.length - 1){
                            firstIndex = 0;
                        }
                        imgbox.style.backgroundImage = "url("+ _self.pngArry[firstIndex].path +")";
                    } else {
                        saveUrl(_self.pngArry[firstIndex]);
                        _self.pngArry.splice(Math.abs(firstIndex),1);
                        imgbox.style.backgroundImage = "url("+ _self.pngArry[firstIndex].path +")";
                        if(_self.pngResult.length == 3){
                            resultIndex = 0;
                            isMove = false; 
                            secondPages.classList.add('opacitys');
                            setTimeout(() => {;
                                _self.sendData();
                                secondPages.classList.remove('opacitys');
                            }, 600);
                        }
                    }   
                }
            })

            // 添加选中
            function saveUrl(arry){
                _self.pngResult.push(arry);
                if (firstIndex === _self.pngArry.length) {
                    firstIndex = 0;
                }
                imgbox.style.backgroundImage = "url("+ _self.pngArry[firstIndex].path +")";
                showimg[resultIndex].style.backgroundImage = "url("+ _self.pngResult[resultIndex].path +")";
                resultIndex ++;
            }
        },
        // 发送数据
        sendData: function(){
            // 发送数据
            var _this = this;
            _this.$router.push({name:'makingPage', params: {result: _this.pngResult}})
            console.log('数据发送成功');
            // 清空数据
            _this.getpng();
            _this.pngResult = [];
        }
    }
};
</script>

<style scoped>
.second_page{background-image: url(../assets/img/_temp/bg.jpg)}
.second_page .second_tip{position:absolute;font-size:1.5rem;top:0;left:0;width:100%;height:100%;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:2.6rem;background-color:rgba(0,0,0,.75)}
.second_page .second_tip h3{color:#fff;font-size:4rem;margin-bottom:2rem}
.second_page .second_tip .tip_text{color:#333;padding:1.5rem 3rem;border-radius:.5rem;background-color:#fff}
.second_page .second_tip .right{color:red}
.second_page .second_tip .left{color:#00f}
.second_page .second_cont,.second_page .show_img_item{width:100%;height:100%}
.second_page .second_cont .text_center{font-size: 1.5rem;color: #333;text-align: center;margin-bottom: 1.2rem;}
.second_page .second_cont{position:absolute;top:50%;left:50%;height:auto;transform:translate(-50%,-50%)}
.second_page .second_cont .cont_top{position:relative;margin:0 auto 4rem auto;width:24rem;height:32rem;border:3px solid #333;border-radius:.5rem}
.second_page .second_cont .cont_top:after{position:absolute;bottom:-.9rem;left:-3px;z-index:-1;width:24.05rem;height:1.3333rem;background-image:url(../assets/img/_temp/img-bottom-bg.png);background-position:center;background-size:cover;background-repeat:no-repeat;content:""}
.second_page .cont_top .showimg{width:100%;height:100%;background-image:url(../assets/img/_png/01.jpg)}
.second_page .cont_top .choose_btn{position:absolute;top:50%;z-index:30;width:4rem;height:4rem;transform:translateY(-50%);animation:glitter 1s linear forwards;animation-delay:9s}
.second_page .cont_top .btn_left{left:-10%;background-image:url(../assets/img/_temp/btn-left.png)}
.second_page .cont_top .btn_right{right:-10%;background-image:url(../assets/img/_temp/btn-right.png)}
.second_page .second_cont .show_img{display:flex;margin:0 auto;width:21rem;height:7rem;border-radius:10px;background-image:url(../assets/img/_temp/choose-bg.png);flex-direction:row;align-items:center;justify-content:space-between}
.second_page .second_cont .show_img .show_img_slider{display:flex;margin:0 auto;width:15rem;height:5rem;flex-direction:row;align-items:center;justify-content:space-around}
.second_page .show_img .show_img_list{overflow:hidden;width:3rem;height:5rem;border:1px solid #e5e5e5;border-radius:4px}
</style>
