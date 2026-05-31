import re

with open('data/prob-stat-questions.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Step 1: Fix double backslashes - they should become single
c = c.replace('\\\\', '\\')

# Step 2: Remove all LaTeX commands like \alpha, \beta, \frac, etc.
# These are backslash + letter(s)
# But we already converted many. Find remaining ones.
# The problematic ones are \x \u \0 etc which JS interprets as escape sequences

# Find all backslash-letter patterns
remaining = set(re.findall(r'\\[a-zA-Z]+', c))
print('Remaining LaTeX commands:')
for r in sorted(remaining):
    count = c.count(r)
    if count > 0:
        print(f'  {r}: {count} occurrences')

# Fix commonly used ones
fixes = {
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ',
    '\\theta': 'θ', '\\lambda': 'λ', '\\mu': 'μ', '\\sigma': 'σ',
    '\\rho': 'ρ', '\\tau': 'τ', '\\pi': 'π', '\\omega': 'ω',
    '\\epsilon': 'ε', '\\varphi': 'φ', '\\chi': 'χ',
    '\\Sigma': 'Σ', '\\Omega': 'Ω', '\\Phi': 'Φ', '\\Theta': 'Θ',
    '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Lambda': 'Λ', '\\Pi': 'Π',
    '\\infty': '∞', '\\pm': '±', '\\cdot': '·', '\\times': '×',
    '\\leq': '≤', '\\geq': '≥', '\\neq': '≠', '\\approx': '≈',
    '\\sim': '∼', '\\to': '→', '\\Rightarrow': '⇒',
    '\\ldots': '…', '\\cdots': '⋯', '\\vdots': '⋮',
    '\\varnothing': '∅', '\\emptyset': '∅', '\\partial': '∂',
    '\\in': '∈', '\\notin': '∉', '\\subset': '⊂', '\\subseteq': '⊆',
    '\\cup': '∪', '\\cap': '∩', '\\forall': '∀', '\\exists': '∃',
    '\\sum': 'Σ', '\\prod': 'Π', '\\int': '∫', '\\nabla': '∇',
    '\\text': '', '\\begin': '', '\\end': '', '\\left': '', '\\right': '',
    '\\dfrac': '', '\\frac': '', '\\bar': '', '\\hat': '', '\\tilde': '',
    '\\dot': '', '\\ddot': '', '\\vec': '', '\\overline': '',
    '\\mathop': '', '\\operatorname': '', '\\displaystyle': '',
    '\\limits': '', '\\nolimits': '', '\\big': '',
    '\\qquad': ' ', '\\quad': ' ', '\\ ': ' ', '\\;': ' ', '\\,': ' ',
    '\\sim': '∼', '\\propto': '∝',
}

for old, new in fixes.items():
    c = c.replace(old, new)

# Fix \\{ -> { and \\} -> }
c = c.replace('\\{', '{').replace('\\}', '}')

# Fix subscripts and superscripts
c = re.sub(r'\{([^}]+)\}', r'\1', c)  # Remove remaining braces

# Cleanup: remove any remaining single backslash
c = c.replace('\\', '')

with open('data/prob-stat-questions.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done! Remaining backslashes: ' + str(c.count(chr(92))))
