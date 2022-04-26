Vue.component('goods-list', {
    props: ['products', 'img', 'netErr'],
    template: `
     <div class="products">
     <error-msg :net-err = "netErr"></error-msg>
        <goods-item v-if = "products.length" v-for="product of products" 
        :product="product" 
        :img="img"  
        :key="product.id_product"
        ></goods-item>
     </div> 
    `,
    mounted() {
        // console.log(this.products);
        // console.log(this.products.length);
    }

});
Vue.component('goods-item', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$parent.$emit('add-item',product)">Купить</button>
            </div>
        </div>
    `,
    mounted() {
        // console.log(this.product);
    }
});