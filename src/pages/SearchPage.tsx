import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../hooks/useSearch';
import { useAuthContext } from '../contexts/AuthContext';
import SignoutButton from '../components/Common/SignoutButton/SignoutButton';
import './SearchPage.css';
import '../components/Layout/PageHeader.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { searchProfile, results, loading, error, handleSavePost } = useSearch();
  const [profileName, setProfileName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  /* temp
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavedPosts(new Set());
    
    await searchProfile(profileName, keywords);
  };

  const handleSave = async (postId: string) => {
    const post = results.find(p => p.id === postId);
    if (post) {
      const success = await handleSavePost(post);
      if (success) {
        setSavedPosts(prev => new Set(prev).add(postId));
      }
    }
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <Layout>
      <div className="search-container">
        <div className="page-header">
          <h1>Search Instagram</h1>
          <div className="nav-buttons">
            <button onClick={goToProfile} className="nav-button">
              My Profile
            </button>
            <SignoutButton />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profileName">Instagram Profile</label>
            <input
              type="text"
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="e.g., natgeo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="keywords">Keywords (separate with spaces or commas)</label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., wildlife, ocean, mountain"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="results-container">
          {results.length > 0 ? (
            <>
              <h2>Results</h2>
              <p>Found {results.length} matching posts</p>
              <div className="results-list">
                {results.map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <span className="profile-name">@{post.profileName}</span>
                      <span className="post-date">{new Date(post.postDate).toLocaleDateString()}</span>
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
                        onClick={() => handleSave(post.id)}
                        disabled={savedPosts.has(post.id)}
                        className="save-button"
                      >
                        {savedPosts.has(post.id) ? 'Saved' : 'Save Post'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : !loading && (
            <p className="no-results">No results to display. Try searching for a profile and keywords.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;