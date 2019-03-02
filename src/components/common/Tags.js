import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Tags = ({ post }) => {
  const { tags, id } = post;

  if (!tags.length) {
    return <span />;
  }

  // return <span>on <Tags post={post} visibility="public" autolink={false} /></span>;
  return <span> on {tags.map(({ name, slug }, i) => {
      const key = `${id}-tag-${slug}`;
      const link = `/tag/${slug}`;
      const separator = i+1 !== tags.length ? ', ' : <></>;

      return <>
        <Link key={key} to={link}>{name}</Link>{separator}
      </>;
    })}
  </span>;
}

Tags.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Tags;
