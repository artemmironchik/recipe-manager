import { Loader2 } from 'lucide-react';

const Loading = () => (
  <div className="flex items-center justify-center h-full w-full">
    <Loader2 className="mr-2 h-16 w-16 animate-spin" />
  </div>
);

export default Loading;
