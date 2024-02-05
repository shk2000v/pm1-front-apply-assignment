import {View} from 'native-base';
import React, {memo, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const TopInset = memo(({backgroundColor}: {backgroundColor: string}) => {
  const insets = useSafeAreaInsets();
  const style = useStyle({paddingBottom: insets.top, backgroundColor});
  return <View style={style} />;
});
const useStyle = ({
  paddingBottom,
  backgroundColor,
}: {
  paddingBottom: number;
  backgroundColor?: string;
}) => {
  const style = useMemo(
    () => ({
      paddingBottom,
      backgroundColor: backgroundColor ? backgroundColor : undefined,
    }),
    [backgroundColor, paddingBottom],
  );
  return style;
};
