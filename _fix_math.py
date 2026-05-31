import re

with open('data/prob-stat-questions.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Convert LaTeX to readable Unicode
reps = [
    # Greek
    (r'\alpha', 'α'), (r'\beta', 'β'), (r'\gamma', 'γ'), (r'\delta', 'δ'),
    (r'\epsilon', 'ε'), (r'\theta', 'θ'), (r'\lambda', 'λ'), (r'\mu', 'μ'),
    (r'\pi', 'π'), (r'\rho', 'ρ'), (r'\sigma', 'σ'), (r'\tau', 'τ'),
    (r'\varphi', 'φ'), (r'\chi', 'χ'), (r'\omega', 'ω'),
    (r'\Sigma', 'Σ'), (r'\Pi', 'Π'), (r'\Omega', 'Ω'), (r'\Phi', 'Φ'),
    (r'\Theta', 'Θ'), (r'\Lambda', 'Λ'), (r'\Gamma', 'Γ'), (r'\Delta', 'Δ'),
    # Math
    (r'\infty', '∞'), (r'\pm', '±'), (r'\cdot', '·'), (r'\times', '×'),
    (r'\leq', '≤'), (r'\geq', '≥'), (r'\neq', '≠'), (r'\approx', '≈'),
    (r'\sim', '∼'), (r'\to', '→'), (r'\Rightarrow', '⇒'),
    (r'\ldots', '…'), (r'\cdots', '⋯'),
    (r'\varnothing', '∅'), (r'\emptyset', '∅'),
    (r'\partial', '∂'),
    (r'\in', '∈'), (r'\notin', '∉'), (r'\subset', '⊂'),
    (r'\cup', '∪'), (r'\cap', '∩'),
    (r'\forall', '∀'), (r'\exists', '∃'),
    (r'\sum', 'Σ'), (r'\prod', 'Π'), (r'\int', '∫'),
    # text commands
    (r'\text{Cov}', 'Cov'),
    # Accents - strip them, keep the letter
    (r'\bar{X}', 'X̄'), (r'\bar{x}', 'x̄'), (r'\bar{Y}', 'Ȳ'),
    (r'\hat{\theta}', 'θ̂'), (r'\hat{\mu}', 'μ̂'), (r'\hat{\sigma}', 'σ̂'),
    (r'\tilde', ''),
]

for old, new in reps:
    c = c.replace(old, new)

# Fix \frac{a}{b} -> (a)/(b)
def fix_frac(m):
    return '(' + m.group(1) + ')/(' + m.group(2) + ')'
c = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', fix_frac, c)

# Fix ^{...} and _{...}
c = re.sub(r'\^\{([^}]+)\}', r'^(\1)', c)
c = re.sub(r'_\{([^}]+)\}', r'_\1', c)

# Remove remaining backslash-escaped braces
c = c.replace(r'\{', '{').replace(r'\}', '}')

# Strip remaining single backslashes before letters (leftover LaTeX commands)
# Keep double backslashes in explanations

# Sample check
qs = re.findall(r"question:\s*'([^']+)'", c)
print('Sample questions after conversion:')
for q in qs[:3]:
    print('  ' + q[:150])
print()
print('Total questions: ' + str(len(qs)))

with open('data/prob-stat-questions.js', 'w', encoding='utf-8') as f:
    f.write(c)
print('Saved!')
