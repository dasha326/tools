<template>
    <div class="words">
        <h1>Поиск нужных слов</h1>
        <b-form-group
        id="fieldset-1"
        label="Введите количество букв"
        label-for="count" >
            <b-form-spinbutton class="mt-3" id="count" v-model="letterCount" min="0" max="10" inline></b-form-spinbutton>
        </b-form-group>
        <b-row>
            <b-col class="mt-3" cols="1" v-for="(item, i) in letterCount" :key="i">
                <b-form-input width="20" size="lg" name="letters" v-model="currentLetters[i]" maxlength="1" ></b-form-input>
            </b-col>
        </b-row>
        <b-button variant="primary" class="mt-3" @click="findWords()">Поиск</b-button>

        <div class="result-block">
            <div class="result-block__list" v-if="!isNotFound">
                <b-button class="mt-1" variant="outline-secondary" v-for="word in currentWords" :key="word.id" @click="showInfo(word)" v-html="word.html || word.name"></b-button>
            </div>
            <b-alert v-else show variant="info">Ничего не найдено</b-alert>
        </div>
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
                model: '',
                isNotFound: false
            }
        },
        methods: {
            findWords() {
                this.currentWords = null;
                this.currentWords = words.filter(el => el.name.length === this.letterCount);
                console.log(this.currentWords);
                if (this.currentLetters.every(el => el === undefined || '')) return;
                console.log(this.currentLetters);
                let reg = '';
                this.currentLetters.forEach(letter => {
                    if (letter === undefined || letter ==='') {
                        reg += '.'
                    } else {
                        reg += letter
                    }
                });
                this.currentWords = this.currentWords.filter(elem => elem.name.match(new RegExp(reg, 'igs')));
                this.isNotFound = this.currentWords.length < 1;
                if (!this.isNotFound){
                    this.currentWords.forEach(elem => {
                        elem.html = elem.name.split('').map((letter, i) => {
                            return this.currentLetters[i] === letter.toLowerCase() ? `<mark>${letter}</mark>` : letter;
                        }).join('');
                    });
                }
                console.log(this.currentWords);
            },
            showInfo(word){
                this.model = '';
                const synonymsTitle = {
                        name: "Синонимы",
                        result: null
                    },
                    antonymsTitle = {
                        name: "Антонимы",
                        result: null
                    },
                    similarsTitle = {
                        name: "Похожие",
                        result: null
                    };
                const elem = this.$createElement;

                const parametersHandler = function(parameters, title) {
                    const titleClass = typeof parameters === 'undefined' ? 'text-danger' : 'text-success';
                    title.result = elem('h5', {class: [titleClass]}, [title.name]);
                    if (typeof parameters === 'undefined') return 'Не найдены';
                    return parameters.join(', ');
                }

                const synonyms = parametersHandler(word.synonyms, synonymsTitle);
                const antonyms = parametersHandler(word.antonyms, antonymsTitle);
                const similars = parametersHandler(word.similars, similarsTitle);

                const body = elem('div', {}, [
                    synonymsTitle.result,
                    elem('p', {}, [synonyms]),
                    antonymsTitle.result,
                    elem('p', {}, [antonyms]),
                    similarsTitle.result,
                    elem('p', {}, [similars])
                    ]);


                this.$bvModal.msgBoxOk([body], {
                    title: `Слово - ${word.name}`,
                    size: 'lg',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true
                })
                    .then(value => {
                        this.modal = value
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        computed: {
            currentLetters(){
                return Array.from({length: this.letterCount})
            }
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
    .result-block{
        margin-top: 20px;
    }
    .result-block__list {
        column-count: 4;
    }
    .result-block__list button{
        width: 100%;
        margin-top: 10px;
    }
    mark, .mark{
        padding: 0;
    }
</style>