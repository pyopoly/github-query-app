import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Title = ({ title }) => {
    return (
        <h2 className={styles.title}>
            {title}
            <a className={styles.logo} href="https://github.com/pyopoly/github-query-app" target="_blank" rel="noreferrer">
                <Image src="/github.svg" alt="GitHub Logo" width={35} height={35} />
            </a>
        </h2>
    )
}

export default Title