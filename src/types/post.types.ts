export interface InstagramPost {
    id: string;
    caption: string;
    postDate: string;
    postLink: string;
    profileName: string;
    matchedKeywords?: string[];
}
  
export interface SavedPost extends InstagramPost {
    savedAt: string;
    userId: string;
    keywords: string[];
}
  
export interface SearchParams {
    profileName: string;
    keywords: string[];
}
  
export interface SearchResult {
    posts: InstagramPost[];
    profileName: string;
    keywords: string[];
    timestamp: string;
    count: number;
}