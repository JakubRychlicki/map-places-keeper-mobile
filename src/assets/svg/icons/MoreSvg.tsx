import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const MoreSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      fill={props.fill || '#F7F8F8'}
      d="M16 21.333a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334ZM13.333 8a2.667 2.667 0 1 0 5.334 0 2.667 2.667 0 0 0-5.334 0Zm0 8a2.667 2.667 0 1 0 5.334 0 2.667 2.667 0 0 0-5.334 0Z"
    />
  </Svg>
);
export default MoreSvg;
