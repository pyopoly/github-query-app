export const queryGithub = ({ query, type, limit=10 }) => {

  const queryRepo = {
    query: `query {
      search(query: "${query}", type: REPOSITORY, first: ${limit}) {
        repositoryCount
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
      search(query: "${query}", type: USER, first: ${limit}) {
        repositoryCount
        userCount
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