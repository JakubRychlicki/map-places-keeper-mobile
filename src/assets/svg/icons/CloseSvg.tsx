import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CloseSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 27 26 5M6 5l20 22"
    />
  </Svg>
);
export default CloseSvg;
