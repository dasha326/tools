<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <div class="container">
            <b-navbar-brand href="/">Полезный сайт</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item v-for="(item, i) in menu" :key="'menu'+i" :to="{name: item.name}">{{item.meta.menuTitle}}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return{
               menu: this.$router.options.routes.filter(item => item.meta.inMenu)
            }
        },
    }
</script>

<style scoped>

</style>