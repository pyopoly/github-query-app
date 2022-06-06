import styles from '../../../styles/Home.module.css'
import UserCard from './UserCard'

const UserList = ({ results, elementRef }) => {
    return (
        <div className={styles.container}>
            {results.map((result, idx) => (result.login) &&
                ((results.length === idx + 1) ?
                    <UserCard ref={elementRef} key={result.id} result={result} /> :
                    <UserCard key={result.id} result={result} />)
            )}
        </div>
    )
}

export default UserList