## Задание №4 (Клиентская часть)
#### Api для сервера
##### Для запуска приложения понадобится
1. файл в корне проекта `.env` с поределенными переменными 
`TOKEN` - токен для доступа к api <br> 
`SERVER_ADDRESS=localhost:3000`<br>
`SERVER_PORT=3000`
2. Установить зависимости
3. Запустить серевер `node index.js`
4. Перейти по адресу http://localhost:3000

##### Порядок запуска для разработки клиентской части
1. Запустить сервер (см предыдущий пункт)
2. Перейти в папку `client`
3. Выполнить `npm start`. Проконтролировать, что react запустится на порте 3001, иначе запросы не пройдут по CORS
4. Если все сделано правильно, то на порту 3000 работает сервер, а на 3001 клиент.

##### На настоящий момент сделано:
1. Компоненты реакт
2. Собраны страницы на реакт
3. Роутинг
4. Добавлена работа с хранилищем (redux)
5. Получение/сохранение настроек, включая клиентскую валидацию.

##### Что еще не сделано:
1. Страница детального просмотра билда выдает демо-данные
2. Не реализована клиентская часть логики обарботки постановки билдов в очередь.