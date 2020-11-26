import { Menu } from './Menu';
import { form } from './form';

import './style.css';

Menu.init();
form.init();
if (localStorage.getItem('firstTime') === null) {
  form.showMessage('Привет, в этом проекте я сделал все кроме нахождения решения. Появление цифр на блоках после загрузки игры с картинками не баг, а фича :),\n Функция, проверяющая решаемость - checkShuffle(),\n Если у вас в консоли ошибка Uncheked runtime.lastError в месте index.html:1, то проблема скорей всего в ваших расширениях. Попробуйте отключить их и загрузить приложение заново.\nJS код разбит на отдельные модули, забандлен и минифицирован Webpack\'ом.\n Если захотите просмотреть данное сообщение еще раз - очистите переменную firstTime в localStorage.');
  localStorage.setItem('firstTime', true);
}
