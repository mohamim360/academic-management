import { TSidebarItem, TUserPath } from '../types';
import { NavLink } from 'react-router-dom';

export const sidebarItemsGenerator = (items: TUserPath[], role: string): TSidebarItem[] => {
  const sidebarItems = items.map((item) => {
    if (item.children) {
      return {
        key: item.name,
        label: item.name,
        children: sidebarItemsGenerator(item.children, role),
      };
    }

    if (item.path && item.name) {
      return {
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      };
    }

    return null;
  }).filter(Boolean);

  return sidebarItems as TSidebarItem[];
};
