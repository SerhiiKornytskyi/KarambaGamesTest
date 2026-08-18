import { useParams } from "react-router-dom";
import { defaultAvatar } from "../../constants/constants";
import { useAuth } from "../../hooks/useAuth";
import useGetProfile from "../../hooks/useGetProfile";
import useGetProfileArticles from "../../hooks/useGetProfileArticles";
import useFollowAuthor from "../../hooks/useFollowAuthor";
import ArticlePreview from "../article/ArticlePreview";
import { useState, useEffect } from "react";

export default function Profile() {
  const { username } = useParams<{ username?: string }>();
  const { user } = useAuth();
  const { profile, loading, error } = useGetProfile(username);
  const { articles, loading: articlesLoading } = useGetProfileArticles(username);
  const { toggleFollow, loading: followLoading } = useFollowAuthor(username, profile?.following);
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = !!user?.username && !!profile?.username && user.username === profile.username;

  useEffect(() => {
    if (profile) {
      setIsFollowing(profile.following);
    }
  }, [profile]);

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

  const followButtonClass = isFollowing
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-outline-secondary';

  const handleFollowToggle = async () => {
    if (!username || !user?.token) {
      return;
    }

    const updatedProfile = await toggleFollow();
    if (updatedProfile) {
      setIsFollowing(updatedProfile.following);
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image || defaultAvatar} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio || "No bio available."}</p>

                {!isOwnProfile && (
                  <button 
                    className={followButtonClass}
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                  >
                    <i className="ion-plus-round" />
                    &nbsp; {isFollowing ? "Unfollow" : "Follow"} {profile.username}
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
                    <span className="nav-link active">My Articles</span>
                  </li>
                </ul>
              </div>

              {articlesLoading && <p>Loading articles...</p>}

              {!articlesLoading && articles.length > 0
                ? articles.map((article) => <ArticlePreview key={article.slug} article={article} />)
                : !articlesLoading && <div className="article-preview">No articles yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
