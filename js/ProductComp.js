Vue.component('goods-list', {
    props: ['products', 'netErr'],
    template: `
     <div class="products">
     <error-msg :net-err = "netErr"></error-msg>
        <goods-item v-if = "products.length" v-for="product of products" 
        :product="product" 
        :key="product.id_product"
        ></goods-item>
     </div> 
    `,
    mounted() {}

});
Vue.component('goods-item', {
    props: ['product'],
    template: `
        <div class="product-item">
        <div class="product-item__img-wrap">
            <img :src="product.img"alt="Some img" class="product-img">
            </div>
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$parent.$emit('add-item',product)">Купить</button>
            </div>
        </div>
    `,
    mounted() {
        console.log(this.product);
        console.log(this.product.img);

    }
});