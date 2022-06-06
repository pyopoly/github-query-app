
export const TYPES = ["REPOSITORY", "USER"];


export const githubQueries = ({ query, type, cursor, limit=10 }) => {
  const queryRepo = {
    query: `query {
      search(query: "${query}", type: REPOSITORY, first: ${limit} ${(cursor? `after: "${cursor}"` : '')}) {
        repositoryCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          ...on Repository {
            id
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
          hasNextPage
        }
        nodes {
          ...on User {
            id
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
