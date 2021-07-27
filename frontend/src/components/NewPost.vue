<template>
    <div class="m-auto px-4 py-8 max-w-xl">
        <div class="cursor-pointer w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" @click="visible = true">Ajouter une publication            
        </div>
        
            <div class=" " v-if="visible">
                <div class="m-2 flex flex-col ">                   
                    <form class=" flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="sendNewPost()">
                        <button class="self-end m-2 px-4 py-1 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm  rounded shadow
                     focus:shadow-outline hover:bg-red-700  cursor-pointer transition ease-in duration-300  " type="button"  @click="visible = false">fermer</button> 
                        <label for="newPost-title" class="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                        <input id="newPost-title" type="text" placeholder="Titre de votre post..." class="border border-gray-300 p-2" required>
                        <label for="newPost-content" class="block text-gray-700 text-sm font-bold mb-2">Contenu</label> 
                        <textarea id="newPost-content" type="text" placeholder="Contenu de votre publication..." class="md:h-56 border border-gray-300 p-2 mb-8" required></textarea>                                                
                        <div class="m-4 flex justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
                            <label for="imageurl" class="text-sm font-bold text-gray-500  w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue ">
                                <svg class="w-8 h-8 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span class="mt-2 text-base leading-normal" >Choisir un fichier</span>
                                <input type="file" class="hidden" name="imageurl" id="imageurl" @change="onFileChange" />
                                    <div id="preview" class=" object-cover  mx-4  shadow">
                                        <img v-if="imageurl" :src="imageurl" class="flex"/>
                                    </div>
                            </label>
                        </div>
                 <!--       <input type="file" class="p-4" id="imageurl">-->
                        <button id="newPost-btn" type="submit" class="cursor-pointer w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" >Publier</button>
                    </form>
                </div>               
            </div>
            
        
    </div>   
</template>
<script>
import axios from 'axios';


export default {
    name: 'NewPost',

    data(){
        return{
            visible: false,
            content: '',
            imageurl: ''
        }
    },
    methods: {
            sendNewPost(){
                let data = new FormData();
                data.append(`title`, document.getElementById("newPost-title").value);
                data.append(`content`, document.getElementById("newPost-content").value);
                data.append(`image`, document.getElementById("imageurl").files[0]);

                console.log(data);

                axios.post("http://localhost:3000/api/posts/",                                                   
                        data,                        
                        {
                            headers: {
                              'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                            }
                        }
                    )
                    .then( this.visible = false)
                    .then(location.href="/"); //on retourne sur la vue Home                        
            },
             //affichage de la photo de profil
            onFileChange(e) {//methode qui prend un événement comme argument
            const file = e.target.files[0];//qui est déclenché par l'entrée d'un fichier unique
            this.imageurl = URL.createObjectURL(file);//créer une URL d'objet pour ce fichier local
            }
        }  
}
</script>


