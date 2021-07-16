<template>
<div class="m-auto px-4 py-8 max-w-xl">     
     <div class="m-auto px-4 py-8 max-w-2xl" v-for= "post in posts.posts" :key="post.id">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
            <div class="bg-white shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >            
                <div class="px-4 py-2 mt-2 bg-white">
                    
                    <h2 class="p-4 font-bold text-2xl text-gray-800">{{post.title}}</h2>   
                    <img v-bind:src="post.imageurl" class="w-full">               
                     <div class=" flex items-center ml-3 mt-8 mb-4">
                       <p> {{post.content}}  </p>        
                    </div>
                </div>
            </div>
        </router-link>    
    </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'UserPosts',

    data(){
        return{
            posts: []
        }
    },
    mounted(){
        this.getUserPosts();
    },
    methods: {
        getUserPosts(){
            
            const user_id = JSON.parse(sessionStorage.user).user_id;
            
            axios.get(`http://localhost:3000/api/users/${user_id}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(res => this.posts = res.data)
            console.log(this.posts)
        },
        deletePost(){
            const post_id = this.$route.params.id;
            
            axios.delete(`http://localhost:3000/api/posts/${post_id}`,
                {
                    headers: {
                      //  'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(console.log('publication supprimer !'));
        },
    }
}
</script>