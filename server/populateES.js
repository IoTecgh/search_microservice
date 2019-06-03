const fs=require('fs')
const connection=require('./connection')

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
  
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });
  
      bulkBody.push(item);
      
    });
    
   connection.client.bulk({body: bulkBody})
    .then(response => {
      
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    })
    .catch(console.err);
  };


   async function readAndInsertData (index,type,data) {
    try {
    bulkIndex(index, type, data);
     
    } catch (err) {
      console.error(err)
    }
  }
  async function test(){
    const articlesRaw = fs.readFileSync('./server/data.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('meeting', 'memo', articles);
  }

  module.exports={
      readAndInsertData,test
  }

  

  