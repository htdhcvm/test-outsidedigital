# Тестовое задание OUTSIDE DIGITAL

## Для запуска введите

### В папке auth
```
npm install
```
### В папке api
```
npm install
```
### В корне проекта
```
docker-compose up
```

### Обязательные требования

-   [x] Пароли не хранить в открытом виде
-   [x] Реализовать валидацию полей на api запросы с кодами ответов и сообщениями об ошибке в теле ответа.
-   [x] Развернуть проект в любом удобном месте, что бы можно было прогнать тесты и проверить.
-   [x] Код на github или gitlab
-   [x] Придерживаться принципам SOLID
-   [x] Токен авторизации живет 30 минут
-   [x] Реализовать endpoint для обновления токена
-   [x] Создать миграции
-   [x] Написать сопроводительную документация в README.md для разворота
-   [x] Реализовать offset или пагинацию для сущности TAG
-   [x] Реализовать Сортировку по полю sortOrder и(или) полю name для сущности TAG

### Дополнительные требования

-   [x] Использовать DTO
-   [x] Писать интерфейсы и реализовывать их
-   [x] Желательно не использовать ORM
-   [x] Написать DockerFile для приложения
-   [x] Написать docker-composer для локального разворота приложения
-   [ ] Реализовать кеширование
-   [ ] Покрыть тестами сами api
-   [ ] Добавить генерацию swagger документации для api методов (или написать ручками и положит в проект в директорию /doc)
