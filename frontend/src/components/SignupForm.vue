<template>
<div class="flex flex-col ">
     <div class="flex justify-center">   
      <img src="../assets/logo.png" class=" " alt="Groupomania logo"> 
      </div> 
      <nav class="flex justify-end p-4 mr-4 "><router-link  to="/" class="active p-2 m-2  hover:shadow-xl border-4 border-light-blue-500 border-opacity-50 rounded-lg ">Se connecter</router-link>  <router-link class="p-2 m-2  hover:shadow-xl border-4 border-light-blue-500 border-opacity-50 rounded-lg " to="/signup">S'inscrire</router-link></nav>
      <form @submit.prevent = signup() class="  m-5 ">
            <div class="p-4  ">
                <label class="w-64 m-4 " for="signup-nom">Nom :</label>
                <input class="w-64 m-4 border-gray-400 shadow-md rounded-full text-center" id="signup-firstname" type="text" placeholder="Nom" required>
            </div>
            <div class="p-4 sm:pr-8">
                <label class="w-64 m-4 " for="signup-prenom">Prénom :</label>
                <input class="w-64 m-4 border-gray-400 shadow-md rounded-full text-center" id="signup-lastname" type="text" placeholder="Prénom" required>
            </div>
            <div class="p-4 sm:pr-16 ">
                <label class="w-64 m-4 " for="signup-password">Mot de passe :</label>
                <input class="w-64 m-4 border-gray-400 shadow-md rounded-full text-center" id="signup-password" type="password" placeholder="Mot de passe" required>
            </div>
            <div class="p-4 sm:pr-32 ">
                <label class="w-64 m-4 " for="signup-password-verification">Vérification du mot de passe :</label>
                <input class="w-64 m-4 border-gray-400 shadow-md rounded-full text-center " id="signup-password-verify" type="password" placeholder="Vérifier mot de passe" required>
            </div>
            <div class=" p-4">
                <label class="w-64 m-4 " for="signup-email">Email :</label>
                <input class="w-64 m-4 border-gray-400 shadow-md rounded-full text-center" id="signup-email" type="email" placeholder="Email" required>
            </div>
             <div class="error-message">{{message}}</div>
            <div class=" mt-8 ">
                <button class="w-56 p-2 border-4 border-light-blue-500 border-opacity-50 rounded-lg hover:shadow-lg " id="signup-btn" type="submit">S'inscrire</button>
            </div>
        </form> 
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
                      location.href = '/';
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

</style>
