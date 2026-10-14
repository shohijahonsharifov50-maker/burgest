import { forwardRef } from 'react';

/** The BURGESTA "1B" mark, tinted with the current text colour. */
export const LogoMark = forwardRef(function LogoMark({ className = '', ...rest }, ref) {
  return <span ref={ref} className={`mark ${className}`.trim()} aria-hidden="true" {...rest} />;
});
