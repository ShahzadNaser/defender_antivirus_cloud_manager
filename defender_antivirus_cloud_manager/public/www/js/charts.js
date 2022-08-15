
  
  
 window.onload = function() {
  getClientDetails();
};


function getClientDetails() {
  fetch('/api/method/defender_antivirus_cloud_manager.utils.getclientdetails', {
    method: 'GET',
    headers : {
        'Content-Type' : 'application/json',
        'X-Frappe-CSRF-Token': frappe.csrf_token
    }

}).then(r => r.json())
.then(r => {
    console.log("A", r.message)
    console.log("AB", r.message.high[0].id)
    var a1 =  r.message.high[0].id
    var a2 =  r.message.sid[0].id
    var items = [];
    r.message.high.forEach(d => {
      items.push(d.id)
      
    })

    console.log("AA Items", items)
    const labels = [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
  
    const data = {
      labels: labels,
      datasets: [{
        label: ['Details'],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [{x:1,y:2},{x:4,y:6},{x:18,y:56}],
      },
      {
        label: ['Week'],
        backgroundColor: 'rgb(9 214 19)',
        borderColor: 'rgb(2 254 9)',
        data: [{x:1,y:4},{x:4,y:0},{x:18,y:78},{x:0,y:12},{x:1,y:70}],
      }]
    };
  
    const config = {
      type: 'line',
      data: data,
      options: {}
    };
  
  
    const myChart = new Chart(
      document.getElementById('chart'),
      config
    );
  

})
}
 
 
