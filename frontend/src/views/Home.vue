<template>
  <div>
   <LoginForm v-if="!connected"/><!--charge le composant pour s'identifier si session storage est vide -->
   <Header v-if="connected"/>
   <NewPost v-if="connected"/> 
<!--   <div v-if="connected"><AllPosts v-for="post in posts" :key="post" :post="post"/></div>-->
 <AllPosts v-if="connected"/>
   
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import NewPost from '@/components/NewPost.vue';
import AllPosts from '@/components/AllPosts.vue';
import Header from '@/components/Header.vue';
//import axios from 'axios';

export default {
  name: 'Home',
  components: {
    LoginForm,
    Header,
    AllPosts,
    NewPost
    
   
  },
   data() { 
    return{
    connected: true,
  //  posts:[],
  //  user_id: JSON.parse(sessionStorage.user).user_id,
    };
  },

  created(){          //hook de création
    this.userConnected()
 //  this.getAllPosts()
  },
  
    

  methods: {
    userConnected(){
      if(sessionStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(sessionStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    },
  /*    getAllPosts(){
        fetch("http://localhost:3000/api/posts",
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer `+ JSON.parse(sessionStorage.user).token
                }
            }
        )
        .then(res =>{
                this.posts = JSON.stringify(res) ;
                console.log(this.posts)
        })
        .catch (error => console.log(error))
      }*/
  }
}
</script>
