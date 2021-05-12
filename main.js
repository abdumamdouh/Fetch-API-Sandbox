
document.getElementById('getText').addEventListener('click' , getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);




//first we gonna fetch a text file 

//fetch returns a promise
// we could handle it bt async/await or .then
// the first .then is used to change the format of the return promise to convert it into json or text by the required method 

function getText(){
    fetch('sample.txt')
    .then( res => res.text() )
    .then( data => {
        document.getElementById('output').innerHTML = data;
    } )
    .catch(error => console.log('error', error));
}

//second we gonna fetch a local json file 

function getUsers(){
    fetch('users.json')
    .then(res => res.json())
    .then( data => {

        let output = "<h2>Users</h2>";

        data.forEach( user => {
            output += `
            <ul>
                <li>ID: ${user.id}</li>
                <li>Name: ${user.name}</li>
                <li>Email: ${user.email}</li>
            </ul>
            `;
        });

        document.getElementById('output').innerHTML = output;
    } )
    .catch( error => console.log('error', error) );
}


//third we gonna fetch a data from an outside API    
//we will fetch Posts from 'https://jsonplaceholder.typicode.com/posts'


function getPosts (){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then( res => res.json() )
    .then( data => {
        console.log(data);

        let output = "<h2>Posts</h2>";

        data.forEach( post => {
            output += `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
            `;
        } )

        document.getElementById('output').innerHTML = output;

    } )
    .catch(error => console.log('error', error));
}


// handling form 

function addPost(e){
    e.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    //we gonna use fetch to make a HTTP post request
    //fetch is used for get and post requests
    //when you use fetch to make a post request you send an object as a second argument with the protochol details
    //standard HTTP Post request using fetch

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body:JSON.stringify({title: title, body: body})
    } )
    .then( res => res.json() )
    .then( data => console.log(data) );


}

//JSON.stringify() ==== convert it to string to be sent to the API
//body:JSON.stringify{title, body}  ======== body:JSON.stringify{title: title, body: body}
