import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const LogoutSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke="#F7F8F8"
      strokeLinecap="round"
      strokeWidth={2}
      d="M10 9.75c.017-2.936.15-4.526 1.214-5.564C12.431 3 14.39 3 18.306 3h1.385c3.917 0 5.876 0 7.092 1.186C28 5.373 28 7.282 28 11.101v10.8c0 3.82 0 5.729-1.217 6.915-1.064 1.037-2.695 1.168-5.707 1.184M10 23.252c.017 2.936.15 4.527 1.214 5.564.888.866 2.171 1.1 4.322 1.163"
    />
    <Path
      stroke="#F7F8F8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.625 16.375H3m0 0L6.938 13M3 16.375l3.938 3.375"
    />
  </Svg>
);
export default LogoutSvg;
