function Withdraw() {
   // Destructure React hooks.
   let {useState, useEffect} = React;

   // Access context.
   let ctx = React.useContext(UserContext);

   // Indicate user if logged in.
   let loginStatus = 'No User Logged In';
   ctx.users.map((element, index, array) => {
      if (element.loggedIn === true) {
         loginStatus = 'Welcome, ' + element.name;
      }
   });

   // Define the account balance for the user that is logged in.
   let accountBalance;
   ctx.users.map((element, index, array) => {
      if (element.loggedIn === true) {
         accountBalance = element.balance;
      }
   });

   // Define states.
   let [balance, setBalance] = useState(accountBalance);
   let [transaction, setTransaction] = useState(0);
   let [button, setButton] = useState(true);
   let [error, setError] = useState('');
   let [data, setData] = useState('');

   // Function that handles changes to the input data.
   let handleChange = (e) => {
      let validAccount = false;
      // If the user has a valid account, set the transaction value and enable the withdraw button.
      ctx.users.map((element, index, array) => {
         if (element.loggedIn === true && e.target.value > 0) {
            validAccount = true;
            setTransaction(Number(e.target.value));
            setButton(false);
         }
      });
      // If the user has a valid account but enters an invalid (negative) number, define the default input value and notify the user that the input value cannot be negative.
      ctx.users.map((element, index, array) => {
         if (element.loggedIn === true && e.target.value <= 0) {
            if (e.target.value < 0) {
               setTransaction(0);
               console.log('Withdrawals Must Be Positive Amounts');
               alert('Withdrawals Must Be Positive Amounts');
               setError(`Invalid Input. Withdrawals must be positive amounts. Please enter a valid amount to proceed.`);
               setButton(true);
               // Set the error message to the default value after the specified time.
               setTimeout(() => {setError(''), setButton(false)}, 3000);
            }
         }
      });
      // If the user does not have a valid account, do not let the user enter a value.
      if (!validAccount) {
         let userInput = document.getElementById('withdrawal-amount');
         userInput.value = '';
      }
   };

   // Function that handles submission of the input clicks.
   let handleSubmit = (e) => {
      // Calculate the updated balance.
      let updatedBalance;
      if (balance < transaction) {
         updatedBalance = balance;
         // Update the balance context.
         console.log('Insufficient Funds');
         alert('Insufficient Funds');
         setError(`Transaction Declined. You currently have the account overdraft option disabled, and you do not have sufficient funds in your account, so your withdrawal of $${transaction} could not be submitted. Your current account balance is: $${updatedBalance}.`);
         setButton(true);
         // Set the error message to the default value after the specified time.
         setTimeout(() => {setError(''), setButton(false)}, 3000);
         return;
      }
      else {
         updatedBalance = Number(balance) - Number(transaction);
         // Update the balance context.
         ctx.users.map((element, index, array) => {
            if (element.loggedIn === true) {
               element.balance = updatedBalance;
               let url = `/account/withdraw/${element.email}/${element.balance}`;
               (async () => {
                  let res = await fetch(url);
                  let data = await res.json();
                  console.log(data);
               })();
            }
         });
      }
      setBalance(updatedBalance);
      e.preventDefault();
      setError(`Transaction Successful. Your withdrawal of $${transaction} has been submitted. Your new account balance is: $${updatedBalance}.`);
      setButton(true);
      // Set the error message to the default value after the specified time.
      setTimeout(() => {setError(''), setButton(false)}, 3000);
      console.log(`Previous Balance: $${accountBalance}`);
      console.log(`Withdrew: $${transaction}`);
      console.log(`New Balance: $${updatedBalance}`);
   }

   // Sync the context with the database.
   useEffect(() => {
      fetch('/account/all')
         .then(response => response.json())
         .then(data => {
            setData(JSON.stringify(data));
            ctx.users = data;
         })
   }, []);

   return (
      <>
         <div id="login-status-div">
            <span id="login-status-span">{loginStatus}</span>
         </div>
         <MyCard
            id="withdraw"
            header="Withdraw"
            body={(
               <div>
                  <div>
                     <h5>Account Balance: ${accountBalance}</h5>
                  </div>
                  <br/>
                  <div>
                     <form onSubmit={handleSubmit}>
                        <h6>Withdrawal Amount:</h6>
                        <input id="withdrawal-amount" type="number" onChange={handleChange} placeholder="Enter $ Amount"/>
                        <br/><br/>
                        <button className="btn btn-light" type="submit" disabled={button}>Withdraw</button>
                     </form>
                  </div>
               </div>
            )}
            status={error}
         />
      </>
   );
}
