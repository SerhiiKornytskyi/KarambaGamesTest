import { useParams } from "react-router-dom";
import { defaultAvatar } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import useGetProfile from "../../hooks/useGetProfile";
import useGetProfileArticles from "../../hooks/useGetProfileArticles";
import ArticlePreview from "../article/ArticlePreview";

export default function Profile() {
  const { username } = useParams<{ username?: string }>();
  const { user } = useAuth();
  const { profile, loading, error } = useGetProfile(username);
  const { articles, loading: articlesLoading } = useGetProfileArticles(username);
  const isOwnProfile = !!user?.username && !!profile?.username && user.username === profile.username;

  if (!username) {
    return null;
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container page">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page">
        <div className="container page">
          <p>Unable to load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image || defaultAvatar} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio || 'No bio available.'}</p>
                {!isOwnProfile && (
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round" />
                    &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                     <span>My Articles</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* article list */}
               
          </div>
        </div>
      </div>
    </>
  );
}
