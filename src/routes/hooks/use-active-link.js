import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

export function useActiveLink(path, deep = true, activeNavPaths) {
  const pathname = usePathname();
  const checkPath = path.startsWith('#');
  const currentPath = path === '/' ? '/' : `${path}/`;

  const normalActive = activeNavPaths?.length > 0 ? pathname.startsWith(activeNavPaths?.[0]) : !checkPath && pathname === currentPath;

  const deepActive = !checkPath && pathname.includes(currentPath);

  return deep ? deepActive : normalActive;
}
