'use strict';
const cart = document.querySelector('.cart__products');

let productsInCart = [];

document.addEventListener('click', function (event) {
    const valueButtons = document.querySelectorAll('.product__quantity-control');
    const addButtons = document.querySelectorAll('.product__add');

    if (event.target.classList.contains('product__quantity-control')) {
        changeValue(event.target);
    } else if (event.target.classList.contains('product__add')) {
        addToCart(event.target);
    } else if (event.target.classList.contains('cart__product-delete')) {
        deleteFromCart(event.target.closest('.cart__product'));
    }

    function changeValue(target) {
        let value = target.parentNode.querySelector('.product__quantity-value');
        let count = +value.innerText;

        if (target.classList.contains('product__quantity-control_inc')) {
            count++;
        } else {
            if (count > 1) {
                count--;
            } else {
                count = 1;
            }
        }

        value.innerText = count;
    }

    function addToCart(target) {
        const product = target.closest('.product');
        const id = product.dataset.id;
        const countFromProduct = +target.parentNode.querySelector('.product__quantity-value').innerText;

        let existingProduct = productsInCart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.count = existingProduct.count + countFromProduct;
            updateCart(existingProduct.element);
        } else {
            const template = `
                <div class="cart__product" data-id="${id}">
                    <img class="cart__product-image" src="${product.querySelector('.product__image').src}">
                    <div class="cart__product-count">${countFromProduct}</div>
                    <a href="#" class="cart__product-delete">&times;</a>
                </div>
            `;

            cart.insertAdjacentHTML('beforeend', template);

            const element = cart.lastElementChild;
            productsInCart.push({ id: id, count: countFromProduct, element: element });
        }

        saveCart();
    }

    function updateCart(product) {
        const countEl = product.querySelector('.cart__product-count');
        const count = productsInCart.find(item => item.id === product.dataset.id).count;
        countEl.innerText = count;
    }

    function deleteFromCart(product) {
        productsInCart = productsInCart.filter(item => item.id !== product.dataset.id);
        product.remove();
        saveCart();
    }

});

function saveCart() {
    const cartJson = JSON.stringify(productsInCart);
    localStorage.setItem('productsInCart', cartJson);
}

function loadCart() {
    if (localStorage.getItem('productsInCart')) {
        productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
        productsInCart.forEach(el => {
            const existingProduct = cart.querySelector(`[data-id="${el.id}"]`);
            if (existingProduct) {
                updateCart(existingProduct);
            } else {
                const template = `
                    <div class="cart__product" data-id="${el.id}">
                        <img class="cart__product-image" src="${el.element.querySelector('.product__image').src}">
                        <div class="cart__product-count">${el.count}</div>
                        <a href="#" class="cart__product-delete">&times;</a>
                    </div>
                `;

                cart.insertAdjacentHTML('beforeend', template);

                const element = cart.lastElementChild;
                productsInCart[productsInCart.indexOf(el)].element = element;
            }
        })
    }
}

loadCart();