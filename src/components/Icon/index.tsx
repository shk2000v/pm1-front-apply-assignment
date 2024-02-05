import React from 'react';
import MountainIcon from '@/assets/svg/mountain.svg';
import TargetIcon from '@/assets/svg/target.svg';
import {SvgProps} from 'react-native-svg';

// default
const Icon = () => <MountainIcon />;

// 산 아이콘
const Mountain = ({...props}: SvgProps) => {
  return <MountainIcon {...props} />;
};
const Target = ({...props}: SvgProps) => {
  return <TargetIcon {...props} />;
};

Icon.Mountain = Mountain;
Icon.Target = Target;

export default Icon;
