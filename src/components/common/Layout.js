import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/site.css'

/**
* Main layout component
*
* The Layout component wraps around each page and tmeplate.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <body className={bodyClass} />
        </Helmet>

        <div class="nav-bar title-font">
          <div class="nav-bar-inner">
            <ul class="social-buttons">
              <li><a href="https://www.github.com/tegud" target="_blank" class="fa fa-github"></a></li>
              <li><a href="https://www.twitter.com/tegud" target="_blank" class="fa fa-twitter-square"></a></li>
              <li><a href="https://www.linkedin.com/in/tegud" target="_blank" class="fa fa-linkedin-square"></a></li>
            </ul>
            <a href="https://www.tegud.net"><h1>tegud.net</h1></a>
          </div>
        </div>

        <div>
          <main id="content" class="content" role="main">
            {children}
          </main>
        </div>

        <footer class="site-footer clearfix">
            <section class="copyright"><a href="https://www.tegud.net">tegud.net</a> &copy; 2019</section>
        </footer>
    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
