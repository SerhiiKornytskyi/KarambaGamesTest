import { Article as ArticleModel } from "../../types/types";

export type ArticleActionsProps = {
  article: ArticleModel;
  isFollowing: boolean;
  isFavorited: boolean;
  favoriteCount: number;
  followButtonClass: string;
  favoriteButtonClass: string;
  followLoading: boolean;
  handleFollowToggle: () => Promise<void>;
  handleDeleteArticle: (event: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
  handleFavoriteToggle: () => Promise<void>;
  favoriteLoading: boolean;
};

const ArticleActions = ({
  article,
  isFollowing,
  isFavorited,
  favoriteCount,
  followButtonClass,
  favoriteButtonClass,
  followLoading,
  handleFollowToggle,
  handleDeleteArticle,
  handleFavoriteToggle,
  favoriteLoading,
}: ArticleActionsProps) => {
  return (
    <div>
      <button className={followButtonClass} onClick={handleFollowToggle} disabled={followLoading}>
        <i className="ion-plus-round" />
        &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {article.author.username}
      </button>
      &nbsp;
      <button className={favoriteButtonClass} onClick={handleFavoriteToggle} disabled={favoriteLoading}>
        <i className="ion-heart" />
        &nbsp; {isFavorited ? 'Unfavorite' : 'Favorite'} Post <span className="counter">({favoriteCount})</span>
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
  );
};

export default ArticleActions;
