import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => (
  <div className="container flex flex-1 gap-4 mx-auto py-8">
    <div className="max-w-sm w-full flex flex-col gap-4">
      {[...Array(2)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>

    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={index} className="h-60 w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default Loading;
