
window.login = {};

const uuid_error = document.querySelector("#uuid_error");
const comment_error = document.querySelector("#comment_error");
const regmessage = document.querySelector("#add-user");
uuid_error.innerHTML = '';
comment_error.innerHTML = '';



function changefullname() {
    uuid_error.innerHTML = '';
    document.querySelector("#signup_fullname").style.borderColor = "#ced4da";
}

function changeemail() {
    comment_error.innerHTML = '';
    document.querySelector("#signup_email").style.borderColor = "#ced4da";
}


document.querySelector("#add-user").addEventListener('click',
    (e) => {
        uuid_error.innerHTML = '';
        comment_error.innerHTML = '';


        let uuid = document.querySelector("#uuid").value;
        let comment = document.querySelector("#comment").value;
        // console.log("Agree", user_agreed)


        if (uuid == '') {
            document.querySelector("#uuid").style.borderColor = "red";
            uuid_error.innerHTML += `<small style="color:red">Please Enter UUID <small>`
        } 
        else if (comment == '') {
            document.querySelector("#comment").style.borderColor = "red";
            comment_error.innerHTML += `<small style="color:red">Please Comment<small>`
        }
         else if(uuid.length !== 0 && comment.length !== 0 ){
            regmessage.innerHTML = '';
            regmessage.innerHTML += `
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
            `

            fetch('/api/method/defender_antivirus_cloud_manager.api.addUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Frappe-CSRF-Token': frappe.csrf_token
                    },
                    body: JSON.stringify({
                        uuid: uuid,
                        comment: comment
                    })
                })
                .then(r => r.json())
                .then(r => {

                    console.log("Result", r)
                      
                  
                //  console.log("Result", r.message[1])
               
                })     

            }
            






          
        

    })