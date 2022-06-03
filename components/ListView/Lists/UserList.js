import styles from '../../../styles/Home.module.css'
import UserCard from './UserCard'

const UserList = ({ results }) => {
    return (
        <div className={styles.container}>
            {results.map(result => (result.login) && <UserCard key={result.login} result={result} />)}
        </div>
    )
}

export default UserList