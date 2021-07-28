<template>
  <div>    
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
            isAdmin: JSON.parse(sessionStorage.user).isAdmin   
            
        }
    },
   
    created(){
        this.getAllComments();      
    },

    methods: {       

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