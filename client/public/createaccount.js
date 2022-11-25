function CreateAccount() {
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

   // Define states.
   let [name, setName] = useState('');
   let [email, setEmail] = useState('');
   let [password, setPassword] = useState('');
   let [createbutton, setcreateButton] = useState(true);
   let [deletebutton, setdeleteButton] = useState(true);
   let [display, setDisplay] = useState(true);
   let [error, setError] = useState('');
   let [data, setData] = useState('');

   // Define other variables.
   let balance = 0;
   let loggedIn = false;
   let displayed = false;

   // Set button status.
   function changeButtonStatus(input, field) {
      // This section makes the button status very responsive to the last input the user typed.
      switch(field) {
         case 'name':
            name = input;
            break;
         case 'email':
            email = input;
            break;
         case 'password':
            password = input;
            break;
         default:
            break;
      }

      // If all form fields have input, enable the Create Account button. If email field matches an existing account, disable the Create Account button. If administrator, enable the Create Account and Delete Account buttons.
      let inputName = document.getElementById('name').value;
      let inputEmail = document.getElementById('email').value;
      let inputPassword = document.getElementById('password').value;
      let disableCreateAccount = false;
      let adminUser = false;
      let disableDeleteAccount = true;

      ctx.users.map((element, index, array) => {
         if (element.email == inputEmail) {
            disableCreateAccount = true;
         }
         if (element.email == 'admin@badbank.com' && element.loggedIn == true) {
            adminUser = true;
         }
      });

      if (disableCreateAccount == false) {
         if (name && email && password.length > 7) {
            disableCreateAccount = false;
         }
         else {
            disableCreateAccount = true;
         }
      }

      if (adminUser == true && email != 'admin@badbank.com') {
         if (name && email && password.length > 7) {
            ctx.users.map((element, index, array) => {
               if (element.name == inputName && element.email == inputEmail && element.password == inputPassword) {
                  disableDeleteAccount = false;
               }
            });
         }
      }

      setcreateButton(disableCreateAccount);
      setdeleteButton(disableDeleteAccount);
   }

   // Validate the form field submissions.
   function validate(input, field) {
      // Does not validate the form field and throws an error if the form field is blank or the user fills in the form field incorrectly.
      if (!input) {
         // Set the error message.
         setError('Error: ' + field + ' field must not be left blank.');
         // Set the error message to the default value after the specified time.
         setTimeout(() => setError(''), 3000);
         return false;
      }
      if (input) {
         let length = input.length;
         if (length > 0 && length < 8 && field === 'Password') {
            setError('Error: Password field must contain at least 8 characters.');
            setTimeout(() => setError(''), 3000);
            return false;
         }
      }
      if (input) {
         ctx.users.map((element, index, array) => {
            if (element.email == input) {
               setError('Error: An account already exists for this user email. Please enter a new email to create an account.');
               setTimeout(() => setError(''), 3000);
               return false;
            }
         });   
      }
      setError('');
      // Validates the form field if the user fills in the form field correctly.
      return true;
   }

   function validateField(input, field) {
      // If the form fields all validate, an account is created and an error is not thrown.
      switch(field) {
         case 'name':
            name = input;
            if (validate(name, 'Name')) return;      
            break;
         case 'email':
            email = input;
            if (validate(email, 'Email')) return;      
            break;
         case 'password':
            password = input;
            if (validate(password, 'Password')) return;
            break;
         default:
            break;
      }
   }

   // Handles the creation of a new account.
   function handleCreate() {
      // ctx.users.push({name, email, password, balance, loggedIn, displayed});
      let url = `/account/create/${name}/${email}/${password}/${balance}/${loggedIn}/${displayed}`;
      (async () => {
         let res = await fetch(url);
         let data = await res.json();
         console.log(data);
      })();
      console.log(`Congratulations, ${name}. Your new account has been created.`);
      alert(`Congratulations, ${name}. Your new account has been created.`);
      // Toggle the display to notify the user of the new account being created successfully.
      setDisplay(false);
   }

   function handleDelete() {
      // ctx.users.map((element, index, array) => {
      //    if (element.email == email) {
      //       let newCTX = array.slice(index);
      //       ctx.users = newCTX;
      //    }
      // });
      let url = `/account/remove/${email}`;
      (async () => {
         let res = await fetch(url);
         let data = await res.json();
         console.log(data);
      })();
      console.log(`${name}, your account has been deleted.`);
      alert(`${name}, your account has been deleted.`);
      // Toggle the display to notify the user of the new account being created successfully.
      setDisplay(false);
   }

   // Clears the form fields.
   function clearForm() {
      // Toggle the display to allow the user to create a new account and reset the form fields.
      setName('');
      setEmail('');
      setPassword('');
      setcreateButton(true);
      setdeleteButton(true);
      setDisplay(true);
      setError('');
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
            id="create-account"
            header="Manage Account"
            status={error}
            body={display ? (
               <>
                  {/* Section for entering name. */}
                  Name
                  <br/>
                  <input id="name" className="form-control" type="input" placeholder="Enter Name" value={name} onChange={(e) => {setName(e.currentTarget.value); validateField(e.currentTarget.value, 'name'); changeButtonStatus(e.currentTarget.value, 'name')}}/><br/>
                  {/* Section for entering email. */}
                  Email
                  <br/>
                  <input id="email" className="form-control" type="input" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.currentTarget.value); validateField(e.currentTarget.value, 'email'); changeButtonStatus(e.currentTarget.value, 'email')}}/><br/>
                  {/* Section for entering password. */}
                  Password
                  <br/>
                  <input id="password" className="form-control" type="input" placeholder="Enter Password" value={password} onChange={(e) => {setPassword(e.currentTarget.value); validateField(e.currentTarget.value, 'password'); changeButtonStatus(e.currentTarget.value, 'password')}}/><br/>
                  {/* Button for creating account. */}
                  <button id="create-account-button" className="btn btn-light" type="submit" onClick={handleCreate} disabled={createbutton}>Create Account</button>
                  <span> </span>
                  <button id="delete-account-button" className="btn btn-light" type="submit" onClick={handleDelete} disabled={deletebutton}>Delete Account</button>
               </>
            ):(
               <>
                  {/* Button for adding another account. This also resets the form fields to their default values. */}
                  <button className="btn btn-light" type="submit" onClick={clearForm}>Manage Another Account</button>
               </>
            )}
         />
      </>
   );
}
