 <template>
 <div>
   <!-- bouton + modale suppression publication administrateur --> 
    <div v-if="isAdmin == true">
        <!--message info admin -->
        <p class="mt-2 text-sm text-gray-400">Vous êtes l'administrateur du réseau <br>
        Vous pouvez supprimer cette Publication!<br>        
        </p>  
       <!-- bouton supprimer publication -->
        <button type="button" v-on:click="toggleModal()" class="m-4 cursor-pointer bg-gray-800 hover:bg-red-500 text-white text-sm py-2 px-4 md:font-semibold rounded focus:outline-none focus:shadow-outline h-10" >
        supprimer la publication
        </button>
        <!-- modale suppression utilisateur --> 
        <div v-show="visible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-auto my-6 mx-auto max-w-sm">                 
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">                    
                    <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                       <h3 class="text-3xl font-semibold">Etes-vous sûr de vouloir supprimer cette publication ?</h3>
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
    </div>
</div>
</template>
 
 <script>
 import axios from 'axios';
 export default {
    name:'deleteAdmin', 
    
    props:{
        post:{
        type:Object
        }
    },
    data(){
         return{
             
             isAdmin: JSON.parse(sessionStorage.user).isAdmin,
             visible: false,
         }
     },
     methods:{
            deleteOnePost(){
            const post_id = this.post.id;

            axios.delete(`http://localhost:3000/api/posts/${post_id}`,
                { 
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(()=> location.href="/");
        },
     
      toggleModal(){
            this.visible = !this.visible;
        },
    },
 }
 </script>
 
 <style>
 
 </style>