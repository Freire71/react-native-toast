import { DefaultToastOptions, Element, Toast, ToastOptions, ValueOrFunction } from './types';
declare type Message = ValueOrFunction<Element, Toast>;
declare type ToastHandler = (message: Message, options?: ToastOptions) => string;
declare const toast: {
    (message: Message, opts?: ToastOptions): string;
    error: ToastHandler;
    success: ToastHandler;
    loading: ToastHandler;
    dismiss(toastId?: string): void;
    remove(toastId?: string): void;
    promise<T>(promise: Promise<T>, msgs: {
        loading: Element;
        success: ValueOrFunction<Element, T>;
        error: ValueOrFunction<Element, any>;
    }, opts?: DefaultToastOptions): Promise<T>;
};
export { toast };
