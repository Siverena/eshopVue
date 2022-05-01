const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartUrl: '/cartData',
        catalogUrl: '/catalogData',
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/100x70',
        networkError: false,
    },
    methods: {
        makePOSTRequest(url, data = {}) {
            return fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
                .then(result => result.json())
                .catch(error => {
                    this.networkError = true;
                })
        },
        makeGETRequest(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    if (url == this.catalogUrl) {
                        this.networkError = true;
                    }

                })
        },
        makeDeleteRequest(url, data = {}) {
            return fetch(url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),

                }).then(result => result.json())
                .catch(error => {
                    this.networkError = true;
                })

        },
        addItem(product) {
            this.makePOSTRequest(`/addToCart`, product).then(data => {
                if (data.result === 0) {
                    alert('Error');
                }
                this.cartItems = [...data.list];

            });
        },
        deleteItem(product) {
            this.makeDeleteRequest(`/deleteItem`, product)
                .then(data => {
                    if (data.result === 0) {
                        alert('Error');
                    }
                    this.cartItems = [...data.list];
                })
        },

        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        fillCartList() {
            this.makeGETRequest(`${this.catalogUrl}`)
                .then(data => {
                    for (let el of data) {
                        this.products.push(el);
                        this.filtered.push(el);
                    }
                }).catch(error => {
                    //console.log(error);

                });
        }

    },
    mounted() {
        this.fillCartList();
        this.makeGETRequest(`${this.cartUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                }

            }).catch(error => {
                console.log(error);

            });
    },

});