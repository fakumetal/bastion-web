'use client';

import { Children, ReactNode } from 'react';
import Flicking, { FlickingProps, ViewportSlot } from '@egjs/react-flicking';
import { Arrow, AutoPlay, Fade, Parallax } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/flicking-plugins.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

interface CarouselProps {
  plugins?: {
    arrows?: boolean,
    autoplay?: boolean,
    fade?: boolean,
    parallax?: boolean,
  };
  options?: Partial<FlickingProps>;
  className?: string;
  children: ReactNode;
}

export default function Carousel({ plugins = {}, options = {}, className = '', children }: CarouselProps) {
  const activePlugins = [];

  if (plugins.arrows) {
    activePlugins.push(new Arrow());
  }

  if (plugins.autoplay) {
    activePlugins.push(new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: false }));
  }

  if (plugins.fade) {
    activePlugins.push(new Fade());
  }

  if (plugins.parallax) {
    activePlugins.push(new Parallax());
  }

  return (
    <Flicking
      {...options}
      plugins={activePlugins}
      className={className}
    >
      {children}
      {plugins.arrows ? (
        <ViewportSlot>
          <span className="flicking-arrow-prev is-circle"></span>
          <span className="flicking-arrow-next is-circle"></span>
        </ViewportSlot>
      ) : null}
    </Flicking>
  );
}
