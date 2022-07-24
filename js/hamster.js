/**
 * Весь код ниже был сгенерирован автоматически
 * С помощью компилятора TypeScript
 * Если есть желание посмотреть на качество кода
 * Это можно сделать в директории ts\hamster.ts
 * GitHub: https://github.com/stalono/hamsterthemes
*/

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchThemes = void 0;
const utils_1 = require("./utils");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const _link = 'https://forum.robo-hamster.com/';
async function fetchThemes(url) {
    const response = await axios_1.default.get(url);
    const html = response.data;
    const element = cheerio_1.default.load(html);
    const themesHTML = element('div[data-author]');
    const data = [];
    await Promise.all(themesHTML.map(async (index, themeHTML) => {
        const themeElem = element(themeHTML);
        const structTitle = themeElem.find('div.structItem-title');
        const statusElem = structTitle.find('span');
        const titleElem = structTitle.find('a[data-xf-init]');
        const dateElem = structTitle.next().find('time');
        const metaElem = themeElem.find('dd');
        const markElem = themeElem.find('span.u-srOnly');
        const title = titleElem.text();
        const author = themeElem.attr('data-author');
        const link = _link + titleElem.attr('href');
        const date = new Date(dateElem.data().time * 1000);
        const status = statusElem ? statusElem.text() : '';
        const answers = Number(metaElem.first().text());
        const views = (0, utils_1.toNumber)(metaElem.last().text());
        const theme_id = Number(link.split('/')[5]);
        const hours_passed = Math.floor((Date.now() - date.getTime()) / 3600000);
        const is_closed = markElem.text().includes('Закрыта');
        const is_pinned = markElem.text().includes('Закреплено');
        const [users, jobs] = await (async () => {
            const themeResponse = await axios_1.default.get(link);
            const themeHTML = themeResponse.data;
            const themeElement = cheerio_1.default.load(themeHTML);
            const usersHTML = themeElement('[data-author]');
            const users = [];
            const jobs = [];
            usersHTML.each((index, userHTML) => {
                const userElem = themeElement(userHTML);
                const userName = userElem.find('.username ').text();
                const jobName = userElem.find('strong').text();
                users.push(userName);
                jobs.push(jobName);
            });
            return new Promise((resolve) => {
                const filteredUsers = (0, utils_1.removeReapetedContent)((0, utils_1.removeReapetedElems)(users));
                resolve([filteredUsers, jobs]);
            });
        })();
        const is_checked = !jobs.every((job) => job === 'Пользователь');
        const Theme = {
            title: title,
            author: author || '',
            date: date,
            link: link || '',
            status: status,
            jobs: jobs,
            users: users,
            views: views,
            answers: answers,
            theme_id: theme_id,
            hours_passed: hours_passed,
            is_closed: is_closed,
            is_pinned: is_pinned,
            is_checked: is_checked
        };
        data.push(Theme);
    }));
    return new Promise((resolve) => {
        resolve(data);
    });
}
exports.fetchThemes = fetchThemes;
