<template>
    <div class="words">
        <h1>Поиск нужных слов</h1>
        <b-form-group
        id="fieldset-1"
        label="Введите количество букв"
        label-for="count" >
            <b-form-spinbutton class="mt-3" id="count" v-model="letterCount" min="0" max="8" inline></b-form-spinbutton>
        </b-form-group>
        <b-row>
            <b-col class="mt-3" cols="1" v-for="(item, i) in letterCount" :key="i">
                <b-form-input width="20" size="lg" name="letters" v-model="currentLetters[i]" maxlength="1" ></b-form-input>
            </b-col>
        </b-row>
        <b-button variant="primary" class="mt-3" @click="findWords()">Поиск</b-button>

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
                letterCount: 0,
            }
        },
        methods: {
            findWords() {
               // this.currentLetters.splice(0,this.currentLetters.length);
                console.log(this.currentLetters)
                this.currentWords = words.filter(el => el.name.length === this.letterCount)
                console.log(this.currentWords.filter(elem => elem.name.indexOf(this.currentLetters) !== -1))
            }
        },
        computed: {
            currentLetters(){
                return Array.from({length: this.letterCount})
            }
            // inputState() {
            //     return this.name.length > 2 ? true : false
            // }
        },
    }
</script>

<style scoped>
.form-control{
    text-align: center;
    padding: 5px;
}
.row{
    margin-left: -4px;
    margin-right: -4px;
}
.col-1{
    padding-left: 4px;
    padding-right: 4px;
}
</style>