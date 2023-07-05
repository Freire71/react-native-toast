import type { ViewStyle } from 'react-native';
/**
 * Construct a shadow object given a color and opacity
 * @param color The hexidecimal color to turn into a shadow
 * @param opacity the opacity of the shadow
 * @param enlargeShadow
 * @param isImage
 */
export declare const ConstructShadow: (color?: string, opacity?: number, enlargeShadow?: boolean, isImage?: boolean, floatBelow?: boolean) => ViewStyle;
export declare const colors: {
    primary: string;
    backgroundLight: string;
    backgroundDark: string;
    success: string;
    error: string;
    info: string;
    textLight: string;
    textDark: string;
    label: string;
};
