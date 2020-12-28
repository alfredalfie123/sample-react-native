export function pushStyle<T>(isPushed: boolean, oldStyle: T[], newStyle: T) {
  return isPushed ? [...oldStyle, newStyle] : oldStyle;
}
