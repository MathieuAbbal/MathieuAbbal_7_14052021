<template>
<div>      
    
    <div class="m-auto px-4 py-8 max-w-xl" v-for= "post in posts.posts" :key="post.id">        
        <div class="bg-white shadow-2xl" >          
            <div class="px-4 py-2 mt-2 bg-white">
                <div class="user flex items-center mb-2 ">
                    <div class="user-logo">
                        <img class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full mx-4  shadow" v-bind:src="post.User.avatar" alt="">
                    </div>                    
                    <div class='flex text-gray-700 text-sm '>
                        <div class="pr-3">Posté le {{dateFormat(post.createdAt)}}
                        </div> 
                        <div>par <span class="text-red-400">{{post.User.firstname}}</span>
                        </div>
                    </div>
                </div>
                <h2 class="p-4 font-bold text-2xl text-gray-800">{{post.title}}</h2>
                <img v-bind:src="post.imageurl" class="w-full rounded-t-lg">                  
                <p class="sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">{{post.content}}</p>
                
            </div>
        </div>
    </div>          
</div> 
    
  

</template>
<script>
import axios from 'axios';
export default {
    
    name: 'Posts',
    
    
    data(){
        return {
            posts: []
            
        }
    },
       
    mounted(){
        this.getAllPosts()
    },
    methods:{
        getAllPosts(){
        axios.get("http://localhost:3000/api/posts",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(res =>{
                this.posts = res.data ;
                console.log(this.posts)
        })
        .catch (error => console.log(error))
      },
      dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        }
    } 
}
   


</script>

<style>

</style>