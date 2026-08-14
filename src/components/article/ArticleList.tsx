import {useState} from "react";
import ArticlePreview from "../article/ArticlePreview";
import Banner from "../common/Banner";
import FeedSelectorTabs from "../common/FeedSelectorTabs";
import Sidebar from '../common/Sidebar';
import UseGetArticles from '../../hooks/useGetArticles';


export default function ArticleList() {

  const [isGlobal, setIsGlobal] = useState(true);

  const {data, loading} = UseGetArticles(isGlobal);
  
  const onToggleFeed = (e: React.MouseEvent<HTMLAnchorElement>, isGlobalTab: boolean) => {
    e.preventDefault();
    setIsGlobal(isGlobalTab);
  }

  return (
    <>
      <div className="home-page"> 
        <Banner/>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedSelectorTabs onToggleFeed={onToggleFeed} isGlobal={isGlobal} />
              {loading && <fieldset className="form-group"><span className="text-danger">{"Loading..."}</span></fieldset>}
              {data && data.articles && data.articles.length > 0 ? (
                data.articles.map((article) => (
                  <ArticlePreview key={article.slug} article={article} />
                ))
              ) : (
                <ArticlePreview article={null} />
              )}
            </div>
            <div className="col-md-3">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
