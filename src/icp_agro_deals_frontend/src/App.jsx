import { useState } from 'react';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import DealCard from './components/DealCard';

function App() {

  return (
    <main className="max-container padding-container flex flex-col">
      <div className="relative z-20 flex flex-1 flex-col items-center pt-6">
        <DealCard code="080610" title="Peru - Fresh Grapes" price="2.3" description="Fresh Red Globe grapes from Peru."/>
      </div>
    </main>

  );
}

export default App;
