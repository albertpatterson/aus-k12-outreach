import { useLocation } from 'react-router-dom';

export const useBuildUrl = () => {
  const location = useLocation();

  return (basePath:string, newParams: {[key: string]: string}={}, fragment?:string, provideFullUrl?:boolean) => {
    const currentParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value == null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });
    const queryString = currentParams.toString();
    const hash = fragment ? `#${fragment}` : '';

    const urlPrefix = provideFullUrl ? window.location.origin +'/' : '';

    return `${urlPrefix}${basePath}${queryString ? `?${queryString}` : ''}${hash}`;
  };
};
