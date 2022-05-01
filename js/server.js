const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');


function addStatistics(action, itemName) {
    let date = new Date().toLocaleString();
    let log = {
        action: action,
        itemName: itemName,
        date: date
    }
    fs.readFile('../data/stats.json', 'utf-8', (err, data) => {
        const logs = JSON.parse(data);
        logs.push(log);
        fs.writeFile('../data/stats.json', JSON.stringify(logs, null, '\t'), (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.use(express.static('..'));

app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
    fs.readFile('../data/catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });

});

app.get('/cartData', (req, res) => {
    fs.readFile('../data/cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('../data/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        let find = cart.find(el => el.id_product === item.id_product);
        if (find) {
            find.quantity++;
        } else {
            let prod = Object.assign({ quantity: 1 }, item);
            cart.push(prod)
        }
        const cartList = JSON.stringify(cart, null, '\t');
        fs.writeFile('../data/cart.json', cartList, (err) => {
            if (err) {
                res.send(`{"result": 0,"list":${cartList}}`);
            } else {
                res.send(`{"result": 1,"list":${cartList}}`);
            }
        });
        addStatistics('add to cart', item.product_name);
    });
});

app.delete('/deleteItem', (req, res) => {
    fs.readFile('../data/cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        let find = cart.find(el => el.id_product === item.id_product);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            cart.splice(cart.indexOf(find), 1)
        }
        const cartList = JSON.stringify(cart, null, '\t');
        fs.writeFile('../data/cart.json', cartList, (err) => {
            if (err) {
                res.send(`{"result": 0,"list":${cartList}}`);
            } else {
                res.send(`{"result": 1,"list":${cartList}}`);
            }
        });
        addStatistics('delete from cart', item.product_name);
    });
});