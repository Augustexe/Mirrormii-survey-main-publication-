import { useEffect, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useDialogFocus(dialogRef, open) {
  const returnFocus = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!open) {
      if (dialog.open) dialog.close();
      const target = returnFocus.current;
      returnFocus.current = null;
      if (target?.isConnected && typeof target.focus === "function")
        target.focus({ preventScroll: true });
      return undefined;
    }

    const active = document.activeElement;
    if (active instanceof HTMLElement && !dialog.contains(active))
      returnFocus.current = active;
    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        return undefined;
      }
    }
    const focusables = () =>
      [...dialog.querySelectorAll(FOCUSABLE)].filter(
        (item) => !item.hidden && item.getAttribute("aria-hidden") !== "true",
      );
    const first = focusables()[0];
    if (first) first.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const current = document.activeElement;
      const index = items.indexOf(current);
      if (event.shiftKey && (index <= 0 || !dialog.contains(current))) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (
        !event.shiftKey &&
        (index === items.length - 1 || !dialog.contains(current))
      ) {
        event.preventDefault();
        items[0].focus();
      }
    };
    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [dialogRef, open]);
}
