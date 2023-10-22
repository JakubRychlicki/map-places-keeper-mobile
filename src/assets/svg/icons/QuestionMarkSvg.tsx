import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const QuestionMarkSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.319 28h.016M9 9.43C9.903 6.853 12.39 5 15.319 5 19.009 5 22 7.942 22 11.571c0 2.722-1.682 5.057-4.079 6.055-1.237.515-1.856.772-2.072.971-.258.237-.307.31-.428.636-.102.273-.102.695-.102 1.538v2.3"
    />
  </Svg>
);
export default QuestionMarkSvg;
