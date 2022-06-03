import styles from '../../../styles/Home.module.css'
import listStyles from '../../../styles/ListView.module.css'
import Image from 'next/image'

const UserCard = ({ result }) => {
    return (
        <div className={`${styles.card} ${listStyles.profile_card}`}>
            <img className={listStyles.profile_img} src={result.avatarUrl} />
            <div>
                <span className={listStyles.profile_header}>
                    <h2 className={listStyles.profile_title}>{result.login}</h2>
                    <a href={result.url} target="_blank">
                        <Image src="/github.svg" alt="GitHub Logo" width={28} height={28} />
                    </a>
                </span>
                <div className={listStyles.description}>{result.bio}</div>
            </div>
        </div>
    )
}

export default UserCard