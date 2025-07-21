import { ViewStyle } from 'react-native';

export interface SkeletonLayoutItem {
  key: string;
  width: number | string;
  height: number | string;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number;
  children?: SkeletonLayoutItem[];
  flexDirection?: 'row' | 'column';
  position?: 'relative' | 'absolute';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

export interface SkeletonContentProps {
  isLoading: boolean;
  layout?: SkeletonLayoutItem[];
  animationType?: 'none' | 'shiver' | 'pulse';
  animationDirection?: 'horizontalLeft' | 'horizontalRight' | 'verticalTop' | 'verticalDown' | 'diagonalDownRight' | 'diagonalTopLeft' | 'diagonalTopRight' | 'diagonalDownLeft';
  duration?: number;
  containerStyle?: ViewStyle;
  boneColor?: string;
  highlightColor?: string;
  children?: React.ReactNode;
}

export interface SkeletonLoadingComponentProps {
  quantity: number;
  width: number | string;
  height: number | string;
  marginBetween: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
} 