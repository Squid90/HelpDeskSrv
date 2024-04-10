// TODO: write code here

const board = document.querySelector('.board');

let actualElement;


const shadowCard = document.createElement('div');
shadowCard.classList.add('highlight');

const onMouseOver = (e) => {
  actualElement.style.top = `${e.clientY}px`;
  actualElement.style.left = `${e.clientX}px`;
  const rect = actualElement.getBoundingClientRect();

  const mouseOverItem = e.target;
  if (mouseOverItem.classList.contains('card')) {
    shadowCard.style.height = `${rect.height}px`;
    mouseOverItem.parentNode.insertBefore(shadowCard, mouseOverItem);
  }
};

const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  if (mouseUpItem.classList.contains('card') || mouseUpItem.classList.contains('highlight')) {
    mouseUpItem.parentNode.insertBefore(actualElement, shadowCard);
  }

  actualElement.classList.remove('dragged');
  actualElement = undefined;
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
  shadowCard.remove();
};

board.addEventListener('mousedown', (e) => {
  e.preventDefault();
  actualElement = e.target;

  actualElement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
});

const buttonAdd = document.querySelectorAll('.buttonAdd');
buttonAdd.forEach((item) => {
  item.addEventListener('click', () => {
    const itemParent = item.parentNode;
    const addNew = itemParent.querySelector('.addNew');
    addNew.classList.remove('hidden');
  });
});

const newCards = document.querySelectorAll('.add');
newCards.forEach((item) => {
  item.addEventListener('click', () => {
    const itemParent = item.parentNode;
    const text = itemParent.querySelector('.text');

    itemParent.insertAdjacentHTML('beforebegin', `
    <div class="card">
    <div class="iconCard hidden"><div class="icon"></div></div>
    ${text.value}
    </div>
    `);

    itemParent.classList.add('hidden');
  });
});

board.addEventListener('mousemove', (e) => {
  if (e.target.classList.contains('card')) {
    const iconCard = e.target.querySelector('.iconCard');
    iconCard.classList.remove('hidden');
    iconCard.addEventListener('mousedown', (elm) => {
      elm.stopPropagation();
    });
  } else {
    const cards = e.target.querySelectorAll('.card');
    cards.forEach((card) => {
      const iconCard = card.querySelector('.iconCard');
      iconCard.classList.add('hidden');
    });
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('icon')) {
    const card = e.target.closest('.card');
    if (card) {
      card.remove();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('textarea').forEach((textarea) => {
    textarea.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    });
  });
});
