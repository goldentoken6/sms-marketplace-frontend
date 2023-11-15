import { useSearchParams as _useSearchParams } from 'react-router-dom';

// TODO: Maybe unify React-Router and Next.js Router to have the same behaviour
//  In Next.js we do not have the set. There we need to redirect manually.

/**
 * Returns ReadOnly search params
 */
export const useSearchParams = () => {
  const [searchParams] = _useSearchParams();

  return searchParams;
};
