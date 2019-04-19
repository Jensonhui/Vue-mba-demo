<template>
    <!-- 正在生成图 -->
    <div class="second_making" id="secondMaking">
        <div class="mankingbox">
            <div class="makeimg"></div>
            <div>你的清华MBA图鉴正在生成中 <span><i class="bounce1">.</i><i class="bounce2">.</i><i>.</i></span> </div>
        </div>    
    </div>
</template>

<script>
export default {
    name:"makingPage",
    data() {
        return {
            pngResult: this.$route.params.result
        }
    },
    mounted(){
        this.changUrl();
    },
    methods: {
        changUrl:function(){
            setTimeout(() => {
                var _this = this;
                _this.$router.push({name:'thirdPage', params: {result: _this.pngResult}})
            }, 1500);
        }
    }
};
</script>

<style scoped>
.second_making{position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;color:#333;font-size:1.25rem;background-color:#dbcded}
.mankingbox{position:absolute;top:50%;left:50%;z-index:40;width:20rem;text-align:center;transform:translate(-50%,-75%)}
.second_making .makeimg{width:8.2rem;height:8.2rem;margin:0 auto;margin-bottom:3rem;background-image:url(../assets/img/_temp/making.png);background-size:100%!important}
.second_making i{display:inline-block;margin:0 2px;-webkit-animation:bouncedelay 1.6s infinite ease-in-out;animation:bouncedelay 1.6s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}
.second_making .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s;}
.second_making .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s;}
</style>
