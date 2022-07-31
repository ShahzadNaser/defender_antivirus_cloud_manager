// Copyright (c) 2022, Otgooneo and contributors
// For license information, please see license.txt

frappe.ui.form.on('Defender Antivirus Cloud Manager', {
	// refresh: function(frm) {

	// }

	onload: (frm) => {
		erpnext.employee_dashboard_total_job_posted.load_employee_total_job_posted(frm);
	}

});
erpnext.employee_dashboard_total_job_posted = {
		load_employee_total_job_posted: function (frm) {
			// if (frm.doc.job_title) {
			// 	var job_title = frm.doc.job_title;
			// } else {
			// 	var job_title = " "
			// }
			// if (frm.doc.category) {
			// 	var category = frm.doc.category;
			// } else {
			// 	var category = " "
			// }

			fetch('https://jsonplaceholder.typicode.com/albums', {
				headers: {
					'uuid': 'CB51F1AB-5BB0-11EB-9169-182649E82820'
				}
			})
			.then(r => r.json())
			.then(r => {
				
			
					frm.EmployeeTotalJobPosted = new erpnext.EmployeeTotalJobPosted(frm, r);
				
				
			})

			// frappe.call({
			// 	method: "defender_antivirus_cloud_manager.defender_antivirus_cloud_manager.doctype.defender_antivirus_cloud_manager.defender_antivirus_cloud_manager.get_record",
			// 	// args:{
			// 	// 	"jt":job_title,
			// 	// 	"ct":category
			// 	// },
			// 	callback: function (r) {
			// 		if (r.message) {
			// 			console.log("lo Je", r.message)
			// 			frm.EmployeeTotalJobPosted = new erpnext.EmployeeTotalJobPosted(frm, r.message);
			// 		}
			// 	}
			// });

		}
	},


	erpnext.EmployeeTotalJobPosted = Class.extend({
		init: function (frm, data) {
			this.frm = frm;
			this.make(frm, data);
		},
		make: function (frm, data) {
			var me = this;
			var html_chart_value = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
			<meta charset="UTF-8" />
		
			<!-- ✅ Load CSS file for DataTables  -->
			<link
			  rel="stylesheet"
			  href="/assets/defender_antivirus_cloud_manager/www/css/jquery.dataTables.min.css"
			/>
		
			<!-- ✅ load jQuery ✅ -->
			<script
			  src="/assets/defender_antivirus_cloud_manager/www/js/jquery-3.6.0.min.js"
			  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
			  crossorigin="anonymous"
			></script>
		
			<!-- ✅ load DataTables ✅ -->
			<script
			  src="/assets/defender_antivirus_cloud_manager/www/js/jquery.dataTables.min.js"
			  integrity="sha512-BkpSL20WETFylMrcirBahHfSnY++H2O1W+UnEEO4yNIl+jI2+zowyoGJpbtk6bx97fBXf++WJHSSK2MV4ghPcg=="
			  crossorigin="anonymous"
			  referrerpolicy="no-referrer"
			></script>
		  </head>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
			<style>
		.Row {
			display: table;
			width: 100%;
			table-layout: fixed; 
			border-spacing: 8px;
		}
		.card {
			display: table-cell;
			box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
			transition: 0.3s;
			width: 210%;
			height: 140px;
	
		}
		.card1 {
			display: table-cell;
			box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
			transition: 0.3s;
			width: 210%;
			height: 200px;
	
		}
		.card:hover {
			box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		}
		.container {
			padding: 2px 16px;
		}

		#bt {
			border-radius: 12px;
			background: #8fe2ff;
			border-color: #5fe5f5;
			float: right;
		}


		  body {font-family: Arial;}


.tab {
  overflow: hidden;
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
 
}

/* Create an active/current tablink class */
.tab button.active {
	text-decoration: underline;
    color: #009bfff7;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border-top: none;
}
		  
</style>
<body>
<div class="tab">
  <button class="tablinks" onclick="openCity(event, 'Dashboards')" id="defaultOpen">Dashboards</button>
  <button class="tablinks" onclick="openCity(event, 'Clients')">Clients</button>
  <button class="tablinks" onclick="openCity(event, 'Users')">Users</button>
  <button class="tablinks" onclick="openCity(event, 'Logs')">Logs</button>
  <button class="tablinks" onclick="show()" style="float:right;color: #085281;"><i class="fa fa-file-excel-o" aria-hidden="true" style="    color: #0a88d885;
  margin-right: 2px;"></i>Export to excel file</button>
  
</div>

<div class="box" style="background:#aeaef229; width 100%; height:300px">
<div id="Dashboards" class="tabcontent">
  <h3>Dashboards</h3>
  <p>Dashboards is the capital city of England.</p>
</div>


<div id="Clients" class="tabcontent">
<div class="clients_bar" style="display: flex;
justify-content: space-between;">
	<div class="left">

	<input class="form-control" id="exampleDataList" placeholder="Type to search..." style="    background: white;
    width: 400%;
    margin-top: 5px;
    margin-bottom: 5px;">
	</div>

	<div class="right" style="display:flex;     display: flex;
    justify-content: flex-end;">
	<button type="button" class="btn btn-primary" style=" background: #0e85af;     margin-right: 10px;">Add client</button>
	<button type="button" class="btn btn-outline-info" style="color:black;    margin-right: 10px;">Import</button>
	<button type="button" class="btn btn-danger" style="    margin-right: 10px;">Delete all</button>
	<button type="button" class="btn btn-outline-info"><i class="fa fa-refresh" aria-hidden="true" style="margin-right:4px;"></i>Refresh</button>
	</div>

</div>
  <h3>Clients</h3>
  `+ data.title +`



  <table id="example" class="display" style="width: 100%">
  <thead>
	<tr style="display:none;">
	  <th>Name</th>
	  <th>Position</th>
	  <th>Office</th>
	</tr>
  </thead>
  
  <tbody>

	<tr>
	  <td>Example UUID  <button id="bt">Edit</button></td>
	  <td>Comment <button id="bt">Edit</button></td>
	  <td>Host name <button id="bt">Refresh</button> </td>
	</tr>
	<tr>
		<td>Example UUID <button id="bt">Edit</button></td>
		<td>Comment <button id="bt">Edit</button></td>
		<td>Host name <button id="bt">Refresh</button></td>
	</tr>
	<tr>
		<td>Example UUID <button id="bt">Edit</button></td>
		<td>Comment <button id="bt">Edit</button></td>
		<td>Host name <button id="bt">Refresh</button></td>
	</tr>
  </tbody>
  <tfoot style="display:none;">
	<tr>
	  <th>Name</th>
	  <th>Position</th>
	  <th>Office</th>
	</tr>
  </tfoot>
</table>

<!-- Your JS code here  -->

</div>

<div id="Users" class="tabcontent">
  <h3>Users</h3>
  <p>Users is the capital of Japan.</p>
</div>

<div id="Logs" class="tabcontent">
  <h3>Logs</h3>
  <p>Logs is the capital of Japan.</p>
</div>
</div>



<script>


function show() {
	alert("Data Exported")
}
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  $('#example').DataTable();
  $(document).ready(function () {
	$('#example').DataTable();
	console.log("I am Calll")
  });
  
}


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

  


</script>



<hr></hr>
</body>
</html>



`

			$(frm.fields_dict.dashboard.wrapper).empty();
			$(html_chart_value).appendTo(frm.fields_dict.dashboard.wrapper);
			//===================================Male & Female Graph=====================================================================






		}
	});

