import { defaultAvatar } from "../../constants/constants";
import UseGetSingleArticle from "../../hooks/useGetSingleArticle";
import { useAuth } from "../../hooks/useAuth";
import useFollowAuthor from "../../hooks/useFollowAuthor";
import { useHistory, useParams } from "react-router-dom";
import { deleteArticle } from "../../helpers/deleteArticle";
import { useEffect, useState } from "react";
import useFavoriteArticle from "../../hooks/useFavoriteArticle";
import ArticleActions from "./articleActions";

export default function Article() {
  const { slug } = useParams<{ slug?: string }>();
  const history = useHistory();
  const { user } = useAuth();
  const { article, loading, error } = UseGetSingleArticle(slug);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { toggleFollow, loading: followLoading } = useFollowAuthor(article?.author.username, article?.author.following);
  const { toggleFavorite, loading: favoriteLoading } = useFavoriteArticle(slug, article?.favorited);

  useEffect(() => {
    if (article?.author) {
      setIsFollowing(article.author.following);
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      setIsFavorited(article.favorited);
      setFavoriteCount(article.favoritesCount);
    }
  }, [article]);

  if (!slug) {
    return null;
  }

  if (loading) {
    return (
      <div className="article-page">
        <div className="container page">
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article || !article.author) {
    return (
      <div className="article-page">
        <div className="container page">
          <p>Unable to load article.</p>
        </div>
      </div>
    );
  }

  const handleDeleteArticle = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!slug || !user?.token) {
      return;
    }

    try {
      await deleteArticle(slug, user.token);
      history.push('/');
    } catch (err) {
      console.error('Failed to delete article:', err);
    }
  };

  const followButtonClass = isFollowing
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-outline-secondary';

  const favoriteButtonClass = isFavorited
    ? 'btn btn-sm btn-primary'
    : 'btn btn-sm btn-outline-primary';

  const handleFollowToggle = async () => {
    if (!article.author.username || !user?.token) {
      return;
    }

    const updatedProfile = await toggleFollow();
    if (updatedProfile) {
      setIsFollowing(updatedProfile.following);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!slug || !user?.token) {
      return;
    }

    const updatedArticle = await toggleFavorite();
    if (updatedArticle) {
      setIsFavorited(updatedArticle.favorited);
      setFavoriteCount(updatedArticle.favoritesCount);
    }
  };

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
              <div className="article-meta">
                <a href={`/#/profile/${article.author.username}`}>
                  <img src={article.author.image || defaultAvatar} alt={article.author.username} />
                </a>
                <div className="info">
                  <a href={`/#/profile/${article.author.username}`} className="author">
                    {article.author.username}
                  </a>
                  <span className="date">{new Date(article.createdAt).toDateString()}</span>
                </div>
                {user && user.token ? (
                  <ArticleActions
                    article={article}
                    isFollowing={isFollowing}
                    isFavorited={isFavorited}
                    favoriteCount={favoriteCount}
                    followButtonClass={followButtonClass}
                    favoriteButtonClass={favoriteButtonClass}
                    followLoading={followLoading}
                    handleFollowToggle={handleFollowToggle}
                    handleDeleteArticle={handleDeleteArticle}
                    handleFavoriteToggle={handleFavoriteToggle}
                    favoriteLoading={favoriteLoading}
                    isAuthor={user.username === article.author.username}
                  />
                ) : null}
              </div>
            </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              {article.body.split('\n').map((paragraph, index) =>
                paragraph ? <p key={`${article.slug}-${index}`}>{paragraph}</p> : null
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


