import { KeyboardMetrics } from 'react-native';
export declare function useKeyboard(): {
    keyboardShown: boolean;
    coordinates: {
        start: undefined | KeyboardMetrics;
        end: KeyboardMetrics;
    };
    keyboardHeight: number;
};
