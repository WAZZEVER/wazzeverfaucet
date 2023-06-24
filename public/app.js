// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbCzXFmL3Hyex2uzwiYRaWNvPCWJLudDU",
  authDomain: "testwazz-460a6.firebaseapp.com",
  databaseURL: "https://testwazz-460a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testwazz-460a6",
  storageBucket: "testwazz-460a6.appspot.com",
  messagingSenderId: "226425030359",
  appId: "1:226425030359:web:bd6e43aa5b15c91dab9292",
  measurementId: "G-9E2CKM9ETJ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


var disin = false;
var ididscordid;

window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  console.log(fragment.toString()); // Log the fragment as a string
  const accessToken = fragment.get('access_token');
  console.log(`access_token=${accessToken}`); // Log the access token
  const tokenType = fragment.get('token_type');
  console.log(`token_type=${tokenType}`); // Log the token type

  // Check if access token and token type are present in the URL fragment
  if (accessToken && tokenType) {
    // Store the access token and token type in browser storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    // Show the logout button
    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const { username, discriminator, id } = data;
        document.getElementById('info').innerText = `${username}`;
        disin = true;
        ididscordid = `${id}`

        var userRef = db.collection('faucet').doc(ididscordid);
        userRef.get().then(function(doc) {
          if (doc.exists) {
            // Start the game
            startGame();
            // Update user email in UI
            updateUserEmail(ididscordid);
            const loggedinto = document.getElementById('loggedinto');
            loggedinto.style.display = "none";

            setTimeout(() => {
              const tokenCountElement1 = document.getElementById('token-count');
              const tokenBalanceElement = document.getElementById('token-balance');
              const wazz = tokenCountElement1.textContent
              tokenBalanceElement.textContent = `Token Balance: ${wazz}`;
            }, 3000);

          } else {


          }
        })
      })

    document.getElementById('logoutdis').style.display = 'inline';
  } else {
    // Retrieve the access token and token type from browser storage
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedTokenType = localStorage.getItem('tokenType');

    // Check if access token and token type are present in browser storage
    if (storedAccessToken && storedTokenType) {
      // Use the stored access token and token type
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${storedTokenType} ${storedAccessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const { username, discriminator, id } = data;
          document.getElementById('info').innerText = `${username}`;
          disin = true;
          ididscordid = `${id}`

          var userRef = db.collection('faucet').doc(ididscordid);
          userRef.get().then(function(doc) {
            if (doc.exists) {
              // Start the game
              startGame();
              // Update user email in UI
              updateUserEmail(ididscordid);
              const loggedinto = document.getElementById('loggedinto');
              loggedinto.style.display = "none";

              setTimeout(() => {
                const tokenCountElement1 = document.getElementById('token-count');
                const tokenBalanceElement = document.getElementById('token-balance');
                const wazz = tokenCountElement1.textContent
                tokenBalanceElement.textContent = `Token Balance: ${wazz}`;
              }, 3000);


            } else {


            }
          })
          // Show the logout button
          document.getElementById('logoutdis').style.display = 'inline';
        })
        .catch(console.error);
    } else {
      // Show the login link if access token and token type are not present
      document.getElementById('logindis').style.display = 'block';
      // User is signed out
      // Reset UI and clear user data
      updateTokenBalance(0);
      updateMinerExpiration(null);
      // Update user email in UI
      updateUserEmail("Anonymous");
    }
  }
};

// Logout function
function logout() {
  // Clear access token and token type from browser storage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenType');
  // Hide the logout button
  document.getElementById('logoutdis').style.display = 'none';
  // Show the login link
  document.getElementById('logindis').style.display = 'block';
  // Reset the info text
  document.getElementById('info').innerText = 'Hoi!';

  window.location.reload()
}

// Update user email in UI
function updateUserEmail(email) {
  const userEmailElement = document.getElementById('user-email');
  if (userEmailElement) {
    userEmailElement.textContent = email;
  }
}

// Update token balance in UI
function updateTokenBalance(balance) {
  const tokenBalanceElement = document.getElementById('token-balance');
  if (tokenBalanceElement) {
    tokenBalanceElement.textContent = `Token Balance: ${balance}`;
  }
}

// Update token count in UI
function updateTokenCount(tokenCount) {
  const tokenCountElement = document.getElementById('token-balance');
  if (tokenCountElement) {
    tokenCountElement.textContent = `Token Balance: ${tokenCount}`;
  }
}

