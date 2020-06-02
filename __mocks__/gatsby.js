const React = require('react');

const gatsby = jest.requireActual('gatsby');

// This mocks the graphql() function, Link component, and StaticQuery component.

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) => React.createElement('a', {
      ...rest,
      href: to,
    }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(() => ({
    site: {
      siteMetadata: {
       
      }
    },
    wpgraphql: {
      posts: [
        {
        edges: {
          node: {
            id: 'cG9zdDo2NzI1',
          tags: [
            {
            edges: {
              node: {
                id: "cG9zdF90YWc6MTUw"
              }
            }
          },
        ]
          },
        }
      },
      ], // posts
    }, // wpgraphql
    allTrendingSearches: {
      edges: [
        {
          node: {
            value: '{"search":"variables","count":41,"nbHits":16}',
          }
        }
      ]
    },
    headerLinks: {
      value: '{"links":[{"name":"Search","url":"/search","cta":{"login":false}},{"name":"Dashboard","url":"https://app.getpostman.com/","cta":true}],"title":"Learning Center"}',
    },
    footerLinks: {
      value: '{"columns":[{"name":"Product","children":[{"url":"https://www.getpostman.com/product/api-client","name":"API Client"},{"url":"https://www.getpostman.com/automated-testing","name":"Automated Testing"},{"url":"https://www.getpostman.com/features/mock-api","name":"Design & Mock"},{"url":"https://www.getpostman.com/api-documentation-generator","name":"Documentation"},{"url":"https://www.getpostman.com/api-monitor","name":"Monitors"},{"url":"https://www.getpostman.com/product/api-versioning","name":"Version Control"},{"url":"https://www.getpostman.com/product/workspaces","name":"Workspaces"}]},{"name":"Resources","children":[{"url":"https://www.getpostman.com/downloads/","name":"Download the App"},{"url":"https://www.getpostman.com/downloads/release-notes","name":"Release Notes"},{"url":"https://www.getpostman.com/integrations/","name":"Integrations"},{"url":"https://docs.api.getpostman.com/","name":"Postman API"},{"url":"https://github.com/postmanlabs","name":"Open-Source"},{"url":"https://status.getpostman.com/","name":"System Status"}]},{"name":"Use Cases","children":[{"url":"https://getpostman.com/use-cases/","name":"Overview"},{"url":"https://getpostman.com/use-cases/api-development","name":"Development"},{"url":"https://www.getpostman.com/use-cases/api-testing","name":"Testing"},{"url":"https://www.getpostman.com/use-cases/product-management","name":"Product Management"}]},{"name":"Pricing","children":[{"url":"https://www.getpostman.com/pricing","name":"Overview"},{"url":"https://www.getpostman.com/postman-enterprise","name":"Postman Enterprise"}]},{"name":"Support","children":[{"url":"https://www.getpostman.com/support","name":"Support"},{"url":"https://pages.getpostman.com/Resellers-Support.html","name":"Resellers Support"},{"url":"/","name":"Learning Center"},{"url":"https://www.getpostman.com/resources/videos-tutorials/","name":"Videos & Tutorials"},{"url":"https://www.getpostman.com/community","name":"Community Content"},{"url":"https://community.getpostman.com/","name":"Postman Community"}]},{"name":"Company","children":[{"url":"https://www.getpostman.com/about-postman","name":"About"},{"url":"https://www.getpostman.com/jobs/","name":"Jobs"},{"url":"https://www.getpostman.com/contact","name":"Contact"},{"url":"https://blog.getpostman.com/","name":"Blog"},{"url":"https://www.getpostman.com/resources/press-releases/","name":"Resources"},{"url":"https://store.getpostman.com/","name":"Swag Shop"},{"url":"https://www.getpostman.com/post-con-2019","name":"POST/CON 2019"}]}],"copyright":[{"type":"notice","text":"© Postman, Inc. All rights reserved"},{"type":"link","url":"https://getpostman.com/security","name":"Security"},{"type":"link","url":"https://www.getpostman.com/licenses/privacy","name":"Privacy"},{"type":"link","url":"https://www.getpostman.com/licenses/postman_eula","name":"EULA"}]}',
    },
  })),
};
