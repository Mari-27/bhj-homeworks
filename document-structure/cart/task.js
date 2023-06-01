'use strict'

const productInCart = Array.from(document.querySelectorAll('.cart__product'));

document.addEventListener('click', function (event) {

    const cart = document.querySelector('.cart__products');
    const valueButtons = document.querySelectorAll('.product__quantity-control');
    const addButtons = document.querySelectorAll('.product__add');

    if (event.target.classList.contains('product__quantity-control')) {
        changeValue(event.target);
        //Если произойдет клик на эдементе с этим классом вызывается функция changeValue  
    } else if (event.target.classList.contains('product__add')) {
        addToCart(event.target);
        // если клик на product__add, то вызываем функцию addToCart  
    } else if (event.target.classList.contains('cart__product-delete')) {
        deleteFromCart(event.target.closest('.cart__product'));
    }

    function changeValue(target) {

        //считывает текущее значение количества товара и увеличивает или уменьшает его на 1 в зависимости от того, на какой элемент был клик  

        let value = target.parentNode.querySelector('.product__quantity-value');
        let count = +value.innerText;

        if (target.classList.contains('product__quantity-control_inc')) {
            count++;
            value.innerText = count;
        } else {
            if (count > 1) {
                count--;
                value.innerText = count;
            } else {
                value.innerText = 1;
            }
        }
    }

    function addToCart(target) {

        //получает данные о добавляемом товаре и создает новый с соответсвующими данными  

        const product = target.closest('.product');
        const id = product.dataset.id;
        const countFromProduct = +target.parentNode.querySelector('.product__quantity-value').innerText;

        let existingProduct = productInCart.find(item => item.dataset.id === id);

        if (existingProduct) {
            let productCount = existingProduct.querySelector('.cart__product-count');
            let total = +productCount.innerText;
            productCount.innerText = total + countFromProduct;
        } else {
            const template = `
            <div class="cart__product" data-id="${id}">
                <img class="cart__product-image" src="${product.querySelector('.product__image').src}">
                <div class="cart__product-count">${countFromProduct}</div>
                <a href="#" class="cart__product-delete">&times;</a>
            </div>
            `;
            cart.insertAdjacentHTML('beforeend', template);
        }

        saveElement();
    }

    function deleteFromCart(target) {
        target.remove();
        saveElement();
    }

});

function saveElement() {
    const elem = document.querySelector('.cart__products').innerHTML;
    localStorage.setItem('key', elem);
}

function loadElement() {
    if (localStorage.getItem('key')) { // добавлена проверка на наличие сохраненных данных 
        document.querySelector('.cart__products').innerHTML = localStorage.getItem('key');
    }
}

loadElement(); 