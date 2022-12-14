import frappe
import requests, json
no_cache = 1


def get_context(context):
    highsum = 0
    mediumsum = 0
    lowsum = 0
    totalsum = 0
    if frappe.form_dict.day:
        datt = frappe.form_dict.day
    else:
        datt = 7
    high = frappe.db.sql(""" select count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and severityid < 5  GROUP BY threatid """,(datt), as_dict=True)
    medium = frappe.db.sql(""" select count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and  severityid > 4 and severityid < 7 GROUP BY threatid """,(datt), as_dict=True)
    low = frappe.db.sql(""" select count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and  severityid > 6 GROUP BY threatid """,(datt) ,as_dict=True)
    defender_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where anti_malware='false' or anti_spyware='false' or real_time_protection = 'false' or on_access_protection = 'false'""",as_dict=True)
    fully_protected_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where anti_malware='true' and anti_spyware='true' and real_time_protection = 'true' and on_access_protection = 'true'\
    and domain='true' and public='true' and private = 'true' and signature_update='false'""",as_dict=True)
    firewall_status = frappe.db.sql(""" select count(name) as name from `tabClients Details` where domain='false' or public='false' or private = 'false'""",as_dict=True)
    signature_update = frappe.db.sql(""" select count(name) as name from `tabClients Details` where signature_update='true' """,as_dict=True)
    context.top_threats = frappe.db.sql(""" select threatname,COUNT(name) as name from `tabThreat  Details` GROUP BY threatname order by name desc limit 10""", as_dict=True)
    context.top_hosts = frappe.db.sql(""" select c.name,c.comments,c.host_name,COUNT(t.name) as threat from `tabClients Details` as c left join `tabThreat  Details` as t on t.parent=c.name GROUP BY c.name  order by threat desc limit 10""", as_dict=True)
    context.defender_status = defender_status
    context.firewall_status = firewall_status
    context.signature_update = signature_update
    context.fully_protected_status = fully_protected_status
    for h in high:
        highsum = highsum + int(h.id)
    for m in medium:
        mediumsum = mediumsum + int(m.id)
    for l in low:
        lowsum = lowsum + int(l.id)
    context.totalsum = highsum + mediumsum + lowsum
    context.highsum = highsum
    context.mediumsum = mediumsum
    context.lowsum = lowsum
    return context