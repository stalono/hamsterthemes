import { fetchThemes } from "./hamster";

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
