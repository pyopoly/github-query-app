import styles from '../../styles/Home.module.css'
import Header from '../../components/Header/Header'
import ListView from '../../components/ListView/ListView'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useRouter } from "next/router"
import { useState, useRef } from 'react'
import useQueries from '../../Hooks/useQueries'
import Image from 'next/image'


export default function Search({ q, type, cursor, limit = 5 }) {
    const router = useRouter();
    const [loadMoreTrigger, setLoadMoreTrigger] = useState(1);
    const cursorRef = useRef(cursor);
    const { queries, isLoading, isError, hasMore } = useQueries(q, type, limit, cursorRef, loadMoreTrigger);


    const submit = (q, type) => {
        router.push(`/search?q=${q}&type=${type}`)
    }

    const handleLoadMore = () => {
        if (hasMore) setLoadMoreTrigger(loadMoreTrigger + 1);
    }


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
                <SearchBar placeholder="Search" onSubmit={submit} initValue={q} initType={type} />
                <div className={styles.grid}>
                    {queries.length > 0 &&
                        <ListView
                            queries={queries}
                            type={type}
                            handleLoadMore={handleLoadMore}
                        />}
                </div>
                {isLoading && <div> Is Loading </div>}
                {isError && <div> Something Went Wrong </div>}
            </main>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    return { props: query };
}