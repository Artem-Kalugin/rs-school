export default class Util {
  static placeIcon(buttonElement, iconName, firstClass = 'fas', secondClass = 'fa-') {
    const icon = document.createElement('i');
    icon.classList.add(firstClass);
    icon.classList.add(secondClass + iconName);
    buttonElement.appendChild(icon);
    return buttonElement;
  }
}
