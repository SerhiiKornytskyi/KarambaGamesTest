import { defaultAvatar } from "../../constants/constants";
import UseGetSingleArticle from "../../hooks/useGetSingleArticle";
import { useAuth } from "../../hooks/useAuth";
import { useHistory, useParams } from "react-router-dom";
import { deleteArticle } from "../../helpers/deleteArticle";

export default function Article() {
  const { slug } = useParams<{ slug?: string }>();
  const history = useHistory();
  const { user } = useAuth();
  const { article, loading, error } = UseGetSingleArticle(slug);

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
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart" />
                &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post <span className="counter">({article.favoritesCount})</span>
              </button>
              &nbsp;
              <a className="btn btn-sm btn-outline-secondary" href={`/#/editor/${article.slug}`}>
                <i className="ion-edit" />
                &nbsp; Edit Article
              </a>
              &nbsp;
              <a className="btn btn-sm btn-outline-secondary" href="#" onClick={handleDeleteArticle}>
                <i className="ion-delete" />
                &nbsp; Delete Article
              </a>
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
