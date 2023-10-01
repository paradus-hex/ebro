import React, { useEffect, useState } from 'react';

export const Test: React.FC = () => {
  const [state, setState] = useState('');

  useEffect(() => {
    // イベントリスナーを追加
    const { myAPI } = window;
    console.log('in test');
    console.log(window);
    console.log(myAPI);
    const removeListener = myAPI.onReceiveMessage((message: string) => {
      setState(message);
    });
    // コンポーネントのクリーンアップ処理でイベントリスナーを削除する
    return () => {
      removeListener();
    };
  }, []);

  return (
    <>
      {/* <button onClick={() => myAPI.sendMessage('hoge')}>Send Message</button> */}
    </>
  );
};
