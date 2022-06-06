import styles from '../../styles/Home.module.css';
import listStyles from '../../styles/ListView.module.css'
import RepoList from './Lists/RepoList';
import UserList from './Lists/UserList';

const ListView = ({ queries, query, type, endCursor, setResults, handleLoadMore }) => {
  return (
    <div className={styles.container}>
      {(type === "REPOSITORY") && <RepoList results={queries} />}
      {(type === "USER") && <UserList results={queries} />}
      <button className={listStyles.button} onClick={handleLoadMore}>more</button>
    </div>
  )
}

export default ListView