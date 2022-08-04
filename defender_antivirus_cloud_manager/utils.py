import frappe
import erpnext.education.utils as utils
no_cache = 1
import json

@frappe.whitelist()
def get_record():
    data = frappe.request.data
    return data



@frappe.whitelist()
def get_defender1():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    if record['sysinfo']['host_name'] == "OTG":
        return record
    else:
        return "bad"


@frappe.whitelist()
def get_defender():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    if record:
        return {
            "status_code": "ok",
            "response":{
                "new_version":"false",
                "download_path":"",
                "new_interval":"false",
                "interval":0,
                "full_scan":"false"
            }
        }
    else:
        return "bad"



@frappe.whitelist()
def get_hostname():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    return record



@frappe.whitelist(allow_guest=True)
def delete_user(**args):
    userid = args.get('userid')
    if userid:
        frappe.delete_doc("Clients Details", userid)
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "not found":"Record not Found"
        }



@frappe.whitelist(allow_guest=True)
def update_user(**args):
    userid = args.get("userid")
    hostname = args.get("hostname")
    comment = args.get("comment")
    name = args.get("name")
    check = frappe.db.exists('Clients Details', dict(name = name))
    if check:
        doc = frappe.get_doc("Clients Details", check)
        doc.client_uuid = userid
        doc.comments = comment
        doc.hostname = hostname
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "success_key" : "false"
        }