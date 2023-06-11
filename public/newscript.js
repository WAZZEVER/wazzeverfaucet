const outButton = document.getElementById('logout');
const inButton = document.getElementById('login');
const userName = document.getElementById('username');
const claimcoin = document.getElementById('claimcoin');

var firebaseConfig = {
  apiKey: "AIzaSyDbCzXFmL3Hyex2uzwiYRaWNvPCWJLudDU",
  authDomain: "testwazz-460a6.firebaseapp.com",
  projectId: "testwazz-460a6",
  storageBucket: "testwazz-460a6.appspot.com",
  messagingSenderId: "226425030359",
  appId: "1:226425030359:web:718330be5829d30fab9292",
  measurementId: "G-TWQL3V0EVE"
};

var userEmail; // Declare the userEmail variable

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// Set up Google provider for Firebase Authentication
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is logged in
    userEmail = user.email; // Assign the email value to userEmail

    var userRef = db.collection('faucet').doc(userEmail);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        const tokenbal = doc.data().balance;
        const coinbal = doc.data().token;
        document.getElementById("wazztoken").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Wazz Token: ${tokenbal}`
        document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: ${coinbal}`

      } else {

        document.getElementById("wazztoken").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Wazz Token: 0`
        document.getElementById("coin").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg> Coin: ${coinbal}`

      }
    })
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";
    userName.textContent = `${userEmail}`;
    document.getElementById("pic").src = user.photoURL;
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    userName.textContent = 'Not logged in!';
    document.getElementById("pic").src = "https://th.bing.com/th/id/R.9f0b428f466adad9b39f553a004efb2e?rik=syrpeNnxLeFYjg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_83486.png&ehk=9xpQAl0bzAu0Dih5xrvddlyRzSB05za79%2f64VtPMslQ%3d&risl=&pid=ImgRaw&r=0";
  }
});


// Logout button click event
outButton.addEventListener('click', function() {
  Swal.fire({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      firebase.auth().signOut().then(() => {
        console.log("User signed out successfully");
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been logged out successfully!'
        });
      }).catch((error) => {
        console.log(error.message);
      });
    }
  });
});


// Login button click event
inButton.addEventListener('click', function() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("User signed in successfully");
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: 'You have been logged in successfully!'
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'An error occurred during the login process. Please try again.'
      });
    });
});

// Get the profile dropdown element
const profileDropdown = document.getElementById('profileDropdown');
// Get the profile link element
const profileLink = document.getElementById('profileLink');

// Add a click event listener to the profile link
profileLink.addEventListener('click', function() {
  // Toggle the is-active class on the profile dropdown
  profileDropdown.classList.toggle('is-active');
});

var claimButton = document.getElementById('claimcoin');

// Add a click event listener to the button
claimButton.addEventListener('click', function() {
  if (userEmail === null) {
    alert("Please login first!");
  } else {
    // Add 1 token to the user's balance in the database
    var db = firebase.firestore();
    var userRef = db.collection('faucet').doc(userEmail);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        var currentBalance = doc.data().balance || 0;
        var currentToken = doc.data().token || 0; // Get the current token value or default to 0
        var faucool = doc.data().faucool || null; // Get the current cooldown value or null if not set
        if (currentBalance < 1) {
          alert("Not enough coin!");
        } else if (faucool !== null && faucool > Date.now()) {
          var remainingCooldown = Math.ceil((faucool - Date.now()) / (1000 * 60 * 60)); // Convert milliseconds to hours
          alert("Please wait for " + remainingCooldown + " more hours before claiming again!");
        } else {
          var newBalance = currentBalance - 1;
          var newToken = currentToken + 1;
          var cooldownTime = Date.now() + (1 * 60 * 60 * 1000); // Set the cooldown to 5 hours from now
          userRef.update({
            balance: newBalance,
            token: newToken,
            faucool: cooldownTime
          })
            .then(function() {
              alert('Token added successfully');
              updateTimer(faucool); // Update the timer with the stored cooldown value
            })
            .catch(function(error) {
              console.log('Error updating balance:', error);
            });
        }
      } else {
        alert("User does not exist!");
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
  var userRef = db.collection('faucet').doc(userEmail);
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


// Add a click event listener to the withdraw button
var withdrawButton = document.getElementById('withdrawButton');
withdrawButton.addEventListener('click', function() {
  var discordId = document.getElementById('discordIdInput').value;
  var coinAmount = parseInt(document.getElementById('coinAmountInput').value);

  if (userEmail === null) {
    alert("Please login first!");
  } else if (coinAmount <= 0) {
    alert("Invalid coin amount!");
  } else {
    var db = firebase.firestore();
    var userRef = db.collection('faucet').doc(userEmail);

    userRef.get().then(function(doc) {
      if (doc.exists) {
        var currentBalance = doc.data().token || 0;

        if (currentBalance < coinAmount) {
          alert("Not enough coins!");
        } else {
          // Subtract the coin amount from the user's balance
          var newBalance = currentBalance - coinAmount;
          userRef.update({
            token: newBalance
          }).then(function() {
            // Add the withdrawal to the Discord faucet collection
            var discordFaucetRef = db.collection('discordfaucet').doc(discordId);

            discordFaucetRef.get().then(function(doc) {
              if (doc.exists) {
                var existingCoinAmount = doc.data().coinAmount || 0;
                coinAmount += existingCoinAmount; // Add the existing coinAmount to the new coinAmount
              }

              discordFaucetRef.set({
                userId: discordId,
                coinAmount: coinAmount
              }, { merge: true }).then(function() {
                console.log('Withdrawal added successfully');
                alert("Withdrawal successful! Coins will be sent to your Discord balance.");
              }).catch(function(error) {
                console.log('Error adding withdrawal:', error);
              });
            });
          }).catch(function(error) {
            console.log('Error updating balance:', error);
          });
        }
      } else {
        alert("User does not exist!");
      }
    });
  }
});
