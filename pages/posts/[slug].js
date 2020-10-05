import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAllPostsWithSlug, getPostAndMorePosts, getPostBySlug } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
// Add this line
import utilStyles from '../../styles/utils.module.css'

export default function Post({ post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return(
    <Layout>
      <Head>
        <title>{post.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title.rendered}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostBySlug(params.slug)
  return {
    props: {
      post: data[0]
    },
  }
}


export async function getStaticPaths() {
  //const paths = await getAllPostIds()
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: false
  }
}
