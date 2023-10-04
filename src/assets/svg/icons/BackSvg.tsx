import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BackSvg = (props: SvgProps) => (
  <Svg
  width={18}
  height={18}
  fill="none"
  {...props}
>
  <Path
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M11.257 2 5 9.491l6.257 7.427"
  />
</Svg>
);

export default BackSvg;