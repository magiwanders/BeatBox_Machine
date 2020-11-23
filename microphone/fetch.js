/*IMPLEMENTATION OF FETCH FOR 
POST AND GET REQUEST*/


//GET BRING YOUR DATA TO THE WEB
async function get_from_server() {

  const response = await fetch('http://127.0.0.1:8080');
  const data = await response.json()

  console.log(data);
 
}


//POST SEND YOUR DATA TO THE SERVER
async function post_to_server(audio) {

  var data = audio;

  const options = {
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  };
  const post = await fetch('http://127.0.0.1:8080', options);
}