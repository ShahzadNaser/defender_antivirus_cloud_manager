import frappe
import erpnext.education.utils as utils
no_cache = 1
import json
import requests
from datetime import datetime
from frappe.utils import nowdate, now_datetime

@frappe.whitelist(allow_guest=True)
def get_record():
    data = frappe.request.data
    return data



@frappe.whitelist(allow_guest=True)
def get_defender1():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    if record['sysinfo']['host_name'] == "OTG":
        return record
    else:
        return "bad"


@frappe.whitelist(allow_guest=True)
def get_threatlist(**args):
    uuid = args.get('userid')
    data = frappe.db.sql(""" select actionsuccess,additionalactionsbitmask,amproductversion,cleaningactionid,currentthreatexecutionstatusid,detectionid,\
    detectionsourcetypeid,domainuser,initialdetectiontime,lastthreatstatuschangetime,processname,remediationtime,threatid,threatstatuserrorcode,threatstatusid,\
    pscomputername,severityid,threatname from `tabThreat  Details` where parent = %s""",(uuid), as_dict=True)
    return data


@frappe.whitelist(allow_guest=True)
def get_defender():
    data = frappe.request.data
    uuid = frappe.get_request_header("uuid")
    record = json.loads(data.decode('utf-8'))
    if record:
        checkuuid = frappe.db.exists('Clients Details', dict(name = uuid))
        if checkuuid:
            doc = frappe.get_doc("Clients Details", checkuuid)
            full_scan = "false"
            new_interval = "false"
            new_version = "false"
            if doc.full_scan == "True":
                full_scan = "true"
            else:
                full_scan = "false"
            if doc.new_version == "True":
                new_version = "true"
            else:
                new_version = "false"
            if doc.new_interval == "True":
                new_interval = "true"
            else:
                new_interval = "false"
            download_path = doc.download_path
            interval_time = doc.interval_time
            logcheck = frappe.db.exists('Defender Logs', dict(name = uuid))
            if logcheck:
                log = frappe.get_doc("Defender Logs", logcheck)
                log.host_name = record['sysinfo']['host_name']
                log.registered_uuid = 1
                log.save()
            else:
                log = frappe.new_doc("Defender Logs")
                log.uuid = uuid
                log.host_name = record['sysinfo']['host_name']
                log.registered_uuid = 1
                log.save()
            doc.anti_malware = record['dinfo']['AMServiceEnabled']
            doc.anti_spyware = record['dinfo']['AntispywareEnabled']
            doc.anti_virus = record['dinfo']['AntivirusEnabled']
            doc.am_engine = record['dinfo']['AMEngineVersion']
            doc.am_product = record['dinfo']['AMProductVersion']
            doc.signature = record['dinfo']['AntispywareSignatureVersion']
            doc.behaviour_monitor = record['dinfo']['BehaviorMonitorEnabled']
            doc.tamper_protection = record['dinfo']['IsTamperProtected']
            doc.nis_engine = record['dinfo']['NISEngineVersion']
            doc.on_access_protection = record['dinfo']['OnAccessProtectionEnabled']
            doc.real_time_protection = record['dinfo']['RealTimeProtectionEnabled']
            doc.domain = record['fwinfo']['Domain']
            doc.public = record['fwinfo']['Public']
            doc.private = record['fwinfo']['Private']
            doc.os = record['sysinfo']['os_name']
            doc.host_name = record['sysinfo']['host_name']
            doc.interval_time = record['sysinfo']['interval']
            doc.os_version = record['sysinfo']['os_version']
            doc.manufacturer = record['sysinfo']['system_manufacturer']
            doc.model = record['sysinfo']['system_model']
            doc.full_scan_start = record['dinfo']['FullScanStartTime']
            doc.full_scan_end = record['dinfo']['FullScanEndTime']
            doc.last_full_scan_source = record['dinfo']['LastFullScanSource']
            doc.last_quick_scan_source = record['dinfo']['LastQuickScanSource']
            doc.network_inspection_system = record['dinfo']['NISEnabled']
            doc.nis_signature = record['dinfo']['NISSignatureVersion']
            doc.office_antivirus = record['dinfo']['IoavProtectionEnabled']
            doc.agent_version = record['sysinfo']['version']
            doc.last_update = now_datetime()
            doc.test = now_datetime()
            doc.signature_update = record['dinfo']['DefenderSignaturesOutOfDate']
            doc.table_39 = []
            for t in record['treport']:
                row = doc.append("table_39",{})
                row.actionsuccess = t['ActionSuccess']
                row.additionalactionsbitmask = t['AdditionalActionsBitMask']
                row.amproductversion = t['AMProductVersion']
                row.cleaningactionid = t['CleaningActionID']
                row.currentthreatexecutionstatusid = t['CurrentThreatExecutionStatusID']
                row.detectionid = t['DetectionID']
                row.detectionsourcetypeid = t['DetectionSourceTypeID']
                row.domainuser = t['DomainUser']
                row.initialdetectiontime = now_datetime()
                row.lastthreatstatuschangetime = t['LastThreatStatusChangeTime']
                row.processname = t['ProcessName']
                row.remediationtime = t['RemediationTime']
                row.resources = t['Resources']
                row.threatid = t['ThreatID']
                row.threatstatuserrorcode = t['ThreatStatusErrorCode']
                row.threatstatusid = t['ThreatStatusID']
                row.pscomputername = t['PSComputerName']
                row.severityid = t['SeverityID']
                row.threatname = t['ThreatName']
            if doc.new_version == "True" and doc.full_scan == "True" and doc.new_interval == "True" and doc.download_path:
                doc.new_version = "False"
                doc.full_scan = "False"
                doc.new_interval = "False"
                doc.download_path = ""
            elif doc.new_version == "True" and doc.full_scan == "True" and doc.download_path:
                doc.new_version = "False"
                doc.full_scan = "False"
                doc.download_path = ""
            elif doc.new_interval == "True" and doc.full_scan == "True" and doc.interval_time:
                doc.new_interval = "False"
                doc.full_scan = "False"
            elif doc.new_interval == "True" and doc.interval_time:
                doc.new_interval = "False"
            elif doc.new_version == "True" and doc.full_scan == "True" and doc.download_path:
                doc.new_version == "False"
                doc.download_path = ""
                doc.full_scan = "True"
            elif doc.new_version == "True" and doc.download_path:
                doc.new_version == "False"
                doc.download_path = ""
            elif doc.full_scan == "True":
                doc.full_scan = "False"
            doc.save()
            if new_version == "true" and full_scan == "true" and new_interval =="true" and interval_time and download_path:
                return {
                    "status_code": "ok",
                    "response":{
                        "new_version":new_version,
                        "download_path": download_path,
                        "new_interval":new_interval,
                        "interval": interval_time,
                        "full_scan":full_scan
                    }

                }
            elif new_version == "true" and download_path:
                return {
                    "status_code": "ok",
                    "response":{
                        "new_version":new_version,
                        "download_path": download_path,
                        "new_interval":new_interval,
                        "interval":interval_time,
                        "full_scan":full_scan
                    }

                }
            elif new_interval == "true" and interval_time:
                return {
                    "status_code": "ok",
                    "response":{
                        "new_version":new_version,
                        "download_path":"",
                        "new_interval":new_interval,
                        "interval":interval_time,
                        "full_scan":full_scan
                    }

                }
            elif full_scan == "true":
                return {
                    "status_code": "ok",
                    "response":{
                        "new_version":new_version,
                        "download_path":"",
                        "new_interval":new_interval,
                        "interval":interval_time,
                        "full_scan":full_scan
                    }

                }
            else:
                return {
                    "status_code": "ok",
                    "response":{
                        "new_version":new_version,
                        "download_path":"",
                        "new_interval":new_interval,
                        "interval":interval_time,
                        "full_scan":full_scan
                    }
                }
        else:
            logcheck = frappe.db.exists('Defender Logs', dict(name = uuid))
            if logcheck:
                log = frappe.get_doc("Defender Logs", logcheck)
                log.host_name = record['sysinfo']['host_name']
                log.registered_uuid = 0
                log.save()
            else:
                log = frappe.new_doc("Defender Logs")
                log.uuid = uuid
                log.host_name = record['sysinfo']['host_name']
                log.registered_uuid = 0
                log.save()
            return {
                "status_code" : "UUID not exists"
            }
    else:
        return "Empty Request"




