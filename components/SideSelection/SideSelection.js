import styles from '../../styles/SideSelection.module.css';
import mainStyles from '../../styles/Home.module.css';

const SideSelection = () => {
  return (
    <div className={mainStyles.card} >
        <button>Repositories</button>
        <button>Users</button>
    </div>
  )
}

export default SideSelection