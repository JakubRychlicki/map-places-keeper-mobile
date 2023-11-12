import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const EditSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m28.373 8.533-12.72 12.72c-1.267 1.267-5.027 1.854-5.867 1.014-.84-.84-.266-4.6 1-5.867L23.52 3.667a3.439 3.439 0 0 1 5.975 2.406 3.444 3.444 0 0 1-1.122 2.46Z"
    />
    <Path
      stroke={props.stroke || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.667 5.333H8a5.333 5.333 0 0 0-5.333 5.334V24A5.333 5.333 0 0 0 8 29.333h14.667c2.946 0 4-2.4 4-5.333v-6.667"
    />
  </Svg>
);
export default EditSvg;
