import loadingStyles from '../../styles/Loading.module.css';

const Loading = () => {
  return (
    <img className={loadingStyles.loading} src="https://cdn-icons-png.flaticon.com/128/6356/6356625.png" alt="Loading"></img>
  )
}

export default Loading;