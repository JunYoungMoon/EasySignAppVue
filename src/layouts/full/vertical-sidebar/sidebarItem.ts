import { ShoppingCartIcon, ApertureIcon } from 'vue-tabler-icons';

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
    to: '/',
  },
  {
    title: 'eCommerce',
    icon: ShoppingCartIcon,
    to: '/about',
  },
];

export default sidebarItem;
