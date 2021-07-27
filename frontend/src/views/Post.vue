<template>
  <div class="">
    <LoginForm v-if="!connected"/>
    <Header v-if="connected"/>
    <ModifyPost v-if="connected"/>
<!--    <Comments v-if="connected"/>-->
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import ModifyPost from '@/components/ModifyPost.vue';
//import Comments from '@/components/Comments.vue'


export default {
  name: 'Post',

  components: {
    Header,
    LoginForm,
    ModifyPost,
  //  Comments
    
  },

  data() {
    return{
      connected: true
      
    };
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
  },

  created(){
    this.userConnected()
  }
}

</script>
