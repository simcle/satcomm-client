<template>
    <ul v-if="pages.last_page > 1" class="pagination align-self-center">
        <li class="page-item" :class="[pages.current_page < 2? 'disabled':'']"><a @click.prevent="$emit('get-page', pages.current_page-1)" href="#" class="page-link"><i class="icon-arrow-left12"></i></a></li>
        <li v-for="page in rangeOne" :key="page.page" class="page-item" :class="[pages.current_page == page.page ? 'active':'']"><a @click.prevent="$emit('get-page', page.page)" href="#" class="page-link">{{page.page}}</a></li>
        <li v-if="rangeOne.length == 2 && pages.last_page > 10" class="page-item disabled"><a href="#" class="page-link">...</a></li>
        <li v-for="page in rangeTwo" :key="page.pgae" class="page-item" :class="[pages.current_page == page.page ? 'active':'']"><a @click.prevent="$emit('get-page', page.page)" href="#" class="page-link">{{page.page}}</a></li>    
        <li v-if="rangeThree.length == 2" class="page-item disabled"><a href="#" class="page-link">...</a></li>
        <li v-for="page in rangeThree" :key="page.page"  class="page-item" :class="[pages.current_page == page.page ? 'active':'']"><a @click.prevent="$emit('get-page', page.page)" href="#" class="page-link">{{page.page}}</a></li>   
        <li :class="[pages.current_page == pages.last_page ? 'disabled':'']"  class="page-item"><a @click.prevent="$emit('get-page', pages.current_page+1)" href="#" class="page-link"><i class="icon-arrow-right13"></i></a></li>
    </ul>
</template>

<script>
export default {
    props: ['pages'],
    data () {
        return {
            rangeOne: [],
            rangeTwo: [],
            rangeThree: [] 
        }
    },
    computed: {
        current_page () {
            return this.pages.current_page
        },
        total () {
            return this.pages.total
        }
    },
    
    watch: {
        current_page (val) {
            this.rangeOne =[]
            this.rangeTwo = []
            this.rangeThree = []
            if(this.pages.last_page  <= 10 ) {
                for (let i = 0; i < this.pages.last_page ; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
            }else if(this.pages.last_page  > 10 && val < 7){
                for (let i = 0; i < 8; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 2; i++) {
                    this.rangeThree.push({page: this.pages.last_page  + i -1})
                }
            }else if(val <= this.pages.last_page  - 6 && val > 6){
                for (let i = 0; i < 2; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 7; i++) {
                    this.rangeTwo.push({page: val+i -3})                    
                }
                for (let i = 0; i < 2; i++) {
                    this.rangeThree.push({page: this.pages.last_page  + i -1})
                }
            }else{
                for (let i = 0; i < 2; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 9; i++) {
                    this.rangeThree.push({page: this.pages.last_page  +i -8})
                }
            }
        },
        total () {
            var val = this.pages.current_page
            this.rangeOne =[]
            this.rangeTwo = []
            this.rangeThree = []
            if(this.pages.last_page  <= 10 ) {
                for (let i = 0; i < this.pages.last_page ; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
            }else if(this.pages.last_page  > 10 && val < 7){
                for (let i = 0; i < 8; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 2; i++) {
                    this.rangeThree.push({page: this.pages.last_page  + i -1})
                }
            }else if(val <= this.pages.last_page  - 6 && val > 6){
                for (let i = 0; i < 2; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 7; i++) {
                    this.rangeTwo.push({page: val+i -3})                    
                }
                for (let i = 0; i < 2; i++) {
                    this.rangeThree.push({page: this.pages.last_page  + i -1})
                }
            }else{
                for (let i = 0; i < 2; i++) {
                    this.rangeOne.push({page: i+1})                    
                }
                for (let i = 0; i < 9; i++) {
                    this.rangeThree.push({page: this.pages.last_page  +i -8})
                }
            }

        },
    }
}

</script>

<style  scoped>
    .disabled:hover {
        cursor: no-drop;
    }
</style>