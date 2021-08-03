<template>  
<div class="m-auto p-4 max-w-xl" >    
    <div class=" p-4 m-4 bg-white shadow-lg rounded-lg my-20 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" v-for="user in users " :key="user.id" >
       <router-link :to="{ name: 'Allpostuser', params: {id: user.id}}">
           
                <div class="flex justify-end">
                    <h2 class="text-gray-800 text-3xl font-semibold flex justify-center items-center flex-grow">{{user.firstname}}</h2>
                    <img class="w-20 h-20 object-cover rounded-full " v-bind:src="user.avatar" alt="photo de profil">
                </div>
            <p class="text-center">{{ user.bio }}</p>              
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
    
    created(){
      
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
                this.users = res.data;
                
        })
        .catch (error => console.log(error))
        }
    }
}
</script>

<style>

</style>