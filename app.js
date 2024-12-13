function searchUser() {
  const username = document.getElementById("username").value.trim();
  const userInfo = document.getElementById("user-info");

  userInfo.style.display = "none";
  userInfo.innerHTML = "";

  if (username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not found");
        }
      })
      .then((data) => displayUserInfo(data))
      .catch((error) => {
        alert(error.message);
      });
  } else {
    alert("Please enter a GitHub username.");
  }
}

function displayUserInfo(data) {
  const userInfo = document.getElementById("user-info");
  userInfo.style.display = "block";

  userInfo.innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar">
        <h3>${data.name || "No Name Available"}</h3>
        <p><strong>Username:</strong> ${data.login}</p>
        <p><strong>Bio:</strong> ${data.bio || "No bio available"}</p>
        <p><strong>Location:</strong> ${
          data.location || "No location available"
        }</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
    `;
}
