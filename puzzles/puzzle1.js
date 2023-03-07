
let puzzle1 = {
    title: 'Поиск самого старого пользователя',
    description: 'Делаем функцию, которая вернет самого старого пользователя из списка',
    codeTemplate: `
        function @getOldestUser(@users) {
            @functionBody
        }
    `,
    questions: [
        {
            title: 'Как назовем функцию?',
            replaceKey: 'getOldestUser',
            choices: [
                {
                    replacement: 'getOldestUser',
                    score: 1,
                },
                {
                    replacement: 'getOldest',
                    score: 0.5,
                },
                {
                    replacement: 'getOldUser',
                    score: 0.25,
                },
                {
                    replacement: 'getUser',
                    score: 0,
                },
            ],
        },
        {
            title: 'Как назовем параметр функции?',
            replaceKey: 'users',
            choices: [
                {
                    replacement: 'users',
                    score: 1,
                },
                {
                    replacement: 'userList',
                    score: 0.75,
                },
                {
                    replacement: 'usersArray',
                    score: 0.5,
                },
                {
                    replacement: 'array',
                    score: 0.25,
                },
            ],
        },
        {
            title: 'Как будем искать пользователя?',
            replaceKey: 'functionBody',
            choices: [
                {
                    title: 'Переберем циклом всех пользователей, попутно выясняя, кто из них самый старый',
                    replacement: `
                        let @oldest = @oldestVarInitialValue;
                        
                        for (let user of @users) {
                            if (@condition) {
                                @oldest = user;
                            }
                        }
                        
                        return @oldest;
                    `,
                    score: 1,
                    nestedQuestions: [
                        {
                            title: 'Как назовем переменную для самого старого встреченного пользователя?',
                            replaceKey: 'oldest',
                            choices: [
                                {
                                    replacement: 'oldest',
                                    score: 1,
                                },
                                {
                                    replacement: 'oldestUser',
                                    score: 1,
                                },
                                {
                                    replacement: 'user',
                                    score: 0.25,
                                },
                                {
                                    replacement: 'result',
                                    score: 0.25,
                                },
                            ],
                        },
                        {
                            title: 'Что по умолчанию запишем в нее?',
                            replaceKey: 'oldestVarInitialValue',
                            choices: [
                                {
                                    replacement: 'null',
                                    score: 1,
                                },
                                {
                                    replacement: 'undefined',
                                    score: 0.5,
                                },
                                {
                                    replacement: 'false',
                                    score: 0.25,
                                },
                                {
                                    replacement: '{}',
                                    score: -1,
                                },
                            ],
                        },
                        {
                            title: 'Как назовем переменную для самого старого встреченного пользователя?',
                            replaceKey: 'condition',
                            choices: [
                                {
                                    replacement: '!@oldest || @oldest.age < user.age',
                                    score: 1,
                                },
                                {
                                    replacement: '(@oldest?.age ?? 0) < user.age',
                                    score: 0.5,
                                },
                                {
                                    replacement: '@oldest.age < user.age',
                                    score: -0.25,
                                },
                                {
                                    replacement: '@oldest.age + 1 <= user.age',
                                    score: -0.5,
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Сперва найдем возраст самого старого с помощью Math.max(...), а затем по возрасту найдем пользователя',
                    replacement: `
                        let @highestAge = Math.max(...@mappedUsers);
                        
                        return @foundUser;
                    `,
                    score: 0.75,
                    nestedQuestions: [
                        {
                            title: 'Как назовем переменную для самого большого возраста?',
                            replaceKey: 'highestAge',
                            choices: [
                                {
                                    replacement: 'highestAge',
                                    score: 1,
                                },
                                {
                                    replacement: 'maxAge',
                                    score: 0.75,
                                },
                                {
                                    replacement: 'oldestAge',
                                    score: 0.5,
                                },
                                {
                                    replacement: 'highest',
                                    score: 0.25,
                                },
                            ],
                        },
                        {
                            title: 'Теперь возьмем у юзеров только их возрасты. Как?',
                            replaceKey: 'mappedUsers',
                            choices: [
                                {
                                    replacement: '@users.map(user => user.age)',
                                    score: 1,
                                },
                                {
                                    replacement: `
                                        @users.map(function (user) {
                                            return user.age
                                        })
                                    `,
                                    score: 0.75,
                                },
                                {
                                    replacement: '@users.ages',
                                    score: -0.5,
                                },
                                {
                                    replacement: '@users.getAges()',
                                    score: -0.5,
                                },
                            ],
                        },
                        {
                            title: 'Теперь нужно найти пользователя с таким возрастом. Как?',
                            replaceKey: 'foundUser',
                            choices: [
                                {
                                    replacement: '@users.find(user => user.age === @highestAge)',
                                    score: 1,
                                },
                                {
                                    replacement: '@users.filter(user => user.age === @highestAge)[0]',
                                    score: 0.75,
                                },
                                {
                                    replacement: '@users.sort(user => user.age)[0]',
                                    score: -0.5,
                                },
                                {
                                    replacement: '@users[age]',
                                    score: -0.5,
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Воспользуемся функцией Array.reduce(...) и делов-то',
                    replacement: `
                        return @users.reduce(@reduceArgs);
                    `,
                    score: 0.5,
                    nestedQuestions: [
                        {
                            title: 'А что передадим в эту функцию?',
                            replaceKey: 'reduceArgs',
                            choices: [
                                {
                                    replacement: '(oldest, current) => oldest.age > current.age ? oldest : current, 0',
                                    score: 1,
                                },
                                {
                                    replacement: '(oldest, current) => oldest.age > current.age ? oldest : current',
                                    score: 0.5,
                                },
                                {
                                    replacement: `
                                        function (oldest, current) {
                                            return oldest.age > current.age ? oldest : current;
                                        }, 0
                                    `,
                                    score: 0.75,
                                },
                                {
                                    replacement: `
                                        function (oldest, current) {
                                            return oldest.age > current.age ? oldest : current;
                                        }
                                    `,
                                    score: 0.25,
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'Отсортируем массив по возрасту пользователей, а затем возьмем самого первого',
                    replacement: `
                        @users.sort(@sortFunction);
                        
                        return @users[0];
                    `,
                    score: 0.25,
                    nestedQuestions: [
                        {
                            title: 'Как назовем переменную для самого большого возраста?',
                            replaceKey: 'sortFunction',
                            choices: [
                                {
                                    replacement: `
                                        (a, b) => {
                                            return b.age - a.age; 
                                        }
                                    `,
                                    score: 1,
                                },
                                {
                                    replacement: `
                                        function(a, b) {
                                            return b.age - a.age; 
                                        }
                                    `,
                                    score: 0.75,
                                },
                                {
                                    replacement: `
                                        function(user) {
                                            return a.age; 
                                        }
                                    `,
                                    score: -0.5,
                                },
                                {
                                    replacement: 'user => user.age',
                                    score: -0.5,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

export default puzzle1;