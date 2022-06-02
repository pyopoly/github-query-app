import styles from './SearchBar.module.css';
import TextInput from '../TextInput/TextInput';

const SearchBar = ({ placeholder, value, setSearch }) => {
    return (
        <div className={`${styles.searchContainer} ${styles.card}`}>
            <TextInput placeholder={placeholder} value={value} setValue={setSearch} />
        </div>
    )
}

export default SearchBar