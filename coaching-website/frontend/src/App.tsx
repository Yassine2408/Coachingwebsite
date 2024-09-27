import squidLogo from '/squid.svg';
import './App.css';
import { useCollection, useDoc } from '@squidcloud/react';

type CounterDocument = {
  count: number;
};

function App() {
  const collection = useCollection<CounterDocument>('count');
  const { data, loading } = useDoc(collection.doc('count'));

  async function handleClick() {
    const count = (data?.count || 0) + 1;
    await collection.doc('count').insert({ count });
  }

  return (
    <>
      <div>
        <a href="https://docs.squid.cloud" target="_blank">
          <img src={squidLogo} className="logo" alt="Squid Cloud logo" />
        </a>
      </div>
      <h1>Squid + Vite + React</h1>
      <div className="card">
        {!loading && <button onClick={() => handleClick()}>
          count is {data?.count || 0}
        </button>}
      </div>
    </>
  );
}

export default App;
