import React from 'react';
import Banner from '../components/Banner';
import Item from '../components/Item';
import iconChat from '../assets/icons/icon-chat.png';
import iconMoney from '../assets/icons/icon-money.png';
import iconSecurity from '../assets/icons/icon-security.png';

function Home() {
  return (
    <main>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        
        
        <Item 
          icon={iconChat} 
          title="You are our #1 priority" 
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes." 
        />

        
        <Item 
          icon={iconMoney} 
          title="More savings means higher rates" 
          description="The more you save with us, the higher your interest rate will be!" 
        />

        
        <Item 
          icon={iconSecurity} 
          title="Security you can trust" 
          description="We use top of the line encryption to make sure your data and money is always safe." 
        />
      </section>
    </main>
  );
}

export default Home;