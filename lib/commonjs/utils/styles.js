"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.ConstructShadow = void 0;

/**
 * Construct a shadow object given a color and opacity
 * @param color The hexidecimal color to turn into a shadow
 * @param opacity the opacity of the shadow
 * @param enlargeShadow
 * @param isImage
 */
const ConstructShadow = (color, opacity, enlargeShadow, isImage, floatBelow) => {
  return {
    shadowColor: color ?? '#000',
    shadowOffset: {
      width: 0,
      height: (floatBelow ? -1 : 1) * (enlargeShadow ? 8 : 3)
    },
    shadowOpacity: opacity ?? 0.18,
    shadowRadius: enlargeShadow ? 6 : 4.65,
    elevation: isImage ? undefined : 7
  };
};

exports.ConstructShadow = ConstructShadow;
const colors = {
  primary: '#1B71FC',
  backgroundLight: '#212331',
  backgroundDark: '#f7f7f7',
  success: '#0BAA83',
  error: '#fe352a',
  info: '#74B9FF',
  textLight: '#52616B',
  textDark: '#f2f2f2',
  label: '#9daec9'
};
exports.colors = colors;
//# sourceMappingURL=styles.js.map