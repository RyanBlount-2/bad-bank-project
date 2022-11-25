function Balance() {
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
   let accountBalance = 'Please login to view your account balance.';
   ctx.users.map((element, index, array) => {
      if (element.loggedIn === true) {
         accountBalance = 'Your current account balance is: $' + element.balance;
      }
   });

   // Define states.
   let [balance, setBalance] = useState(accountBalance);
   let [error, setError] = useState('');
   let [data, setData] = useState('');

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
            id="balance"
            header="Balance"
            body={(
               <div>
                  <div>
                     <h5>{accountBalance}</h5>
                  </div>
               </div>
            )}
            status={error}
         />
      </>
   );
}
