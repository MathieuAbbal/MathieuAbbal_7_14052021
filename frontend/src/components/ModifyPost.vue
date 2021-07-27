<template>
  <div class="m-auto px-4 py-8 max-w-xl">
        <form class="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"  >
            <label for="modify-title" class="block text-gray-700 text-sm font-bold mb-2">Modifier le titre :</label>
            <input class="border border-gray-300 p-2 mb-8" type="text" id="modify-title" v-model="this.post.title">

            <label for="modify-content" class="block text-gray-700 text-sm font-bold mb-2">Modifier le contenu :</label>            
            <textarea class="lg:h-56 border border-gray-300 p-2 mb-8" id="modify-content" v-model="this.post.content"></textarea>
            <label for="modifyPost-img" class="block text-gray-700 text-sm font-bold mb-2">Modifier image :</label>
            
            <div class="m-4 flex justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
                <label class="text-sm font-bold text-gray-500  w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue ">
                    <svg class="w-8 h-8 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                <span class="mt-2 text-base leading-normal">Choisir un fichier</span>
                <input type='file' class="hidden" name="imageurl" id="imageurl" @change="onFileChange" />
                    <div id="preview" class=" object-cover  mx-4  shadow">
                    <img v-if="imageurl" :src="imageurl" class="flex"  />
                    </div>
                </label>
          </div>
            <div class="flex flex-col" >               
                <button class="cursor-pointer m-2 bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="button" v-on:click="modifyOnePost()"  >Publier les modifications</button>
                <button class="cursor-pointer m-2 bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" v-on:click="toggleModal()" >Supprimer le post</button>
            </div>
            <!-- modale suppression publication -->
            <div v-show="visible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
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
            <div v-show="visible" class="opacity-25 fixed inset-0 z-40 bg-black"></div> 
            <!-- fin de la modale -->          
        </form>
         
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
            visible: false,
            imageurl:'',  
            title:''          
            
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
          //  console.log(this.post)
            
        
         
        },
        deleteOnePost(){
            const post_id = this.$route.params.id;

            axios.delete(`http://localhost:3000/api/posts/${post_id}`,
            { 
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(location.href="/");
        },
        modifyOnePost(){
            const post_id = this.$route.params.id;
            let data = new FormData();
                data.append(`title`, document.getElementById("modify-title").value);
                data.append(`content`, document.getElementById("modify-content").value);
                data.append(`image`, document.getElementById("imageurl").files[0]);
            
            axios.put(`http://localhost:3000/api/posts/${post_id}`,            
              data,
            { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(location.href = "/");
        },
        toggleModal(){
            this.visible = !this.visible;
        },
        //affichage de la photo du post
        onFileChange(e) {//methode qui prend un événement comme argument
        const file = e.target.files[0];//qui est déclenché par l'entrée d'un fichier unique
        this.imageurl = URL.createObjectURL(file);//créer une URL d'objet pour ce fichier local
        }
    }
}
</script>