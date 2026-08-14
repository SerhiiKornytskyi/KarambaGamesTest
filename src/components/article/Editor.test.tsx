import React from 'react';
import { render, screen } from '@testing-library/react';
import Editor from './Editor';

const mockCreateArticle = jest.fn();
const mockUseGetSingleArticle = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
}));

jest.mock('../../hooks/useGetSingleArticle', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockUseGetSingleArticle(...args),
}));

jest.mock('../../hooks/useCreateArticle', () => ({
  __esModule: true,
  default: () => ({
    createArticle: mockCreateArticle,
    data: null,
    error: null,
    loading: false,
  }),
}));

describe('Editor', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ slug: 'my-article' });
    mockUseGetSingleArticle.mockReturnValue({
      article: {
        slug: 'my-article',
        title: 'Test title',
        description: 'Test description',
        body: 'Test body',
        tagList: ['react', 'testing'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        favorited: false,
        favoritesCount: 2,
        author: {
          username: 'alice',
          bio: '',
          image: '',
          following: false,
        },
      },
      loading: false,
      error: null,
    });
  });

  it('prefills the form when editing an existing article', () => {
    render(<Editor />);

    expect(screen.getByDisplayValue('Test title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test body')).toBeInTheDocument();
  });
});
