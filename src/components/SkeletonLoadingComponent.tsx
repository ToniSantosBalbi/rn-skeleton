import React from 'react';
import { View } from 'react-native';
import { SkeletonContent } from './SkeletonContent';
import { SkeletonLoadingComponentProps } from '../types';

export const SkeletonLoadingComponent: React.FC<SkeletonLoadingComponentProps> = ({
  quantity,
  width,
  height,
  marginBetween,
  paddingHorizontal = 16,
  paddingVertical = 16,
}) => {
  const layout = Array.from({ length: quantity }, (_, index) => ({
    key: `skeleton-item-${index}`,
    width,
    height,
    marginBottom: index < quantity - 1 ? marginBetween : 0,
  }));

  return (
    <View
      style={{
        paddingHorizontal,
        paddingVertical,
      }}
    >
      <SkeletonContent
        isLoading={true}
        layout={layout}
        animationType="shiver"
        animationDirection="horizontalRight"
      />
    </View>
  );
}; 