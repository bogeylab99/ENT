import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <h2>Shared Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet!</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="post">
            {post}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
