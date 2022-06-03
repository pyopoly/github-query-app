import styles from '../../styles/Home.module.css';
import listStyles from '../../styles/ListView.module.css'
import RepoList from './Lists/RepoList';
import UserList from './Lists/UserList';

import { fetchGithub } from '../../pages/api/queries/query.js'


const ListView = ({ results, type, endCursor, setResults }) => {

  const handleClick = async () => {
    const { result: {data} } = await fetchGithub({query: "x", type:type, cursor: endCursor.current});
    endCursor.current = data.search.pageInfo.endCursor;
    const nodes = data.search.nodes;
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