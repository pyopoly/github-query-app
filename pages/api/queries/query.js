
export const TYPES = ["REPOSITORY", "USER"];


export const githubQueries = ({ query, type, cursor, limit=10 }) => {
  const queryRepo = {
    query: `query {
      search(query: "${query}", type: REPOSITORY, first: ${limit} ${(cursor? `after: "${cursor}"` : '')}) {
        repositoryCount
        pageInfo {
          endCursor
        }
        nodes {
          ...on Repository {
            name
            description
            nameWithOwner
            owner {
              login
            }
          }
        }
      }
    }`
  }

  const queryUser = {
    query: `query {
      search(query: "${query}", type: USER, first: ${limit} ${(cursor? `after: "${cursor}"` : '')}) {
        userCount
        pageInfo {
          endCursor
        }
        nodes {
          ...on User {
            url
            login
            name
            avatarUrl
            bio
            location
          }
        }
      }
    }`
  }

  return (type === "REPOSITORY") ? queryRepo : queryUser
}


export const fetchGithub = async ({ query, type, cursor, limit=10 }) => {
  // const domain = "https://github-query-8n2rvc1gw-pyopoly.vercel.app"
  const domain = ""
  const url = `api/search-github?q=${query}&type=${type}&limit=${limit}${cursor? `&cursor=${cursor}`: ""}`;
  const response = await fetch(url
  //   , {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     }
  // }
  )
      .then(res => {
        if (res.status !== 200) throw Error(res.statusText);
        return res.json()
      })
      .catch(error => {
        console.log("error", error)
        return ({ status: error.message })});
      return { result: response };
}