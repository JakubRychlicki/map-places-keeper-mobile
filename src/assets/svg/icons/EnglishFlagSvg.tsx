import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const EnglishFlagSvg = (props: SvgProps) => (
  <Svg width={42} height={32} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#FEFEFE"
        d="M2.184 32h37.632c1.21-.075 2.184-1.183 2.184-2.525V2.525C42 1.142 40.973.008 39.71 0H2.29C1.027.008 0 1.142 0 2.525v26.942c0 1.35.974 2.458 2.184 2.533Z"
      />
      <Path fill="#C8102E" d="M18.063 19.192V32h5.844V19.192H42v-6.4H23.907V0h-5.844v12.792H0v6.4h18.063Z" />
      <Path
        fill="#012169"
        d="M25.854 10.358V0h13.871c.959.017 1.78.675 2.115 1.6l-15.986 8.758ZM25.854 21.642V32h13.962c.921-.058 1.697-.708 2.024-1.6l-15.986-8.758ZM16.115 21.642V32H2.184c-.921-.058-1.705-.708-2.024-1.617l15.955-8.741ZM16.115 10.358V0H2.275C1.316.017.487.683.16 1.617l15.955 8.741ZM0 10.667h5.82L0 7.475v3.192ZM42 10.667h-5.851L42 7.458v3.209ZM42 21.333h-5.851L42 24.542v-3.209ZM0 21.333h5.82L0 24.525v-3.192Z"
      />
      <Path
        fill="#C8102E"
        d="m42 2.708-14.494 7.959h3.24L42 4.5V2.708ZM14.464 21.333h-3.241L0 27.483v1.792l14.495-7.942h-.03ZM8.004 10.675h3.242L0 4.508v1.784l8.004 4.383ZM33.958 21.325h-3.242L42 27.517v-1.784l-8.042-4.408Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EnglishFlagSvg;
