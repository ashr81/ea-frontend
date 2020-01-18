/// <reference types="react-scripts" />
import {
  BackgroundProps, ColorProps, BorderProps, LayoutProps,
  PositionProps, SpaceProps, FlexboxProps
} from 'styled-system';

export interface BoxProps extends BackgroundProps, ColorProps, BorderProps, LayoutProps, PositionProps, SpaceProps {}

export interface FlexProps extends FlexboxProps, BoxProps {}