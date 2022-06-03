import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import ListView from '../components/ListView/ListView'
import SearchBar from '../components/SearchBar/SearchBar'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import { queryGithub } from './api/queries/query';


const TYPES = ["REPOSITORY", "USER"]


export default function Home({ data, status }) {
    const router = useRouter();
    const { q: query, type } = router.query;
    const [queryResults, setQueryResults] = useState(data?.search?.nodes)

    useEffect(() => {
        if (status === "ok" && router.query.q && TYPES.includes(router.query.type)) {
            setQueryResults([...data?.search?.nodes])
        }
    }, [query, type])


    const submit = (query, type) => {
        router.push(`/?q=${query}&type=${type}`)
    }

    return (
        <div className={styles.container}>
            <Header title="Create Next App" description="Generated by create next app" favicon="/favicon.ico" />
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Github Query Apps
                </h1>
                <SearchBar placeholder="Search" onSubmit={submit} initValue={query} initType={type} />
                <div className={styles.grid}>
                    {queryResults && <ListView results={queryResults} type={type} />}
                </div>
            </main>
        </div>
    )
}



export async function getServerSideProps({ query }) {
    if (!query.q || !query.type) return { props: { status: "no params" } };

    const token = process.env.SECRET_KEY;
    const graphQLquery = queryGithub({
        query: query.q,
        type: query.type
    });


    const response = await fetch(`https://api.github.com/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify(graphQLquery)
    })
        .then(res => res.json())
        .then(data => {
            if (!!data.errors) throw Error(data.errors[0].message);
            return { ...data, status: "ok" };
        })
        .catch(error => ({ status: error.message }));

    return { props: response };
}