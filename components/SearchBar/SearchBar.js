import { useState } from 'react';
import styles from '../../styles/SearchBar.module.css';

const SearchBar = ({ placeholder, onSubmit, initValue="", initType="REPOSITORY" }) => {
    const [value, setValue] = useState(initValue);
    const [type, setType] = useState(initType);
    return (
        <div className={`${styles.searchContainer} ${styles.card}`}>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(value, type);
            }}>
                <input className={styles.inputField} placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} type="text" />
                <input type="radio" value="REPOSITORY" name="repository" checked={type === "REPOSITORY"} onChange={(e) => setType(e.target.value)} /> Repositories
                <input type="radio" value="USER" name="user" checked={type === "USER"} onChange={(e) => setType(e.target.value)} /> Users
            </form>
        </div>
    )
}

export default SearchBar