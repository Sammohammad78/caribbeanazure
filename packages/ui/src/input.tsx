import * as React from 'react';
import { cn } from '@caribbean-azure/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Whether the input has an error
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border border-[--sand-200] bg-white px-4 py-2 text-base text-[--ink-900] placeholder:text-[--ink-400] transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[--brand-400] focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[--sand-50]',
            error &&
              'border-[--semantic-error] focus:ring-[--semantic-error] focus:ring-opacity-50',
            className
          )}
          ref={ref}
          aria-invalid={error}
          aria-describedby={errorMessage ? 'error-message' : undefined}
          {...props}
        />
        {error && errorMessage && (
          <p
            id="error-message"
            className="mt-1.5 text-sm text-[--semantic-error]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
