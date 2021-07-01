<template>
    <div class="m-auto px-4 py-8 max-w-xl">
        <div class="cursor-pointer w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" @click="visible = true">Ajouter une publication            
        </div>
        
            <div class=" " v-if="visible">
                <div class="m-2 flex flex-col ">                   
                    <form class=" flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="sendNewPost()">
                        <button class="self-end m-2 px-4 py-1 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm  rounded shadow
                     focus:shadow-outline hover:bg-red-700 shadow-lg cursor-pointer transition ease-in duration-300  " type="button"  @click="visible = false">fermer</button> 
                        <label for="newPost-title" class="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                        <input id="newPost-title" type="text" placeholder="Titre de votre post..." class="border border-gray-300 p-2" required>
                        <label for="newPost-content" class="block text-gray-700 text-sm font-bold mb-2">Contenu</label> 
                        <textarea id="newPost-content" type="text" placeholder="Contenu de votre publication..." class="border border-gray-300 p-2 mb-8" required></textarea>                        
                        
                        <label for="newPost-img" class="block text-gray-700 text-sm font-bold mb-2">Insérer une image</label> 
                        <input type="file" class="p-4">
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
        }
    },
    methods: {
            sendNewPost(){
                const title = document.getElementById("newPost-title").value;
                const content = document.getElementById("newPost-content").value;

                console.log(content);

                axios.post("http://localhost:3000/api/posts/",
                        {
                            
                            title,
                            content
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                            }
                        }
                    )
                    .then( this.visible = false)
                    .then((res) =>{
                    this.post = res.data.post,                    
                    location.href = '/'; //on retourne sur la vue Home
                    
                }) 
                    .catch(error => error.status(400).json({ error }));
                    
                    
            }
        }
  
}
</script>


