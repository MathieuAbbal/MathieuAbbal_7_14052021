<template>
  <div class="posts">
        <article class="post" v-for = "post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
                <div class="post-header">
                    <span class="post-info">Posté le {{dateFormat(post.date)}} par {{post.lastname}} {{post.firstname}}</span>
                    <span class="post-modify" v-if="post.userId == $user.userId || $user.admin == 1">Modifier</span> 
                </div>  
                <h2 class="post-title">{{post.title}}</h2>
                <div class="post-content" v-html="characterLimit(post.content)"></div>
            </router-link>
        </article>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>