'use client';

import * as React from 'react';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ToastActionType = typeof actionTypes;
type Action =
  | {
      type: typeof actionTypes.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof actionTypes.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof actionTypes.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: typeof actionTypes.REMOVE_TOAST;
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(toast => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

function createToast({ title, description, action }: ToastProps) {
  const id = genId();

  const update = (props: ToastProps) => {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { id, ...props },
    });
  };

  const dismiss = () => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  };

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      id,
      title,
      description,
      action,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast: (props: ToastProps) => {
      const { id, ...rest } = createToast(props);
      return { id, ...rest };
    },
    dismiss: (toastId?: string) => {
      dispatch({ type: 'DISMISS_TOAST', toastId });
    },
  };
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const toastContext = {
    ...state,
    toast: (props: ToastProps) => {
      const { id, ...rest } = createToast(props);
      return { id, ...rest };
    },
    dismiss: (toastId?: string) => {
      dispatch({ type: 'DISMISS_TOAST', toastId });
    },
  };

  return (
    <ToastProviderContext.Provider value={toastContext}>
      {children}
    </ToastProviderContext.Provider>
  );
};

const ToastProviderContext = React.createContext({
  toasts: [] as ToasterToast[],
  toast: () => ({ id: '', dismiss: () => {}, update: () => {} }),
  dismiss: () => {},
});

function ToastViewPort() {
  const { toasts } = useToast();

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        insetBlockEnd: 0,
        insetInlineEnd: 0,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '0.5rem',
        padding: '1rem',
        pointerEvents: 'none',
        zIndex: 2147483647,
        maxWidth: '100%',
        width: '360px',
      }}
      aria-live="polite"
    >
      {toasts.map(toast => {
        const toastId = toast.id;
        return (
          <div
            key={toastId}
            onMouseEnter={() => {
              dispatch({
                type: 'UPDATE_TOAST',
                toast: { id: toastId, open: false },
              });
            }}
            onMouseLeave={() => {
              dispatch({
                type: 'UPDATE_TOAST',
                toast: { id: toastId, open: true },
              });
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <div
                data-state="open"
                style={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  boxShadow:
                    'hsl(var(--shadow)) 0px 10px 38px -10px, hsl(var(--shadow)) 0px 10px 20px -15px',
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.25',
                  color: 'hsl(var(--foreground))',
                  opacity: 0,
                  transform: 'translateX(100%)',
                  transition:
                    'color 0.1s ease, background-color 0.1s ease, opacity 0.15s ease, transform 0.15s ease',
                  willChange: 'color, background-color, opacity, transform',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  {toast.title}
                  {toast.description && (
                    <div
                      style={{
                        marginTop: '0.25rem',
                        fontSize: '0.75rem',
                        opacity: 0.9,
                      }}
                    >
                      {toast.description}
                    </div>
                  )}
                </div>
                {/* Action would be handled separately */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { useToast, ToastProvider, ToastViewPort as ToastViewport };
