"use client";

import { CldVideoPlayer as CldVideoPlayerDefault, CldVideoPlayerProps } from 'next-cloudinary';

const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  return (
    <CldVideoPlayerDefault {...props} />
  );
}

export default CldVideoPlayer;