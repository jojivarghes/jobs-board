import json

def save_source(source_conf):
    with open('/conf/source.json') as f:
        data = json.load(f)

    source_id = len(data) + 1
    source_data = {source_id: source_conf}
    data.append(source_data)

    with open('/conf/source.json', 'w') as f:
        json.dump(data, f)

    return source_id

def get_source_by_id(source_id):
    with open('/conf/source.json') as f:
        data = json.load(f)

    for source in data:
        if str(source_id) in source.keys():
            return source

    return None

