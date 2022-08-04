import frappe
from frappe.utils.password import check_password
from frappe import auth
import frappe.utils
import frappe.sessions
from frappe.utils import cint



@frappe.whitelist(allow_guest=True)
def addUser(**args):
    uuid = args.get('uuid')
    comment = args.get('comment')
    hostname = args.get('hostname')
    doc = frappe.new_doc("Clients Details")
    doc.client_uuid = uuid
    doc.comments = comment
    doc.host_name = hostname
    doc.save()
    frappe.response["message"] = {
        "success_key" : "ok",
        "message" : "Client added Successfully.."
    }