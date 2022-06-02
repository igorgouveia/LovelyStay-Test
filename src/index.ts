import { get } from "./app/controllers/mainController";

const program = require('commander');
const { fetchData } = require('./app/controllers/mainController.ts');

program
    .command('fetch [nickname]')
    .description('Fetch a nickname from Github')
    .action(async (nickname: string) => {
        const user = await fetchData(nickname)
        console.log(user);
    });

program
    .command('get [location]')
    .description('Fetch a users from DB')
    .action(async (location: string) => {
        const user = await get(location)
        console.log(user);
    });
program.parse(process.argv);