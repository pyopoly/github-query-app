import styles from '../../../styles/Home.module.css'
import listStyles from '../../../styles/ListView.module.css'
import Image from 'next/image'
import React from 'react'

const UserCard = ({ result }, ref) => {
    return (
        <div className={`${styles.card} ${listStyles.profile_card}`}>
            <div className={listStyles.profile_img_container}>
                {result.avatarUrl && <Image className={listStyles.profile_img} src={result.avatarUrl} alt="User Profile" layout="fill" />}
            </div>
            <div>
                <span className={listStyles.profile_header}>
                    <h2 className={listStyles.profile_title}>{result.login}</h2>
                    <a href={result.url} target="_blank" rel="noreferrer">
                        <Image src="/github.svg" alt="GitHub Logo" width={28} height={28} />
                    </a>
                </span>
                <div className={listStyles.description}>{result.bio}</div>
            </div>
            <div className='loadMore' ref={ref}></div>
        </div>
    )
}

export default React.forwardRef(UserCard)