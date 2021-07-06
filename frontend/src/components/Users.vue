<template>  
<div class="m-auto px-4 py-8 max-w-xl" >    
    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" v-for="user in users " :key="user.id" >
       <router-link :to="{ name: 'Allpostuser', params: {id: user.id}}">
           
                <div class="">
                    <img class="w-20 h-20 object-cover rounded-full" v-bind:src="user.avatar" alt="photo de profil">
                </div>
            
            <h2 class="text-gray-800 text-3xl font-semibold">{{user.firstname}}</h2>
            <p class="mt-2 text-gray-600">{{user.bio}}</p>       
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