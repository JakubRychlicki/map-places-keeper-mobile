import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const NextSvg = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke={props.color ? props.color : '#0077B6'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 2 6.257 7.491L6 16.918"
    />
  </Svg>
);
export default NextSvg;
