import api from './api';
import { InstagramPost, SearchParams, SearchResult } from '../types/post.types';

export const searchInstagramProfile = async (
  params: SearchParams
): Promise<InstagramPost[]> => {
  try {
    const response = await api.post<InstagramPost[]>('/search', params);
    return response.data;
  } catch (error) {
    console.error('Error searching profile:', error);
    throw error;
  }
};

export const getSearchHistory = async (): Promise<SearchResult[]> => {
  try {
    const response = await api.get<SearchResult[]>('/search/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching search history:', error);
    throw error;
  }
};

export const savePost = async (post: InstagramPost): Promise<void> => {
  try {
    await api.post('/posts/save', post);
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const getSavedPosts = async (): Promise<InstagramPost[]> => {
  try {
    const response = await api.get<InstagramPost[]>('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    throw error;
  }
};

export const deleteSavedPost = async (postId: string): Promise<void> => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (error) {
    console.error('Error deleting saved post:', error);
    throw error;
  }
};