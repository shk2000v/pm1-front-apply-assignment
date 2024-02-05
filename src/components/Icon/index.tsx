import React from 'react';
import {SvgProps} from 'react-native-svg';
import MountainIcon from '@/assets/svg/mountain.svg';
import TargetIcon from '@/assets/svg/target.svg';
import CircleIcon from '@/assets/svg/circle.svg';
import CircleCheckIcon from '@/assets/svg/check_fill.svg';

// default
const Icon = () => <MountainIcon />;

// 산 아이콘
const Mountain = ({...props}: SvgProps) => {
  return <MountainIcon {...props} />;
};
// 타겟(과녁)아이콘
const Target = ({...props}: SvgProps) => {
  return <TargetIcon {...props} />;
};

// 원: 체크
const CircleCheck = ({...props}: SvgProps) => {
  return <CircleCheckIcon {...props} />;
};
// 원
const Circle = ({...props}: SvgProps) => {
  return <CircleIcon {...props} />;
};

Icon.Mountain = Mountain;
Icon.Target = Target;
Icon.Circle = Circle;
Icon.CircleCheck = CircleCheck;

export default Icon;
