import { apiConstants } from '../constants/constants';

export const deleteArticle = async (slug: string, token: string) => {
  const response = await fetch(`${apiConstants.apiPath}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return true;
};
