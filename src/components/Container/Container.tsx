import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const Container = ({ children, className = '', ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn('max-w-6xl w-full my-0 mx-auto px-5', className)}  {...props}>
      { children }
    </div>
  )
}

export default Container;