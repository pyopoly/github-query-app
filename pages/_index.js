import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header'
import Link from 'next/link'


export default function Home() {
    return (
        <div className={styles.container}>
            <Header title="GitHub Query App" description="Query the GitHub GraphQL for Repos or Users" favicon="/favicon.ico" />
            <main className={`${styles.main} ${styles.main_page}`}>
                <h1 className={styles.title}>
                    Welcome to Github Query Apps
                </h1>
                <Link href='/search'> 
                <h2 className={styles.title}><a>Start</a></h2>
                </Link>
            </main>
        </div>
    )
}
