import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const MapPointSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      fill={props.fill || '#ffffff'}
      stroke={props.stroke || '#000'}
      d="M14.261 28.446C9.161 26.062 5.833 19.797 5.833 14 5.833 8.243 10.42 3.167 16 3.167S26.167 8.243 26.167 14c0 5.797-3.327 12.062-8.428 14.446a4.099 4.099 0 0 1-3.478 0ZM16 16.5a3.167 3.167 0 1 0 0-6.333 3.167 3.167 0 0 0 0 6.333Z"
    />
  </Svg>
);
export default MapPointSvg;
