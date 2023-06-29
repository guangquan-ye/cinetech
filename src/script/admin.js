const usersPanelBtn = document.querySelector('#usersPanel');
const comsPanelBtn = document.querySelector('#comsPanel');
const favsPanelBtn = document.querySelector('#favsPanel');
const panelDisplayDiv = document.querySelector('#panelDisplayDiv');
const editMsg = document.querySelector('#editMsg');

usersPanelBtn.addEventListener('click', () => {
  usersPanelForm();
});

comsPanelBtn.addEventListener('click', () => {
   comsPanelForm();
});

favsPanelBtn.addEventListener('click', () => {
    
});

async function usersPanelForm() {
    const response = await fetch("/cinetech/admin/users");
    const users = await response.json();
  
    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    users.forEach((user) => {
      tableHTML += `
        <tr>
          <td>${user.id}</td>
          <td>
            <input type="text" value="${user.login}">
            <button class="editLogin" data-user-id="${user.id}">Edit</button>
          </td>
          <td>
            <input type="password" placeholder="Edit password">
            <button class="editPwd" data-user-id="${user.id}">Edit</button>
          </td>
          <td><button class="deleteUser" data-user-id="${user.id}">Delete</button></td>
        </tr>
      `;
    });
  
    tableHTML += `
        </tbody>
      </table>
    `;
  
    panelDisplayDiv.innerHTML = tableHTML;
  
    const modifyLoginButtons = document.querySelectorAll('.editLogin');
    modifyLoginButtons.forEach((button) => {
      button.addEventListener('click', async(event) => {
        const userId = event.target.dataset.userId;
        const inputLogin = event.target.previousElementSibling;
        const loginValue = inputLogin.value;
        

        data = new FormData();
        data.append('userId', userId);
        data.append('login', loginValue);
        
        const response = await fetch("/cinetech/admin/users/login", {
            method: 'POST',
            body: data,

        });
        const editLoginResponse = await response.text();
        editMsg.innerHTML = editLoginResponse;
        usersPanelForm() 
    });
      
    });
  
    
    const modifyPasswordButtons = document.querySelectorAll('.editPwd');
    modifyPasswordButtons.forEach((button) => {
      button.addEventListener('click', async(event) => {
        const userId = event.target.dataset.userId;
        const inputPassword = event.target.previousElementSibling;
        const passwordValue = inputPassword.value;
        console.log(passwordValue);
        data = new FormData();
        data.append('userId', userId);
        data.append('password', passwordValue);

       const response = await fetch("/cinetech/admin/users/password", {
            method: 'POST',
            body: data,
        })
        const editPasswordResponse = await response.text();
        editMsg.innerHTML = editPasswordResponse;
        usersPanelForm()
      });
    });
    const deleteButtons = document.querySelectorAll('.deleteUser');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', async(event) => {
            const userId = event.target.dataset.userId;
            data = new FormData();
            data.append('userId', userId);
            const response = await fetch("/cinetech/admin/users/delete", {
                method: 'POST',
                body: data,
            })
            const deleteResponse = await response.text();
            editMsg.innerHTML = deleteResponse;
            usersPanelForm()
        });
        });
  }
  
async function comsPanelForm() {
    const response = await fetch("/cinetech/admin/comments");
    const coms = await response.json();
    let comsDiv = document.createElement('div');
    comsDiv.setAttribute('id', 'comsDiv');
    comsDiv.classList.add('comsDiv');
    let tableHTML = '<table>';

coms.forEach((com) => {
  tableHTML += `
    <tr class="com">
      <td>${com.id}</td>
      <td>${com.type}</td>
      <td>${com.type_id}</td>
      <td>${com.content}</td>
      <td>${com.user_login}</td>
      <td><button class="deleteCom" data-com-id="${com.id}">Delete</button></td>
    </tr>
  `;
});

tableHTML += '</table>';

    comsDiv.innerHTML = tableHTML;
    panelDisplayDiv.appendChild(comsDiv);
}