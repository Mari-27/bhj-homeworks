const rotatorCases = [...document.querySelectorAll('.rotator > .rotator__case')]; // Получаем массив данных
let currentCase = 0; 

//Пишем функцию для ротации текста. Запускаем функцию через определенные промежутки времени

function changeCase(cases) {
    setInterval(() => {
        cases[currentCase].classList.remove('rotator__case_active'); // проверяем является ли текущий активный элемент последним в массиве, удаляем класс active с активного элемента
        
    
        if (currentCase === cases.length - 1) {
            currentCase = 0; // если да = присваиваем значение 0
        } else {
            currentCase++; // если нет = увеличиваем значение на единицу и..
        }

        cases[currentCase].classList.add('rotator__case_active'); // ..и снова присваиваем класс active полученному элементу
        cases[currentCase].style.color = cases[currentCase].dataset.color; // устанавливаем цвет текущему элементу

    }, 1000)
};

changeCase(rotatorCases); // Вызываем функцию