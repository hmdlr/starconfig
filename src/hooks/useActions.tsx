import React from "react";

export const actionsContext = React.createContext<{
  actions: Record<string, Function>;
  setActions: React.Dispatch<React.SetStateAction<Record<string, Function>>>;
}>(undefined!);

export const ProvideActions = ({ children }: { children: any }) => {
  const actions = useProvideActions();
  return (
    <actionsContext.Provider value={actions}>
      {children}
    </actionsContext.Provider>
  );
};

export const useActions = () => {
  return React.useContext(actionsContext);
};

function useProvideActions() {
  const [actions, setActions] = React.useState<Record<string, Function>>({});

  return {
    actions,
    setActions,
  };
}
