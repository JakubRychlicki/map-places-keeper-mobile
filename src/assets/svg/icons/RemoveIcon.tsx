import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const RemoveSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.053 8.421H27.79M7.579 12.632l2.388 13.61c.242 1.384 1.405 2.39 2.762 2.39h6.542c1.357 0 2.52-1.006 2.762-2.39l2.388-13.61M11.79 5.895c0-1.396 1.256-2.527 2.807-2.527h2.807c1.55 0 2.806 1.131 2.806 2.527V8.42h-8.42V5.895Z"
    />
  </Svg>
);
export default RemoveSvg;
