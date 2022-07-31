import frappe
import erpnext.education.utils as utils
no_cache = 1
import json

@frappe.whitelist()
def get_record():
    data = frappe.request.data
    return data



@frappe.whitelist()
def get_defender():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    if record['sysinfo']['host_name'] == "OTp":
        return 'ok'
    else:
        return "bad"