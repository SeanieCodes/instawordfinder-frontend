import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useSavedPostsContext } from '../contexts/SavedPostsContext';
import { useAuthContext } from '../contexts/AuthContext';
import { InstagramPost } from '../types/post.types';
import SignoutButton from '../components/Common/SignoutButton/SignoutButton';
import './UserProfile.css';
import '../components/Layout/PageHeader.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const { posts, loading, error, fetchPosts, deletePost } = useSavedPostsContext();
  const [groupedPosts, setGroupedPosts] = useState<Record<string, InstagramPost[]>>({});

  /* temp
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  */

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated, fetchPosts]);

  useEffect(() => {
    const grouped: Record<string, InstagramPost[]> = {};
    
    posts.forEach(post => {
      if (!grouped[post.profileName]) {
        grouped[post.profileName] = [];
      }
      grouped[post.profileName].push(post);
    });
    
    setGroupedPosts(grouped);
  }, [posts]);

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
  };

  const goToSearch = () => {
    navigate('/search');
  };

  return (
    <Layout>
      <div className="user-profile-container">
        <div className="page-header">
          <h1>{user?.username || 'Your'}'s Saved Posts</h1>
          <div className="nav-buttons">
            <button onClick={goToSearch} className="nav-button">
              Search
            </button>
            <SignoutButton />
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <p className="loading-message">Loading your saved posts...</p>
        ) : Object.keys(groupedPosts).length > 0 ? (
          <div className="profile-groups">
            {Object.entries(groupedPosts).map(([profileName, profilePosts]) => (
              <div key={profileName} className="profile-group">
                <h2 className="profile-group-header">@{profileName}</h2>
                <div className="profile-posts-list">
                  {profilePosts.map(post => (
                    <div key={post.id} className="post-card">
                      <div className="post-header">
                        <p className="post-date">{new Date(post.postDate).toLocaleDateString()}</p>
                      </div>
                      <p className="post-caption">{post.caption}</p>
                      {post.matchedKeywords && post.matchedKeywords.length > 0 && (
                        <div className="keywords-container">
                          <p>Matched keywords: </p>
                          <div className="keywords-list">
                            {post.matchedKeywords.map(keyword => (
                              <span key={keyword} className="keyword-tag">{keyword}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="post-actions">
                        <a 
                          href={post.postLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-link"
                        >
                          View on Instagram
                        </a>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-saved-posts">You haven't saved any posts yet. Try searching for some posts first!</p>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;