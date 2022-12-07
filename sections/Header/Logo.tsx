import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ImageBox, NavItem } from './styles';
import Logo from '../../public/Logo.png';

export const LogoComponent = () => (
  <ImageBox>
    <NavItem>
      <Link href="/">
        <span>
          <Image src={Logo} alt="Logo" width={'110%'} height={'50%'} />
        </span>
      </Link>
    </NavItem>
  </ImageBox>
);
