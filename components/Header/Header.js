import Head from 'next/head'

const Header = ({ title, description, favicon }) => {
  return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
  )
}

export default Header