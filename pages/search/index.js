import styles from '../../styles/Home.module.css'
import Header from '../../components/Header/Header'
import ListView from '../../components/ListView/ListView'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from 'react'
import { fetchGithub, TYPES } from '../api/queries/query'
import Image from 'next/image'


export default function Search({ data, status }) {
    const router = useRouter();
    const { q: query, type } = router.query;
    const [queryResults, setQueryResults] = useState(data?.search?.nodes)
    const endCursor = useRef(data?.search?.pageInfo.endCursor);

    const submit = (query, type) => {
        router.push(`/search?q=${query}&type=${type}`)
    }


    useEffect(() => {
        if (status === "ok" && query && TYPES.includes(type)) {
            setQueryResults([...data?.search?.nodes])
        }
    }, [query, type, data?.search?.nodes, status])


    return (
        <div className={styles.container}>
            <Header title="GitHub Query App" description="Query the GitHub GraphQL for Repos or Users" favicon="/favicon.ico" />
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Welcome to Github Query App
                <a className={styles.logo} href="https://github.com/pyopoly/github-query-app" target="_blank" rel="noreferrer">
                    <Image src="/github.svg" alt="GitHub Logo" width={35} height={35} />
                </a>
                </h2>
                <SearchBar placeholder="Search" onSubmit={submit} initValue={query} initType={type} />
                <div className={styles.grid}>
                    {queryResults && <ListView 
                    results={queryResults} 
                    type={type} 
                    endCursor={endCursor}
                    setResults={setQueryResults} />}
                </div>
            </main>
        </div>
    )
}



export async function getServerSideProps({ query }) {
    if (!query.q || !query.type) return { props: { status: "no params" } };

    const response = await fetchGithub({ query: query.q, type:query.type });

    return { props: response.result };
}