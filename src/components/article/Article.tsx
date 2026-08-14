import { defaultAvatar } from "../../constants/constants";
import UseGetSingleArticle from "../../hooks/useGetSingleArticle";
import { Article as ArticleType } from "../../types/types";

type ArticleProps = {
  match?: {
    params?: {
      slug?: string;
    };
  };
};

export default function Article({ match }: ArticleProps) {
  const slug = match?.params?.slug;
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
