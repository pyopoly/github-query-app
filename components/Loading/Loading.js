import loadingStyles from '../../styles/Loading.module.css';
import Image from 'next/image'

const Loading = () => {
  return (
    <Image className={loadingStyles.loading} src="https://cdn-icons-png.flaticon.com/128/6356/6356625.png" alt="Loading" width={50} height={50} />
  )
}

export default Loading;