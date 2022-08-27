
  
  
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
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json',
        'X-Frappe-CSRF-Token': frappe.csrf_token
    },
    body: JSON.stringify({
      value:7
    })

}).then(r => r.json())
.then(r => {
    var highs = [];
    var day = [];
    var mediums = []
    var lows = []
    var total = []
    var labels = []
    r.message.high.forEach(d => {
      highs.push(d.id)
      total.push(d.id)
      labels.push(d.day)
    })

    r.message.al.forEach(d => {
      day.push(d.id)

      
    })
    r.message.medium.forEach(d => {
      mediums.push(d.id)
      total.push(d.id)

    })
    r.message.low.forEach(d => {
      lows.push(d.id)
      total.push(d.id)

    })
    function sumObjectsByKey(...objs) {
      return objs.reduce((a, b) => {
        for (let k in b) {
          if (b.hasOwnProperty(k))
            a[k] = (a[k] || 0) + b[k];
        }
        return a;
      }, {});
    }

    const db = sumObjectsByKey(highs, mediums, lows)
    var array = Object.keys(db)
    .map(function(key) {
        return db[key];
    });

  

  
    const data = {
      labels: labels,
      datasets: [
        {
          label: ['High'],
          backgroundColor: 'rgb(255 161 161)',
          borderColor: 'rgb(255 161 161)',
          data: highs,
        },
        {
        label: ['Medium'],
        backgroundColor: 'orange',
        borderColor: 'orange',
        data: mediums,
      },
      
      {
        label: ['Low'],
        backgroundColor: 'rgb(35 211 243)',
        borderColor: 'rgb(35 211 243)',
        data: lows,
      },
      {
        label: ['Total'],
        backgroundColor: 'red',
        borderColor: 'red',
        data: array,
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
 
 
