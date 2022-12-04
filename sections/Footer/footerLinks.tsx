import { HTMLAttributeAnchorTarget } from 'react';
import { DiscordIcon, EmailIcon, MediumIcon } from '../../components/icons/Socials';

interface IFooterLinks {
  href: string;
  text: string;
  icon?: JSX.Element;
  target?: HTMLAttributeAnchorTarget;
}

export const footerLinks: IFooterLinks[] = [
  {
    href: 'mailto: eyeseek@proton.me',
    text: 'eyeseek@proton.me',
    icon: <EmailIcon width={50} />,
  },
  {
    href: 'https://discord.gg/JnTgUEZvtR',
    text: 'Discord',
    icon: <DiscordIcon width={30} />,
    target: '_blank',
  },
  {
    href: 'https://medium.com/eyeseek',
    text: 'Medium',
    icon: <MediumIcon width={30} />,
    target: '_blank',
  },
  {
    href: 'pitch.pdf',
    text: 'Pitch deck',
    target: '_blank',
  },
];
