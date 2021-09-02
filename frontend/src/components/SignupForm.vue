<template>
    <div class="mt-20 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden">
        <div class="relative hidden xl:block xl:w-1/2 h-full">
            <img class="absolute h-auto w-full object-cover" src="../assets/logo1.png" alt="logo groupomania"/>
        </div>
        <div class="w-full xl:w-1/2 p-8">
            <form @submit.prevent = signup()>
                 <h1 class=" text-2xl font-bold">Créer un compte</h1>
                <div>
                    <span class="text-gray-600 text-sm">Vous avez déjà un compte ?</span>
                    <router-link to="/" class="text-gray-700 text-sm font-semibold"> Se connecter</router-link>
                </div>
                 <div class="mb-4 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-firstname">Prénom</label>
                    <input class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="signup-firstname"
                    type="text" aria-label="prénom"
                    title="veuillez renseigner votre prénom !"
                    placeholder="Votre Prénom" required/>
                </div>
                <div class="mb-4 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-lastname">Nom</label>
                    <input class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="signup-lastname"
                    type="text" aria-label="nom"
                    placeholder="Votre nom"  required/>
                </div>
                <div class="mb-4 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-email">Email</label>
                    <input class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="signup-email"
                    type="email" aria-label="email"
                    placeholder="Votre adresse mail" required pattern="[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})"/>
                </div>
                <div class="mb-6 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-password" >Mot de Passe</label>
                    <input class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="signup-password"
                    type="password" aria-label="mot de passe" title="Votre mot de passe doit contenir entre 6 et 15 caractères une majuscule, une minuscule et un chiffres"
                    placeholder="Votre mot de passe" maxlength="15" minlength="6" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/>       
                </div>
                <div class="mb-6 mt-6">
                    <label class="block text-gray-700 text-sm font-semibold mb-2" htmlFor="signup-password-verify" >Vérification du mot de passe</label>
                    <input class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="signup-password-verify"
                    type="password" aria-label="vérifier le mot de passe"
                    placeholder="Vérifier le mot de passe" required/> 
                </div>   
                <div v-if="message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{{message}}</div>
                <div class="flex w-full mt-8">
                    <button class="w-full bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="submit" id="signup-btn" aria-label="s'inscrire">
                    S'inscrire
                    </button>
                </div>
            </form>
        </div>    
    </div>
  
 
</template>
  

<script>
import axios from 'axios';//client HTTP basé sur les promesses
export default {
    name:'SignupForm',
    
    data(){
        return{
            message:"",
        };
    },
    methods:{
        signup(){
            const firstname = document.getElementById("signup-firstname").value;
            const lastname = document.getElementById("signup-lastname").value;
            const password = document.getElementById("signup-password").value;
            const passwordVerify = document.getElementById("signup-password-verify").value;
            const email = document.getElementById("signup-email").value;

            if(password === passwordVerify){
                axios.post('http://localhost:3000/api/auth/signup',
                {
                    firstname,
                    lastname,
                    password,
                    email
                },
                {
                    Headers:{
                        'Content-Type':'application/json'
                    }
                }
              )  
              .then(res =>{
                  if(res.status === 201){
                      location.href = '/'; //on retourne à l'authentification
                  }
              }) 
              .catch((error) =>{
                  if(error.response.status === 401){
                      this.message = "Email non disponible ! ";
                  }
              });                       
            }
            else if(password != passwordVerify ){
                this.message = "Vérifier le mot de passe ! ";
            }
       }   
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
