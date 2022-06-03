import styles from '../../../styles/Home.module.css'
import listStyles from '../../../styles/ListView.module.css'
import Image from 'next/image'

const RepoCard = ({ result }) => {
    return (
        <div className={styles.card}>
            <span className={listStyles.profile_header}>
                <h2 className={listStyles.profile_title}>{result.name}</h2>
                <a href={`https://github.com/${result.nameWithOwner}`} target="_blank">
                    <Image src="/github.svg" alt="GitHub Logo" width={28} height={28} />
                </a>
            </span>
            <div className={listStyles.description}>{result.description}</div>
        </div>
    )
}

export default RepoCard