import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BackSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      fill="#F7F8F8"
      d="M1.724 16.943a1.333 1.333 0 0 1 0-1.886l8-8a1.333 1.333 0 0 1 1.885 1.886l-5.724 5.724h23.448a1.333 1.333 0 1 1 0 2.666H5.885l5.724 5.724a1.334 1.334 0 0 1-1.885 1.886l-8-8Z"
    />
  </Svg>
);
export default BackSvg;
