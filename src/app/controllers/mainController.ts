import { count } from "console";
import { Request, Response } from "express";
import { ExpressResponseAdapter } from "../../adapters/ExpressResponseAdapter";
import { database } from "../../config/database";
import { api } from "../services/github";


async function fetch(req: Request, res: Response) {

  try {

    const { nickname } = req.params

    const user = await api.get(nickname)

    const repositories = await api.get(`${nickname}/repos`)

    let languages = []

    for (const repository of repositories.data) {
      if (repository.language) {
        const index = languages.findIndex(item => item.name === repository.language)
        if (index >= 0) {
          languages[index].count += 1
        } else {
          languages.push({ count: 1, name: repository.language })
        }
      }
    }

    const userIndex = await database.any(`SELECT * from users where nickname = '${nickname}'`);

    if (!userIndex.length) {

      await database.query(`insert into 
                                    users(
                                        name, 
                                        nickname, 
                                        bio, 
                                        location, 
                                        followers, 
                                        following, 
                                        public_repos, 
                                        picture, 
                                        languages,
                                        github_id, 
                                        created_at, 
                                        updated_at
                                      ) 
                                      values 
                                      (
                                        '${user.data.name}',
                                        '${nickname}',
                                        '${user.data.bio}',
                                        '${user.data.location}',
                                        ${user.data.followers},
                                        ${user.data.following},
                                        ${user.data.public_repos},
                                        '${user.data.avatar_url}',
                                        '${languages.map(e => e.name).join(", ")}',
                                        ${user.data.id}, 
                                        '${user.data.created_at}',
                                        '${user.data.updated_at}'
                                      ) `
      )

      const userData = await database.any(`SELECT currval('users_id_seq');`);

      const userId = userData[0].currval

      languages.forEach(item => {
        database.query(`insert into 
                          user_language(name, count, user_id) 
                        values 
                        ('${item.name}', ${item.count}, ${userId})`);
      });

    }

    return new ExpressResponseAdapter(res).handle(200, { user: user.data, repositories: repositories.data, languages: languages });
  } catch (error) {
    return new ExpressResponseAdapter(res).handle(500);
  }
}

async function get(req: Request, res: Response) {
  try {

    const { location } = req.query

    const userData = await database.any(`SELECT * from users ${location ? "where location ILIKE '%" + location + "%'" : ""}`);

    return new ExpressResponseAdapter(res).handle(200, userData);
  } catch (error) {
    return new ExpressResponseAdapter(res).handle(500);
  }
}

export {
  get, fetch
};