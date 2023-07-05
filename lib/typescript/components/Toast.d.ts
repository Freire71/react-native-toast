import React, { FC } from 'react';
import type { Toast as ToastType } from '../core/types';
import { Toast as T } from '../core/types';
declare type Props = {
    toast: ToastType;
    updateHeight: (toastId: string, height: number) => void;
    offset: number;
    endPause: () => void;
    startPause: () => void;
    customRenderer?: (toast: ToastType) => React.ReactNode;
    overrideDarkMode?: boolean;
    onToastShow?: (toast: T) => void;
    onToastHide?: (toast: T) => void;
    onToastPress?: (toast: T) => void;
};
export declare const Toast: FC<Props>;
export {};
