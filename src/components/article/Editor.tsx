import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseCreateArticle from "../../hooks/useCreateArticle";
import UseGetSingleArticle from '../../hooks/useGetSingleArticle';
import { CreateArticleRequestData } from '../../types/types';
import { defaultArticleFormdata } from '../../constants/constants';

export default function Editor() {
  const { slug } = useParams<{ slug?: string }>();

  const [formData, setFormData] = useState<CreateArticleRequestData>({
    ...defaultArticleFormdata,
    tagList: [...defaultArticleFormdata.tagList],
  } as CreateArticleRequestData);

  const { article, loading: articleLoading, error: articleError } = UseGetSingleArticle(slug);
  const { createArticle, error, loading } = UseCreateArticle(formData, slug);

  useEffect(() => {
    if (!article) {
      return;
    }

    setFormData({
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList || [],
    });
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      const tagList = value.split(',').map((tag) => tag.trim()).filter(Boolean);
      setFormData(prev => ({ ...prev, tagList }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createArticle();

    if (!slug) {
      setFormData({
        ...defaultArticleFormdata,
        tagList: [...defaultArticleFormdata.tagList],
      } as CreateArticleRequestData);
    }
  };

  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="title" className="form-control form-control-lg" placeholder="Article Title" value={formData.title} onChange={handleChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="description" className="form-control" placeholder="What's this article about?" value={formData.description} onChange={handleChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="body" className="form-control" rows={8} placeholder="Write your article (in markdown)" value={formData.body} onChange={handleChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" name="tags" className="form-control" placeholder="Enter tags" value={formData.tagList.join(', ')} onChange={handleChange} />
                    <div className="tag-list" />
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    {slug ? 'Update Article' : 'Publish Article'}
                  </button>
                  <fieldset className="form-group">
                    {!!articleError && <span className="text-danger">{articleError.message}</span>}
                    {!!error && <span className="text-danger">{error.message}</span>}
                    {!!(loading || articleLoading) && <span className="text-danger">loading</span>}
                  </fieldset>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
