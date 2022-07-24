import { removeReapetedContent, removeReapetedElems, toNumber } from './utils';
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";

const _link = 'https://forum.robo-hamster.com/'

type CheerioRoot = cheerio.Root
type Cheerio = cheerio.Cheerio

export async function fetchThemes(url: string): Promise<any> {
    const response: AxiosResponse = await axios.get(url);
    const html: string = response.data;
    const element: CheerioRoot = cheerio.load(html);  
    const themesHTML: Cheerio = element('div[data-author]');
    const data: object[] = [];
    await Promise.all(themesHTML.map(async (index: number, themeHTML: cheerio.Element) => {
        const themeElem: Cheerio = element(themeHTML);
        const structTitle: Cheerio = themeElem.find('div.structItem-title');
        const statusElem: Cheerio = structTitle.find('span');
        const titleElem: Cheerio = structTitle.find('a[data-xf-init]');
        const dateElem: Cheerio = structTitle.next().find('time');
        const metaElem: Cheerio = themeElem.find('dd')
        const markElem: Cheerio = themeElem.find('span.u-srOnly');

        const title: string = titleElem.text();
        const author: string | undefined = themeElem.attr('data-author');
        const link: string | undefined = _link + titleElem.attr('href');
        const date: Date = new Date(dateElem.data().time * 1000);
        const status: string = statusElem ? statusElem.text() : '';
        const answers: number = Number(metaElem.first().text());
        const views: number | string = toNumber(metaElem.last().text());
        const theme_id: number = Number(link.split('/')[5]);
        const hours_passed: number = Math.floor((Date.now() - date.getTime()) / 3600000);
        const is_closed: boolean = markElem.text().includes('Закрыта');
        const is_pinned: boolean = markElem.text().includes('Закреплено');
        const [users, jobs]: string[][] = await (async () => {
            const themeResponse: AxiosResponse = await axios.get(link);
            const themeHTML: string = themeResponse.data;
            const themeElement: CheerioRoot = cheerio.load(themeHTML);
            const usersHTML: Cheerio = themeElement('[data-author]');
            const users: string[] = [];
            const jobs: string[] = [];
            usersHTML.each((index: number, userHTML: cheerio.Element) => {
                const userElem: Cheerio = themeElement(userHTML);
                const userName: string = userElem.find('.username ').text();
                const jobName: string = userElem.find('strong').text();
                users.push(userName);
                jobs.push(jobName);
            });
            return new Promise((resolve) => {
                const filteredUsers: string[] = removeReapetedContent(removeReapetedElems(users));
                resolve([filteredUsers, jobs]);
            });
        })();
        const is_checked: boolean = !jobs.every((job: string) => job === 'Пользователь');
        const Theme: ITheme = {
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

interface ITheme {
    title: string;
    author: string | undefined;
    date: Date;
    link: string | undefined;
    status: string;
    jobs: string[];
    users: string[];
    views: number | string;
    answers: number;
    theme_id: number;
    hours_passed: number;
    is_closed: boolean;
    is_pinned: boolean;
    is_checked: boolean;
}