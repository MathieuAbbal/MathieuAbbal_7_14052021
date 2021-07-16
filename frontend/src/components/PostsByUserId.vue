<template>
<div class="test">     
    <div class="m-auto px-4 py-8 max-w-xl" v-for= "post in posts" :key="post.id">
        
            <div class="bg-white shadow-2xl" >            
                <div class="px-4 py-2 mt-2 bg-white">
                    
                    <h2 class="font-bold text-2xl text-gray-800">{{post.title}}</h2>                
                     <img v-bind:src="post.imageurl" class="w-full"> 
                     <div class=" flex items-center ml-3 mt-8 mb-4">
                       <p> {{post.content}}  </p>        
                    </div>
                </div>
            </div>
           
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'PostByUserId',

    data(){
        return{
            posts: [],
            user_id:''
            
        }
    },
    mounted(){
        this.getUserPosts();
    },
    methods: {
        getUserPosts(){
            
         //   const user_id = this.posts.user_id;

            axios.get(`http://localhost:3000/api/users/${this.$route.params.id}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(res => {
                this.posts = res.data.posts;
                console.log(this.posts)
            })
        }
       
    }
}
</script>