@frappe.whitelist(allow_guest=True)
def getUserDetails(**args):
    uuid = args.get('uuid')
    details = frappe.db.sql(""" select name,host_name,anti_malware,anti_spyware,behaviour_monitor,tamper_protection,nis_signature,interval_time,\
    office_antivirus,network_inspection_system,on_access_protection,real_time_protection,anti_virus,signature,am_product,am_engine,nis_engine,\
    domain,public,private,agent_version,signature_update,last_update,\
    os, os_version, manufacturer,model,full_scan_start,full_scan_end,last_full_scan_source,\
    last_quick_scan_source from `tabClients Details` where name=%s """,(uuid),as_dict=True)
    total_threat = frappe.db.sql(""" select COUNT(threatid) as name from `tabThreat  Details` where parent=%s """,(uuid))
    for d in details:
        return d
    return total_threat



@frappe.whitelist(allow_guest=True)
def getThreats(**args):
    uuid = args.get('uuid')
    total_threat = frappe.db.sql(""" select COUNT(name) as name from `tabThreat  Details` where parent=%s """,(uuid))
    return total_threat[0][0]

@frappe.whitelist(allow_guest=True)
def getclientdetails(**args):
    day = args.get('value')
    # if frappe.form_dict.day:
    #     day = frappe.form_dict.day
    # else:
    #     day = 7
    high = frappe.db.sql(""" select DISTINCT(DAYNAME(initialdetectiontime)) as day, count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and severityid < 5  GROUP BY day ORDER BY DAYOFWEEK(initialdetectiontime) """,(day), as_dict=True)
    medium = frappe.db.sql(""" select DISTINCT(DAYNAME(initialdetectiontime)) as day, count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and severityid > 4 and severityid < 7 GROUP BY day ORDER BY DAYOFWEEK(initialdetectiontime) """,(day), as_dict=True)
    low = frappe.db.sql(""" select DISTINCT(DAYNAME(initialdetectiontime)) as day, count(threatid) as id,name from `tabThreat  Details` where initialdetectiontime >=CURRENT_DATE - %s and severityid > 6 GROUP BY day ORDER BY DAYOFWEEK(initialdetectiontime) """,(day), as_dict=True)
    sid = frappe.db.sql(""" select count(detectionsourcetypeid) as id from `tabThreat  Details` """, as_dict=True)
    al = frappe.db.sql(""" select cleaningactionid as id,name from `tabThreat  Details`""",as_dict=True)
    return {"high":high,"sid":sid,"al": al, "medium":medium, "low":low}

