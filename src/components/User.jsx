import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, updateUsername } from '../features/authSlice';
import '../sass/components/User.scss';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { token, user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  // Charger le profil au montage du composant
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const getUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("CONTENU RÉEL DE L'API :", data.body);
          dispatch(setCredentials(data.body));
        }
      } catch (error) {
        console.error("Erreur profile:", error);
      }
    };

    getUserProfile();
  }, [token, dispatch, navigate]);

  // Synchronise le champ de texte quand on commence à éditer
  useEffect(() => {
    if (isEditing && user) {
      setNewUserName(user.userName || '');
    }
  }, [isEditing, user]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          userName: newUserName
        }) 
      });

      if (response.ok) {
        dispatch(updateUsername(newUserName)); 
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const accountsData = [
    { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { title: "Argent Bank Savings (x1094)", amount: "$10,928.42", description: "Available Balance" },
    { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
  ];

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <form className="edit-user-form" onSubmit={handleSave}>
            <h1>Edit user info</h1>
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input 
                type="text" 
                id="username" 
                value={newUserName} 
                onChange={(e) => setNewUserName(e.target.value)} 
                required
              />
            </div>

            <div className="edit-input">
  <label htmlFor="firstname">First name:</label>
  <input 
    type="text" 
    id="firstname" 
    value={user?.firstName || "Tony"} 
    disabled 
    style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }}
  />
</div>

<div className="edit-input">
  <label htmlFor="lastname">Last name:</label>
  <input 
    type="text" 
    id="lastname" 
    value={user?.lastName || "Stark"} 
    disabled 
    style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }}
  />
</div>
           
            <div className="edit-buttons">
              <button type="submit" className="edit-button-form">Save</button>
              <button type="button" className="edit-button-form" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {user?.userName || user?.firstName}!
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {accountsData.map((account, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            
            <button 
              className="transaction-button"
              onClick={() => navigate(`/account/${index}`)}
            >
              View transactions
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default User;