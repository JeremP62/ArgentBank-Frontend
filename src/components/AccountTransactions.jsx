import React from 'react';
import { useParams } from 'react-router-dom';
import { ACCOUNTS_DATA } from '../data'; 
import TransactionItem from './TransactionItem';
import '../sass/components/AccountTransactions.scss';

const AccountTransactions = () => {
  const { id } = useParams();
  const account = ACCOUNTS_DATA[id]; 

  if (!account) {
    return (
      <main className="main bg-dark-transactions">
        <h1 style={{color: 'white'}}>Account not found</h1>
      </main>
    );
  }

  return (
    <main className="main bg-dark-transactions">
     
      <section className="account-details-header">
        <h3 className="account-title">{account.title}</h3>
        <p className="account-amount">{account.amount}</p>
        <p className="account-amount-description">{account.description}</p>
      </section>

      
      <section className="transactions-section">
        <div className="transactions-header">
          <div className="header-item"></div>
          <div className="header-item">DATE</div>
          <div className="header-item">DESCRIPTION</div>
          <div className="header-item">AMOUNT</div>
          <div className="header-item">BALANCE</div>
        </div>
        
        <div className="transactions-list">
          {account.transactions.map((tx, index) => (
            <TransactionItem key={index} data={tx} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AccountTransactions;