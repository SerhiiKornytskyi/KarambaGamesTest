import React from "react";
import {FeedPageProps} from "../../types/types"
import { useAuth } from "../../hooks/useAuth";


const FeedSelectorTabs = ({onToggleFeed, isGlobal}: FeedPageProps) => {
    // Leave it as it is for 2 or more items
    const feedTabs = [
        { text: 'Global Feed', isActive: isGlobal === true, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => onToggleFeed(e, true) }
    ];

    const {user} = useAuth();

    !!user && feedTabs.push( { text: 'Your Feed', isActive: isGlobal === false, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => onToggleFeed(e, false) });

    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                {feedTabs.map((tab, index) => (
                    <li key={index} className="nav-item">
                        <a
                            className={`nav-link ${tab.isActive && "active"}`}
                            href="#"
                            onClick={(e) => { e.preventDefault(); tab.onClick(e); }}
                        >
                            {tab.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedSelectorTabs;