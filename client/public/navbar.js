function NavBar() {
   return (
      <>
         <div className={"title-container"}>
            <div className={"title-div"}>
               <div className={"title"}>Bad Bank</div>
            </div>
         </div>

         <div id="account-div">
            <div id="create-account-div" className="nav-item navigation-item popup">
               <a id="create-account-anchor" className="nav-link navigation-link" href="#/createaccount/">Manage Account</a>
               <span className="popup-text">The Manage Account page allows users to create new accounts or delete existing accounts.</span>
            </div>
            <br/>
            <div id="login-div" className="nav-item navigation-item popup">
               <a id="login-anchor" className="nav-link navigation-link" href="#/login/">Login/Logout</a>
               <span className="popup-text">The Login page allows users to log in and log out of existing accounts. Only one user can be logged in at a time.</span>
            </div>
            {/* <br/>
            <div id="display-div" className="nav-item navigation-item popup">
               <a id="display" className="nav-link navigation-link">{display}</a>
            </div> */}
         </div>

         <nav className="navbar navbar-expand-lg navbar-dark navigation-container">
            <div id="navbarNav" className="nav-fill w-100 navigation-div">
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <ul className="navbar-nav navigation-list">
                  <li className="nav-item navigation-item popup">
                     <a className="nav-link navigation-link" href="#">Home</a>
                     <span className="popup-text">The Home page is the default landing page where users can find information about the bank and important updates.</span>
                  </li>
                  <li className="nav-item navigation-item popup">
                     <a className="nav-link navigation-link" href="#/deposit/">Deposit</a>
                     <span className="popup-text">The Deposit page allows logged-in users to deposit money into existing accounts.</span>
                  </li>
                  <li className="nav-item navigation-item popup">
                     <a className="nav-link navigation-link" href="#/withdraw/">Withdraw</a>
                     <span className="popup-text">The Withdraw page allows logged-in users to withdraw money into existing accounts.</span>
                  </li>
                  <li className="nav-item navigation-item popup">
                     <a className="nav-link navigation-link" href="#/balance/">Balance</a>
                     <span className="popup-text">The Balance page allows logged-in users to see their account balances.</span>
                  </li>
                  <li className="nav-item navigation-item popup">
                     <a className="nav-link navigation-link" href="#/alldata/">All Data</a>
                     <span className="popup-text">The All Data page is where users can see all existing account data. This is where Bad Bank earns its name.</span>
                  </li>          
               </ul>
            </div>
         </nav>
      </>
   );
}
