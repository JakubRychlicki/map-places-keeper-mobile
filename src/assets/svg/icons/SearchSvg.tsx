import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SearchSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.23 22.188 28 28m-2.667-13.333c0 5.89-4.775 10.666-10.666 10.666S4 20.558 4 14.667 8.776 4 14.667 4c5.89 0 10.666 4.776 10.666 10.667Z"
    />
  </Svg>
);
export default SearchSvg;
