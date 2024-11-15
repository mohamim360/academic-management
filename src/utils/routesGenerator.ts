import { TRoute, TUserPath } from '../types';

export const routeGenerator = (items: TUserPath[]): TRoute[] => {
  return items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      const childRoutes = routeGenerator(item.children);
      acc.push(...childRoutes);
    }

    return acc;
  }, []);
};
