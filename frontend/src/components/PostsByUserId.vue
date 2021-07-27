<template>
<div class=""> 
    <div v-if="posts.length == 0">
    <h1 class="p-4 font-bold text-2xl text-gray-800">Il n'y a pas de publication chez cet utilisateur pour le moment ! </h1>    
    </div> 
    <div v-if="isAdmin == true" class="p-4 font-bold text-2xl text-gray-800">        
        <p>Vous étes l'administrateur du réseau <br>
        Vous pouvez supprimer cet utilisateur!<br>        
        </p>
        <button type="button" v-on:click="toggleModal()" class="m-4 cursor-pointer bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 md:font-semibold rounded focus:outline-none focus:shadow-outline h-10" >
                supprimer le compte
        </button>                                   
        <div v-show="visible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-auto my-6 mx-auto max-w-sm">                 
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                    
                    <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 class="text-3xl font-semibold">Etes-vous sûr de vouloir supprimer le compte de cet utilisateur?</h3>
                        <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                            <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                    </div>                 
                    <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                     Annuler
                    </button>
                    <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="deleteUser()">
                    Supprimer
                    </button>
              </div>
            </div>
          </div>
        </div>       
      </div>
      
      <div>
      <div v-if="isAdmin == true">
          <p>Vous pouvez également modifié ces droits</p>  
      <div v-if="visible" class="opacity-25 fixed inset-0 z-40 bg-black"></div>        
         <button type="button" v-on:click="toggleModal()" class="m-4 cursor-pointer bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 md:font-semibold rounded focus:outline-none focus:shadow-outline h-10" >
                modifier les droits d'administration
      </button>                               
      <div v-show="visible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-sm">                 
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                    
              <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 class="text-3xl font-semibold">Etes-vous sûr de vouloir les droits d'administration de cet utilisateur?</h3>
                <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>                 
              <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                 Annuler
                </button>
                <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="modifUserAdmin()">
                Modifié les droits
                </button>
              </div>
            </div>
          </div>
        </div>       
      </div>
      <div v-if="visible" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <!-- Affiche toutes les publication d'un utilisateur -->
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
</div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'PostByUserId',
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
            posts: [],
            user_id: JSON.parse(sessionStorage.user).user_id,
            isAdmin: JSON.parse(sessionStorage.user).isAdmin, 
            visible:false,
             
        }
    },
    created(){
        this.getUserPosts();
    },
    methods: {
        getUserPosts(){
            
        

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
        },
        
        toggleModal(){
        this.visible = !this.visible;
         }, 
         
         
        deleteUser() {
        const user_id = this.$route.params.id    
        axios.delete("http://localhost:3000/api/users/"+ user_id,
            {
             headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                     }
            }
        )
        .then(sessionStorage.removeItem('user'))
        .then(location.href="/");  
   
        },
        modifUserAdmin(){
            const user_id = this.user_id ;
            
         axios.put("http://localhost:3000/api/users/"+ user_id,
          
          {
             headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                     }
            }
         
         )
        .then(location.href="/");

        }
    }
}
</script>