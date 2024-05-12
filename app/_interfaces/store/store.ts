export interface StoreContextValue {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  remove: string;
  setRemove: React.Dispatch<React.SetStateAction<string>>;
}
