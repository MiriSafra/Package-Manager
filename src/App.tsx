import React, { useEffect } from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import packageStore from './stores/PackageStore';
import PackagesList from './components/PackagesList';
import Bar from './components/Bar';

const App: React.FC = observer(() => {
  useEffect(() => {
    fetch('https://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e').
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
