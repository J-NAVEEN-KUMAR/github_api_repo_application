let body = document.querySelector('body');
homepage();
function homepage() {
  body.innerHTML = `
  
  <!--header-->
  <div class="card border-0">
      <img src="backgroundtop2.png" class="card-img-top w-100 mt-5" alt="header-img">
      <div class="card-body">
        <h1 class="card-title card-img-overlay text-center mt-0">Github API Repos Application</h1>
      </div>
    </div>
  
    <!--container-->
    <div class="container">

        <label for="GithubUsername" class="card-title">Github Username</label>
        <input type="text" class="form-control" id="GithubUsername">
        <small class="form-text text-muted">Enter your Github username without any spaces.</small>
        <button type="submit" class="btn btn-primary btn-block" onclick=getrepos()>Send</button>
      

      <div class="row repo_table">
        <div class="col-2">
          <div class="card border-0">
            <div class="card-body">
              <img class="avatar">
              <a class="profile_redirect" target="_blanck"></a>
            </div>
          </div>
      
        </div>
        <div class="col-10">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Repositories</th>
                <th scope="col">Fork count</th>
                <th scope="col">Star count</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  
    <!--Footer-->
    <div class="card border-0">
      <img src="backgroundbottom.png" class="card-img w-100 mt-3" alt="footer-img">
      <div class="card-body">
        <h5 class="card-title text-center m-0">Contact me</h5>
        <div class="row">
          <div class="col-6 text-right">
          <img src="https://img.icons8.com/color/48/000000/gmail-new.png"/>
          <p>naveen.jeruban@gmail.com</p>
          </div>
          <div class="col-6">
          <img src="https://img.icons8.com/color/48/000000/linkedin.png"/>
          <p>Naveen Kumar</p>
          </div>
        </div>
        <section class="text-center">
          Created by <span class="text-primary">Naveen Kumar</span> |&#169; 2021 All rights reserved.
        </section>
      </div>
    </div>
  `
}
let tbody = document.querySelector('tbody');
let username = document.querySelector('#GithubUsername');
let addrepos = document.querySelector('.addrepos');
let avatar_img = document.querySelector('.avatar');
let profile_redirect = document.querySelector('.profile_redirect');

async function getrepos() {
  tbody.innerHTML = "";

  try {
    let resp = await fetch(`https://api.github.com/users/${username.value}/repos`);
    let data = await resp.json();
    appendrepos(data);
  } catch (error) {
    console.log(error);
  }
}


function appendrepos(data) {

  data.forEach(element => {
    forkcount(element)
  });

  avatar_img.setAttribute('src',data[0].owner.avatar_url);
  avatar_img.setAttribute('class','repoimg rounded-circle w-100 h-100');
  profile_redirect.setAttribute('href',`${data[0].owner.html_url}`);
  profile_redirect.innerHTML = data[0].owner.login;
}

async function forkcount(element) {

  try {
    let resp =  await fetch(element.url);
    let data = await resp.json();
    let fork = data.network_count;
    
    tbody.innerHTML += `
    <tr>
      <td>
      ${element.name}
      <br>
      <a href="${element.html_url}" target="_black">${element.html_url}</a>
      </td>
      <td>
        ${fork}
      </td>
      <td>
      ${element.watchers_count}
      </td>
    </tr>
    `

  } catch (error) {
    console.log(error);
  }
}
