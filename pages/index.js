import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

/*
<Link as={`/posts/${node.slug}`} href="/posts/[slug]">
  <a>{node.title}</a>
</Link>
*/

export default function Home({ allPosts: { edges }, preview }) {
  return (
    <Layout home>
      <Head>
        <title>Brett Krueger's Next.js site</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm <strong>Brett</strong> and I work on WordPress and headless stuffs!</p>
        <p>
          Check out more stuff on {' '}
          <a href="https://github.com/brettkrueger/headless-onboarding" target="_blank">Github</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {edges.map(({ id, node }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${node.slug}`}>{node.title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={node.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
  }
}
