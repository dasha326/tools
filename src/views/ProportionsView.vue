<template>
    <b-container>
        <b-card>

        </b-card>
    </b-container>
</template>

<script>
    const firstParameter = document.querySelector('[name="first-parameter"]');
    const secondParameter = document.querySelector('[name="second-parameter"]');
    const yourParameter = document.querySelector('[name="your-parameter"]');
    const resultPlace = document.querySelector('[data-name="result"]');

    const inputs = document.querySelectorAll('.js-input');
    inputs.forEach(input => {
        input.addEventListener('input', ()=>{
            if (firstParameter.value !== '' && secondParameter.value !== '' && yourParameter.value !== '') {
                resultPlace.textContent = parseInt(yourParameter.value) * parseInt(secondParameter.value) / parseInt(firstParameter.value)
            }
        })
    });
    export default {
        name: "ProportionsView"
    }
</script>

<style scoped>

</style>