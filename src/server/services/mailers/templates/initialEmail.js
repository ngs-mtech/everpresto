import hbs from 'handlebars-inline-precompile'

export default hbs`
  <div>
    <h1>Hello {{signer.firstName}} {{signer.lastName}}</h1>
    <p>I am {{sender.firstName}} {{sender.lastName}}</p>
  </div> 
`;
