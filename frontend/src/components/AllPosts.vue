<template>
<div>       
  
    <div class="m-auto px-4 py-8 max-w-xl" v-for= "post in posts.posts" :key="post.id">
        <div class="bg-white shadow-2xl" >          
            <div class="px-4 py-2 mt-2 bg-white">
                <div class="flex items-center justify-between m-2 mb-2 ">
                    <div class="">
                        <img class="w-6 h-6 sm:w-10 sm:h-10 object-cover rounded-full md:mx-4  shadow" v-bind:src="post.User.avatar" alt="photo de profil">
                    </div>                    
                    <div class='flex text-gray-700 text-sm '>
                        <div class="text-xs md:text-base pr-3">Posté le {{dateFormat(post.createdAt)}}
                        </div> 
                        <div class="text-xs md:text-base">par <span class="text-red-400 ">{{post.User.firstname}}</span>
                        </div>
                    </div> 
                    <div class="flex">                   
                    <svg class=" justify-items-end h-8 w-8 text-red hover:fill-current hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth=2 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    </div>
                </div>
                <h2 class="p-4 font-bold text-2xl text-gray-800">{{post.title}}</h2>
                <img v-bind:src="post.imageurl" class="w-full rounded-t-lg">                  
                <p class="sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">{{post.content}}</p>               
            </div>
            <Comments :post="post"></Comments>
        </div> 
        <div><div id="cRetour" class="cInvisible rounded-xl "></div></div>  
        
    </div> 
             
</div> 
    
  

</template>
<script>
import Comments from './Comments.vue';
import axios from 'axios';
export default {
    
    name: 'AllPosts',
    
    props:{
        user:{
            type:Object
        },
        post:{
          type:Object
      },
     
      
    },
    
    data(){
        return {
           posts: [],
           user_id: JSON.parse(sessionStorage.user).user_id,
           isAdmin: JSON.parse(sessionStorage.user).isAdmin,
            
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

      deletePost(){
        const post_id = this.data.id;               
            axios.delete(`http://localhost:3000/api/posts/${post_id}`,
                {
                    headers: {
                     //   'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(this.getUserPosts())
            .then(window.location.reload())
        },

      dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        },
        
    },

    components:{
        Comments
    } 
}
 


</script>

<style>

</style>