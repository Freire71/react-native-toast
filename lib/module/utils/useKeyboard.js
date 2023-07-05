import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
/**
 * Get keyboard status, height, and coordinates
 */

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0
});
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates
};
export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [coordinates, setCoordinates] = useState(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardDidShow = e => {
    setShown(true);
    setCoordinates({
      start: e.startCoordinates,
      end: e.endCoordinates
    });
    setKeyboardHeight(e.endCoordinates.height);
  };

  const handleKeyboardDidHide = e => {
    setShown(false);

    if (e) {
      setCoordinates({
        start: e.startCoordinates,
        end: e.endCoordinates
      });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  useEffect(() => {
    const subscriptions = [Keyboard.addListener('keyboardWillShow', handleKeyboardDidShow), Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow), Keyboard.addListener('keyboardWillHide', handleKeyboardDidHide), Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)];
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, []);
  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight
  };
}
//# sourceMappingURL=useKeyboard.js.map