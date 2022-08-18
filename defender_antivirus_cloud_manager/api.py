import frappe
from frappe.utils.password import check_password
from frappe import auth
import frappe.utils
import frappe.sessions
from frappe.utils import cint



@frappe.whitelist(allow_guest=True)
def addUser(**args):
    uuid = args.get('uuid')
    user = frappe.session.user
    comment = args.get('comment')
    checkuuid = frappe.db.exists('Clients Details', dict(name = uuid))
    if checkuuid:
        frappe.response["message"] = {
            "success_key": "exists",
            "message": "Client Already exists"
        }
    else:
        doc = frappe.new_doc("Clients Details")
        log = frappe.new_doc("Client Logs")
        log.uuid = uuid
        log.comments = comment
        log.user = user
        log.client_add = 1
        log.save()
        doc.client_uuid = uuid
        doc.comments = comment
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok",
            "message" : "Client added Successfully.."
        }