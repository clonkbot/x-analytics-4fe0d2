import { useEffect, useState } from 'react';

interface Post {
  id: number;
  time: string;
  text: string;
  likes: number;
  retweets: number;
  replies: number;
}

interface DailyPostsProps {
  posts: Post[];
  handle: string;
}

export function DailyPosts({ posts, handle }: DailyPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);

  useEffect(() => {
    posts.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePosts((prev) => [...prev, index]);
      }, 300 + index * 100);
    });
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="posts-container empty">
        <div className="posts-header">
          <span className="posts-title">TODAY'S POSTS</span>
          <span className="posts-count">0 ENTRIES</span>
        </div>
        <div className="no-posts">
          <span className="no-posts-icon">◯</span>
          <p>No posts detected for today.</p>
          <span className="no-posts-hint">// USER INACTIVE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <span className="posts-title">TODAY'S POSTS</span>
        <span className="posts-count">{posts.length} ENTRIES</span>
      </div>

      <div className="posts-timeline">
        <div className="timeline-line" />
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`post-item ${visiblePosts.includes(index) ? 'visible' : ''}`}
          >
            <div className="post-time-marker">
              <span className="post-time">{post.time}</span>
              <div className="post-dot" />
            </div>
            <div className="post-content">
              <div className="post-author">
                <span className="post-handle">@{handle}</span>
              </div>
              <p className="post-text">{post.text}</p>
              <div className="post-stats">
                <span className="post-stat">
                  <span className="stat-icon">♡</span>
                  {post.likes}
                </span>
                <span className="post-stat">
                  <span className="stat-icon">⟲</span>
                  {post.retweets}
                </span>
                <span className="post-stat">
                  <span className="stat-icon">◬</span>
                  {post.replies}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="posts-footer">
        <div className="footer-decoration" />
        <span className="footer-text">END_OF_FEED</span>
        <div className="footer-decoration" />
      </div>
    </div>
  );
}
