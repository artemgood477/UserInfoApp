const API_URL = "https://reqres.in/api/users";
const userContainer = document.getElementById("user-container");
const userClickedInfoContainer = document.getElementById("user-clicked-info");

let userInfoData = [];

async function getUserInfo() {
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData);
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card m-4" style="width: 18rem;">
      <img src=${user.avatar} class="card-img-top" alt="...">
      <div class="card-body">
        <h1>${user.first_name} ${user.last_name}</h1>
        <p class="card-text">${user.email}</p>
        <button class="btn btn-primary" data-user-id="${user.id}" onclick="getUserDetails(${user.id})">Get Details</button>
      </div>
    </div>
  `;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
  for (let i = 0; i < userData.length; i++) {
    createCardUI(userData[i]);
  }
}

async function getUserDetails(userId) {
  try {
    const userDetails = await fetch(`${API_URL}/${userId}`);
    const userDetailsInJson = await userDetails.json();

    //display the user details in a Bootstrap modal
    const modalContent = `
      <div class="modal fade" id="userDetailsModal" tabindex="-1" role="dialog" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="userDetailsModalLabel">User Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h1>${userDetailsInJson.data.first_name} ${userDetailsInJson.data.last_name}</h1>
              <p>Email: ${userDetailsInJson.data.email}</p>
              <p>Avatar: <img src="${userDetailsInJson.data.avatar}" alt="User Avatar"></p>
            </div>
          </div>
        </div>
      </div>
    `;

    userClickedInfoContainer.innerHTML = modalContent;

    //show the modal
    $('#userDetailsModal').modal('show');
  } catch (error) {
    console.log("Error fetching user details", error);
  }
}

getUserInfo();
