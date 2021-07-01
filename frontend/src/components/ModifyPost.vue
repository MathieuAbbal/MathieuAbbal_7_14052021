<template>
  <div class="m-auto px-4 py-8 max-w-xl">
        <div class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label for="modify-title" class="block text-gray-700 text-sm font-bold mb-2">Modifier le titre :</label>
            <input class="border border-gray-300 p-2 mb-8" type="text" id="modify-title" v-model="this.post.title">

            <label for="modify-content" class="block text-gray-700 text-sm font-bold mb-2">Modifier le contenu :</label>            
            <textarea class="border border-gray-300 p-2 mb-8" id="modify-content" v-model="this.post.content"></textarea>
            <label for="modifyPost-img" class="block text-gray-700 text-sm font-bold mb-2">Modifier image :</label>
            <input type="file" class="p-4 ">
            <div class="flex flex-col" >               
                <button class="cursor-pointer m-2 bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" @click="modifyOnePost()" >Publier les modifications</button>
                <button class="cursor-pointer m-2 bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" v-on:click="toggleModal()" >Supprimer le post</button>
            </div>
            <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                <div class="relative w-auto my-6 mx-auto max-w-sm">                 
                  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                    
                     <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                       <h3 class="text-3xl font-semibold">Etes-vous sûr de vouloir supprimer votre Publication ?</h3>
                       <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                         <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                      </div>                 
                      <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                         <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                        Annuler
                       </button>
                       <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="deleteOnePost()">
                         Supprimer
                        </button>
                     </div>
                   </div>
                  </div>
            </div>
            <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> 
        </div>
    </div>            
</template>

<script>
import axios from 'axios';

export default{
    name: 'ModifyPost',

    data(){
        return{
            modifiedContent:'',
            post:[],
            showModal:false
            
        }
    },
    mounted(){
        this.getOnePost();        
    },
    methods:{
        getOnePost(){
        const post_id = this.$route.params.id;

        axios.get(`http://localhost:3000/api/posts/${post_id}`,
            { 
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(res => this.post = res.data)
            console.log(this.post)
            
        
         
        },
        deleteOnePost(){
            const post_id = this.$route.params.id;

            axios.delete(`http://localhost:3000/api/posts/${post_id}`,
            { 
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(location.href = "/")
        },
        modifyOnePost(){
            const post_id = this.$route.params.id;
            const title = document.getElementById('modify-title').value;
            const content = document.getElementById('modify-content').value;

            axios.put(`http://localhost:3000/api/posts/${post_id}`,
            {
                title,
                content
            },
            { 
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(location.href = "/")
        },
        toggleModal(){
            this.showModal = !this.showModal;
        }
    }
}
</script>