import styles from '../../../styles/Home.module.css'
import listStyles from '../../../styles/ListView.module.css'
import Image from 'next/image'

const RepoCard = ({ result }) => {
    return (
        <div className={styles.card}>
            <h2>{result.name}</h2>
            <div className={listStyles.description}>{result.description}</div>
            <a href={`https://github.com/${result.nameWithOwner}`} target="_blank">
                <Image src="/github.svg" alt="GitHub Logo" width={28} height={28} />
            </a>
        </div>
    )
}

export default RepoCard