import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const LogoutSvg = (props: SvgProps) => (
  <Svg width={36} height={27} fill="none" {...props}>
    <Path
      stroke="#0077B6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.625 14.375H3m0 0L6.938 11M3 14.375l3.938 3.375"
    />
    <Path
      stroke="#0077B6"
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 8.625c.014-2.447.122-3.772.987-4.636C13.975 3 15.567 3 18.748 3h1.125c3.182 0 4.773 0 5.761.989.989.988.989 2.579.989 5.761v9c0 3.182 0 4.773-.989 5.762-.864.864-2.19.973-4.636.986M12 19.875c.014 2.447.122 3.772.987 4.637.721.72 1.763.916 3.51.968"
    />
  </Svg>
);
export default LogoutSvg;
