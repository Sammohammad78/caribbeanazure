import * as React from 'react';
import { cn } from '@caribbean-azure/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Whether the textarea has an error
   */
  error?: boolean;
  /**
   * Error message to display
   */
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border border-[--sand-200] bg-white px-4 py-3 text-base text-[--ink-900] placeholder:text-[--ink-400] transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[--brand-400] focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[--sand-50]',
            'resize-y',
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

Textarea.displayName = 'Textarea';

export { Textarea };
