import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

const UserSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 40 40" fill="none" {...props}>
    <Circle cx={20} cy={20} r={20} fill="#fff" />
    <Path
      fill="#0077B6"
      d="M19.5 16.75a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM30.5 27.063c0 3.417 0 6.187-11 6.187s-11-2.77-11-6.188c0-3.417 4.925-6.187 11-6.187s11 2.77 11 6.188Z"
    />
  </Svg>
);
export default UserSvg;
