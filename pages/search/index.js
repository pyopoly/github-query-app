import styles from '../../styles/Home.module.css'
import Header from '../../components/Header/Header'
import ListView from '../../components/ListView/ListView'
import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'
import { useRouter } from "next/router"
import { useState, useRef, useCallback } from 'react'
import useQueries from '../../Hooks/useQueries'
import Image from 'next/image'


export default function Search({ q, type, cursor, limit = 10 }) {
    const router = useRouter();
    const [loadMoreTrigger, setLoadMoreTrigger] = useState(1);
    const cursorRef = useRef(cursor);
    const { queries, isLoading, isError, hasMore } = useQueries(q, type, limit, cursorRef, loadMoreTrigger);


    const observer = useRef();
    const lastElementRef = useCallback(element => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoadMoreTrigger(loadMoreTrigger + 1);
            }
        })
        if (element) observer.current.observe(element)
    }, [isLoading, hasMore])


    const submit = (q, type) => {
        router.push(`/search?q=${q}&type=${type}`);
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
                        <ListView queries={queries} type={type} elementRef={lastElementRef} />}
                </div>
                {isLoading && <Loading />}
                {!hasMore && <div> No More to Show! </div>}
                {isError && <div> Something Went Wrong! </div>}
            </main>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    return { props: query };
}