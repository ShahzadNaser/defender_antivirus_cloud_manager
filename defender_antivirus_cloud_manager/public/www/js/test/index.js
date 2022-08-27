
window.login = {};

const uuid_error = document.querySelector("#uuid_error");
const comment_error = document.querySelector("#comment_error");
const regmessage = document.querySelector("#add-user");
const clientadded = document.querySelector("#cleint_added");
const clientupdate = document.querySelector("#cleint_update");
const clientdeleted = document.querySelector("#cleint_deleted");
const threatparent = document.querySelector("#threatparent");
const outerdiv = document.querySelector("#outer_div");
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

function exportData(){
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("example");
 
    /* Declaring array variable */
    var rows =[];
 
      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;
        column3 = row.cells[2].innerText;
 
    /* add a new records in the array */
        rows.push(
            [
                column1,
                column2,
                column3
            ]
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Stock_Price_Report.csv");
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
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

                    if(r.message.success_key == "ok") {
                        regmessage.innerHTML = '';
                        clientadded.innerHTML +=`
                        <p style="color: rgb(3, 146, 3);">Client Added Successfully!!</p>
                        `
                        setTimeout(() => {
                            clientadded.innerHTML ='';
                        }, 2000);
                       
                        regmessage.innerHTML += `Add`
                        location.reload();
                    } else if(r.message.success_key == "exists"){
                        regmessage.innerHTML = '';
                        regmessage.innerHTML += `Add`

                        clientadded.innerHTML +=`
                        <p style="color: red;">Client Already Exists with given UUID</p>
                        `
                        setTimeout(() => {
                            clientadded.innerHTML ='';
                        }, 2000);

                    }else {
                        alert("Something Wrong")
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
                location.reload();
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


    function getclientsthreats() {
        let uuid = document.querySelector("#client_uuid").value;
        fetch('/api/method/defender_antivirus_cloud_manager.utils.get_threatlist', {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-Frappe-CSRF-Token': frappe.csrf_token
            },
            body: JSON.stringify({
                userid : uuid,

            })

        }).then(r => r.json())
        .then(r => {
            let i = 1;
            r.message.forEach((f, index) => {
                
                outerdiv.innerHTML +=` 
                <p style="margin-left: 5%;margin-bottom: 1px;">Threat ${index}</p>
                <div class="threat" id="threatparent" style="padding: 10px; border:1px solid gray; border-radius:4px; margin:5%;margin-top: 0px !important;">
                <p>ActionSuccess:  <span id="ActionSuccess" style="color:#0094ff8f">${f.actionsuccess}</span></p>
  
                <p>AdditionalActionsBitMask:  <span id="AdditionalActionsBitMask" style="color:#0094ff8f">${f.additionalactionsbitmask}</span></p>
                <p>AMProductVersion:  <span id="AMProductVersion" style="color:#0094ff8f">${f.amproductversion}</span></p>
                <p>CleaningActionID:  <span id="CleaningActionID" style="color:#0094ff8f">${f.cleaningactionid}</span></p>
                <p>CurrentThreatExecutionStatusID:  <span id="CurrentThreatExecutionStatusID" style="color:#0094ff8f">${f.currentthreatexecutionstatusid}</span></p>
                <p>DetectionID:  <span id="DetectionID" style="color:#0094ff8f">${f.detectionid}</span></p>
                <p>DetectionSourceTypeID:  <span id="DetectionSourceTypeID" style="color:#0094ff8f">${f.detectionsourcetypeid}</span></p>
                <p>DomainUser:  <span id="DomainUser" style="color:#0094ff8f">${f.domainuser}</span></p>
                <p>InitialDetectionTime:  <span id="InitialDetectionTime" style="color:#0094ff8f">${f.initialdetectiontime}</span></p>
                <p>LastThreatStatusChangeTime:  <span id="LastThreatStatusChangeTime" style="color:#0094ff8f">${f.lastthreatstatuschangetime}</span></p>
                <p>ProcessName:  <span id="ProcessName" style="color:#0094ff8f">${f.processname}</span></p>
                <p>RemediationTime:  <span id="RemediationTime" style="color:#0094ff8f">${f.remediationtime}</span></p>
                <p>SeverityID:  <span id="severityid" style="color:#0094ff8f">${f.severityid}</span></p>
                <p>ThreatID:  <span id="ThreatID" style="color:#0094ff8f">${f.threatid}</span></p>
                <p>ThreatStatusErrorCode:  <span id="ThreatStatusErrorCode" style="color:#0094ff8f">${f.threatstatuserrorcode}</span></p>
                <p>ThreatStatusID:  <span id="ThreatStatusID" style="color:#0094ff8f">${f.threatstatusid}</span></p>
                <p>PSComputerName:  <span id="PSComputerName" style="color:#0094ff8f">${f.pscomputername}</span></p>
                <p>ThreatName:  <span id="ThreatName" style="color:#0094ff8f">${f.threatname}</span></p>
              
              </div>`
            })
            
                // console.log("Threat ..:QA", r.message)
               
           
            
        })
    }


  


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
            document.getElementById("hostname").value = r.message.sysinfo.host_name;
        })
    })


    document.querySelector("#delete-all-record").addEventListener('click', (e) => {
        const a = document.querySelector("#userid").value;
      
    
    
            fetch('/api/method/defender_antivirus_cloud_manager.utils.delete_all_user', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'X-Frappe-CSRF-Token': frappe.csrf_token
                }
    
            }).then(r => r.json())
            .then(r => {
                if(r.message.success_key == "ok") {
                    clientdeleted.innerHTML +=`<p style="color: red;">All Client Deleted Successfully</p>`
                setTimeout(() => {
                    clientdeleted.innerHTML ='';
                    window.close(); 
                    location.reload();
                }, 2000);
                }
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
                clientdeleted.innerHTML +=`<p style="color: red;">Client Deleted Successfully</p>`
            setTimeout(() => {
                clientdeleted.innerHTML ='';
                window.close(); 
                location.reload();
            }, 2000);
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
            clientupdate.innerHTML +=`<p style="color: green;">Client Updated Successfully</p>`
            setTimeout(() => {
                clientupdate.innerHTML ='';
                window.close(); 
                location.reload();
            }, 2000);
           
        }
        else if(r.message.success_key == "false") {
            clientupdate.innerHTML +=`<p style="color: orange;">Record not exists</p>`
            setTimeout(() => {
                clientupdate.innerHTML ='';
            }, 2000);
        } else {
            clientupdate.innerHTML +=`<p style="color: red;">Record not updated</p>`
            setTimeout(() => {
                clientupdate.innerHTML ='';
            }, 2000);
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
             if(r.message.signature_update == "False") {
                document.getElementById("signature_update").textContent = "OK"
                document.getElementById("signature_update").style.color="rgb(21, 192, 21)"
             } else if (r.message.signature_update == "True"){
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


    // function adduuid(uuid) {
    //         const urlParams = new URLSearchParams(window.location.search);
        
    //         urlParams.set('uuid', uuid);
        
    //         window.location.search = urlParams;
          
    // }
    
 