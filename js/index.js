// check to make sure the DOM has loaded
document.addEventListener("DOMContentLoaded", function() {

    // Take user input and search for user on Github
    // console.log(document.querySelector('#github-form'));
    document.querySelector('#github-form').addEventListener("submit", e => {
        e.preventDefault();
        searchForUser(e);
    })

    // Event listener to pull up data on a specific user
    document.querySelector("#user-list").addEventListener("click", e => {
        displayUserRepos(e.target.innerText);
    })
});

function displayUserRepos(user) {
    // add div for user repos
    let repoDiv = document.createElement("div");
    repoDiv.id = "repo-container";
    console.log(repoDiv);
    document.querySelector("#main").appendChild(repoDiv);

    // add header for div
    let repoHeader = document.createElement("h3");
    repoHeader.textContent = "User Repositories";
    repoDiv.appendChild(repoHeader);

    // get request for info from github API
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(repo => {
                // console.log(repo.html_url);
                let li = document.createElement("li");
                let url = document.createElement("a");
                
                url.setAttribute("href", repo.html_url );
                url.textContent = repo.html_url;

                li.appendChild(url);
                repoDiv.appendChild(li);

    
            })
        })

}

function searchForUser(e) {
    let userToSearchFor = e.target.children[0].value;
    // use GET request to get requested user info from GitHub
    fetch(`https://api.github.com/search/users?q=${userToSearchFor}`)
        .then(res => res.json())
        .then(data => processUserData(data));
}

function processUserData(data) {

    // loop through all users found
    data.items.forEach(user => {

        // add username to userlist
        let username = document.createElement("li");
        username.textContent = user.login;
        document.querySelector("#user-list").appendChild(username);

        // add repository to repo list
        let repoLi = document.createElement("li");

        let repo = document.createElement("a");
        repo.textContent = user.repos_url;
        repo.href = user.repos_url;

        repoLi.appendChild(repo);
        document.querySelector("#repos-list").appendChild(repoLi);
        
    });
    // let username = 
    // console.log(data.items[0].login);
}