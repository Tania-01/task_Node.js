let userName = document.getElementById('userName')
let userDate = document.getElementById('userDate')

let pathname = window.location.pathname

let login = pathname.substring(6)

let innerUserInfo = (userInfo) => {
    userName.innerHTML = userInfo.firstName
    userDate.innerHTML = `${userInfo.date.hours}:${userInfo.date.minutes}:${userInfo.date.seconds}`
}

let getUserInfo = async (login) => {
    let requestServer = await fetch("http://localhost:7800/users/get-by-login",{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({login:login})
        }
    )
    requestServer.json()
        .then((user)=>{
            innerUserInfo(user)
        })
    /*let xhr = new XMLHttpRequest()
    xhr.open("post","http://localhost:7800/users/get-by-login")
    xhr.setRequestHeader('Content-type','application/json')
    xhr.send(JSON.stringify({
        login:login
    }))
    xhr.onload = () => {
        let currectUser = xhr.response
        currectUser = JSON.parse(currectUser)
        innerUserInfo(currectUser)
    }*/
}

getUserInfo(login)