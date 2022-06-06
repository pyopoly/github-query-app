import styles from '../../../styles/Home.module.css'
import listStyles from '../../../styles/ListView.module.css'
import Image from 'next/image'
import React from 'react'

const RepoCard = ({ result }, ref) => (
    <div className={styles.card}>
        <span className={listStyles.profile_header}>
            <h2 className={listStyles.profile_title}>{result.name}</h2>
            <a href={`https://github.com/${result.nameWithOwner}`} target="_blank" rel="noreferrer">
                <Image src="/github.svg" alt="GitHub Logo" width={28} height={28} />
            </a>
        </span>
        <div className={listStyles.description}>{result.description}</div>
        <div className='loadMore' ref={ref}></div>
    </div>
);

export default React.forwardRef(RepoCard)