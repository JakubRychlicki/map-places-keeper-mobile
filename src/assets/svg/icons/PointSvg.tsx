import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const PointSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      fill="#505050"
      d="M16 4.686 4.686 16 16 27.314 27.314 16 16 4.686ZM10.343 16 16 10.343 21.657 16 16 21.657 10.343 16Z"
    />
  </Svg>
);
export default PointSvg;
