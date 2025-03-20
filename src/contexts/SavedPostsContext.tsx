import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { InstagramPost } from '../types/post.types';
import { getSavedPosts, deleteSavedPost } from '../services/search.service';
import { useAuthContext } from './AuthContext';

interface SavedPostsContextType {
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const SavedPostsContext = createContext<SavedPostsContextType | undefined>(undefined);

export const SavedPostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedPosts = await getSavedPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      setError('Failed to fetch saved posts');
      console.error('Error fetching saved posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      setError(null);
      await deleteSavedPost(postId);
      
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      setError('Failed to delete post');
      console.error('Error deleting post:', error);
    }
  };

  return (
    <SavedPostsContext.Provider value={{ posts, loading, error, fetchPosts, deletePost }}>
      {children}
    </SavedPostsContext.Provider>
  );
};

export const useSavedPostsContext = () => {
  const context = useContext(SavedPostsContext);
  
  if (context === undefined) {
    throw new Error('useSavedPostsContext must be used within a SavedPostsProvider');
  }
  
  return context;
};