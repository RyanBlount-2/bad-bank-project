function Login() {
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

   let displayState;
   let nameState;
   ctx.users.map((element, index, array) => {
      if (element.displayed === true) {
         displayState = true;
         nameState = element.name;
      }
   });
   if (displayState === null) {
      displayState = false;
   }
   if (nameState === null) {
      nameState = '';
   }

   // Define states.
   let [name, setName] = useState(nameState);
   let [email, setEmail] = useState('');
   let [password, setPassword] = useState('');
   let [button, setButton] = useState(true);
   let [display, setDisplay] = useState(displayState);
   let [error, setError] = useState('');
   let [data, setData] = useState('');

   // Set button status.
   function changeButtonStatus(input, field) {
      // This section makes the button status very responsive to the last input the user typed.
      switch(field) {
         case 'email':
            email = input;
            break;
         case 'password':
            password = input;
            break;
         default:
            break;
      }
      // If all form fields have input, enable the Create Account button.
      if (email && password) {
         setButton(false);
      }
      // If all form fields do not have input, disable the Create Account button.
      else {
         setButton(true);
      }
   }

  // Validate the form field submissions.
  function validate(input, field) {
   // Does not validate the form field and throws an error if the form field is blank or the user fills in the form field incorrectly.
   if (!input) {
      // Set the error message.
      setError(`Error: ${field} field must not be left blank.`);
      // Set the error message to the default value after the specified time.
      setTimeout(() => setError(''), 3000);
      return false;
   }
   setError('');
   // Validates the form field if the user fills in the form field correctly.
   return true;
}

function validateField(input, field) {
   // If the form fields do not all validate, an account is not created and an error is thrown.
   switch(field) {
      case 'email':
         email = input;
         if (!validate(email, 'Email')) return;
         break;
      case 'password':
         password = input;
         if (!validate(password, 'Password')) return;
         break;
      default:
         break;
   }
}

   function logInUser() {
      // Log out any users currently logged in.
      let validAccount = false;
      ctx.users.map((element, index, array) => {
         if (element.loggedIn === false && element.email === email && element.password === password) {
            element.loggedIn = true;
            element.displayed = true;
            name = element.name;
            display = true;
            validAccount = true;
            let url = `/account/login/${element.email}`;
            (async () => {
               let res = await fetch(url);
               let data = await res.json();
               console.log(data);
            })();
            console.log(`Welcome, ${name}. You are now logged in.`);
            alert(`Welcome, ${name}. You are now logged in.`);
         }
      });
      if (!validAccount) {
         ctx.users.map((element, index, array) => {
            if (element.loggedIn === false && (element.email != email || element.password != password)) {
               name = '';
               display = false;
               console.log(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
               alert(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
               setError(`An account for the email "${email}" and password "${password}" cannot be found. Please enter a valid email and password to continue.`);
               // Set the error message to the default value after the specified time.
               setTimeout(() => setError(''), 3000);
               return;
            }
         });
      }
      setName(name);
   }

   function logOutUser() {
      ctx.users.map((element, index, array) => {
         if (element.loggedIn === true) {
            element.loggedIn = false;
            element.displayed = false;
            name = element.name;
            display = element.displayed;
            let url = `/account/logout/${element.email}`;
            (async () => {
               let res = await fetch(url);
               let data = await res.json();
               console.log(data);
            })();
            console.log(`Goodbye, ${name}. You are now logged out.`);
            alert(`Goodbye ${name}. You are now logged out.`);
         }
      });
      name = '';
      setName(name);
   }

   function logIn() {
      logInUser();
      setDisplay(display);
   }

   function logOut() {
      logOutUser();
      clearForm();
      setDisplay(display);
   }

   // Clears the form fields.
   function clearForm() {
      // Toggle the display to allow the user to create a new account and reset the form fields.
      setName('');
      setEmail('');
      setPassword('');
      setButton(true);
      setDisplay(displayState);
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
            id="login"
            header="Login"
            status={error}
            body={display ? 
               (
                  // The display when the user is logged in.
                  <>
                     <h5>Welcome, {name}. You are currently logged in.</h5>
                     <button className="btn btn-light" type="submit" onClick={logOut}>Log Out</button>
                  </>
               ):(
                  // The display when the user is logged out.
                  <>
                     Email<br/>
                     <input id="email" className="form-control" type="input" placeholder="Enter Email" value={email} onChange={(e) => {setEmail(e.currentTarget.value); validateField(e.currentTarget.value, 'email'); changeButtonStatus(e.currentTarget.value, 'email')}}/><br/>
                     Password<br/>
                     <input id="password" className="form-control" type="input" placeholder="Enter Password" value={password} onChange={(e) => {setPassword(e.currentTarget.value); validateField(e.currentTarget.value, 'password'); changeButtonStatus(e.currentTarget.value, 'password')}}/><br/>
                     <button className="btn btn-light" type="submit" onClick={logIn} disabled={button}>Log In</button>
                  </>
            )}
         />
      </>
   );
}
