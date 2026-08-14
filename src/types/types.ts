// API call types 

export interface UserLoginRequest {
    user: {
        email: string;
        password: string;
    };
};

export interface UserLoginResponse {
    user: User
}

export interface User {
    email: string;
    image: string;
    token: string;
    username: string;
    bio: string;
};

export interface AuthContextValue {
  user: User | null;
  saveLoginUserData: (user: User) => void;
  removeLoginUserData: () => void;
};

export interface Article {
      slug: string;
      title: string;
      description: string;
      body: string;
      tagList: string[];
      createdAt: string;
      updatedAt: string;
      favorited: boolean;
      favoritesCount: number;
      author: Author;
}

export interface Author {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };

export interface CreateArticleRequestData {
    title: string,
    description: string,
    body: string,
    tagList: string[]
  }

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
};

export interface UseGetArticleData {
    getArticlesFeed: () => void,
    data: ArticlesResponse | null,
    error: Error | null,
    loading: boolean,
}

export interface FeedPageProps {
    onToggleFeed: (e: React.MouseEvent<HTMLAnchorElement>, isGlobalTab: boolean) => void;
    isGlobal: boolean;
}

export interface TagListProps {
    tags: string[];
};