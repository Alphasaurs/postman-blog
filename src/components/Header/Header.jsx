import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import ReactModal from 'react-modal';
// import algoliasearch from 'algoliasearch/lite';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import uuidv4 from 'uuid/v4';
import DynamicLink from '../Shared/DynamicLink';
import postmanLogo from '../../images/postman-logo-horizontal-orange.svg';
import '../../utils/typography';


// const ClickOutHandler = require('react-onclickout');

/* these keys are to access only blog index in Algolia
********************************************************************* */
// const algoliaClient = algoliasearch('4A5N71XYH0', 'f2417f2277d49686d11c909fe9e7a896');

/* add in API Keys from Learning Center to activate multiple index search
*************************************************************************** */
// const algoliaClient = algoliasearch('4A5N71XYH0', 'bf5cf4783437b12c2dca33724c9c04b0');


/* removes empty query searches from Algolia analytics
********************************************************************* */
// const searchClient = {
//   search(requests) {
//     const newRequests = requests.map((request) => {
//       // test for empty string and change request parameter: analytics
//       if (!request.params.query || request.params.query.length === 0) {
//         request.params.analytics = false;
//       }
//       return request;
//     });
//     return algoliaClient.search(newRequests);
//   },
// };

/* changes button in navbar based on cookie presence
********************************************************************* */
const LoginCheck = (props) => {
  const { cookie } = props;
  if (cookie !== 'yes') {
    return (
      <a href="https://identity.getpostman.com/login" className="btn btn__primary">Sign In</a>
    );
  }
  return (
    <a href="https://app.getpostman.com" className="btn btn__primary">Dashboard</a>
  );
};


