<template>
  

<div class="m-auto px-4 py-8 max-w-xl">
	
	<div class="bg-white shadow-2xl p-8">
		<div class="text-center">
			<h2 class="mt-5 text-3xl font-bold text-gray-900">
				Bonjour {{firstname+"!"}}
			</h2>
			<p class="mt-2 text-sm text-gray-400">Vous pouvez modifié votre description et votre image de profil .</p>
		</div>
    <form class="mt-8 space-y-3" action="" method="">
      <div class="grid grid-cols-1 space-y-2">
        <label class="text-sm font-bold text-gray-500 tracking-wide" html-for="user-bio">description</label>
        <textarea id="bio" class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Votre description"></textarea>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <label class="text-sm font-bold text-gray-500 tracking-wide">Photo de Profil          
        </label>
          <div class="flex items-center justify-center w-full flex-col">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                                 
               <div class="flex flex-col ">
                <input type="file" name="avatar" id="avatar" class="flex flex-col "  >                                    
                <!-- Input text lié à une variable de vuejs pour le texte alternatif de l'image -->
                <input type="text" name="" id="" >                                    
              </div> 
              
            </label>
          </div>
      </div>
      <p class="text-sm text-gray-300">
      <span>Fichier images</span></p>
      <div>
      <button @click="modifyUser()"  type="submit" class="m-4 cursor-pointer bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 ">
                        Mettre à jour le profil
      </button>
      <button class="m-4 cursor-pointer bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="button" v-on:click="toggleModal()">
                supprimer mon compte
      </button>                               
      <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                <div class="relative w-auto my-6 mx-auto max-w-sm">                 
                  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                    
                     <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                       <h3 class="text-3xl font-semibold">Etes-vous sûr de vouloir supprimer votre compte?</h3>
                       <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
                         <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                        </button>
                      </div>                 
                      <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                         <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
                        Annuler
                       </button>
                       <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"   @click="deleteUser()">
                         Supprimer
                        </button>
                     </div>
                   </div>
                  </div>
      </div>
      <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div> 
      </div>       
    </form>
	</div>
 
</div>
  

</template>
                      
 

<script>
//import axios from 'axios';
import axios from "axios" //client HTTP basé sur les promesses

export default {
    name:'UserProfile',

    data () {
        return{
            firstname:"",
            lastname:"",
            avatar:"",
            bio:"",
            showModal: false,
            
           
        }   
      },
      
    created: function(){ //hook qui permet d'accéder aux data et events qui sont actifs
        axios.get("http://localhost:3000/api/users/" + JSON.parse(sessionStorage.user).user_id,
        { 
            headers: {
                 'Content-Type':'application/json',
                 'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
        })
        .then(user => {
            this.firstname = user.data.firstname
            this.lastname = user.data.lastname
            this.avatar = user.data.avatar
            this.bio = user.data.bio           
        })
      
    },
    methods: {
    deleteUser() {
     
      axios.delete("http://localhost:3000/api/users/"+ JSON.parse(sessionStorage.user).user_id,
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
    toggleModal(){
      this.showModal = !this.showModal;
    },
    modifyUser(){
      const bio = document.getElementById("bio").value
      const avatar = document.getElementById("avatar").value

      axios.put("http://localhost:3000/api/users/"+ JSON.parse(sessionStorage.user).user_id,
          {
            bio,
            avatar
          },
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

<style>

</style>