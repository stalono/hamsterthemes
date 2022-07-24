# hamsterThemes
### Скрипт для парсинга разделов робохомячка
```js
const { fetchThemes } = require("./hamster");

fetchThemes('https://forum.robo-hamster.com/forums/35/').then((themes) => {
    for (const theme of themes) {
        console.log(`
        Заголовок: ${theme.title}
        Автор: ${theme.author}
        Дата: ${theme.date}
        Ссылка: ${theme.link}
        Статус: ${theme.status}
        Должности: ${theme.jobs}
        Пользователи: ${theme.users}
        Просмотры: ${theme.views}
        Ответы: ${theme.answers}
        Айди: ${theme.theme_id}
        Закрыта: ${theme.is_closed}
        Закреплено: ${theme.is_pinned}
        Проверено: ${theme.is_checked}
        `);
    }
});
```
### Интерфейс Theme
```ts
interface ITheme {
    title: string;
    author: string
    date: Date;
    link: string
    status: string;
    jobs: string[];
    users: string[];
    views: number;
    answers: number;
    theme_id: number;
    hours_passed: number;
    is_closed: boolean;
    is_pinned: boolean;
    is_checked: boolean;
}
```
