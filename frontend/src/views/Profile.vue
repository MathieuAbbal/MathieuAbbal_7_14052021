<template>
    <div>
     <LoginForm v-if="!connected"/>
     <Header v-if="connected"/>
     <UserProfile v-if="connected"/>
     <UserPosts v-if="connected"/>     
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserPosts from '@/components/UserPosts.vue';

export default {
    name:'Profile',

    components:{
        LoginForm,
        Header,
        UserProfile,
        UserPosts
    },
    data() {
    return{
      connected: true
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

<style>

</style>