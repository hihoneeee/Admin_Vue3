// @core/composable/useToast.ts
import { ref, readonly } from "vue";

export interface ToastOptions {
  title?: string;
  text?: string;
  message?: string; // For backward compatibility
  icon?: string;
  variant?: "success" | "error" | "warning" | "info" | "default";
  type?: "success" | "error" | "warning" | "info"; // For backward compatibility
  duration?: number;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
}

interface Toast extends Required<Pick<ToastOptions, "duration" | "position">> {
  id: number;
  title: string | null;
  text: string;
  icon: string | null;
  variant: NonNullable<ToastOptions["variant"]>;
  visible: boolean;
}

export function useToast() {
  const toasts = ref<Toast[]>([]);
  let toastId = 0;

  const show = (options: ToastOptions) => {
    const id = toastId++;

    // Handle both new format and backward compatibility
    const messageText = options.text || options.message || "";
    const toastVariant = options.variant || options.type || "default";

    const newToast: Toast = {
      id,
      title: options.title || null,
      text: messageText,
      icon: options.icon || null,
      variant: toastVariant as NonNullable<ToastOptions["variant"]>,
      duration: options.duration || 3000,
      position: options.position || "top-right",
      visible: true,
    };

    toasts.value.push(newToast);

    if (newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, newToast.duration);
    }

    return id;
  };

  const dismiss = (id: number) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      // First set visible to false for animation
      toasts.value[index].visible = false;

      // Then remove after a delay for animation to complete
      setTimeout(() => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
      }, 300);
    }
  };

  const dismissAll = () => {
    toasts.value.forEach((toast) => {
      dismiss(toast.id);
    });
  };

  // Main toast function that can be called directly with options
  const toast = (options: ToastOptions) => show(options);

  // Helper methods for different types
  toast.success = (
    textOrOptions: string | Omit<ToastOptions, "variant">,
    options?: Omit<ToastOptions, "text" | "variant">
  ) => {
    if (typeof textOrOptions === "string") {
      return show({ text: textOrOptions, variant: "success", ...options });
    }
    return show({ ...textOrOptions, variant: "success" });
  };

  toast.error = (
    textOrOptions: string | Omit<ToastOptions, "variant">,
    options?: Omit<ToastOptions, "text" | "variant">
  ) => {
    if (typeof textOrOptions === "string") {
      return show({ text: textOrOptions, variant: "error", ...options });
    }
    return show({ ...textOrOptions, variant: "error" });
  };

  toast.warning = (
    textOrOptions: string | Omit<ToastOptions, "variant">,
    options?: Omit<ToastOptions, "text" | "variant">
  ) => {
    if (typeof textOrOptions === "string") {
      return show({ text: textOrOptions, variant: "warning", ...options });
    }
    return show({ ...textOrOptions, variant: "warning" });
  };

  toast.info = (
    textOrOptions: string | Omit<ToastOptions, "variant">,
    options?: Omit<ToastOptions, "text" | "variant">
  ) => {
    if (typeof textOrOptions === "string") {
      return show({ text: textOrOptions, variant: "info", ...options });
    }
    return show({ ...textOrOptions, variant: "info" });
  };

  return {
    toasts: readonly(toasts),
    show,
    dismiss,
    dismissAll,
    toast,
  };
}
