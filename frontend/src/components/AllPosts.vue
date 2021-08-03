<template>
<div>   
    <!--messsage si il n'y a pas encore de publication  -->    
   <div v-if="posts.length == 0">
        <h1 class="p-4 font-bold text-2xl text-gray-800">Bienvenu sur le réseau social interne</h1>
         
        <p class="mt-2 text-sm text-gray-400">Vous êtes la première personne à vous connecter, félicitations !<br>
        Il n'y a aucun message à lire pour le moment...<br>
        À vous de commencer en postant le premier message !</p>    
    </div>    
    <!-- affichage des publications -->
    <div class="m-auto px-4 py-8 max-w-xl" v-for= "post in posts" :key="post.id">
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
                </div>
                <h2 class="p-4 font-bold text-2xl text-gray-800">{{post.title}}</h2>
                <img v-bind:src="post.imageurl" class="w-full rounded-t-lg">                  
                <p class="text-justify sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">{{post.content}}</p>               
            </div>
            <deleteAdmin :post="post"></deleteAdmin>
            <Comments :post="post"></Comments>
        </div> 
        
        <div><div id="cRetour" class="cInvisible rounded-xl "></div></div>  
        <div><a id="cRetour" class="cInvisible" href="#haut"></a></div>
    </div> 
             
</div> 
    
  

</template>
<script>
import Comments from './Comments.vue';
import deleteAdmin from './deleteAdmin.vue';
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
                this.posts = res.data.posts ;
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
            .then(()=> this.getUserPosts())
            .then(()=> window.location.reload())
        },

      dateFormat(date){
            const event = new Date(date);

            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            return event.toLocaleDateString('fr-FR', options);
        },
        
    },

    components:{
        Comments,
        deleteAdmin
    } 
}
//gestion du bouton retour en haut
/*document.addEventListener('DOMContentLoaded', function() {
  window.onscroll = function() {
    document.getElementById("cRetour").className = (window.pageYOffset > 100) ? "cVisible" : "cInvisible";
  };
});*/
 


</script>

<style>

</style>