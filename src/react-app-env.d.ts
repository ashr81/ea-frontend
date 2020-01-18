/// <reference types="react-scripts" />
import {
  BackgroundProps, ColorProps, BorderProps, LayoutProps,
  PositionProps, SpaceProps, FlexboxProps, TextStyleProps,
  BackgroundImageProps,
  TypographyProps,
  FontStyleProps
} from 'styled-system';
import { TextStyle } from 'react-native';
import themes from './themes';

type fontSizeType = keyof theme.fontSizes;
export interface BoxProps extends BackgroundProps, ColorProps, BorderProps, LayoutProps, PositionProps, SpaceProps, TypographyProps, FontStyleProps {}

export interface FlexProps extends FlexboxProps, BoxProps {}

export interface TextProps extends BoxProps, TextStyleProps {
  fontSize?: fontSizeType | Array<fontSizeType>;
}

export interface ImageProps extends BackgroundImageProps, PositionProps, SpaceProps, BackgroundProps {}