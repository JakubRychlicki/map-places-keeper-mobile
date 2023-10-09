import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const MapSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 8h.013M12 26.667l-8-4V5.333l2.667 1.334m5.333 20 8-4m-8 4v-8m8 4 8 4V9.333L25.333 8M20 22.667v-4m0-10.4c0 2.356-2 4.266-4 6.4-2-2.134-4-4.044-4-6.4C12 5.91 13.79 4 16 4s4 1.91 4 4.267Z"
    />
  </Svg>
);
export default MapSvg;
