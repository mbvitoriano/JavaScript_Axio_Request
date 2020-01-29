var inputElement = document.querySelector("#input");
var buttonElement = document.querySelector("#btn");
var listItem = document.querySelector("ul");

function getUsername() {
  var input = inputElement.value;
  var userUrl = "https://api.github.com/users/" + input + "/repos";
  inputElement.value = "";
  return userUrl;
}

async function request(userUrl) {
  try {
    const response = await axios.get(userUrl);
    return response;
  } catch (error) {
    alert("Usuário não encontrado!");
  }
}
var userData;
var repoArray = [];

function addOnList(repoName) {
  var listElement = document.createElement("li");
  var textElement = document.createTextNode(repoName);
  listElement.appendChild(textElement);
  listItem.appendChild(listElement);
}

buttonElement.onclick = function() {
  let userUrl = getUsername();
  let userResponseData = request(userUrl);
  userResponseData.then(function(response) {
    userData = response.data;
    userData.forEach(repo => repoArray.push(repo.name));
    for (items of repoArray) {
      addOnList(items);
    }
  });
};
