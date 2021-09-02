<template>
  <div class="  ">  
      <!-- Formulaire pour la création de commentaires -->     
        <form @submit.prevent= 'newComment' class="commentForm m-2 flex flex-col ">
            <label for="new-comment" class="text-sm font-bold text-gray-500 bg-white text-blue tracking-wide  cursor-pointer hover:bg-blue">Laisser un commentaire :</label>
            <textarea name="newComment" id="new-comment" placeholder="Laisser un commentaire..." class="newComment p-2 border border-blue " required></textarea>
            <button class="m-4 cursor-pointer bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 " type="submit" id="send-comment">Envoyer</button>
        </form>
        <!-- Titre si il y a des commentaires -->
        <h2 v-if="comments.length > 0" class="text-sm font-bold text-gray-500" >Commentaires :</h2>  
        <!-- Affiche la liste des commentaires -->      
        <div class="flex space-x-2" v-for="comment in comments" :key="comment.id"> 
            <div>
              <img class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full mx-4  shadow" v-bind:src="comment.User.avatar" alt="photo de profil">
            </div>
            <div class="w-full pb-4 ">
                <div class="bg-gray-100 rounded-xl mr-2">                    
                    <div class="sm:text-sm text-xs p-2 m-2 text-left">
                      {{comment.content}}
                    </div>                                                       
                    <div class=" text-xs ">                        
                        <div class="font-semibold flex justify-end text-gray-700 px-2 ">
                           <span @click="deleteComment(comment.id)" class="w-auto cursor-pointer flex items-center mx-4 " v-if="comment.User.id == user_id || isAdmin == true ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </span> 
                            
                            <small class="pt-2 mr-2 text-red-400">{{comment.User.firstname}}</small>                        
                            <small class="pt-2">le {{dateFormat(comment.createdAt)}}</small>                            
                        </div>
                    </div>
                </div> 
            </div>
        </div>              
    </div>
</template>

<script>
import axios from 'axios';

export default {
    names: 'Comments',

    props:{
     user:{
        type:Object                
     },
     post:{
        type:Object
     },
     
       
    },

    data(){
        return{
            comments: [],
            user_id: JSON.parse(sessionStorage.user).user_id,
            isAdmin: JSON.parse(sessionStorage.user).isAdmin   
            
        }
    },
   
    created(){
        this.getAllComments();      
    },

    methods: {
        newComment(event){
        
           const post_id = JSON.stringify(this.post.id);
           const user_id = this.user_id;
           const content = event.target.closest('.commentForm').querySelector('.newComment').value;

            axios.post(`http://localhost:3000/api/posts/${post_id}/comments`,
                {
                    post_id,
                    user_id,
                    content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(()=> this.getAllComments())
          
          
            
        },
         deleteComment(comment_id){
            const post_id = JSON.stringify(this.post.id);         
            axios.delete(`http://localhost:3000/api/posts/${post_id}/comments/${comment_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(() => this.getAllComments())
         
            
        },

        getAllComments(){
          const post_id = JSON.stringify(this.post.id);        
          axios.get(`http://localhost:3000/api/posts/${post_id}/comments`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(res => {
                this.comments = res.data
                console.log(res.data)
            });
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