import frappe
import requests, json
no_cache = 1


def get_context(context):
    url = "https://jsonplaceholder.typicode.com/albums"
    res = requests.get(url)
    data = res.text
    parse_json = json.loads(data)
    context.r = parse_json