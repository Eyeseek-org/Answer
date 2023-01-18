import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PAGE } from '../../types/navigation';
import { NavigationMenuBox, NavItem } from './styles';
import { useAccount } from 'wagmi';

const headerNavigationLinks: { title: string; url: PAGE, auth: boolean }[] = [
  { title: 'Quests', url: PAGE.QUESTS, auth: false },
  { title: 'Reputation', url: PAGE.REPUTATION, auth: false },
  { title: 'Map', url: PAGE.MAP, auth: false },
  { title: 'My', url: PAGE.MY, auth: true },
];

export const Navigation = () => {
  const [active, setActive] = useState<string | null>(null);3
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    const currentNavigationLink = headerNavigationLinks.find((link) => router.pathname.includes(link.url) && link.url !== PAGE.HOME);
    setActive(currentNavigationLink?.title ?? null);
  }, [router.pathname]);

  return (
    <NavigationMenuBox>
      {headerNavigationLinks.map(({ title, url, auth }, index) => {
        return <div key={index}>
         {!auth && <NavItem bold={active === title} key={index}>
            <Link href={url}>
              <span>{title}</span>
            </Link>
          </NavItem> }
         {auth && address && <NavItem bold={active === title} key={index}>
            <Link href={url}>
              <span>{title}</span>
            </Link>
          </NavItem> }
          </div>
      })}
    </NavigationMenuBox>
  );
};
