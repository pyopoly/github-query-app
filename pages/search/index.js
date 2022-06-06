import { Header, ListView, SearchBar, Loading, Title, } from '../../components'
import { useRouter } from "next/router"
import { useState, useRef, useCallback } from 'react'
import styles from '../../styles/Home.module.css'
import useQueries from '../../Hooks/useQueries'


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
    }, [isLoading, hasMore, loadMoreTrigger])


    const submit = (q, type) => {
        router.push(`/search?q=${q}&type=${type}`);
    }


    return (
        <div className={styles.container}>
            <Header title="GitHub Query App" description="Query the GitHub GraphQL for Repos or Users" favicon="/favicon.ico" />
            <main className={styles.main}>
                <Title title="Welcome to Github Query App" />
                <SearchBar placeholder="Search" onSubmit={submit} initValue={q} initType={type} />
                {queries.length > 0 && <ListView queries={queries} type={type} elementRef={lastElementRef} />}
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