<template>
  <div id="app">
    <NavBar/>
    <main class="main">
      <b-container>
        <router-view/>
      </b-container>
    </main>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar";
  export default {
    components: {NavBar}
  }
</script>
<style>
  main{
    margin-top: 30px;
  }
</style>
