import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ViewStyle, useColorScheme, DimensionValue } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SkeletonContentProps, SkeletonLayoutItem } from '../types';

const DEFAULT_BONE_COLOR = '#E1E9EE';
const DEFAULT_HIGHLIGHT_COLOR = '#F2F8FC';
const DEFAULT_BONE_COLOR_DARK = '#1a1a1a';
const DEFAULT_HIGHLIGHT_COLOR_DARK = '#2a2a2a';
const DEFAULT_BORDER_RADIUS = 4;

export const SkeletonContent: React.FC<SkeletonContentProps> = ({
  isLoading = true,
  layout = [],
  animationType = 'shiver',
  animationDirection = 'horizontalRight',
  duration = 1200,
  containerStyle,
  boneColor,
  highlightColor,
  children,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const getBoneColor = () => {
    if (boneColor) return boneColor;
    return colorScheme === 'dark' ? DEFAULT_BONE_COLOR_DARK : DEFAULT_BONE_COLOR;
  };

  const getHighlightColor = () => {
    if (highlightColor) return highlightColor;
    return colorScheme === 'dark' ? DEFAULT_HIGHLIGHT_COLOR_DARK : DEFAULT_HIGHLIGHT_COLOR;
  };

  useEffect(() => {
    if (isLoading && animationType !== 'none') {
      const animation = Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          easing: Easing.ease,
          useNativeDriver: false,
        })
      );
      animation.start();

      return () => animation.stop();
    }
  }, [isLoading, animationType, duration, animatedValue]);

  const getGradientTransform = () => {
    if (animationType === 'pulse') {
      const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.4, 1],
      });
      return { opacity };
    }

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: animationDirection.includes('Left') ? [100, -100] : [-100, 100],
    });

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: animationDirection.includes('Down') ? [-100, 100] : [100, -100],
    });

    if (animationDirection.includes('horizontal')) {
      return { transform: [{ translateX }] };
    }
    if (animationDirection.includes('vertical')) {
      return { transform: [{ translateY }] };
    }
    if (animationDirection.includes('diagonal')) {
      return { transform: [{ translateX }, { translateY }] };
    }

    return { transform: [{ translateX }] };
  };

  const renderSkeletonItem = (item: SkeletonLayoutItem, index: number): React.ReactNode => {
    const itemStyle: ViewStyle = {
      width: item.width as DimensionValue,
      height: item.height as DimensionValue,
      marginLeft: item.marginLeft || 0,
      marginRight: item.marginRight || 0,
      marginTop: item.marginTop || 0,
      marginBottom: item.marginBottom || 0,
      borderRadius: item.borderRadius || DEFAULT_BORDER_RADIUS,
      backgroundColor: getBoneColor(),
      overflow: 'hidden',
      position: item.position || 'relative',
      flexDirection: item.flexDirection || 'column',
      alignItems: item.alignItems,
      justifyContent: item.justifyContent,
    };

    return (
      <View key={item.key || index} style={itemStyle}>
        {animationType !== 'none' && animationType !== 'pulse' && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
              getGradientTransform(),
            ]}
          >
            <LinearGradient
              colors={[getBoneColor(), getHighlightColor(), getBoneColor()]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        )}
        {animationType === 'pulse' && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: getHighlightColor(),
              },
              getGradientTransform(),
            ]}
          />
        )}
        {item.children && item.children.map((child, childIndex) => renderSkeletonItem(child, childIndex))}
      </View>
    );
  };

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <View style={containerStyle}>
      {layout.map((item, index) => renderSkeletonItem(item, index))}
    </View>
  );
}; 