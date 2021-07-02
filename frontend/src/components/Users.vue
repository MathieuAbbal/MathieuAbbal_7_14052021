<template>  
<div class="m-auto px-4 py-8 max-w-xl" >
    
    <div class="bg-white shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" v-for="user in users " :key="user.id" >
       <router-link :to="{ name: 'Allpostuser', params: {id: user.id}}">
           
      <div class="m-4">
      <img class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full mx-4  shadow" v-bind:src="user.avatar" alt="">             
      <h2 class="font-bold text-2xl text-gray-800 -mt-8">{{user.firstname}}</h2>
      <p class="sm:text-sm text-xs text-gray-700 px-2 mr-1 my-3">{{user.bio}}</p>
      </div>
       </router-link>
    </div>
       
</div>    
</template>

<script>
import axios from 'axios';

export default {
    name:'Users',

    data(){
        return{
            users : []
        }
    },
    mounted(){
        this.getAllUsers()
    },
    methods:{
        getAllUsers(){
            axios.get("http://localhost:3000/api/users",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(res =>{
                this.users = res.data ;
                
        })
        .catch (error => console.log(error))
        }
    }
}
</script>

<style>

</style>