Живой пример результата проделанной работы - [https://demo.vidi.one/rt/](https://demo.vidi.one/rt/)

Общее время затраченное на разработку - около 40 часов

# Адаптивная верстка
Адаптивная верстка выполнена под следующие устройства и брекпоинты:
| Мобильные      | Планшеты           | Десктопы  |
| ------------- |:-------------:| -----:|
| до 768px      | от 768px до 1144px  | от 1144px |

# Кроссбраузерность и код
Код 100% валиден и проходит проверку валидатора - [https://validator.w3.org/nu/?doc=https%3A%2F%2Fdemo.vidi.one%2Frt%2F](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdemo.vidi.one%2Frt%2F)
Верстка проверена в следующих браузерах:
- Google Chrome 85
- Opera 71
- Mozilla Firefox 81
- Microsoft Edge 85
- Internet Explolrer 11 (частично)

 Верстка также проверена на устрйоствах с iOS и Android

# JavaScript
Основная библиотека для работы с js - jQuery ([https://jquery.com/](https://jquery.com/))

Для маски в поле ввода использован плагин [jQuery Mask Plugin v1.14.16](https://github.com/igorescobar/jQuery-Mask-Plugin)

Реализованы следующие элементы
- Лоадбар
- Слайдер
- Табы
- Фильтр карты
- Простейшая валидация формы записи
- Переключение видимости меню в футере (мобильные)
- Переключение меню в шапке (мобильные)
- Стилизованные select

js код комментирован

# CSS
Весь css-код написан с использование препроцессора SASS, по методолтгии БЭМ. Каждый компонент вынесен в отдельный файл, который при компиляции объединяется в один минифицированный файл

Выполнена анимация листинга, сообщения об успешной отправки формы, анимация бэйджей при наведении

Сетка выполнена без использования css-фреймворокв техникой flex-box

Основной использованный шрифт - [Roboto](https://fonts.google.com/specimen/Roboto) от Google

# Графика

Все используемые иконки и логотип вынесены в отдельный фрагментированный SVG-спрайт
