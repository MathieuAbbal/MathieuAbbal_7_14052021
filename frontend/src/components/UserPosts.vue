<template>
<div class="m-auto px-4 py-8 max-w-xl">
    <div v-if="posts.length == 0">  
        <h1  class="p-4 font-bold text-2xl text-gray-800">Vous n'avez pas encore de publication</h1>
        <p class="mt-2 text-sm text-gray-400">Cliquez sur le logo Groupomania pour faire une publication<br>
        Vous pouvez partager des images ou Gifs , n'oublier pas le titre et le texte dans votre publication !
        </p>
    </div> 
    <div v-else>
      <h1  class="p-4 font-bold text-2xl text-gray-800">voilà vos publications</h1>
      <p class="mt-2 text-sm text-gray-400">vous pouvez les modifier en cliquant dessus</p>
    </div>     
    <div class="m-auto px-4 py-8 max-w-2xl" v-for= "post in posts" :key="post.id">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
            <div class="bg-white shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >            
                <div class="px-4 py-2 mt-2 bg-white">                    
                    <h2 class="p-4 font-bold text-2xl text-gray-800">{{post.title}}</h2>   
                    <img v-bind:src="post.imageurl" class="w-full">               
                     <div class=" flex items-center ml-3 mt-8 mb-4">
                       <p class="text-justify"> {{post.content}}</p>        
                    </div>
                </div>
                <!-- Affiche les commentaires -->
            <Comment :post="post"></Comment>
            </div>
        </router-link>    
    </div>
</div>
</template>


<script>
import axios from 'axios';
import Comment from './Comment.vue'
export default {
    name: 'UserPosts',

    

    data(){
        return{
            posts: []
        }
    },
    created(){
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
            .then(res => {
                this.posts = res.data.posts;
                console.log(this.posts)
            })
        },
       /* deletePost(){
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
        },*/
    },
    components:{
        Comment
    }
}
</script>