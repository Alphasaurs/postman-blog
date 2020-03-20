// Header used for Blog page
import React from 'react';
import EntryMeta from './EntryMeta';
import FluidImage from '../FluidImage';
import TagsMeta from './Tags';

import BreadCrumbs from '../Shared/Breadcrumbs'


const BlogHeader = ({
  featuredImage, name, avatar, date, postTitle, authorSlug, tags, categories, slug
}) => (
  <div className="container blog-header-wrapper">
    <BreadCrumbs category={categories} title={postTitle} slug={slug} />
    <div className="row">
      <div className="col-lg-12">

        <div className="row blog-header">
          <div className="col-lg-8 blog-header-title">
            {/* title */}
            <h2 dangerouslySetInnerHTML={{ __html: postTitle }} />
          </div>
          <div className="col-lg-4">
            <FluidImage image={featuredImage} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5 blog-header-entry">
            <EntryMeta
              authorSlug={authorSlug}
              name={name}
              avatar={avatar}
              date={date}
              tags={tags}
              categories={categories}
            />
          </div>
          <div className="col-lg-7 blog-tags">
            {/* tags */}
            <TagsMeta tags={tags} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogHeader;
