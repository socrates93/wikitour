import { useArticle } from '../hooks';
import {
  ArticleCard,
  FilterBox,
  Pagination,
  SkeletonCard,
} from '../shared/components';

export const Home = () => {
  const {
    articles,
    isFetching,
    hasError,
    handleArticleClick,
    handleArticleTranslation,
  } = useArticle();

  return (
    <div className='relative flex min-h-screen flex-col gap-4'>
      <FilterBox />

      {hasError && !isFetching && (
        <div className='flex items-center justify-center'>
          <p className='text-lg font-bold'>
            Something went wrong. Please try again later.
          </p>
        </div>
      )}

      {!isFetching && !hasError && !articles.length && (
        <div className='flex items-center justify-center'>
          <p className='text-lg font-bold'>
            No articles found. Try out the filter.
          </p>
        </div>
      )}

      {!!articles.length && (
        <div className='relative flex min-h-screen flex-row'>
          <div className='lg:min-w-1/2 grid h-min grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                onClick={() => handleArticleClick(article.wikibase_item)}
                onTranslate={() =>
                  handleArticleTranslation(
                    article.titles.normalized,
                    article.summary
                  )
                }
              />
            ))}
          </div>

          <Pagination />
        </div>
      )}

      {isFetching && (
        <div className='grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5'>
          {[0, 1, 2, 3, 4].map(v => (
            <SkeletonCard key={v} />
          ))}
        </div>
      )}
    </div>
  );
};
