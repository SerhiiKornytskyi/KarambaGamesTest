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
