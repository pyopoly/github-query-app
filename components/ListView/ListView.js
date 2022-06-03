import styles from '../../styles/Home.module.css';
import listStyles from '../../styles/ListView.module.css'
import RepoList from './Lists/RepoList';
import UserList from './Lists/UserList';

import { fetchGithub } from '../../pages/api/queries/query.js'


const ListView = ({ results, query, type, endCursor, setResults }) => {

  const handleClick = async () => {
    const { result} = await fetchGithub({query: query, type: type, cursor: endCursor.current});
    console.log(result)
    endCursor.current = result.data.search.pageInfo.endCursor;
    const nodes = result.data.search.nodes;
    setResults([ ...results, ...nodes ])
  }

  return (
    <div className={styles.container}>
      {(type === "REPOSITORY") && <RepoList results={results} />}
      {(type === "USER") && <UserList results={results} />}
      <button className={listStyles.button} onClick={handleClick}>more</button>
    </div>
  )
}

export default ListView