import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppNavigation } from '../hooks/useAppNavigation';
import Topbar from './TopBar';
import RoundButton from './controls/RoundButton';
import BackSvg from '../assets/svg/icons/BackSvg';

type ScreenTopBarProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  hideBackButton?: boolean;
  isPlaceDetailsView?: boolean;
  optionsForPlaceDetailsView?: React.ReactNode;
};

const ScreenTopBar: React.FC<ScreenTopBarProps> = ({
  title,
  rightIcon,
  containerStyle,
  hideBackButton,
  isPlaceDetailsView,
  optionsForPlaceDetailsView,
}) => {
  const navigation = useAppNavigation();

  return (
    <>
      {isPlaceDetailsView && optionsForPlaceDetailsView}
      <Topbar
        leftIcon={!hideBackButton ? <RoundButton icon={<BackSvg />} onPress={navigation.goBack} /> : null}
        title={title}
        rightIcon={rightIcon}
        containerStyle={containerStyle}
      />
    </>
  );
};

export default ScreenTopBar;
