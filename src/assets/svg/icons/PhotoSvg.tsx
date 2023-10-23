import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PhotoSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 102 102" fill="none" {...props}>
    <Path
      stroke="#48CAE4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 76 26.83-26.83a6.25 6.25 0 0 1 8.84 0l20.58 20.58m0 0 17.456-17.456a6.25 6.25 0 0 1 8.838 0L101 69.75m-43.75 0 14.063 14.063"
    />
  </Svg>
);
export default PhotoSvg;
