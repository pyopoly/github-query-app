import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function search({ result }) {
    const router = useRouter();
    const { q } = router.query;
    console.log(q, result)
    return (
        <main className={styles.main}>
            <h1 className={styles.title}> Search </h1>
        </main>
    )
}


const fetchGithub = async (token) => {

    const test = {
        query: `query {
            search(query:"pathfinder-app", type:REPOSITORY, first:2) {
              repositoryCount
              nodes {
              ... on Repository {
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



    const req = await fetch(`https://api.github.com/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(test)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.data.search)
        });
}

// ===========
// ServerSide Routing
// ============
export async function getServerSideProps({ query }) {
    const token = process.env.SECRET_KEY;



    fetchGithub(token)


    console.log(query);

    return {
        props: { result: query.q },
    }
}