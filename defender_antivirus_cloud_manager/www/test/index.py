import frappe
import requests, json
no_cache = 1


def get_context(context):
    defender_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where anti_malware='false' or anti_spyware='false' or real_time_protection = 'false' or on_access_protection = 'false'""",as_dict=True)
    fully_protected_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where anti_malware='false' or anti_spyware='false' or real_time_protection = 'false' or on_access_protection = 'false'\
    or domain='false' or public='false' or private = 'false' or signature_update='true'""",as_dict=True)
    firewall_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where domain='false' or public='false' or private = 'false'""",as_dict=True)
    signature_update = frappe.db.sql(""" select count(name) as name from `tabClients Details` where signature_update='true' """,as_dict=True)
    context.top_threats = frappe.db.sql(""" select threatname,COUNT(name) as name from `tabThreat  Details` GROUP BY threatname """, as_dict=True)
    context.top_hosts = frappe.db.sql(""" select c.name,c.comments,c.host_name,COUNT(t.name) as threat from `tabClients Details` as c left join `tabThreat  Details` as t on t.parent=c.name GROUP BY c.name """, as_dict=True)
    context.defender_status = defender_status
    context.firewall_status = firewall_status
    context.signature_update = signature_update
    context.fully_protected_status = fully_protected_status
    return context