Vue.component('cart-list', {
    props: ['products'],
    template: `
    <div class="cart-block "   > 
    <p v-if="!products.length">Корзина пуста</p>
   
        <cart-item v-for="product of products" 
        :item="product" 
        :key="product.id_product"
        ></cart-item>

     </div> 
    `,
    mounted() {
        // console.log(this.products);
    }

});
Vue.component('cart-item', {
    props: ['item'],
    template: `
    <div class="cart-item" :key="item.id_product">
        <div class="product-bio">
            <div class="product-bio__img-wrap">
                <img :src="item.img" alt="Some image">
            </div>
            <div class="product-desc">
                <p class="product-title">{{item.product_name}}</p>
                <p class="product-quantity">Количество: {{item.quantity}}</p>
                <p class="product-single-price">$ {{item.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{item.quantity*item.price}}</p>
            <button class="del-btn" @click="$parent.$emit('delete-item',item)">&times;</button>
        </div>
    </div>
    `,
    mounted() {
        // console.log(this.item);
    }
});