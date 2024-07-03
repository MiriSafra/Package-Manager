import React, { useEffect } from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import packageStore from './stores/PackageStore';
import PackagesList from './components/PackagesList';
import Bar from './components/Bar';

const App: React.FC = observer(() => {
  useEffect(() => {
    fetch('https://run.mocky.io/v3/773626e9-e0ae-4077-b83a-f8769ea26e97').
      then(response => response.json()).
      then(data => {
        packageStore.setPackages(data);
      })
  }, [])
  return (
    <div>
      <Bar />
      <PackagesList />
    </div>
  )
})

export default App;
