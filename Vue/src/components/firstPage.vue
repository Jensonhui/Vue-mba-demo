<template>
    <div class="page first_page" id="firstPage">
        <div class="first_box">
            <div class="title"></div>
            <div class="btn" @click="beginning();"></div>
            <div class="woman"></div>
            <div class="man"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'firstPage',
    data() {
        return {

        };
    },
    methods: {
        beginning: function(){
            var firstBox = document.getElementById('firstPage');
            firstBox.classList.add('opacitys');
            setTimeout(() => {
                this.$router.push({path:'./secondPage'});
                firstBox.classList.add('opacitys');
            }, 1000);
        }
    }
};
</script>

<style scoped>
.page_cont .first_page{background-image:url(../assets/img/_temp/first_bg.png)}
.first_page .first_box{position:absolute;top:50%;left:50%;z-index:30;width:23rem;height:38rem;border:2px solid #82318e;border-radius:4px;background-color:#fff;transform:translate(-50%,-50%)}
.first_page .first_box .title{margin:5rem auto;width:19rem;height:5rem;background-image:url(../assets/img/_temp/title.jpg)}
.first_page .first_box .btn{margin:0 auto;width:7rem;height:3rem;background-image:url(../assets/img/_temp/startbtn.jpg)}
.first_page .man,.first_page .woman{position:absolute;bottom:-4rem;z-index:60;width:15rem;height:23rem}
.first_page .woman{right:-15%;background-image:url(../assets/img/_temp/woman.jpg)}
.first_page .man{left:-15%;background-image:url(../assets/img/_temp/man.jpg)}
.first_page .first_box .btn,.first_page .first_box .title,.first_page .man,.first_page .woman{background-position:center;background-size:100%;background-repeat:no-repeat}
</style>
