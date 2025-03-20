import { useState } from 'react';
import { InstagramPost, SearchParams } from '../types/post.types';
import { searchInstagramProfile, savePost } from '../services/search.service';

export const useSearch = () => {
  const [results, setResults] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchProfile = async (profileName: string, keywordsInput: string) => {
    if (!profileName || !keywordsInput.trim()) {
      setError('Profile name and at least one keyword are required');
      return [];
    }

    const keywords = keywordsInput
      .split(/[,\s]+/)
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    if (keywords.length === 0) {
      setError('At least one valid keyword is required');
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      const params: SearchParams = { profileName, keywords };
      const posts = await searchInstagramProfile(params);
      
      setResults(posts);
      return posts;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Search failed: ${errorMessage}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (post: InstagramPost) => {
    try {
      setError(null);
      await savePost(post);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(`Failed to save post: ${errorMessage}`);
      return false;
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    results,
    loading,
    error,
    searchProfile,
    handleSavePost,
    clearResults,
    clearError
  };
};