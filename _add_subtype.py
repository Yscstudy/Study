import re

with open('d:/Desktop/mylove/study-app/data/prob-stat-questions.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Determine subtype based on section headers
# Find all section headers and their positions
sections = []
for m in re.finditer(r'// =+\s*\n\s*//\s*(选择|填空|计算|证明)题', content):
    sections.append((m.start(), m.group(1)))

print(f'Found {len(sections)} section headers')

# Find all question blocks and assign subtype
# Strategy: insert subtype field after type: 'single',
current_subtype = '选择'
lines = content.split('\n')
new_lines = []
i = 0

while i < len(lines):
    line = lines[i]
    new_lines.append(line)

    # Check for section headers
    for sec_start, sec_type in sections:
        # approximate: check if this line is near a section header
        pass

    # When we find "type: 'single'," add subtype after it
    if "type: 'single'," in line and 'subtype' not in lines[i-1] if i > 0 else True:
        # Determine which section we're in
        # Simple approach: look backwards for section header
        joined = '\n'.join(lines[max(0,i-100):i])
        if '证明题' in joined:
            current_subtype = '证明'
        elif '计算题' in joined:
            current_subtype = '计算'
        elif '填空题' in joined:
            current_subtype = '填空'
        elif '选择题' in joined:
            current_subtype = '选择'

        indent = line[:len(line) - len(line.lstrip())]
        new_lines.append(indent + f"subtype: '{current_subtype}',")

    i += 1

result = '\n'.join(new_lines)

with open('d:/Desktop/mylove/study-app/data/prob-stat-questions.js', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done adding subtype fields')

# Verify
with open('d:/Desktop/mylove/study-app/data/prob-stat-questions.js', 'r', encoding='utf-8') as f:
    verify = f.read()

for t in ['选择', '填空', '计算', '证明']:
    count = verify.count(f"subtype: '{t}'")
    print(f'{t}题: {count}')
