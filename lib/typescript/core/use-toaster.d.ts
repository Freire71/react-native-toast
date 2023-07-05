import type { DefaultToastOptions, Toast, ToastPosition } from './types';
export declare const useToaster: (toastOptions?: DefaultToastOptions) => {
    toasts: Toast[];
    handlers: {
        startPause: () => void;
        endPause: () => void;
        updateHeight: (toastId: string, height: number) => void;
        calculateOffset: (toast: Toast, opts?: {
            reverseOrder?: boolean;
            gutter?: number;
            defaultPosition?: ToastPosition;
        }) => number;
    };
};
