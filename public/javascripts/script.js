/*Registration page get info */
if(document.getElementById('registration-button') !== null)
{
    document.getElementById('registration-button').onclick = function(ev){
        if(document.getElementById('password1').value != document.getElementById('password2').value){
            alert('The passwords are not the same');
            document.getElementById('password1').value = '';
            document.getElementById('password2').value = '';
        }
    };
}


function addMoreImages(ev){ // used to get images for the posts page

    fetch('http://localhost:3000/Controller/getImages', {
        method : "GET"
    })
    .then(function (res) {
        return res.json();
    })
    .then(function(data){
        // the images are added the more you scroll, they will eventually loop around if you get to the end of the page.
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) { 

            for (var i = 0; i < data.length; i++) {
                let div = document.createElement('div');
                div.setAttribute("onclick", "openImage(this)");
                div.innerHTML = ' <img src = "'+ data[i].photopath +'" height = 300px width = "300"></img> ';
                document.getElementById('img-storage').appendChild(div);
            }

        }
    })
    .catch(function (err){
        console.log(err);
    })



}

// this function open each image in modal displaying the comments
function openImage(clickedDiv){
    var modal = document.getElementById("myModal");
    var captionText = document.getElementById("caption");
    var comments = ["comment1", "comment2", "comment3", "comment4", "comment5"];
    var modalImg = document.getElementById("img");

    var imgSrc = clickedDiv.firstElementChild.src;

    modal.style.display = "block";
    modalImg.src = imgSrc;

    captionText.innerHTML = '';
    for (var i = 0; i < comments.length; i++){
        //comments would be added here
        captionText.innerHTML = captionText.innerHTML +'<br>';
        captionText.append(comments[i]);
    }

    var span = document.getElementById("modal-close");
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
}

/*check for status to accordingly make a login or logout functionality*/
if(document.getElementById('login-button') !== null)
{       
        if(document.cookie.match(/(status=true)/)){
            console.log('changed to Logout');
            document.getElementById('login-button').innerHTML = 'Logout';
            document.getElementById('login-button').setAttribute('onclick', 'logout()');
        }else{
            console.log('changed to Login');
            document.getElementById('login-button').innerHTML = 'Login';
            document.getElementById('login-button').setAttribute('onclick', "onclick = window.location.href = 'http://localhost:3000/login'");
        }
}

function logout(){
    fetch('Controller/logout', {
        method : "GET"
    })
    .catch(function (err){
        console.log(err);
    })
    location.reload();
}



function searchImages() {   

        fetch('Controller/search',{
            method:"GET",
            headers: new Headers({
                'searchingKey': document.getElementById('search-box').value
              })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('img-storage').innerHTML = '';
                for (var i = 0; i < data.length; i++) {
                    let div = document.createElement('div');
                    div.setAttribute("onclick", "openImage(this)");
                    div.innerHTML = ' <img src = "'+ data[i].photopath +'" height = 300px width = "300"></img> ';
                    document.getElementById('img-storage').appendChild(div);
                }
        })
        .catch(error => console.error(error))
}