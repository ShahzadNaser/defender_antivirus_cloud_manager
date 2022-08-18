
  
  
 window.onload = function() {
  getClientDetails();
};

function getchild() {
  frappe.db.get_list('Threat Details',//Ex:Item Customer Details
{
	fields: ['*'],
}).then((result) => { console.log('childdd',result); });
}

function getClientDetails() {
  fetch('/api/method/defender_antivirus_cloud_manager.utils.getclientdetails', {
    method: 'GET',
    headers : {
        'Content-Type' : 'application/json',
        'X-Frappe-CSRF-Token': frappe.csrf_token
    }

}).then(r => r.json())
.then(r => {
    var highs = [];
    var day = [];
    var mediums = []
    var lows = []
    r.message.high.forEach(d => {
      highs.push(d.id)
      
    })

    r.message.al.forEach(d => {
      day.push(d.id)
      
    })
    r.message.medium.forEach(d => {
      mediums.push(d.id)
    })
    r.message.low.forEach(d => {
      lows.push(d.id)
    })
    

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
        label: ['Medium'],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: mediums,
      },
      {
        label: ['High'],
        backgroundColor: '#ff5800',
        borderColor: '#ff5800',
        data: highs,
      },
      {
        label: ['Low'],
        backgroundColor: 'black',
        borderColor: 'black',
        data: lows,
      }
    ]
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
 
 