class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

    this.getCookie = this.getCookie.bind(this);
    const { data } = this.props;

    this.state = {
      data: JSON.parse(data),
      isToggledOn: 'unset',
      // refresh: false,
      isModalOpen: false,
      searchTerm: '',
      // visibleHelloBar: 0,
    };
  }

  componentDidMount() {
    // Unit test will complain if process is not checked
    if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#main');
    // HelloBar implementation
    // const helloBarCountValue = Number(localStorage.getItem('hellobarcount'));
    // this.setState({
    //   visibleHelloBar: helloBarCountValue,
    // });
  }

  /* Helper functions
  /******************************************************** */

  handleModalOpen = () => {
    this.setState({ isModalOpen: true });
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  }

  handleModalChange = (e) => {
    const updateSearch = e.target.value;
    this.setState({ searchTerm: updateSearch });
  }

  getCookie = (a) => {
    if (typeof document !== 'undefined') {
      const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
      return b ? b.pop() : '';
    }
    return false;
  };

  // toggles the hamburger menu
  toggleMenu = () => {
    this.setState((state) => {
      if (state.isToggledOn === 'unset') {
        return ({
          isToggledOn: true,
        });
      }
      return ({
        isToggledOn: !state.isToggledOn,
      });
    });
  }

  // click out search results box
  // onClickOut = () => {
  //   document.getElementsByClassName('ais-SearchBox-input')[0].value = '';
  //   this.setState(() => ({
  //     hasInput: false,
  //   }));
  // }

  render() {
    const {
      isToggledOn, data,
      // isToggledOn, data, refresh, hasInput, visibleHelloBar
    } = this.state;

    const { trend } = this.props;


    return (
      <header className="header text-center navbar navbar-expand-xl navbar-light">
        <div className="navbar-brand header__brand">
          <Link
            className="header__homelink"
            to="/"
          >
            <img className="header__logo" src={postmanLogo} alt="postman logo" />
            <span className="header__title">{data.title}</span>
          </Link>
        </div>

        {/* hamburger toggle */}
        <button className="navbar-toggler" aria-label="Menu" type="button" onClick={this.toggleMenu}>
          <span className="navbar-toggler-icon" aria-hidden="true" />
        </button>

        {/* overlay ${!visibleHelloBar ? ' noBar' : ''} */}
        <div
          className={`header__right-links justify-content-end navbar-nav mr-auto navbar-collapse collapse show
            ${(isToggledOn === true) ? 'animate-open' : ''}
            ${(isToggledOn === false) ? 'animate-close' : ''}
            ${isToggledOn === 'unset' ? 'closed' : ''} 
            `}
          id="navbarSupportedContent"
        >
          {/* Aloglia Widgets */}
          {/* <div className="form-inline header__search">
            <ClickOutHandler onClickOut={this.onClickOut}>
              <InstantSearch
                searchClient={searchClient}
                indexName="blog"
                refresh={refresh}
              >
                <Configure hitsPerPage={5} /> */}
          {/* forcefeed className because component does not accept natively as prop */}
          {/* <SearchBox
                  className="searchbox"
                  class="ais-SearchBox-input"
                  submit={<></>}
                  reset={<></>}
                  translations={{
                    placeholder: 'Search Postman Blog',
                  }}
                  onKeyUp={(event) => {
                    this.setState({
                      hasInput: event.currentTarget.value.length > 2,
                    });
                  }}
                /> */}
          {/* Comment in only if you want Blog post hits */}
          {/* <div className={!hasInput ? 'input-empty' : 'input-value'}>
                  <CustomHits hitComponent={Hits} />
                </div> */}


          {/* Comment in for federated search */}
          {/* <div className={!hasInput ? 'input-empty' : 'row wrapper-search-results input-value'}>
                  <Index indexName="blog">
                    <div className="col-sm-12 results-blog">
                      <p className="font-weight-bold mb-0">On the Blog</p>
                      <CustomHits hitComponent={Hits} />
                      <Configure hitsPerPage={4} />
                    </div>
                  </Index>

                  <Index indexName="docs">
                    <div className="col-sm-12 results-lc">
                      <p className="font-weight-bold mb-0">On Learning Center</p>
                      <NextHits hitComponent={Hits} />
                      <Configure hitsPerPage={2} />
                    </div>
                  </Index>
                </div> */}
          {/* </InstantSearch>
            </ClickOutHandler>
          </div> */}

          <div id="main" className="col-sm-10">
            <button type="button" className="browse text-sm-left" onClick={this.handleModalOpen}>
              What are you looking for?
            </button>
          </div>

          <div className="modal">
            <ReactModal
              /* eslint-disable */
              isOpen={this.state.isModalOpen}
              onRequestClose={this.handleModalClose}
              contentLabel="Search Modal"
              ariaHideApp={false}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm-10">
                    <form action="/search?query=">
                      <input
                        ref={(input) => input && input.focus()}
                        type="text"
                        name="query"
                        placeholder="Search Postman"
                        value={this.state.searchTerm}
                        onChange={(event) => this.handleModalChange(event)}
                        /* eslint-ensable */
                      />
                    </form>
                    <div className="trending">
                      <p>Trending Searches on Postman Blog</p>
                      <ul>
                        {  
                          trend.edges.map((trend) =>  (
                            <li key={uuidv4()}>
                              <a 
                                href={`/search?query=${JSON.parse(trend.node.value).search}`}
                                onClick={ () => {
                                  // e.preventDefault()
                                  // window.ga('send', 'event', 'Trending Searches', 'Click', 'Algolia-trending-searches');
                                  trackCustomEvent({
                                    // string - required - The object that was interacted with
                                    category: "Trending Search",
                                    // string - required - Type of interaction
                                    action: "Click",
                                    // string - optional - Useful for categorizing events
                                    label: "Blog Trending Searches",
                                })
                              }}
                              >
                                { JSON.parse(trend.node.value).search }
                              </a>
                            </li>
                          ))
                        }
                       </ul>
                    </div>
                  </div>
                  <div className="col-sm-2 text-right">
                    <button type="button" onClick={this.handleModalClose}>Close</button>
                  </div>
                </div>
              </div>

            </ReactModal>
          </div>

          {data.links.map((link) => (
            <div className="nav-item" key={link.name}>
              {link.cta.login ? <LoginCheck cookie={this.getCookie('getpostmanlogin')} /> : <DynamicLink className="nav-link" url={link.url} name={link.name} />}
            </div>
          ))}
        </div>
      </header>
    );
  }
}

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allTrendingSearches {
        edges {
          node {
            value
          }
        }
      }
      headerLinks {
        value
      }
    }`);
  return (
    <HeaderComponent data={data.headerLinks.value} trend={data.allTrendingSearches} />
  );
};

export default Header;
