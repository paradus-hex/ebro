declare global {
  interface Window {
    myAPI: {
      send: (channel: string, data: any) => void;
      on: (channel: string, callback: (event: any, ...args: any[]) => void) => void;
    };
  }
}

export { };