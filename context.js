// Accesses the React Router DOM.
let Route = ReactRouterDOM.Route;
let Link = ReactRouterDOM.Link;
let HashRouter = ReactRouterDOM.HashRouter;
let {Card} = ReactBootstrap;

// Creates context.
let UserContext = React.createContext(null);

// Card component.
function MyCard(props) {
   return (
      <>
         <Card id={`card-${props.id}`} className="card mb-3 border border-dark border-5 class='rounded'">
            <Card.Header id={`card-header-${props.id}`} className="border border-dark border-5 class='rounded'">
               {props.header}
            </Card.Header>
            <Card.Body id={`card-body-${props.id}`} className="border border-dark border-5 class='rounded'">
               {props.title && (<h3 className="card-title">{props.title}</h3>)}
               {props.text && (<p className="card-text">{props.text}</p>)} 
               {props.body}
               {props.status && (<div id="createStatus"><br/>{props.status}</div>)} 
            </Card.Body>
         </Card>
      </>
   );
}
