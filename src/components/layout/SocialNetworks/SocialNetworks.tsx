'use client';

import Link from 'next/link';
import { Icon, Typography } from '@/components/common';
import styles from './SocialNetworks.module.scss';

const SOCIAL_NETWORKS = [
  {
    id: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61557059852582',
  },
  {
    id: 'instagram',
    url: 'https://www.instagram.com/bastionalquilerturismo',
  },
  {
    id: 'whatsapp',
    url: 'https://wa.me/5492996221246',
  },
  {
    id: 'airbnb',
    url: 'https://es-l.airbnb.com/rooms/858819408655560258?guests=1&adults=1&s=67&unique_share_id=dbc765bb-fda9-40fa-81bd-66fde1a8a818',
  },
  {
    id: 'booking',
    url: 'https://www.booking.com/Share-hi0mhz',
  },
];

interface SocialNetworksProps {
  title: string;
}

export default function SocialNetworks({ title }: SocialNetworksProps) {
  return (
    <div className={styles.container}>
      <Typography variant="subtitle">{title}</Typography>
      <div className={styles.contactInfo}>
        {SOCIAL_NETWORKS.map(({ id, url }) => (
          <Link
            key={id}
            className={styles.link}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon
              iconId={id}
              width={70}
              height={70}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
