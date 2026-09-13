import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type IconButtonProps = Omit<ButtonProps, 'children'> & {
  icon: LucideIcon;
  label: string;
  badge?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, badge, className, ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn('relative rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground', className)}
      {...props}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      {badge ? (
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-card" aria-hidden="true" />
      ) : null}
    </Button>
  )
);
IconButton.displayName = 'IconButton';
