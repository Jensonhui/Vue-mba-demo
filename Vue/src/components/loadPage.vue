<template>
    <div class="page load_page" id="loadPage">
        <div>
            <div class="load_man"></div>
            <div class="load_time"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadPage',
    data() {
        return {

        };
    },
    mounted() {
        this.getAllready();
    },
    methods: {
        // 页面加载完毕
        getAllready: function(){
            var that = this;
            document.onreadystatechange = subSomething;
            function subSomething() {
                if (document.readyState == "complete") {
                    var loadBox = document.getElementById('loadPage');
                    loadBox.classList.add('opacitys');
                    setTimeout(() => {
                        that.$router.push({path:'./firstPage'});
                    }, 1000);
                }
            }
        }
    }
};
</script>

<style scoped>
.page_cont .load_page{z-index:30;display:flex;background-color:#dbcded;flex-direction:column;align-items:center;justify-content:center}
.page_cont .load_page .load_man{margin:-4rem auto 1rem auto;width:8.2rem;height:20.6rem;background-image:url(../assets/img/_temp/loading-man.png)}
.page_cont .load_page .load_time{margin:0 auto;width:17.333rem;height:3.333rem;background-image:url(../assets/img/_temp/loading.jpg)}

</style>
