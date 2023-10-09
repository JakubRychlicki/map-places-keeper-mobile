import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ProfileSvg = (props: SvgProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 32 32" fill="none" {...props}>
    <Path stroke={props.color || '#000'} strokeWidth={2} d="M16 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M23.959 26.667C23.747 22.81 22.566 20 15.999 20c-6.565 0-7.746 2.811-7.958 6.667"
    />
    <Path
      stroke={props.color || '#000'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M9.333 4.45A13.272 13.272 0 0 1 16 2.668c7.364 0 13.333 5.97 13.333 13.333 0 7.364-5.97 13.333-13.333 13.333-7.364 0-13.333-5.97-13.333-13.333 0-2.428.649-4.705 1.783-6.667"
    />
  </Svg>
);
export default ProfileSvg;
