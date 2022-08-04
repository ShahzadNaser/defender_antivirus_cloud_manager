
window.login = {};

const uuid_error = document.querySelector("#uuid_error");
const comment_error = document.querySelector("#comment_error");
const regmessage = document.querySelector("#add-user");
const hostname = document.querySelector("#hostname");

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
        let host_name = document.querySelector("#hostname").value;
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
                        comment: comment,
                        hostname: host_name
                    })
                })
                .then(r => r.json())
                .then(r => {

                    console.log("Result", r)
                    if(r.message.success_key == "ok") {
                        regmessage.innerHTML = '';
                        regmessage.innerHTML += `Send Message`
                        console.log("Result", r.message)
                    } else {

                    }
                      
                  
                //  console.log("Result", r.message[1])
               
                })     

            }
            






          
        

    })


    document.querySelector("#add_to_client").addEventListener('click',
    (e) => {

       
        fetch('/api/method/defender_antivirus_cloud_manager.utils.get_hostname', {
            method: 'POST',
            headers: {
                'Cookie' : "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=",
                'Postman-Token' : "<calculated when request is sent>",
                'Content-Type' : 'application/json',
                'Content-Length' : '<calculated when request is sent>',
                'Host' : '<calculated when request is sent>',
                'User-Agent' : 'PostmanRuntime/7.28.4',
                'Accept-Encoding' : 'gzip, deflate, br',
                'Connection' : 'keep-alive',
                'Authorization': "Token c90bb697dc9ea0a:4040d780bc82e81",
                'uuid': 'CB51F1AB-5BB0-11EB-9169-182649E82820',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                "sysinfo": {
                    "host_name": "OTJ"
                }
			}),
        })
        .then(r => r.json())
        .then(r => {
            console.log("Client Data", r.message.sysinfo.host_name)
            document.getElementById("hostname").value = r.message.sysinfo.host_name;
        })
    })


   

    document.querySelector("#delete-one-record").addEventListener('click', (e) => {
    const a = document.querySelector("#userid").value;
  


        fetch('/api/method/defender_antivirus_cloud_manager.utils.delete_user', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                userid : a
            })

        }).then(r => r.json())
        .then(r => {
            if(r.message.success_key == "ok") {
                alert("Clent Deleted Successfully")
            }
        })

    })


    function delRecord(a) {
        document.getElementById("userid").value = a
    }


    function updateRecord(a,b,c,d) {
        document.getElementById("updateuuid1").value = a
        document.getElementById("updatehostname1").value = c
        document.getElementById("updatecomment1").value = b
        document.getElementById("updatename1").value = d

    }

    document.querySelector("#update-user").addEventListener('click', (e) => {
    const uuid = document.querySelector("#updateuuid1").value;
    const hostname = document.querySelector("#updatehostname1").value;
    const comment = document.querySelector("#updatecomment1").value;
    const name = document.querySelector("#updatename1").value;
    fetch('/api/method/defender_antivirus_cloud_manager.utils.update_user', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-Frappe-CSRF-Token': frappe.csrf_token
        },
        body: JSON.stringify({
            userid : uuid,
            hostname: hostname,
            comment : comment,
            name : name
        })

    }).then(r => r.json())
    .then(r => {
        if(r.message.success_key == "ok") {
            alert("Clent Updated Successfully")
        }
        else if(r.message.success_key == "false") {
            alert("Record not exists")
        } else {
            alert("Record not updated")
        }
    })


       
    })
    
   