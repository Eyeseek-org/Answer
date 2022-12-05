import { HTMLAttributeAnchorTarget } from 'react';
import { DiscordIcon, EmailIcon, MediumIcon } from '../../components/icons/Socials';

interface IFooterLinks {
  href: string;
  text: string;
  icon?: JSX.Element;
  target?: HTMLAttributeAnchorTarget;
}

export const socialLinks: IFooterLinks[] = [
  {
    href: 'mailto: eyeseek@proton.me',
    text: 'Email',
    icon: <EmailIcon width={30} height={10} />,
  },
  {
    href: 'https://discord.gg/JnTgUEZvtR',
    text: 'Discord',
    icon: <DiscordIcon width={30} height={10} />,
    target: '_blank',
  },
  {
    href: 'https://medium.com/eyeseek',
    text: 'Medium',
    icon: <MediumIcon width={30} height={10} />,
    target: '_blank',
  }
];

export const refLinks: IFooterLinks[] = [
  {
    href: 'pitch.pdf',
    text: 'Pitch deck',
    target: '_blank',
  },
  {
    href: 'pitch.pdf',
    text: 'Pitch deck',
    target: '_blank',
  },
  {
    href: 'pitch.pdf',
    text: 'Pitch deck',
    target: '_blank',
  },
];

export const docLinks: IFooterLinks[] = [
  {
    href: '/',
    text: 'Setup a project',
    target: '_blank',
  },
  {
    href: '/',
    text: 'Reward incentivizations',
    target: '_blank',
  },
  {
    href: '/',
    text: 'Streaming',
    target: '_blank',
  },
];