import styles from '../../../styles/Home.module.css'
import RepoCard from "./RepoCard"

const RepoList = ({ results }) => {
  return (
    <div className={styles.container}>
      {results.map(result => (result?.owner?.login) && <RepoCard key={result.owner.login} result={result} /> )}
    </div>
  )
}

export default RepoList