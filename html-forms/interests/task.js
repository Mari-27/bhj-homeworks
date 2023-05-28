'use strict';

for (const checkBox of document.querySelectorAll('.interest__check')) {
    checkBox.addEventListener('change', function () {
        interests.onChange(this);
    });
}


// конструктор получает 2 параметра

class Interests {
    constructor(options) {
        this.title = options.title;
        this.descr = options.descr;
    }

    start() {
        this.getHandler();

    }
    // Добавляет обработчик событий


    getHandler() {
        addEventListener('change', this);
    }

    // Получает событие и создает строку с названием метода обработчика

    handleEvent(event) {
        const method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
        if (typeof this[method] === "function") {
            this[method](event);
        }
    }

    // Обработчик события 'change' для проверки на измененный объект, является он чекбоксом или нет

    onChange({ target }) {

        if (target.type !== 'checkbox') {
            return;
        }

        this.updateChildren(target);
        this.updateParents(target);
    }

    // Если этьо не чекбокс, то ничего не происходит. Если измененный элемент чекбокс, то вызывается метод...

    updateChildren(el) {
        const { checked } = el;
        this.getChildren(el).forEach(child => {
            child.checked = checked;
            child.indeterminate = false;
        });
    }

    // Это для поиска всех дочерних элементов и установки их в соотвктсвующее состояние. Затем вызывается ...

    updateParents(parent) {
        let parentCheckbox = this.getParent(parent);
        while (parentCheckbox) {
            const children = this.getChildren(parentCheckbox);
            let checked = [...children].filter(child => child.checked).length;
            parentCheckbox.checked = checked === children.length;
            parentCheckbox.indeterminate = checked && !parentCheckbox.checked;
            parentCheckbox = this.getParent(parentCheckbox);
        }
    }
    // ... тем самым обновляя состояние родительских боксов. Так же получат чекбокс родительского узла и обновляет состояние его детей. свойство `indeterminate` - если некоторые из дочерних элементов выбраны, родительский тоже частично выбран 

    getChildren(el) {
        el = el.closest('li');
        el = el && el.querySelector('ul');
        return el && el.querySelectorAll('input[type="checkbox"]') || [];
    }

    getParent(el) {
        el = el.closest('li');
        el = el && el.closest('ul').closest('li');
        return el && el.querySelector('input[type="checkbox"]');
    }
    // метод get получают соотвествующие элементы списка для установки связи между чекбоксами
}

const interests = new Interests({
    title: 'Дерево интересов',
    descr: 'Выбрать интересы',
});

interests.start();