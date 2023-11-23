/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Article, ArticleList } from 'entities/Article';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const article = {
    id: '1',
    title: 'Что было добавлено в ECMAScript в 2023 году',
    subtitle: 'Рассказываем, что было добавлено в ECMAScript в 2023 году. Это стандарт JavaScript, который устанавливает правила и синтаксис JS-кода.  Вот, какие функции были добавлены...',
    img: 'https://www.leixue.com/uploads/2019/06/ECMAScript.png',
    views: 1022,
    createdAt: '22 Nov 2023',
    user: {
        id: '1',
        username: 'Shabanov Artem',
        avatar: 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=826&t=st=1700173085~exp=1700173685~hmac=5d18d7cb3b79c038be94cda5f1198b117535b594849f530b5957b8589051c29f',
    },
    type: [
        'IT',
        'Frontend',
        'JS',
    ],
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: 'Вступление',
            paragraphs: [
                'ECMAScript – это стандарт языка программирования JavaScript, который устанавливает правила, синтаксис и другие критерии создания JavaScript-кода.',
                'ECMAScript ежегодно дополняется сообществом разработчиков JavaScript и соответствует стандартам ECMA International. Самые последние обновления ECMAScript включают в себя новые функции и методы, которые помогают разработчикам писать более гибкий и мощный код.',
                'Эти обновления позволяют создавать более качественные и быстрые веб-приложения, а также обеспечивают возможность масштабирования и поддержки кода в будущем. ',
                'Обновления помогают большинству веб-приложений стать более мощными и производительными, что расширяет возможности для создания инновационных и уникальных приложений на основе JavaScript.',
                'Вот, какие функции были добавлены в ECMAScript в 2023 году.',
            ],
        },
        {
            id: '2',
            type: 'TEXT',
            title: '1. Поиск элемента в массиве',
            paragraphs: [
                'Эта функция позволяет найти последний элемент массива, соответствующий заданному условию.',
            ],
        },
        {
            id: '3',
            type: 'CODE',
            code: 'const array = [{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}, {a: 4, b: 4}] \n console.log(array.findLast(n => n)); //result -> {a: 4,b: 4 } \n console.log(array.findLast(n => n.a * 5 === 20)); // result -> {a:4,b:4} as the condition is true so it returns the last element. \n console.log(array.findLast(n => n.a * 5 === 21)); //result -> undefined as the condition is false so return undefined instead of {a:4,b:4}. \n console.log(array.findLastIndex(n => n.a * 5 === 21)); // result -> -1 as the condition is not justified for returning the last element. /n console.log(array.findLastIndex(n => n.a * 5 === 20)); // result -> 3 which is the index of the last element as the condition is true.',
        },
        {
            id: '4',
            type: 'TEXT',
            title: '2. Грамматика Hashbang',
            paragraphs: [
                'Эта функция позволит нам использовать Hashbang/Shebang в некоторых CLI.',
                'Shebang представлен #! и представляет собой специальную строку в начале скрипта, которая сообщает операционной системе, какой интерпретатор использовать при выполнении скрипта.',
            ],
        },
        {
            id: '5',
            type: 'CODE',
            code: '#!/usr/bin/env node \n // in the Script Goal \n  "use strict"; \n console.log(2*3); \n #!/usr/bin/env node \n // in the Module Goal \n export {}; \n console.log(2*2);',
        },
    ],
} as Article;

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('');
    return (
        <div className={classNames(styles.ArticlesPage, {}, [className])}>
            <ArticleList
                isLoading
                articles={new Array(16).fill(0).map((item, index) => ({
                    ...article,
                    id: String(index),
                }))}
            />
        </div>
    );
};

export default memo(ArticlesPage);
