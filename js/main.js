const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/100x70',
    },
    methods: {
        getProducts(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addItem(product) {
            this.getProducts(`${API}/addToBasket.json`).then(data => {
                if (data.result === 1) {

                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if (find) {
                        find.quantity++;

                    } else {
                        let prod = Object.assign({ quantity: 1 }, product);
                        this.cartItems.push(prod)

                    }
                } else {
                    alert('Error');
                }
            });
        },
        deleteItem(product) {
            this.getProducts(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {

                        if (product.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                            product.quantity--;

                        } else { // удаляем
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted() {
        this.getProducts(`${API}/${this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            }).catch(error => {
                console.log(error);

            });
        this.getProducts(`${API}/${this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    this.filtered.push(el);
                }

            }).catch(error => {
                console.log(error);

            });
    },

});