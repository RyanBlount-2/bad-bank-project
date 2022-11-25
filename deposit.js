function Deposit() {
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
      // If the user has a valid account, set the transaction value and enable the deposit button.
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
               console.log('Deposits Must Be Positive Amounts');
               alert('Deposits Must Be Positive Amounts');
               setError(`Invalid Input. Deposits must be positive amounts. Please enter a valid amount to proceed.`);
               setButton(true);
               // Set the error message to the default value after the specified time.
               setTimeout(() => {setError(''), setButton(false)}, 3000);
            }
         }
      });
      // ctx.users.map((element, index, array) => {
      //    if (element.loggedIn === true && e.target.value != Number) {
      //       setTransaction(0);
      //       console.log('Input Values Must Be A Number');
      //       alert('Input Values Must Be A Number');
      //       setError(`Invalid Input. Input values must be a number. Please enter a valid amount to proceed.`);
      //       setButton(true);
      //       // Set the error message to the default value after the specified time.
      //       setTimeout(() => {setError(''), setButton(false)}, 3000);
      //    }
      // });
      // If the user does not have a valid account, do not let the user enter a value.
      if (!validAccount) {
         let userInput = document.getElementById('deposit-amount');
         userInput.value = '';
      }
   };

   // Function that handles submission of the input clicks.
   let handleSubmit = (e) => {
      // Calculate the updated balance.
      let updatedBalance = Number(balance) + Number(transaction);
      // Update the balance context.
      ctx.users.map((element, index, array) => {
         if (element.loggedIn === true) {
            element.balance = updatedBalance;
            let url = `/account/deposit/${element.email}/${element.balance}`;
            (async () => {
               let res = await fetch(url);
               let data = await res.json();
               console.log(data);
            })();
         }
      });
      // Update the balance state.
      setBalance(updatedBalance);
      e.preventDefault();
      setError(`Transaction Successful. Your deposit of $${transaction} has been submitted. Your new account balance is: $${updatedBalance}.`);
      setButton(true);
      // Set the error message to the default value after the specified time.
      setTimeout(() => {setError(''), setButton(false)}, 3000);
      // Log data.
      console.log(`Previous Balance: $${accountBalance}`);
      console.log(`Deposited: $${transaction}`);
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
            id="deposit"
            header="Deposit"
            body={(
               <div>
                  <div>
                     <h5>Account Balance: ${accountBalance}</h5>
                  </div>
                  <br/>
                  <div>
                     <form onSubmit={handleSubmit}>
                        <h6>Deposit Amount:</h6>
                        <input id="deposit-amount" type="number" onChange={handleChange} placeholder="Enter $ Amount"/>
                        <br/><br/>
                        <button className="btn btn-light" type="submit" disabled={button}>Deposit</button>
                     </form>
                  </div>
               </div>
            )}
            status={error}
         />
      </>
   );
}
