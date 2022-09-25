const elementsContainer = document.querySelector('.elements');

function addElement(element){
    elementsContainer.prepend(element);
}

function removeElement(element){
    element.remove();
}

export {addElement, removeElement};