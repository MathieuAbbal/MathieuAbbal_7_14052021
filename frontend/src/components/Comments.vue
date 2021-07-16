<template>
  <div class="  ">      
        <form @submit.prevent= 'newComment' class="m-2 flex flex-col commentForm">
            <label for="new-comment" class="text-sm font-bold text-gray-500 bg-white text-blue tracking-wide  cursor-pointer hover:bg-blue">Laisser un commentaire :</label>
            <textarea name="newComment" id="new-comment" placeholder="Laisser un commentaire..." class="newComment p-2 border border-blue " required></textarea>
            <button class="m-4 cursor-pointer bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 " type="submit" id="send-comment">Envoyer</button>
        </form>
        <h2 v-if="comments.length > 0" class="text-sm font-bold text-gray-500" >Commentaires :</h2>        
        <div class="flex space-x-2" v-for="comment in comments" :key="comment.id">
             
            <div class="" >
              <img class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full mx-4  shadow" v-bind:src="comment.User.avatar" alt="">
            </div>
            <div class="w-full pb-4 ">
                <div class="bg-gray-100 rounded-xl mr-2">
                    <div class="text-sm p-2 m-2 text-left">
                      {{comment.content}}
                    </div>                                      
                    <div class=" text-xs ">
                        <div class="font-semibold flex justify-end text-gray-700 px-2 ">
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
        }
    },

    mounted(){
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
            .then(this.getAllComments())
          //  .then(document.location.reload())
            
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
                this.comments = res.data;
                console.log(res.data)
            });
        },

        deleteComment(comment_id){
            axios.delete(`http://localhost:3000/api/comment/${comment_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                    }
                }
            )
            .then(this.getAllComments());
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