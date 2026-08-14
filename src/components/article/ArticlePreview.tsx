import { Article } from '../../types/types';
import AuthorInfo from './AuthorInfo'
import TagList from '../common/Taglist'

type Props = {
    article?: Article | null;
}

const ArticlePreview = ({ article }: Props) => {
    if (!article) {
        return (
            <div className="article-preview">Article unavailable.</div>
        );
    }


    return (
        <div className="article-preview">
            <AuthorInfo article={article}/>
            <a href={`/#/${article.slug}`} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <TagList tags={article.tagList} />
            </a>
        </div>
    );
}

export default ArticlePreview ;