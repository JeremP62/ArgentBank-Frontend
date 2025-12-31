import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, updateUsername } from '../features/authSlice';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { token, user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  console.log("REACT VOIT DANS REDUX :", user?.userName);
  console.log("État complet user:", user);

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
          dispatch(setCredentials(data.body));
        }
      } catch (error) {
        console.error("Erreur profile:", error);
      }
    };

    getUserProfile();
  }, [token, dispatch, navigate]);

  // Synchronise le champ de texte avec Redux quand on commence à éditer
  useEffect(() => {
    if (isEditing && user) {
      setNewUserName(user.userName || '');
    }
  }, [isEditing, user]);

  // Save le nouveau pseudo (LOCAL SEULEMENT - sans backend)
  const handleSave = (e) => {
    e.preventDefault();
    console.log("🔵 Changement local du userName:", newUserName);
    
    // Mise à jour locale dans Redux + localStorage
    dispatch(updateUsername(newUserName));
    setIsEditing(false);
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
              <label>First name:</label>
              <input type="text" value={user?.firstName || ''} disabled className="input-disabled" />
            </div>
            <div className="edit-input">
              <label>Last name:</label>
              <input type="text" value={user?.lastName || ''} disabled className="input-disabled" />
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
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default User;