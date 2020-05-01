// Template for the Blog Post
import React from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/Shared/Bio';
import BlogHeader from '../components/Shared/BlogHeader';
// import PostForm from '../components/Shared/PostForm';
// import CommentList from '../components/Shared/CommentList';


const BlogPostTemplate = ({ data }) => {
  const { post } = data.wpgraphql;
  //  insert postId, below to call PostForm
  const {
    title, content, date, featuredImage, slug, excerpt, seo, comments,
  } = data.wpgraphql.post;
  const authorSlug = data.wpgraphql.post.author.slug;
  const authorBio = data.wpgraphql.post.author.description || '';

  const name = data.wpgraphql.post.author.name || 'The Postman Team';
  const avatar = data.wpgraphql.post.author.avatar.url || '';
  const tags = post.tags.edges;
  const categories = data.wpgraphql.post.categories.edges[0].node;

  const excerptText = excerpt.replace(/<(.|\n)*?>/g, '');
  /*
  *   Creates a string from the 'sanitized' excerpt string.
  *   Grabs everything before the index of '. '(end of sentence) after 100th char.
  *   Adds one to include the '. '
  * */
  const excerptTrimmed = excerptText.slice(0, (excerptText.indexOf('. ', 100) + 1));

  /* data from yoast is coming from 'seo' field that is called in the context of createPage.
  * Yoast plugin for WPGraphQL */
  const seoTitle = seo.title || title;
  const seoDescription = seo.metaDesc || excerptTrimmed;
  const seoImage = (seo.opengraphImage && seo.opengraphImage.mediaItemUrl)
    ? seo.opengraphImage.mediaItemUrl.replace('blog.postman.com', 'edit.blog.postman.com')
    : featuredImage;


  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} image={seoImage} />
      <BlogHeader
        name={name}
        authorSlug={authorSlug}
        avatar={avatar}
        date={date}
        tags={tags}
        categories={categories}
        slug={slug}
        featuredImage={featuredImage}
        postTitle={title}
      />
      <div className="container">
        <div className="post-body-container">
          <div className="post-content">
            {parse(content, {
              replace: (domNode) => {
                // console.log(domNode.attribs && domNode.attribs.class)
                if (domNode.attribs && domNode.attribs.class === 'wp-block-embed__wrapper' && <img />) {
                  if (domNode.children[1].name === "iframe") {
                    return (
                      <iframe width="560" height="315" src={`${domNode.attribs && domNode.children[1].attribs['data-src']}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    )
                  }
                }
                
                // returns all img data from wordpress
                if (domNode.attribs && domNode.attribs['data-src']) {
                  if (domNode.attribs['data-srcset']) {
                    return (
                      <img
                        src={`${domNode.attribs['data-src']}`}
                        alt={domNode.attribs.alt}
                        sizes={domNode.attribs.sizes}
                        data-srcset={`${domNode.attribs['data-srcset']}`}
                        // height={domNode.attribs.height}
                        // width={domNode.attribs.width}
                        class={domNode.attribs.className}
                      />
                    )
                  }
                  // returns all gif data from wordpress
                  return (
                    <img
                      src={`${domNode.attribs['data-src'].replace('blog.postman.com', 'edit.blog.postman.com')}`}
                      alt={domNode.attribs.alt}
                      sizes={domNode.attribs.sizes}
                      className={domNode.attribs.className}
                      
                    />
                  );
                }
              },
            })}
          </div>
          <Bio authorBio={authorBio} name={name} avatar={avatar} authorSlug={authorSlug} />
          {/* <PostForm postId={postId} /> */}
          {/* <CommentList comments={comments} /> */}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const postPageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        comments(where: {status: "approved"}) {
          edges {
            node {
              approved
              content
              date
              children {
                edges {
                  node {
                    content
                    date
                    author {
                      ... on WPGraphQL_CommentAuthor {
                        id
                        name
                      }
                    }
                  }
                }
              }
              author {
                ... on WPGraphQL_CommentAuthor {
                  id
                  name
                  url
                }
              }
            }
          }
        }
        seo {
          metaDesc
          title
          opengraphImage {
            mediaItemUrl
          }
          twitterDescription
          twitterTitle
          twitterImage {
            mediaItemUrl
          }
          opengraphTitle
        }
        featuredImage {
          sourceUrl
          altText
        }
        id
        postId
        uri
        title
        slug
        content 
        excerpt
        author {
          avatar {
            url
          }
          name
          description
          slug
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
        categories {
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
`;
