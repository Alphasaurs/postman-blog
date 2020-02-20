import React from "react"
import { graphql } from "gatsby"
import '../components/_layout.scss'
import './_post.scss'

import Layout from "../components/layout"
import EntryMeta from '../components/Shared/EntryMeta';
import SEO from "../components/seo";
import FluidImage from '../components/FluidImage';

import parse from 'html-react-parser';
import PostForm from '../components/Shared/PostForm'


export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        featuredImage {
          sourceUrl
          altText
        }
        id
        uri
        title
        content 
        author {
          avatar {
            url
          }
          name
        }
        date
        tags {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`

const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql
  
  const title = data.wpgraphql.post.title;
  const content = data.wpgraphql.post.content;
  const name = data.wpgraphql.post.author.name;
  const avatar = data.wpgraphql.post.author.avatar.url;
  const date = data.wpgraphql.post.date
  const featuredImage = data.wpgraphql.post.featuredImage;

  const tags = post.tags.edges

    return (
      <Layout>
        <SEO title="post"/>
        <div className="indexPost">
          <FluidImage image={featuredImage} />
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <EntryMeta name={name} avatar={avatar} date={date} tags={tags}/>

          <div>{parse(content, {
            replace: (domNode) => {

            if (domNode.attribs && domNode.attribs['data-src']) {
              console.log(domNode);
              return <img src={domNode.attribs['data-src']} alt={domNode.attribs.alt} />
            }
            }
          })}</div>
    
          <PostForm />  
        </div>   
      </Layout>
    )
  }

export default BlogPostTemplate;
