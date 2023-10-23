import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PlusSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.333 16h21.334M16 5.333v21.334"
    />
  </Svg>
);
export default PlusSvg;
