import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppNavigation } from '../hooks/useAppNavigation';
import Topbar from './TopBar';
import RoundButton from './controls/RoundButton';
import BackSvg from '../assets/svg/icons/BackSvg';

type ScreenTopBarProps = {
  title?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  hideBackButton?: boolean;
};

const ScreenTopBar: React.FC<ScreenTopBarProps> = ({
  title,
  description,
  rightIcon,
  containerStyle,
  hideBackButton,
}) => {
  const navigation = useAppNavigation();

  return (
    <Topbar
      leftIcon={!hideBackButton ? <RoundButton icon={<BackSvg />} onPress={navigation.goBack} /> : null}
      title={title}
      description={description}
      rightIcon={rightIcon}
      containerStyle={containerStyle}
    />
  );
};

export default ScreenTopBar;
