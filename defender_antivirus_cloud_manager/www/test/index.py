import frappe
import requests, json
no_cache = 1


def get_context(context):
    url1 = "https://jsonplaceholder.typicode.com/albums"
    url = "https://defender.bloomlink.mn/api/method/defender_antivirus_cloud_manager.utils.get_defender"
    res = requests.get(url, headers={"Authorization":"Token c90bb697dc9ea0a:4040d780bc82e81", "uuid":"CB51F1AB-5BB0-11EB-9169-182649E82820"})
    data = res.text
    parse_json = json.loads(data.message.sysinfo)
    context.abc = res
    context.r = parse_json