import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MenuSvg = (props: SvgProps) => (
  <Svg
    width={22}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.667 4.5h14.666M3.667 9h9.166m-9.166 4.5H8.25"
    />
  </Svg>
)
export default MenuSvg