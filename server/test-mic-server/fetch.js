
//GET BRING YOUR DATA TO THE WEB
/*async function get() {

  const response = await fetch('your_url');
  const blob = await response.blob(response);

}
*/




//POST SEND YOUR DATA TO THE SERVER
async function post_to_server(audio) {

  var data = audio;

  const options = {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: data
  };
  const post = await fetch('http://127.0.0.1:8080', options);
}
