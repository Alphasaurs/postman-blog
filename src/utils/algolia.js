// The queries allow you to grab the data you want Algolia to index
// directly from Gatsby's GraphQL layer by exporting from src/utils/algolia.js
// an array of objects, each containing a required GraphQL query and an optional
// index name, transformer function and settings object.

//  the query property is a GraphQL query string.
// The transformer is a function that takes the data retrieved by the query and
// transforms it into the array of objects that will become
// your Algolia index records.

const pageQuery = `{
  wpgraphql {
    posts {
      edges {
        node {
          id
          title
          excerpt
          date
          slug
          uri
          author {
            name
            avatar {
              url
            }
          }
          featuredImage {
            sourceUrl
            altText
          }
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
  }
}`;

const flatten = (arr) => arr.map(({ node: { ...rest } }) => ({
  ...rest,
}));

const settings = { attributesToSnippet: ['excerpt:20'] };

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.wpgraphql.posts.edges),
    indexName: 'blog',
    settings,
  },
];

module.exports = queries;
