import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@caribbean-azure/utils';

const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    variant: {
      default: 'max-w-7xl', // 1280px
      narrow: 'max-w-4xl',  // 896px
      wide: 'max-w-[1536px]', // 2xl
      full: 'max-w-full',
    },
    gutter: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-4 sm:px-6',
      lg: 'px-4 sm:px-6 lg:px-8',
      xl: 'px-6 sm:px-8 lg:px-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    gutter: 'lg',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * The HTML element to render
   */
  as?: 'div' | 'section' | 'article' | 'main';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, gutter, as = 'div', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(containerVariants({ variant, gutter, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container, containerVariants };
