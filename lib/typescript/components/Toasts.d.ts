import { FunctionComponent } from 'react';
import { Toast as T } from '../headless';
declare type Props = {
    overrideDarkMode?: boolean;
    extraInsets?: {
        top?: number;
        bottom?: number;
        right?: number;
        left?: number;
    };
    onToastShow?: (toast: T) => void;
    onToastHide?: (toast: T) => void;
    onToastPress?: (toast: T) => void;
    providerKey?: string;
};
export declare const Toasts: FunctionComponent<Props>;
export {};