// Save user information to Firebase
function saveUserData() {
  if (disin) {
    db.collection('wazz').doc(ididscordid).set({
      tokenCount: 10,
      minerExpiration: null
    })
      .then(() => {
        console.log('User data saved to Firebase.');
        const tokenCountElement1 = document.getElementById('token-count');
        tokenCountElement1.textContent = "10";
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
      });
  }
}

// Retrieve user information from Firebase
function getUserData() {
  if (disin) {
    db.collection('wazz').doc(ididscordid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          // Update token count and miner expiration in UI
          updateTokenCount(data.tokenCount);
          updateMinerExpiration(data.minerExpiration);
        } else {
          // User document does not exist, save the user data
          saveUserData();
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }
}

// Function to mine tokens manually
function mineManually() {
  if (disin) {
    db.collection('wazz').doc(ididscordid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const minerExpiration = data.minerExpiration;

          const incrementValue = 1; // Increment value for manual clicks
          const newTokenCount = data.tokenCount + incrementValue;
          db.collection('wazz').doc(ididscordid).update({
            tokenCount: newTokenCount
          })
            .then(() => {
              updateTokenCount(newTokenCount);
            })
            .catch((error) => {
              console.error('Error updating token count:', error);
            });
        } else {
          console.log('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }
}

// Function to mine tokens automatically
function mineAutomatically() {
  if (disin) {
    db.collection('wazz').doc(ididscordid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const minerExpiration = data.minerExpiration;

          if (!minerExpiration || minerExpiration < Date.now()) {
            console.log('No active miner or the existing miner has expired.');
            return; // Exit the function if there is no active miner
          }

          const incrementValue = 1000; // Increment value for automatic increments
          const newTokenCount = data.tokenCount + incrementValue;
          db.collection('wazz').doc(ididscordid).update({
            tokenCount: newTokenCount
          })
            .then(() => {
              updateTokenCount(newTokenCount);
              const tagElement = document.querySelector(".tag.is-warning");

              // Function to show the tag element
              function showTagElement() {
                tagElement.style.display = "inline-block";
              }

              // Function to hide the tag element
              function hideTagElement() {
                tagElement.style.display = "none";
              }


            })
            .catch((error) => {
              console.error('Error updating token count:', error);
            });
        } else {
          console.log('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }
}


function showMessage() {
  mineManually();
  createNotification()
}

// Call mineAutomatically function to start automatic mining
mineAutomatically();

// Update token count in UI
function updateTokenCount(tokenCount) {
  const tokenCountElement = document.getElementById('token-count');
  if (tokenCountElement) {
    tokenCountElement.textContent = tokenCount.toString();
  }
}

// Update miner expiration in UI
function updateMinerExpiration(minerExpiration) {
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    if (minerExpiration) {
      const now = Date.now();
      const remainingTime = Math.max(minerExpiration - now, 0);
      updateTimerDisplay(remainingTime);

      // Start a timer to update the countdown every second
      setInterval(() => {
        const remainingTime = Math.max(minerExpiration - Date.now(), 0);
        updateTimerDisplay(remainingTime);
      }, 1000);
    } else {
      timerElement.textContent = 'Expired';
    }
  }
}

// Helper function to update the timer display
function updateTimerDisplay(remainingTime) {
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Start the game
function startGame() {
  // Retrieve user data from Firebase
  getUserData();

  // Start the token mining timer
  setInterval(() => {
    mineAutomatically();
  }, 100000); // 0.1 seconds

  // Background timer to continue mining tokens even when the website is closed
  setInterval(() => {
    if (disin) {
      mineAutomatically();
    }
  }, 100000); // 0.1 seconds
}


// Event listener for buying a new miner
document.getElementById('buy-miner-btn').addEventListener('click', () => {
  if (disin) {
    db.collection('wazz').doc(ididscordid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const minerExpiration = data.minerExpiration;

          if (!minerExpiration || minerExpiration < Date.now()) {
            if (data.tokenCount >= 10) {
              // Sufficient tokens to buy a new miner
              db.collection('wazz').doc(ididscordid).update({
                minerExpiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
                tokenCount: data.tokenCount - 10 // Deduct 10 tokens for buying the miner
              })
                .then(() => {
                  console.log('Miner bought successfully.');
                  // Update miner expiration in UI
                  updateMinerExpiration(Date.now() + 24 * 60 * 60 * 1000);
                  // Update token count in UI
                  updateTokenCount(data.tokenCount - 10);
                })
                .catch((error) => {
                  console.error('Error buying miner:', error);
                });
            } else {
              alert('Insufficient tokens to buy a new miner.');
            }
          } else {
            alert('Cannot buy a new miner. Existing miner still active.');
          }
        } else {
          alert('User document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }
});

