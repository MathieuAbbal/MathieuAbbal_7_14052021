<template>
  <div class="flex flex-col">
      <div class="flex justify-center">   
      <img src="../assets/logo.png" class=" " alt="Groupomania logo"> 
      </div>    
        <nav class="flex justify-end p-4 mr-4 "><router-link  to="/" class="active p-2 m-2  hover:shadow-xl border-4 border-light-blue-500 border-opacity-50 rounded-lg ">Se connecter</router-link> <router-link class="  p-2 m-2 uppercase hover:shadow-xl border-4 border-light-blue-500 border-opacity-50 rounded-lg" to="/signup">S'inscrire</router-link></nav>
        <form @submit.prevent = login() class="m-5">        
            <div class="m-4 ">
            <label class="w-64 m-4" for="login-email">Email :</label>
            <input class="w-64 ml-4 border-gray-400 shadow-md rounded-full text-center sm:ml-16" id="login-email" type="text" placeholder="Email" required>
            </div>
            <div class="m-4">
            <label class="w-64 m-4" for="login-password">Mot de passe :</label>
            <input class="w-64 ml-4 border-gray-400 shadow-md rounded-full text-center" id="login-password" type="password" placeholder="Mot de passe" required>
            </div>
            <div class="">{{message}}</div>
            <div class="mt-8 ">
            <button class=' w-56 p-2 border-4 border-light-blue-500 border-opacity-50 rounded-lg hover:shadow-xl' id="login-btn" type="submit">Se Connecter</button>
            </div>
             
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'LoginForm',

    data(){
        return{
             message:"",
        };
    },

    methods: {
        login(){
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            axios.post("http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                },
                {
                    headers:{
                        'Content-type':'application/json'
                     }
                }        
            )
            .then(res =>{
                sessionStorage.setItem('user', JSON.stringify(res.data));
                location.reload();
            })
            .catch((error) =>{
                 if (error.response.status === 404) {
                    this.message = "Utilisateur inconnu ! ";
                }
                if (error.response.status === 401) {
                    this.message = "Email ou mot de passe invalide ! ";
                }
                if (error.response.status === 500) {
                    this.message = "Erreur serveur ! ";
                }
            });
        }
    }
    
}

</script>

<style>

</style>