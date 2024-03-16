import { ReactHTMLElement, useEffect, useState } from 'react';
import { icp_agro_deals_backend } from 'declarations/icp_agro_deals_backend';
import { Deal } from 'declarations/icp_agro_deals_backend/icp_agro_deals_backend.did';

function App() {
  const [deals, setDeals] = useState<Deal[]>([]);

  const refreshDeals = () => {
    icp_agro_deals_backend.list(BigInt(0)).then((result: any) => {
      setDeals(result.ok);
    });
  };

  const changeStatus = (index: number, deal: Deal) => {
    icp_agro_deals_backend
      .changeStatus(BigInt(index), BigInt(+deal.status.toString() + 1))
      .then((result: any) => {
        setDeals(result.ok);
      });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    icp_agro_deals_backend
      .createDeal(
        'from fe',
        'from fe',
        [{ description: '1', number: BigInt(100) }],
        BigInt(1000)
      )
      .then(() => {
        console.log('deal created');
      })
      .catch((err) => {
        console.error(err);
      });
    return false;
  }

  useEffect(() => {
    refreshDeals();
  }, []);

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <button type="submit">Create Deal!</button>
      </form>
      <button onClick={refreshDeals}>Refresh deals list!</button>
      <section id="greeting">
        {deals &&
          deals.map((deal, index) => (
            <p key={index}>
              {deal.name} - {deal.status.toString()}{' '}
              <button onClick={() => changeStatus(index, deal)}>
                Next Milestone
              </button>
            </p>
          ))}
      </section>
    </main>
  );
}

export default App;
