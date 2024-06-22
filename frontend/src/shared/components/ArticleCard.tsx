import { useArticleCard } from '../../hooks';
import { ArticleCardProps } from '../interfaces';

export const ArticleCard = ({
  article,
  onClick,
  onTranslate,
}: ArticleCardProps) => {
  const {
    isLoadingTranslation,
    translatedText,
    handleClick,
    handleTranslation,
  } = useArticleCard({ article, onClick, onTranslate });

  return (
    <div
      className={`relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-md border-2 bg-white ${article.read ? 'opacity-100' : 'opacity-60'} shadow-xl transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:opacity-100 hover:shadow-2xl`}
      onClick={handleClick}
    >
      {article.read && (
        <div className='absolute left-[-18%] top-[-10%] flex h-[25%] w-[40%] -rotate-45 items-end justify-center bg-gray-500 p-2 font-bold text-white lg:left-[-27%] lg:top-[-14%] lg:w-[50%]'>
          Read
        </div>
      )}

      <div>
        <div className='h-80 overflow-hidden border-b sm:h-60 md:h-60 lg:h-96'>
          <img
            src={article.thumbnail?.source || '/no-image-placeholder.jpg'}
            alt={article.title}
            className='h-full w-full rounded-t-md object-cover object-center'
          />
        </div>

        <div className='flex flex-col gap-1 p-2'>
          {isLoadingTranslation ? (
            <>
              <div className='mb-2 h-4 animate-pulse bg-gray-200' />
              <div className='h-16 animate-pulse bg-gray-200' />
            </>
          ) : (
            <>
              <h1 className='text-lg font-bold'>
                {translatedText?.title ?? article.titles.normalized}
              </h1>
              <p className='text-sm'>
                {translatedText?.summary ?? article.summary}
              </p>
            </>
          )}
        </div>
      </div>

      <div className='flex h-full items-end justify-end p-2'>
        <span
          className='cursor-pointer text-blue-400 underline transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100'
          onClick={handleTranslation}
        >
          Translate this
        </span>
      </div>
    </div>
  );
};
