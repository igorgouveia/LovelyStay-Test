require("dotenv").config();
import pgPromise, { IDatabase, IMain } from 'pg-promise';

const connection: any = {
    host: process.env['DATABASE_URL'],
    port:  process.env['DATABASE_PORT'],
    database:  `${process.env['DATABASE_NAME']}`,
    user:   `${process.env['DATABASE_USER']}`,
    password:  `${process.env['DATABASE_PASS']}`,
}

const pgp: IMain = pgPromise({
    query(e: any) {
        console.log('QUERY RESULT:', e.query);
    },
    receive(data: any, result: any, e: any) {
        console.log(`DATA FROM QUERY ${e.query} WAS RECEIVED.`);
    }
});

const database: IDatabase<any> = pgp(connection); 

export {
    database
};