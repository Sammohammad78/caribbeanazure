import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@caribbean-azure/utils';

const headingVariants = cva('text-[--ink-900] tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
      h4: 'text-xl md:text-2xl lg:text-3xl',
      h5: 'text-lg md:text-xl lg:text-2xl',
      h6: 'text-base md:text-lg lg:text-xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    level: 'h2',
    weight: 'bold',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /**
   * The semantic heading level (h1-h6)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, weight, as, children, ...props }, ref) => {
    // Use 'as' prop if provided, otherwise use 'level'
    const Component = as || level || 'h2';

    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({ level: level || as, weight, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
