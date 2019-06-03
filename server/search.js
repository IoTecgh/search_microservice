const connection=require('./connection')



  
  const dosearch = function dosearch(index,type,term) {
    let body = {
      size: 20,
      from: 0,
      query: { match: {
        body: {
          query: term,
          minimum_should_match: 3,
          fuzziness: 2
        } } },
        highlight: { fields: { text: {} } }
      }
      return connection.client.search({ index, type, body })
    }
    
  

    
  
    

    async function formatresult(index,type,term){
        var response=await dosearch(index,type,term)
        var total=response.hits.total;
        if (total.value > 0){
          return response.hits.hits
        }
        else{
          return "No matches found"
        }
       
    }
    



  module.exports = {
    formatresult
  };
