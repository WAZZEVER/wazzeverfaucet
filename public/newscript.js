const outButton = document.getElementById('logout');
const inButton = document.getElementById('login');
const userName = document.getElementById('username');

var firebaseConfig = {
  apiKey: "AIzaSyDbCzXFmL3Hyex2uzwiYRaWNvPCWJLudDU",
  authDomain: "testwazz-460a6.firebaseapp.com",
  projectId: "testwazz-460a6",
  storageBucket: "testwazz-460a6.appspot.com",
  messagingSenderId: "226425030359",
  appId: "1:226425030359:web:718330be5829d30fab9292",
  measurementId: "G-TWQL3V0EVE"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();



var disin = false;
var ididscordid;

window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = fragment.get('access_token');
  const tokenType = fragment.get('token_type');

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
        const { username, discriminator } = data;
        document.getElementById('info').innerText = `${username}#${discriminator}`;
        disin = true;
        ididscordid = `${username}#${discriminator}`

        var userRef = db.collection('faucet').doc(ididscordid);
        userRef.get().then(function(doc) {
          if (doc.exists) {
            const coinbal = doc.data().token;
            document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: ${coinbal}`

          } else {

            document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: 0`

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
          const { username, discriminator } = data;
          document.getElementById('info').innerText = `${username}#${discriminator}`;
          disin = true;
          ididscordid = `${username}#${discriminator}`

          var userRef = db.collection('faucet').doc(ididscordid);
          userRef.get().then(function(doc) {
            if (doc.exists) {
              const coinbal = doc.data().token;
              document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: ${coinbal}`

            } else {

              document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: 0`

            }
          })
          // Show the logout button
          document.getElementById('logoutdis').style.display = 'inline';
        })
        .catch(console.error);
    } else {
      // Show the login link if access token and token type are not present
      document.getElementById('logindis').style.display = 'block';
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


// Get the profile dropdown element
const profileDropdown = document.getElementById('profileDropdown');
// Get the profile link element
const profileLink = document.getElementById('profileLink');

// Add a click event listener to the profile link
profileLink.addEventListener('click', function() {
  // Toggle the is-active class on the profile dropdown
  profileDropdown.classList.toggle('is-active');
});

function generateMixedString() {
  // Generate three random letters
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomLetters = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomLetters += letters[randomIndex];
  }

  // Generate three random numbers
  let randomNumbers = '';
  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    randomNumbers += randomNumber;
  }

  // Mix the letters and numbers together
  const mixedString = randomLetters + randomNumbers;

  return mixedString;
}


var generaterefdis = document.getElementById('generaterefdis');
// Add a click event listener to the button
generaterefdis.addEventListener('click', function() {
  if (disin === false) {
    alert("Please login first!");
  } else {
    // Add 1 token to the user's balance in the database
    var db = firebase.firestore();
    var userRef = db.collection('faucet').doc(ididscordid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        var reffcd = doc.data().refferalcode || null;

        if (reffcd === null) {
          const refcode = generateMixedString();
          userRef.set({ refferalcode: refcode }, { merge: true }) // Use merge option to avoid overwriting other fields
            .then(function() {
              alert(`You don't have a referral code. Now your referral code is: ${refcode}`);
              window.location.reload();
            })
            .catch(function(error) {
              console.log('Error setting referral code:', error);
            });
        } else {
          alert(`Your referral code is: ${reffcd}`);
        }
      } else {
        const refcode = generateMixedString();
        userRef.set({ refferalcode: refcode }, { merge: true }) // Use merge option to avoid overwriting other fields
          .then(function() {
            alert(`You don't have a referral code. Now your referral code is: ${refcode}`);
            window.location.reload();
          })
          .catch(function(error) {
            console.log('Error setting referral code:', error);
          });
      }
    });
  }
});


var claimButton = document.getElementById('claimcoin');

