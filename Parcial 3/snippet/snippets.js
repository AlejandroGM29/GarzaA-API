import OpenAPISnippet from 'openapi-snippet';


    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    
    const openApi = data // Open API document
    const targets = ['node_unirest'] 
    try {
        // either, get snippets for ALL endpoints:
       const results2 = OpenAPISnippet.getEndpointSnippets(openApi, '/users/login', 'post', targets)
        console.log(results2.description.description)
        
      } catch (err) {
        console.log("error: " +err)
      }

