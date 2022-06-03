import styles from '../../styles/Home.module.css';
import RepoList from './Lists/RepoList';
import UserList from './Lists/UserList';
const ListView = ({ results, type }) => {
  return (
    <div className={styles.container}>
      {(type === "REPOSITORY") && <RepoList results={results} />}
      {(type === "USER") && <UserList results={results} />}
    </div>
  )
}

export default ListView