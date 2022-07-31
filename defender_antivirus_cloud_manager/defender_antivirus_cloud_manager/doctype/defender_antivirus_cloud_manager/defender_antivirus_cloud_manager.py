# Copyright (c) 2022, Otgooneo and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DefenderAntivirusCloudManager(Document):
	pass


@frappe.whitelist()
def get_total_job_posted():
	return 5


@frappe.whitelist()
def get_record():
    data = frappe.request.data
    return data