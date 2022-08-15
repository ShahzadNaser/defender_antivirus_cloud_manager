
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


    document.querySelector("#edit_host").addEventListener('click',
    (e) => {
        
        let interval_time = document.querySelector("#interval_time").value;
        let uuid = document.querySelector("#client_uuid").value;
        fetch('/api/method/defender_antivirus_cloud_manager.utils.update_interval', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                uuid : uuid,
                interval_time : interval_time
            })

        }).then(r => r.json())
        .then(r => {
            if(r.message.success_key == "ok") {
                alert("Interval Updated Successfully")
            }
        })


    })



    document.querySelector("#perform_full_scan").addEventListener('click',
    (e) => {
        
        let uuid = document.querySelector("#client_uuid").value;
        fetch('/api/method/defender_antivirus_cloud_manager.utils.fullscan', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                uuid : uuid
            })

        }).then(r => r.json())
        .then(r => {
            if(r.message.success_key == "ok") {
                alert("Full Scan Activated")
            }
        })


    })


    document.querySelector("#add_version").addEventListener('click',
    (e) => {
        
        let uuid = document.querySelector("#client_uuid").value;
        let download_path = document.querySelector("#download-path").value;
        fetch('/api/method/defender_antivirus_cloud_manager.utils.addversion', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                uuid : uuid,
                download_path : download_path

            })

        }).then(r => r.json())
        .then(r => {
            if(r.message.success_key == "ok") {
                alert("New version Released")
            }
        })


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

    // document.querySelector("#list_of_threat").addEventListener('click', (e) => {

    // }).then( r => r.json())
    // .then(r => {
    //     console.log("RR", r)
    // })

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

    function getthreat(uuid) {
            fetch('/api/method/defender_antivirus_cloud_manager.utils.getThreats', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'X-Frappe-CSRF-Token': frappe.csrf_token
                },
                body: JSON.stringify({
                    uuid:uuid
                })

            }).then(r => r.json())
            .then(r => {
                console.log("Threat", r.message)
                document.getElementById("total_threats").textContent = r.message

            })


    }



 

    function getUserDetails(uuid) {
        console.log("UUID", uuid)
        fetch('/api/method/defender_antivirus_cloud_manager.utils.getUserDetails', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                uuid:uuid
            })

        }).then(r => r.json())
        .then(r => {
            console.log("Response", r.message)
             document.getElementById("client_uuid").value = r.message.name
             document.getElementById("client_host_name").value = r.message.host_name

             document.getElementById("am_engine").textContent = r.message.am_engine
             document.getElementById("am_product").textContent = r.message.am_product
             document.getElementById("signature").textContent = r.message.signature
             document.getElementById("signature1").textContent = r.message.nis_signature
             document.getElementById("nis_engine").textContent = r.message.nis_engine
             document.getElementById("agent_version").textContent = r.message.agent_version
             document.getElementById("last_update").textContent = r.message.last_update
             document.getElementById("interval_time").value = r.message.interval_time



             if(r.message.anti_malware == "True") {
                document.getElementById("anti_malware").textContent = "Enabled"
                document.getElementById("anti_malware").style.color="rgb(21, 192, 21)"
             } else if (r.message.anti_malware == "False"){
             document.getElementById("anti_malware").textContent = "Disabled"
             document.getElementById("anti_malware").style.color="red"

             }else {
             document.getElementById("anti_malware").textContent = "Pending"
             document.getElementById("anti_malware").style.color="#eccf07e6"


             }
             
             
             if(r.message.behaviour_monitor == "True") {
                document.getElementById("behaviour_monitor").textContent = "Enabled"
                document.getElementById("behaviour_monitor").style.color="rgb(21, 192, 21)"
             } else if (r.message.behaviour_monitor == "False"){
             document.getElementById("behaviour_monitor").textContent = "Disabled"
             document.getElementById("behaviour_monitor").style.color="red"

             }else {
             document.getElementById("behaviour_monitor").textContent = "Pending"
             document.getElementById("behaviour_monitor").style.color="#eccf07e6"


             }


             //signature Update
             if(r.message.signature_update == "True") {
                document.getElementById("signature_update").textContent = "OK"
                document.getElementById("signature_update").style.color="rgb(21, 192, 21)"
             } else if (r.message.signature_update == "False"){
             document.getElementById("signature_update").textContent = "Out-of-date"
             document.getElementById("signature_update").style.color="red"

             }else {
             document.getElementById("signature_update").textContent = "Pending"
             document.getElementById("signature_update").style.color="#eccf07e6"


             }

             if(r.message.on_access_protection == "True") {
                document.getElementById("on_access_protection").textContent = "Enabled"
                document.getElementById("on_access_protection").style.color="rgb(21, 192, 21)"
             } else if (r.message.behaviour_monitor == "False"){
             document.getElementById("on_access_protection").textContent = "Disabled"
             document.getElementById("on_access_protection").style.color="red"

             }else {
             document.getElementById("on_access_protection").textContent = "Pending"
             document.getElementById("on_access_protection").style.color="#eccf07e6"


             }


             //office antivirus
             if(r.message.office_antivirus == "True") {
                document.getElementById("office_antivirus").textContent = "Enabled"
                document.getElementById("office_antivirus").style.color="rgb(21, 192, 21)"
             } else if (r.message.office_antivirus == "False"){
             document.getElementById("office_antivirus").textContent = "Disabled"
             document.getElementById("office_antivirus").style.color="red"

             }else {
             document.getElementById("office_antivirus").textContent = "Pending"
             document.getElementById("office_antivirus").style.color="#eccf07e6"


             }

             if(r.message.real_time_protection == "True") {
                document.getElementById("real_time_protection").textContent = "Enabled"
                document.getElementById("real_time_protection").style.color="rgb(21, 192, 21)"
             } else if (r.message.behaviour_monitor == "False"){
             document.getElementById("real_time_protection").textContent = "Disabled"
             document.getElementById("real_time_protection").style.color="red"

             }else {
             document.getElementById("real_time_protection").textContent = "Pending"
             document.getElementById("real_time_protection").style.color="#eccf07e6"


             }
             
             if(r.message.anti_spyware == "True") {
                document.getElementById("anti_spyware").textContent = "Enabled"
                document.getElementById("anti_spyware").style.color="rgb(21, 192, 21)"
             } else if (r.message.anti_spyware == "False"){
             document.getElementById("anti_spyware").textContent = "Disabled"
             document.getElementById("anti_spyware").style.color="red"

             }else {
             document.getElementById("anti_spyware").textContent = "Pending"
             document.getElementById("anti_spyware").style.color="#eccf07e6"


             }

             //anti_virus
             if(r.message.anti_virus == "True") {
                document.getElementById("anti_virus").textContent = "Enabled"
                document.getElementById("anti_virus").style.color="rgb(21, 192, 21)"
             } else if (r.message.anti_virus == "False"){
             document.getElementById("anti_virus").textContent = "Disabled"
             document.getElementById("anti_virus").style.color="red"

             }else {
             document.getElementById("anti_virus").textContent = "Pending"
             document.getElementById("anti_virus").style.color="#eccf07e6"

             }


             //network inspection
             if(r.message.network_inspection_system == "True") {
                document.getElementById("network_inspection_system").textContent = "Enabled"
                document.getElementById("network_inspection_system").style.color="rgb(21, 192, 21)"
             } else if (r.message.network_inspection_system == "False"){
             document.getElementById("network_inspection_system").textContent = "Disabled"
             document.getElementById("network_inspection_system").style.color="red"

             }else {
             document.getElementById("network_inspection_system").textContent = "Pending"
             document.getElementById("network_inspection_system").style.color="#eccf07e6"


             }
             

             //tamper
             if(r.message.tamper_protection == "True") {
                document.getElementById("tamper_protection").textContent = "Enabled"
                document.getElementById("tamper_protection").style.color="rgb(21, 192, 21)"
             } else if (r.message.tamper_protection == "False"){
             document.getElementById("tamper_protection").textContent = "Disabled"
             document.getElementById("tamper_protection").style.color="red"

             }else {
             document.getElementById("tamper_protection").textContent = "Pending"
             document.getElementById("tamper_protection").style.color="#eccf07e6"

             }
             //Domain
             if(r.message.domain == "True") {
                document.getElementById("domain").textContent = "Enabled"
                document.getElementById("domain").style.color="rgb(21, 192, 21)"
             } else if (r.message.domain == "False"){
             document.getElementById("domain").textContent = "Disabled"
             document.getElementById("domain").style.color="red"

             }else {
             document.getElementById("domain").textContent = "Pending"
             document.getElementById("domain").style.color="#eccf07e6"

             }

             if(r.message.public == "True") {
                document.getElementById("public").textContent = "Enabled"
                document.getElementById("public").style.color="rgb(21, 192, 21)"
             } else if (r.message.domain == "False"){
             document.getElementById("public").textContent = "Disabled"
             document.getElementById("public").style.color="red"

             }else {
             document.getElementById("public").textContent = "Pending"
             document.getElementById("public").style.color="#eccf07e6"


             }

             if(r.message.private == "True") {
                document.getElementById("private").textContent = "Enabled"
                document.getElementById("private").style.color="rgb(21, 192, 21)"
             } else if (r.message.domain == "False"){
             document.getElementById("private").textContent = "Disabled"
             document.getElementById("private").style.color="red"

             }else {
             document.getElementById("private").textContent = "Pending"
             document.getElementById("private").style.color="#eccf07e6"


             }

             
            //  document.getElementById("total_threats").textContent = r.message.total_threat


             //system
             document.getElementById("os").textContent = r.message.os
             document.getElementById("os_version").textContent = r.message.os_version
             document.getElementById("manufacturer").textContent = r.message.manufacturer
             document.getElementById("model").textContent = r.message.model
             document.getElementById("full_scan_start").textContent = r.message.full_scan_start
             document.getElementById("full_scan_end").textContent = r.message.full_scan_end
             document.getElementById("last_full_scan_source").textContent = r.message.last_full_scan_source
             document.getElementById("last_quick_scan_source").textContent = r.message.last_quick_scan_source

        })
    }
    
 