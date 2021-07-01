<template>
  <header class="">
    <nav class="bg-white py-2 md:py-4">
      <div class="container px-4 mx-auto md:flex md:items-center">        
        <div class="flex justify-between items-center">
          <router-link to='/'>
            <img  src="../assets/logo.png" alt="Groupomania logo">   
          </router-link>        
        </div>             
        <div class=" md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="">
          <router-link to='/users' >
            <div class="p-2 lg:px-4 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300" >Tous les profils</div>
          </router-link>
          <router-link to='/profile'>  
            <div class="p-2 lg:px-4 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Mon Compte</div>          
            </router-link>
          <div @click = disconnect() class="p-2 lg:px-4 md:mx-2 text-red-500 text-center border border-solid border-red-500 rounded hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Se déconnecter</div>
       
        </div>
      </div>    
    </nav>
  </header>
</template>


<script>
export default {
    name: 'Header',    
   

    methods: {
        disconnect(){
            sessionStorage.removeItem('user');
            location.href = "/";
        }
        
      
    }
        
 }


</script>



<style>
    

</style>