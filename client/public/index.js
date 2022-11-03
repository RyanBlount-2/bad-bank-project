// Single Page Application.
function SPA() {
   return (
      <HashRouter>
         {/* Defines navigation links. */}
         <NavBar/>
         {/* Defines context for the nested components. */}
         <UserContext.Provider value = {{users: []}}>

            {/* Defines routing and the components that are rendered. */}
            <Route path="/" exact component={Home}/>
            <Route path="/createaccount/" exact component={CreateAccount}/>
            <Route path="/login/" exact component={Login}/>
            <Route path="/deposit/" exact component={Deposit}/>
            <Route path="/withdraw/" exact component={Withdraw}/>
            <Route path="/balance/" exact component={Balance}/>
            <Route path="/alldata/" exact component={AllData}/>
         </UserContext.Provider>
      </HashRouter>
   );
}

// Renders component.
let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SPA/>);