// Add a click event listener to the button
claimButton.addEventListener('click', function() {
  if (disin === false) {
    alert("Please login first!");
  } else {
    var db = firebase.firestore();
    var userRef = db.collection('faucet').doc(ididscordid);

    userRef.get().then(function(doc) {
      if (doc.exists) {
        var currentToken = doc.data().token || 0;
        var faucool = doc.data().faucool || null;
        var refby = doc.data().refferalby || null;

        if (refby === null) {
          const refferralCodeBy = prompt("Please enter the referral code of the person who referred you:");
          if (refferralCodeBy !== null && refferralCodeBy.trim() !== '') {
            const collectionRef = db.collection("faucet");

            collectionRef.get().then((querySnapshot) => {
              let referralCodeExists = false;
              var referralDocId;
              querySnapshot.forEach((doc) => {
                const docData = doc.data();
                const fieldValues = Object.values(docData);
                if (fieldValues.includes(refferralCodeBy)) {
                  referralCodeExists = true;
                  referralDocId = doc.id; // Store the referral document ID
                  console.log('Referral code exists in document:', referralDocId);
                  if (doc.id === ididscordid) {
                    alert("You cannot use your own referral code!");
                    return; // Stop execution if the user entered their own referral code
                  } else {
                    var refbyuser = db.collection('faucet').doc(doc.id);

                    refbyuser.get().then(function(doc) {
                      var referralCoinBalance = doc.data().token || 0;
                      refbyuser.update({
                        token: referralCoinBalance + 1
                      }).then(function() {
                        console.log('Referral user token incremented successfully');
                      }).catch(function(error) {
                        console.error('Error incrementing referral user token:', error);
                      });

                    })

                    userRef.set({
                      refferalby: refferralCodeBy,
                      refferalemailby: referralDocId
                    }, { merge: true }).then(() => {
                      alert('Referral code set successfully.');

                      // Additional logic
                      if (faucool !== null && faucool > Date.now()) {
                        var remainingCooldown = Math.ceil((faucool - Date.now()) / (1000 * 60 * 60));
                        alert("Please wait for " + remainingCooldown + " more hours before claiming again!");
                      } else {
                        var newToken = currentToken + 1;
                        var cooldownTime = Date.now() + (24 * 60 * 60 * 1000);

                        userRef.update({
                          token: newToken,
                          faucool: cooldownTime
                        }, { merge: true }).then(function() {
                          console.log("1")
                          alert('Token added successfully');
                          updateTimer(faucool);
                          location.reload();
                        }).catch(function(error) {
                          console.log('Error updating balance:', error);
                        });
                      }
                    }).catch((error) => {
                      console.error('Error setting referral code:', error);
                    });
                  }
                }
              });

              if (!referralCodeExists) {
                alert("Invalid referral code");
                console.log('Referral code does not exist in the collection.');
              }
            }).catch((error) => {
              console.error('Error checking referral code:', error);
            });
          }
        } else {
          if (faucool !== null && faucool > Date.now()) {
            var remainingCooldown = Math.ceil((faucool - Date.now()) / (1000 * 60 * 60));
            alert("Please wait for " + remainingCooldown + " more hours before claiming again!");
          } else {



            var refmailby = doc.data().refferalemailby || null;

            if (refmailby !== null && refmailby !== '') {
              var collectingemail = db.collection('faucet').doc(refmailby);

              collectingemail.get().then(function(doc) {
                var referralCoinBalance = doc.data().token || 0;
                collectingemail.update({
                  token: referralCoinBalance + 1
                }).then(function() {
                  console.log('Referral user token incremented successfully');
                }).catch(function(error) {
                  console.error('Error incrementing referral user token:', error);
                });
              }).catch((error) => {
                console.error('Error setting referral code:', error);
              });
            } else {
              console.error('Invalid value for refmailby:', refmailby);
              // Handle the error appropriately...
            }


            var newToken = currentToken + 1;
            var cooldownTime = Date.now() + (24 * 60 * 60 * 1000);


            userRef.update({
              token: newToken,
              faucool: cooldownTime
            }, { merge: true }).then(function() {
              console.log("2")
              alert('Token added successfully');
              updateTimer(faucool);
              location.reload();
            }).catch(function(error) {
              console.log('Error updating balance:', error);
            });
          }
        }

      } else {
        const refferralCodeBy = prompt("Please enter the referral code of the person who referred you:");
        if (refferralCodeBy !== null && refferralCodeBy.trim() !== '') {
          const collectionRef = db.collection("faucet");

          collectionRef.get().then((querySnapshot) => {
            let referralCodeExists = false;
            let referralDocId = null; // Variable to store the referral document ID
            querySnapshot.forEach((doc) => {
              const docData = doc.data();
              const fieldValues = Object.values(docData);
              if (fieldValues.includes(refferralCodeBy)) {
                referralCodeExists = true;
                referralDocId = doc.id; // Store the referral document ID
                console.log('Referral code exists in document:', referralDocId);
                if (doc.id === ididscordid) {
                  alert("You cannot use your own referral code!");
                  return; // Stop execution if the user entered their own referral code
                } else {


                  var refbyuser = db.collection('faucet').doc(doc.id);

                  refbyuser.get().then(function(doc) {
                    var referralCoinBalance = doc.data().token || 0;
                    refbyuser.update({
                      token: referralCoinBalance + 1
                    }).then(function() {
                      console.log('Referral user token incremented successfully');
                    }).catch(function(error) {
                      console.error('Error incrementing referral user token:', error);
                    });

                  })
                  userRef.set({
                    refferalby: refferralCodeBy,
                    refferalemailby: referralDocId
                  }, { merge: true }).then(() => {
                    alert('Referral code set successfully.');

                    // Additional logic
                    if (faucool !== null && faucool > Date.now()) {
                      var remainingCooldown = Math.ceil((faucool - Date.now()) / (1000 * 60 * 60));
                      alert("Please wait for " + remainingCooldown + " more hours before claiming again!");
                    } else {
                      var newToken = 1;
                      var cooldownTime = Date.now() + (2 * 60 * 60 * 1000);

                      userRef.update({
                        token: newToken,
                        faucool: cooldownTime
                      }, { merge: true }).then(function() {
                        console.log("3")
                        alert('Token added successfully');
                        updateTimer(faucool);
                        location.reload();
                      }).catch(function(error) {
                        console.log('Error updating balance:', error);
                      });
                    }
                  }).catch((error) => {
                    console.error('Error setting referral code:', error);
                  });
                }
              }
            });

            if (!referralCodeExists) {
              alert("Invalid referral code");
              console.log('Referral code does not exist in the collection.');
            }
          }).catch((error) => {
            console.error('Error checking referral code:', error);
          });
        }
      }
    });
  }
});


function updateTimer(cooldownTime) {
  var timerElement = document.getElementById('timerValue');
  var intervalId = setInterval(function() {
    var remainingTime = Math.ceil((cooldownTime - Date.now()) / 1000); // Convert milliseconds to seconds

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timerElement.textContent = '0:00';
    } else {
      var minutes = Math.floor(remainingTime / 60);
      var seconds = remainingTime % 60;
      timerElement.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  }, 1000);
}

function timerch() {
  var db = firebase.firestore();
  var userRef = db.collection('faucet').doc(ididscordid);
  userRef.get().then(function(doc) {
    if (doc.exists) {
      var faucool = doc.data().faucool || null;
      if (faucool !== null && faucool > Date.now()) {
        updateTimer(faucool); // Update the timer with the stored cooldown value
      } else {
        updateTimer(0); // If the cooldown is expired or not set, show 0:00 on the timer
      }
    }
  });
}

timerch(); // Call the timerch() function on page load
setTimeout(timerch, 2000); // Call timerch() function every 5 seconds
