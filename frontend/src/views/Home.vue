<template>
  <div>
   <LoginForm v-if="!connected"/><!--charge le composant pour s'identifier si session storage est vide -->
   <Header v-if="connected"/>
   <NewPost v-if="connected"/> 
   <Posts v-if="connected"/>
   
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import NewPost from '@/components/NewPost.vue';
import Posts from '@/components/Posts.vue';
import Header from '@/components/Header.vue';


export default {
  name: 'Home',
  components: {
    LoginForm,
    Header,
    Posts,
    NewPost
   
  },
   data() { 
    return{
      connected: true
    };
  },

  created(){          //hook de création
    this.userConnected()
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
    }
  }
}
</script>