@frappe.whitelist(allow_guest=True)
def get_hostname():
    data = frappe.request.data
    record = json.loads(data.decode('utf-8'))
    return record



@frappe.whitelist(allow_guest=True)
def delete_user(**args):
    userid = args.get('userid')
    user = frappe.session.user
    if userid:
        frappe.delete_doc("Clients Details", userid)
        log = frappe.new_doc("Client Logs")
        log.uuid = userid
        log.user = user
        log.client_delete = 1
        log.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "not found":"Record not Found"
        }

@frappe.whitelist(allow_guest=True)
def delete_all_user():
    frappe.db.delete("Clients Details")
    frappe.response["message"] = {
        "success_key" : "ok"
    }



@frappe.whitelist(allow_guest=True)
def update_user(**args):
    userid = args.get("userid")
    user = frappe.session.user
    hostname = args.get("hostname")
    comment = args.get("comment")
    name = args.get("name")
    check = frappe.db.exists('Clients Details', dict(name = name))
    if check:
        doc = frappe.get_doc("Clients Details", check)
        log = frappe.new_doc("Client Logs")
        log.uuid = userid
        log.comments = comment
        log.user = user
        log.host_name = hostname
        log.client_update = 1
        log.save()
        doc.name = userid
        doc.client_uuid = userid
        doc.comments = comment
        doc.host_name = hostname
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "success_key" : "false"
        }



@frappe.whitelist(allow_guest=True)
def update_interval(**args):
    uuid = args.get("uuid")
    interval_time = args.get("interval_time")
    check = frappe.db.exists('Clients Details', dict(name = uuid))
    if check:
        doc = frappe.get_doc("Clients Details", check)
        doc.interval_time = interval_time
        doc.new_interval = "True"
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "success_key" : "false"
        }


@frappe.whitelist(allow_guest=True)
def fullscan(**args):
    uuid = args.get("uuid")
    check = frappe.db.exists('Clients Details', dict(name = uuid))
    if check:
        doc = frappe.get_doc("Clients Details", check)
        doc.full_scan = "True"
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "success_key" : "false"
        }




@frappe.whitelist(allow_guest=True)
def addversion(**args):
    uuid = args.get("uuid")
    download_path = args.get("download_path")
    check = frappe.db.exists('Clients Details', dict(name = uuid))
    if check:
        doc = frappe.get_doc("Clients Details", check)
        doc.new_version = "True"
        doc.download_path = download_path
        doc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }
    else:
        frappe.response["message"] = {
            "success_key" : "false"
        }


@frappe.whitelist(allow_guest=True)
def insertExcel(**args):
    uuid = args.get("uuid")
    host = args.get("host")
    check = frappe.db.exists('Clients Details', dict(name = uuid))
    if check:
        pass
    else:
        docc = frappe.new_doc("Clients Details")
        docc.client_uuid = uuid
        docc.host_name = host
        docc.save()
        frappe.response["message"] = {
            "success_key" : "ok"
        }