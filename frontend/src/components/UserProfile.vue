<template>
  

<div class="m-auto px-4 py-8 max-w-xl">	
	<div class="m-auto bg-white shadow-2xl p-8">    
    <img class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full mx-4  shadow" v-bind:src="avatar" alt="">     
		<div class="text-center">
			<h2 class="mt-5 text-3xl font-bold text-gray-900">
				Bonjour {{firstname+"!"}}
			</h2>
			<p class="mt-2 text-sm text-gray-400">Vous pouvez modifié votre description et votre image de profil .</p>
		</div>
    <form class="mt-8 space-y-3" action="" method="">
      <div class="flex flex-col ">
        <label class="text-sm font-bold text-gray-500 tracking-wide" html-for="user-bio">description</label>
        <textarea id="bio" class="m-8 p-2 p lg:h-36 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Votre description"></textarea>
      </div>
          <div class="m-4 flex justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
            <label class="text-sm font-bold text-gray-500  w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide  border border-blue cursor-pointer hover:bg-blue ">
              <svg class="w-8 h-8 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Choisir un fichier</span>
              <input type='file' class="hidden" name="avatar" id="avatar" @change="onFileChange" />
                <div id="preview" class=" object-cover  mx-4  shadow">
                  <img v-if="avatar" :src="avatar" class="flex"  />
                </div>
            </label>
          </div>
      
      
      <div>
      <button @click="modifyUser()"  type="submit" class="m-4 cursor-pointer bg-gray-800 hover:bg-green-500 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 ">
                        Mettre à jour le profil
      </button>
      <button type="button" v-on:click="toggleModal()" class="m-4 cursor-pointer bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 md:font-semibold rounded focus:outline-none focus:shadow-outline h-10" >
                supprimer mon compte
      </button>                               
      <div v-show="visible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
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
                <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="deleteUser()">
                Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>       
      </div>
      <div v-if="visible" class="opacity-25 fixed inset-0 z-40 bg-black"></div>      
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
            avatar: null,
            bio:"",
            visible: false,
            
            
           
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
      this.visible = !this.visible;
    },
    modifyUser(){
      let data= new FormData();
      data.append(`bio`,  document.getElementById("bio").value);
      data.append(`image`, document.getElementById("avatar").files[0]);

      axios.put("http://localhost:3000/api/users/"+ JSON.parse(sessionStorage.user).user_id,
         data,
          {
            headers: {              
              'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
            }
          }
        )          
          .then(location.href="/");
    },
    //affichage de la photo de profil
    onFileChange(e) {//methode qui prend un événement comme argument
      const file = e.target.files[0];//qui est déclenché par l'entrée d'un fichier unique
      this.avatar = URL.createObjectURL(file);//créer une URL d'objet pour ce fichier local
    }
  
    
  
  }
}

</script>

<style>

</style>