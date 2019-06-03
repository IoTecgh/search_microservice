const elasticsearch = require('elasticsearch')

const port = 9200
const host = 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })


async function createConnection () {
    let isConnected = false
    while (!isConnected) {
      console.log('Connected to ES')
      try {
       
        isConnected = true
      } catch (err) {
        console.log('Connection Failed, Retrying...', err)
      }
    }
  }
  
  createConnection()
  
  const indices = function indices() {
    return client.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
  };

  async function resetIndex (index) {
    if (await client.indices.exists({ index })) {
      await client.indices.delete({ index })
    }
  
    await client.indices.create({ index })

  }

  module.exports = {
    createConnection,indices,resetIndex,client
  };