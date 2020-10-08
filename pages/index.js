import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Date from '../components/date'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME, ALGOLIA_UID, ALGOLIA_SECRET } from '../lib/constants'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, connectHits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  ALGOLIA_UID,
  ALGOLIA_SECRET
);

//<Hits hitComponent={HitComponent} />
const HitComponent = ({ hit }) => (
  <div className="posts">
        <Link href={`/posts/${hit.slug}`} className="posts"><a>{hit.title.rendered}</a></Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={hit.date} />
        </small>
  </div>
);

/*
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
*/
//const CustomHits = connectHits(HitComponent);

export default function Home({ allPosts: { edges }, preview }) {
  return (
    <Layout home>
      <Head>
        <title>Brett Krueger's Next.js site</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm <strong className={utilStyles.rainbowText}>Brett</strong> and I work on WordPress and headless stuffs!</p>
        <p>
          Check out more stuff on {' '}
          <a href="https://github.com/brettkrueger/headless-onboarding" target="_blank">Github</a>.
        </p>
        <p>
        Now with <span className={utilStyles.rainbowText}>Algolia</span> and <strong>prerendering</strong>!
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <InstantSearch
        indexName="headless_NEXTJS"
        searchClient={searchClient}>
        <div>
          <SearchBox />
          <Hits hitComponent={HitComponent} />
        </div>
      </InstantSearch>
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
