import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            {previousPagePath && (
              <Link className="newer-posts" to={previousPagePath}><span aria-hidden="true">←</span> Newer Posts</Link>
            )}
            {numberOfPages > 1 && <span class="page-number">Page {humanPageNumber} of {numberOfPages}</span>}
            {nextPagePath && (
              <Link className="older-posts" to={nextPagePath}>Older Posts <span aria-hidden="true">→</span></Link>
            )}
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
