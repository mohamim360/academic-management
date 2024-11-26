import {  TUserPath } from '../types';
import { NavLink } from 'react-router-dom';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number]; // Get Ant Design's expected type

export const sidebarItemsGenerator = (items: TUserPath[], role: string): MenuItem[] => {
  return items
    .map((item) => {
      if (item.children) {
        return {
          key: item.name!,
          label: item.name!,
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
    })
    .filter(Boolean) as MenuItem[]; // Ensure the type matches
};
