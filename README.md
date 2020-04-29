## Задание по типизации
Версия Node: 12.7.0

На настоящий момент типизирована клиентская часть в папке `client`.

#####Небольшой отчет о проделанной работе:
######1. Трудоёмкость перевода проекта на TypeScript. Самые сложные моменты в работе.
Первичный перевод компонентов на ts не очень трудоемкий. Однако требуется дополнительное время на 
рефакторинг кода для указания типов различных сущностей, встречающихся внутри компонента (объекты, функции и т.д)

######2. Какие в процессе перевода были найдены ошибки.
Пока нашел 2 существенных ошибки: опечатка в строковом значении статуса и вызов несуществующего метода.
Первую ошибку нашел при переводе статусов на enum, вторую  - при указании интерфейса объекта.

######3. Решили ли вы вливать данный PR, или предпочитаете работать с JavaScript? Почему?
Как доделаю перевод сервера на ts, обязательно волью в основную ветку. Такой код намного понятнее работает,
видны типы сущностей. У меня в проекте есть некоторые не отлаженные места, typescript поможет в дальнейшей отладке
 проекта.