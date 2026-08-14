import { TagListProps } from '../../types/types';

const TagList = ({ tags }: TagListProps) => (
    <ul className="tag-list">
        {tags.map((tag) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
                {tag}
            </li>
        ))}
    </ul>
);

export default TagList;