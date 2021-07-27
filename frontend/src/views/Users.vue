<template>
    <div>
     <LoginForm v-if="!connected"/>
     <Header v-if="connected"/>     
     <AllUsers v-if="connected"/>   
     
    </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import AllUsers from '@/components/Users.vue';


export default {
    name:'Users',

    components:{
      Header,
      LoginForm,       
      AllUsers
      
        
      
    },
   data() {
    return{
      connected: true,
      
    };
  },

  created(){
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