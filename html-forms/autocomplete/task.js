class Autocomplete {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('.autocomplete__input');
    this.searchInput = container.querySelector('.autocomplete__search');
    this.list = container.querySelector('.autocomplete__list');
    this.valueContainer = container.querySelector('.autocomplete__value');
    this.valueElement = container.querySelector('.autocomplete__text-content');

    this.registerEvents();
  }
  registerEvents() {
    this.valueContainer.addEventListener('click', e => {
      this.searchInput.classList.add('autocomplete__search_active');
      this.list.classList.add('autocomplete__list_active');
      this.searchInput.value = this.valueElement.textContent.trim();
      this.searchInput.focus();

      this.onSearch();
    });

    this.searchInput.addEventListener('input', e => this.onSearch());

    this.list.addEventListener('click', e => {
      const { target } = e;
      if (!target.matches('.autocomplete__item')) {
        return;
      }

      const { textContent: text, dataset: { key: value, index } } = target; // заменяем id на key 

      this.onSelect({
        index,
        text,
        value
      });
    });
  }

  onSelect(item) {
    this.input.selectedIndex = item.index;
    this.valueElement.textContent = item.text;

    this.searchInput.classList.remove('autocomplete__search_active');
    this.list.classList.remove('autocomplete__list_active');
  }

  onSearch() {
    const matches = this.getMatches(this.searchInput.value);
    this.renderMatches(matches);
  }

  renderMatches(matches) {
    const html = matches.map(item => `
      <li>
        <span class="autocomplete__item"  
          data-index="${item.index}"  
          data-key="${item.value}" // заменяем на key  
        >${item.text}</span>  
      </li>  
    `);

    this.list.innerHTML = html.join('');
  }

  getMatches(text) {

    const arrOptions = [...this.input.options];
    const matchedOptions = []; // создаем новый массив для совпадающих опций 

    for (let i = 0; i < arrOptions.length; i++) {
      if (arrOptions[i].text.includes(text)) {
        // добавляем совпадающие опции в новый массив matchedOptions 
        matchedOptions.push({
          text: arrOptions[i].text,
          value: arrOptions[i].value,
          index: i // сохраняем индекс опции 
        });
      }
    }

    return matchedOptions; // возвращаем совпадающие опции 
  }
}


/*
  TODO: этот метод нужно дописать
  text - фраза, которую вводят в поле поиска
  Метод должен вернуть массив.

  Он формируется на основе списка опций select-элемента (this.input)
  Подходящие опции - те, чей текст содержит то, что есть в аргументе text
  Необходимо вернуть массив объектов со свойствами:
  {
    text: 'Содержимое <option>',
    value: 'Содержимое атрибута value'
  }
*/


new Autocomplete(document.querySelector('.autocomplete'));
