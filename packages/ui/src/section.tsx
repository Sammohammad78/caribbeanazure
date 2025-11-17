import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@caribbean-azure/utils';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16 lg:py-20',
      lg: 'py-16 md:py-24 lg:py-32',
      xl: 'py-20 md:py-32 lg:py-40',
    },
    background: {
      transparent: 'bg-transparent',
      default: 'bg-[--sand-50]',
      white: 'bg-white',
      muted: 'bg-[--sand-100]',
      brand: 'bg-[--brand-600] text-white',
      'brand-light': 'bg-[--brand-100]',
      dark: 'bg-[--ink-900] text-white',
    },
  },
  defaultVariants: {
    spacing: 'md',
    background: 'transparent',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * The HTML element to render
   */
  as?: 'section' | 'div' | 'article';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, as = 'section', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(sectionVariants({ spacing, background, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants };
