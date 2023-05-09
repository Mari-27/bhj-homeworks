const dropdown = document.querySelector('.dropdown__value'), // Ищем селектор с классом dropdown__value
      dropdownItem = Array.from(document.querySelectorAll('.dropdown__link')); // Преобразуем псевдомассив в массив, для получения доступа к эелементам. Ищем все элементы с классом dropdown__link

      dropdown.addEventListener('click', function() {
        // возвращаем элемент, следующий за указанным на том же уровне DOM. Проверяем наличие активного класса у элемента 'dropdown__list' по клику. Если он есть - удаляем, тем самым закрывая меню. Если его нет - то добавлем, тем самым раскрывая меню 
        if (this.nextElementSibling.classList.contains('dropdown__list_active')) {
            this.nextElementSibling.classList.remove('dropdown__list_active');
        } else {
            this.nextElementSibling.classList.add('dropdown__list_active');
        }
    });
// Зацикливаем функцию для работы меню
      for (item of dropdownItem) {
        item.addEventListener('click', function(event){
            event.preventDefault(); // отменяем дефолтное поведение браузера
            dropdown.textContent = this.textContent; // присваиваем текст, содержащийя в текущем элементе списка
            this.closest('ul').classList.remove('dropdown__list_active');
        })
      }