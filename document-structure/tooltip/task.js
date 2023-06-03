'use strict';

const toolTipList = Array.from(document.querySelectorAll('a.has-tooltip')); 
let innerTooltipText; 

toolTipList.forEach(function (tip) { 
    tip.addEventListener('click', function (event) {
        event.preventDefault(); 
        const tooltip = tip.nextElementSibling; 
        const topCoordinate = tip.getBoundingClientRect().top < window.innerHeight / 2 ? tip.getBoundingClientRect().bottom + 10 : tip.getBoundingClientRect().top - 30; 
        const leftCoordinate = tip.getBoundingClientRect().left < window.innerWidth / 2 ? tip.getBoundingClientRect().left + 10 : tip.getBoundingClientRect().left - 10; 
        const html = `<div class="tooltip tooltip_active" style="left: ${leftCoordinate}px; top: ${topCoordinate}px">${tip.title}</div>`; 
        if (tooltip && event.target.innerText == innerTooltipText) { 
            tooltip.classList.toggle('tooltip_active'); 
        } else if (tooltip) { 
            tooltip.style.left = `${leftCoordinate}px`; 
            tooltip.style.top = `${topCoordinate}px`; 
            tooltip.textContent = `${tip.title}`; 
        } else { 
            tip.insertAdjacentHTML('afterend', html); 
        }; 
        innerTooltipText = event.target.innerText; 
    });
});  