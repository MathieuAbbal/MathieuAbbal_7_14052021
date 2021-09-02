<template>   
    <div class="mt-20 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div class="relative hidden xl:block xl:w-1/2 h-full">
            <img class="absolute h-auto w-full object-cover" src="../assets/logo1.png" alt="logo groupomania"/>
        </div>
        <div class="w-full xl:w-1/2 p-8">
            <form @submit.prevent = login()>
                 <h1 class=" text-2xl font-bold">Connectez-vous à votre compte</h1>
                <div>
                    <span class="text-gray-600 text-sm">Vous n'avez pas de compte ?</span>
                    <router-link to="/signup" class="text-gray-700 text-sm font-semibold"> S'inscrire</router-link>
                </div>
                <div class="mb-4 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                    <input class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="login-email"
                    type="email" name="mail"
                    placeholder="Votre adresse mail" required/>
                </div>
                <div class="mb-6 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password" >Mot de Passe</label>
                    <input class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="login-password"
                    type="password"
                    placeholder="Votre mot de passe" required/>       
                </div>
                <div v-if="message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{{message}}</div>
                <div class="flex w-full mt-8">
                    <button class="w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="submit" id="login-btn">
                    Se Connecter
                    </button>               
                </div>               
            </form>
        </div>    
    </div>
    
</template>

<script>
import axios from 'axios';//client HTTP basé sur les promesses

export default {
    name:'LoginForm',
    data(){
        return {
            message:"" ,   
                    
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
                sessionStorage.setItem('user', JSON.stringify(res.data));//enregistre l'user dans le session storage en chaîne de caractères
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
            })
        },
        
    }
    
        
    
    
}


</script>

<style>
input:invalid {
  border: 1px solid red;
}

input:valid {
  border: 1px solid green;
}
</style>