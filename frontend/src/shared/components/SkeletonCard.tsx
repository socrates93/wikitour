export const SkeletonCard = () => {
  return (
    <div className='animate-pulse overflow-hidden rounded shadow-lg duration-75'>
      <div className='h-48 bg-gray-300'></div>
      <div className='px-6 py-4'>
        <div className='mb-2 h-6 bg-gray-300'></div>
        <div className='h-4 w-2/3 bg-gray-300'></div>
      </div>
      <div className='px-6 pb-2 pt-4'>
        <div className='mb-2 h-4 w-1/4 bg-gray-300'></div>
        <div className='h-4 w-1/2 bg-gray-300'></div>
      </div>
    </div>
  );
};
