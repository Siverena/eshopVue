Vue.component('error-msg', {
    props: ['netErr'],
    template: `
        <p v-if="netErr">Network Error Товары не получены</p>
    `,
    mounted() {
        // console.log(this.netEr);
    }

});