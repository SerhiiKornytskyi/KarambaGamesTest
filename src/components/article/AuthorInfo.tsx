import { defaultAvatar } from "../../constants/constants";
import { Article } from '../../types/types';

const AuthorInfo = ({ article }: { article: Article }) => {
  return (
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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart" /> {article.favoritesCount}
        </button>
    </div>
  );
};

export default AuthorInfo;
