'use strict';

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
        addEventListener('change', interests);
    }

// Получает событие и создает строку с названием метода обработчика

    handleEvent(event) {
        let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
        this[method](event);
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

        while (parent = this.getParent(parent)) {
            let children = this.getChildren(parent);
            let checked = [...children].filter(child => child.checked).length;
            parent.checked = checked === children.length;
            parent.indeterminate = checked && !parent.checked;
        }

    }
    // ... тем самым обновляя состояние родительских боксов. Так же получат чекбокс родительского узла и обновляет состояние его детей. свойство `indeterminate` - если некоторые из дочерних элементов выбраны, родительский тоже частично выбран 

    getChildren(el) {
        el = el.closest('li');
        el = el && el.querySelector('ul');
        return el && el.querySelectorAll('input[type="checkbox"]') || [];
    }

    getParent(el) {
        el = el.closest('ul');
        el = el && el.closest('li');
        return el && el.querySelector('input[type="checkbox"]');
    }
// метод get получают соотвествующие элементы списка для установки связи между чекбоксами
}

const interests = new Interests({
    title: 'Дерево интересов',
    descr: 'Выбрать интересы',
});

interests.start();