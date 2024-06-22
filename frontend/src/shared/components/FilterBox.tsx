import { LoadingIndicator } from '.';
import { useFilter } from '../../hooks';
import { AVAILABLE_LANGUAGES } from '../utils';

export const FilterBox = () => {
  const {
    lang,
    date,
    perPageRef,
    perPage,
    isLoading,
    onFilter,
    setLang,
    setDate,
  } = useFilter();

  return (
    <span className='sticky top-0 z-50 flex w-full flex-row items-center gap-4 bg-indigo-500 p-4 shadow-md'>
      <div className='flex h-full flex-col items-center gap-4 sm:flex-row md:flex-row lg:flex-row'>
        <div className='min-w-1/6 h-full w-full'>
          <label
            htmlFor='date'
            className='block text-sm font-medium leading-6 text-white'
          >
            Date
          </label>
          <div className='mt-1'>
            <input
              id='date'
              value={date}
              type='date'
              onChange={e => setDate(e.target.value)}
              className='size-10 w-full rounded-md border-0 p-2 shadow-sm placeholder:text-gray-400'
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className='h-full w-full'>
          <label
            htmlFor='language'
            className='block text-sm font-medium leading-6 text-white'
          >
            Language
          </label>
          <div className='mt-1'>
            <select
              id='language'
              value={lang}
              onChange={e => setLang(e.target.value)}
              className='size-10 w-full rounded-md border-0 p-2 shadow-sm'
            >
              {AVAILABLE_LANGUAGES.map(lang => (
                <option
                  key={lang.value}
                  value={lang.value}
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='flex w-full flex-1 flex-row items-end justify-between self-end'>
        <div>
          <button
            className='min-w-1/12 flex flex-1 flex-row items-center justify-center gap-2 self-end rounded-md border-2 p-2 text-white transition delay-75 duration-300 ease-in-out hover:bg-indigo-900 hover:text-white sm:flex-none md:flex-none lg:flex-none'
            disabled={isLoading}
            onClick={() => {
              document.documentElement.scrollTo(0, 0);

              onFilter(true);
            }}
          >
            {isLoading ? 'Searching...' : 'Filter Articles'}
            {isLoading && <LoadingIndicator size='small' />}
          </button>
        </div>

        <div>
          <label
            htmlFor='page_size'
            className='block text-sm font-medium leading-6 text-white'
          >
            Per Page
          </label>
          <div className='mt-1'>
            <select
              id='page_size'
              ref={perPageRef}
              defaultValue={perPage}
              onChange={() => onFilter()}
              className='size-10 w-full rounded-md border-0 p-2 shadow-sm'
            >
              {[5, 10, 15, 20].map((size, index) => (
                <option
                  key={index}
                  value={size}
                >
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </span>
  );
};
