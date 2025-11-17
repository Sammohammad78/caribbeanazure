import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@caribbean-azure/utils';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    color: {
      primary: 'text-[--ink-900]',
      secondary: 'text-[--ink-700]',
      muted: 'text-[--ink-500]',
      subtle: 'text-[--ink-400]',
      brand: 'text-[--brand-600]',
      success: 'text-[--semantic-success]',
      error: 'text-[--semantic-error]',
      warning: 'text-[--semantic-warning]',
      info: 'text-[--semantic-info]',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    size: 'base',
    color: 'primary',
    weight: 'normal',
    align: 'left',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /**
   * The HTML element to render
   */
  as?: 'p' | 'span' | 'div' | 'label';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, color, weight, align, as = 'p', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(textVariants({ size, color, weight, align, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
