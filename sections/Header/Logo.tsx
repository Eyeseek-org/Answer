import Link from 'next/link';
import React from 'react';
import { ImageBox, NavItem } from './styles';
import { Logo } from '../../components/icons/Common';

export const LogoComponent = ({color}) => (
  <ImageBox>
    <NavItem>
      <Link href="/">
        <Logo width={100} height={50} color={color} />
      </Link>
    </NavItem>
  </ImageBox>
);
