import { cn } from '@/lib/utils';

type PageContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8 xl:py-8', className)}
      {...props}
    />
  );
}
