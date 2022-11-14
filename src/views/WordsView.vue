<template>
    <div class="words">
        <h1>Поиск нужных слов</h1>
        <b-form-group
        id="fieldset-1"
        label="Введите количество букв"
        label-for="count" >
            <b-form-spinbutton id="count" v-model="letterCount" min="0" max="8" inline></b-form-spinbutton>
        </b-form-group>
        <b-row>
            <b-col class="mt-3" cols="1" v-for="i in letterCount" :key="i">
                <b-form-input width="20" name="letters"></b-form-input>
            </b-col>
        </b-row>
        <b-button @click="findWords()">Поиск</b-button>

        <b-list-group>
            <b-list-group-item v-for="word in currentWords" :key="word.id">{{word.name}}</b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import words from '../mocks/words'
    export default {
        name: "WordsView",
        data(){
            return{
                currentWords: null,
                letterCount: 0
            }
        },
        methods: {
            findWords() {
                this.currentWords = words.filter(el => el.name.length === this.letterCount)
            }
        }
    }
</script>

<style scoped>

</style>