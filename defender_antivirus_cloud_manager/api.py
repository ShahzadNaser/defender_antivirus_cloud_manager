import frappe




@frappe.whitelist()
def addUser(**args):
    return 5