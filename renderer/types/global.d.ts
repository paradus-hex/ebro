declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
export interface IMyAPI {
  sendMessage: (message: string) => void;
  onReceiveMessage: (listener: (message: string) => void) => () => void;
}