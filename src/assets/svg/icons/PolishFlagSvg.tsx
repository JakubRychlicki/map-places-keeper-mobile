import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const PolishFlagSvg = (props: SvgProps) => (
  <Svg width={42} height={32} fill="none" {...props}>
    <G fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
      <Path fill="#fff" d="M42 32H0V0h42v32Z" />
      <Path fill="#DC143C" d="M42 32H0V16h42v16Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={42} height={32} fill="#fff" rx={2} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PolishFlagSvg;
