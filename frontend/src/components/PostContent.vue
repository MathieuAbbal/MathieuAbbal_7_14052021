<template>
  <div class="">     
    <h3 class="" v-if="posts.length>0">Vos dernières publications</h3>
        <h3 class="" v-else>Aucune publication récente</h3>
    <div class="m-auto px-4 py-8 max-w-2xl" v-for= "post in onepost" :key="post.id">
        
            <div class="bg-white shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >            
                <div class="px-4 py-2 mt-2 bg-white">
                    
                    <h2 class="p-4 font-bold text-2xl text-gray-800">{{title}}</h2>   
                    <img v-bind:src="post.imageurl" class="w-full">               
                     <div class=" flex items-center ml-3 mt-8 mb-4">
                       <p> {{onePost.content}}  </p>        
                    </div>
                </div>
            </div>
           <div><comments :post_id="this.post_id"></comments></div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
import comments from './Comments.vue';
export default {

    name: 'PostContent',

    data(){
        return{
            onePost: [],
            post_id: this.$route.params.id,
            user_id : JSON.parse(sessionStorage.user).user_id
        }
    },
    mounted(){
        this.getOnePosts();
    },
    methods: {
        getOnePosts(){
            
            const post_id = this.$route.params.id;
            
            axios.get(`http://localhost:3000/api/posts/${post_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(res => this.onePost = res.data.post)
            console.log(this.onePosts)
        },
        components:{
            comments
        }
    }
}

</script>

<style>

</style>