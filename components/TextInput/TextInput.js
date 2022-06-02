import styles from './TextInput.module.css';

const TextInput = ({ placeholder, value, setValue=null, onKeyDown=null }) => {
  return (
    <input className={styles.inputField} placeholder={placeholder} value={value} onKeyDown={onKeyDown} onChange={setValue&& ((e) => setValue(e.target.value))} type="text" />
  )
}

export default TextInput;