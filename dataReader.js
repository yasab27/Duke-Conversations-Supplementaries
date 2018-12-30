class dataReader {

  let axios = require("axios")

  const URL = "https://dukeconvo.herokuapp.com"

  // PRINT ALL USERS IN THE DB
  function printUsers(){
    axios.get(URL+"/users")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // PRINT ALL DINNERS IN THE DB
  function printDinners(){
    axios.get(URL+"/dinners")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // PRINT ALL PROFESSORS IN THE DB
  function printProfessors(){
    axios.get(URL+"/professors")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
