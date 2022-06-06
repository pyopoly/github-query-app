import styles from '../../../styles/Home.module.css'
import RepoCard from "./RepoCard"

const RepoList = ({ results, elementRef }) => {
  return (
    <div className={styles.container}>
      {results.map((result, idx) => (result?.owner?.login) &&
        ((results.length === idx + 1) ?
          <RepoCard ref={elementRef} key={result.id} result={result} /> :
          <RepoCard key={result.id} result={result} />)
      )}
    </div>
  )
}

export default RepoList