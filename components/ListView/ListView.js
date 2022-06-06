import styles from '../../styles/Home.module.css';
import RepoList from './Lists/RepoList';
import UserList from './Lists/UserList';

const ListView = ({ queries, type, elementRef }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.container}>
        {(type === "REPOSITORY") && <RepoList elementRef={elementRef} results={queries} />}
        {(type === "USER") && <UserList elementRef={elementRef} results={queries} />}
      </div>
    </div>
  )
}

export default ListView