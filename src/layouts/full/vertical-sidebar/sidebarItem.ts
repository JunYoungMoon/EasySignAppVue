import {
  ShoppingCartIcon,
  ApertureIcon,
  Error404Icon,
  UserIcon,
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Home' },
  {
    title: 'Modern',
    icon: ApertureIcon,
    chip: 'New',
    chipColor: 'surface',
    chipBgColor: 'secondary',
    to: '/modern',
  },
  {
    title: 'eCommerce',
    icon: ShoppingCartIcon,
    to: '/about',
  },
  { header: 'Apps' },
  {
    title: 'My Profile',
    icon: UserIcon,
    to: '/myProfile',
    chip: '2',
    chipColor: 'surface',
    chipBgColor: 'secondary',
  },
  {
    title: 'Error404',
    icon: Error404Icon,
    to: '/auth/404',
    chip: '2',
    chipColor: 'surface',
    chipBgColor: 'secondary',
  },
];

export default sidebarItem;
