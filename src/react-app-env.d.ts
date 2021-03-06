/// <reference types="react-scripts" />
import {
  BackgroundProps, ColorProps, BorderProps, LayoutProps,
  PositionProps, SpaceProps, FlexboxProps, TextStyleProps,
  BackgroundImageProps, TypographyProps, FontStyleProps
} from 'styled-system';
import { TextStyle } from 'react-native';
import theme from './theme';

declare module 'react-tiny-toast' {};

type fontSizeType = keyof theme.fontSizes;
type buttonVariantType = keyof typeof theme.buttons
export interface BoxProps extends BackgroundProps, ColorProps, BorderProps, LayoutProps, PositionProps, SpaceProps, TypographyProps, FontStyleProps {
  cursor?: string;
}

export interface FlexProps extends FlexboxProps, BoxProps {}

export interface TextProps extends BoxProps, TextStyleProps {
  fontSize?: fontSizeType | Array<fontSizeType>;
}

export interface ButtonProps extends FlexProps {
  variant?: buttonVariantType;
  disabled?: boolean;
  type?: string;
}

export interface ImageProps extends BackgroundImageProps, PositionProps, SpaceProps, BackgroundProps {}

export interface RequestOptions {
  url: string;
  headers?: {};
  params?: {};
  method?: 'get' | 'post';
  data?: {}
}

export interface InputProps extends FlexProps {
  value: string;
  name?: string;
  disabled?: boolean;
  as?: string;
  type?: string;
}