## Задание по автотестам
##### Для запуска тестов понадобится
1. Версия Node: 12.7.0
2. В корне проекта установить зависимости `npm install`
3. Запустить тесты: `npm test`

##### Unit тесты:
1. Покрывают работу с git на сервере: клонирование репозитория, получение информации о коммите и т.д.
2. Покрывают функции-хелперы на сервере для работы с файловой системой.
3. Не покрывают запросы к api, поскольку никакой логики, которую нужно было бы тестировать там нет.
4. Не покрывают экшены/редьсеры на клиенте. Посмотрел, что логики там как таковой нет.

К сожалению, не успел сделать интеграционное тестирование. Продолжаю делать... 