import { useState } from 'react';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import DealCard from './components/DealCard';

function App() {

  const dealFeatures = [
    { label: 'Presentations:', values: ['8.2 Kg carton'] },
    { label: 'Sizes:', values: ['Sizes L - XL', 'Sizes L - J'] },
    { label: 'Variety:', values: ['Red Globe'] },
  ];

  const dealPrices = [
    { label: 'Sizes L - J', price: '$2.30', unit: "/ Kg" },
    { label: 'Sizes XL - J', price: '$2.44', unit: "/ Kg" },
  ]

  return (
    <main className="max-container padding-container flex flex-col">
      <div className="relative z-20 flex flex-1 flex-col items-center pt-6">
        <DealCard code="080610" title="Peru - Fresh Grapes" price="2.3" description="Fresh Red Globe grapes from Peru." features={dealFeatures} prices={dealPrices}/>
      </div>
    </main>

  );
}

export default App;
