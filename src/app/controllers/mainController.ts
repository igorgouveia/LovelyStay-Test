const { database } = require("../../config/database");
const { api } = require("../services/github");

export async function fetchData(nickname: string) {

  try {
    const user = await api.get(nickname)

    const repositories = await api.get(`${nickname}/repos`)

    let languages = repositories.data.map((item: { language: any; }) => item.language)
      .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index && value !== null)

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
                                        $1,
                                        $2,
                                        $3,
                                        $4,
                                        $5,
                                        $6,
                                        $7,
                                        $8,
                                        $9,
                                        $10,
                                        $11,
                                        $12
                                      ) `
        , [user.data.name,
          nickname,
        user.data.bio,
        user.data.location,
        user.data.followers,
        user.data.following,
        user.data.public_repos,
        user.data.avatar_url,
        languages.map((e: any) => e).join(", "),
        user.data.id,
        user.data.created_at,
        user.data.updated_at
        ])

    }

    return { user: user.data, repositories: repositories.data, languages: languages };
  } catch (error) {
    return error;
  }
}

export async function get(location: string): Promise<any> {
  try {
    const userData = await database.any(`SELECT * from users 
                                        ${location ? "where location ILIKE $1" : ""}`, [`%${location}%`]);
    return userData;
  } catch (error) {
    return error;
  }
}


