<template>
    <div class="m-auto px-4 py-8 max-w-xl">
        <div class="w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" @click="visible = true">Ajouter une publication            
        </div>
        <transition name="fade">
            <div class=" " v-if="visible">
                <div class=" ">
                    <span class=" items-end"  @click="visible = false">Fermer</span>
                    <form class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="sendNewPost()">
                        <label for="newPost-title" class="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                        <input id="newPost-title" type="text" placeholder="Titre de votre post..." required>
                        <label for="newPost-content">Contenu</label> 
                        <textarea id="newPost-content" type="text" placeholder="Contenu de votre publication..." required></textarea>                        
                        <button id="newPost-btn" type="submit" >Publier</button>
                    </form>
                </div>
            </div>
        </transition>
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
                    location.href = '/'; //on retourne à l'authentification
                    
                }) 
                    .catch(error => error.status(400).json({ error }));
                    
                    
            }
        }
  
}
</script>


