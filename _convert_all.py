import re

with open('data/prob-stat-questions.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Complete LaTeX → Unicode mapping
MAP = {
    # === Greek lowercase ===
    r'\alpha': 'α', r'\beta': 'β', r'\gamma': 'γ', r'\delta': 'δ',
    r'\epsilon': 'ε', r'\varepsilon': 'ε', r'\zeta': 'ζ', r'\eta': 'η',
    r'\theta': 'θ', r'\vartheta': 'ϑ', r'\iota': 'ι', r'\kappa': 'κ',
    r'\lambda': 'λ', r'\mu': 'μ', r'\nu': 'ν', r'\xi': 'ξ',
    r'\pi': 'π', r'\varpi': 'ϖ', r'\rho': 'ρ', r'\varrho': 'ϱ',
    r'\sigma': 'σ', r'\varsigma': 'ς', r'\tau': 'τ', r'\upsilon': 'υ',
    r'\phi': 'φ', r'\varphi': 'φ', r'\chi': 'χ', r'\psi': 'ψ', r'\omega': 'ω',
    # === Greek uppercase ===
    r'\Gamma': 'Γ', r'\Delta': 'Δ', r'\Theta': 'Θ', r'\Lambda': 'Λ',
    r'\Xi': 'Ξ', r'\Pi': 'Π', r'\Sigma': 'Σ', r'\Upsilon': 'Υ',
    r'\Phi': 'Φ', r'\Psi': 'Ψ', r'\Omega': 'Ω',
    # === Math symbols ===
    r'\infty': '∞', r'\pm': '±', r'\mp': '∓', r'\times': '×', r'\div': '÷',
    r'\cdot': '·', r'\ast': '*', r'\star': '☆', r'\circ': '∘', r'\bullet': '•',
    r'\oplus': '⊕', r'\ominus': '⊖', r'\otimes': '⊗', r'\oslash': '⊘',
    r'\odot': '⊙', r'\dagger': '†', r'\ddagger': '‡', r'\vee': '∨',
    r'\wedge': '∧', r'\neg': '¬', r'\lnot': '¬',
    r'\leq': '≤', r'\geq': '≥', r'\neq': '≠', r'\equiv': '≡',
    r'\approx': '≈', r'\simeq': '≃', r'\cong': '≅', r'\propto': '∝',
    r'\sim': '∼', r'\simeq': '≃', r'\perp': '⊥', r'\parallel': '∥',
    r'\ll': '≪', r'\gg': '≫', r'\prec': '≺', r'\succ': '≻',
    r'\subset': '⊂', r'\supset': '⊃', r'\subseteq': '⊆', r'\supseteq': '⊇',
    r'\in': '∈', r'\notin': '∉', r'\ni': '∋', r'\owns': '∋',
    r'\cup': '∪', r'\cap': '∩', r'\setminus': '∖',
    r'\emptyset': '∅', r'\varnothing': '∅',
    r'\forall': '∀', r'\exists': '∃', r'\nexists': '∄',
    r'\partial': '∂', r'\nabla': '∇', r'\hbar': 'ℏ', r'\ell': 'ℓ',
    r'\Re': 'ℜ', r'\Im': 'ℑ', r'\aleph': 'ℵ',
    # === Arrows ===
    r'\to': '→', r'\rightarrow': '→', r'\leftarrow': '←', r'\uparrow': '↑',
    r'\downarrow': '↓', r'\leftrightarrow': '↔', r'\Rightarrow': '⇒',
    r'\Leftarrow': '⇐', r'\Leftrightarrow': '⇔', r'\mapsto': '↦',
    r'\longrightarrow': '→', r'\xrightarrow': '→',
    # === Big operators ===
    r'\sum': 'Σ', r'\prod': 'Π', r'\int': '∫', r'\oint': '∮', r'\coprod': '∐',
    # === Brackets ===
    r'\langle': '⟨', r'\rangle': '⟩', r'\lceil': '⌈', r'\rceil': '⌉',
    r'\lfloor': '⌊', r'\rfloor': '⌋',
    # === Dots ===
    r'\ldots': '…', r'\cdots': '⋯', r'\vdots': '⋮', r'\ddots': '⋱',
    # === Misc ===
    r'\prime': "'", r'\backslash': '\\', r'\Box': '□', r'\Diamond': '◇',
    r'\triangle': '△', r'\clubsuit': '♣', r'\diamondsuit': '♢',
    r'\heartsuit': '♡', r'\spadesuit': '♤',
    # === Relations ===
    r'\not\equiv': '≢', r'\not\sim': '≁',
    # === Functions ===
    r'\sin': 'sin', r'\cos': 'cos', r'\tan': 'tan', r'\cot': 'cot',
    r'\sec': 'sec', r'\csc': 'csc', r'\arcsin': 'arcsin', r'\arccos': 'arccos',
    r'\arctan': 'arctan', r'\sinh': 'sinh', r'\cosh': 'cosh', r'\tanh': 'tanh',
    r'\log': 'log', r'\ln': 'ln', r'\lg': 'lg', r'\exp': 'exp',
    r'\lim': 'lim', r'\sup': 'sup', r'\inf': 'inf', r'\max': 'max', r'\min': 'min',
    r'\gcd': 'gcd', r'\det': 'det', r'\dim': 'dim', r'\ker': 'ker',
    r'\deg': 'deg', r'\hom': 'hom', r'\arg': 'arg',
    # === Dots above/below ===
    r'\dot\{': '', r'\ddot\{': '', r'\bar': '', r'\hat': '', r'\tilde': '',
    r'\vec': '', r'\widehat': '', r'\widetilde': '', r'\overline': '',
    r'\underline': '', r'\overbrace': '', r'\underbrace': '',
    # === Sizing ===
    r'\big': '', r'\Big': '', r'\bigg': '', r'\Bigg': '',
    r'\left': '', r'\right': '', r'\middle': '',
    # === Spacing ===
    r'\qquad': '  ', r'\quad': ' ', r'\ ': ' ', r'\;': ' ', r'\,': ' ',
    # === Fractions and binomials ===
    r'\binom': '',
    # === text formatting ===
    r'\text': '', r'\textbf': '', r'\textit': '', r'\texttt': '',
    r'\textrm': '', r'\textsf': '', r'\textsc': '',
    r'\emph': '', r'\underline': '', r'\overline': '',
    r'\displaystyle': '', r'\scriptstyle': '',
    # === Math mode ===
    r'\begin{array}': '', r'\end{array}': '',
    r'\begin{bmatrix}': '', r'\end{bmatrix}': '',
    r'\begin{cases}': '', r'\end{cases}': '',
    r'\begin{matrix}': '', r'\end{matrix}': '',
}

# Apply simple replacements
for old, new in MAP.items():
    c = c.replace(old, new)

# Handle \frac{a}{b} → (a)/(b)
c = re.sub(r'\\frac\{([^{}]+)\}\{([^{}]+)\}', r'(\1)/(\2)', c)
c = re.sub(r'\\dfrac\{([^{}]+)\}\{([^{}]+)\}', r'(\1)/(\2)', c)

# Handle \sqrt{a} → √(a)  and  \sqrt[n]{a} → ⁿ√(a)
c = re.sub(r'\\sqrt\[([^\]]+)\]\{([^}]+)\}', r'(\2)^(1/\1)', c)
c = re.sub(r'\\sqrt\{([^}]+)\}', r'√(\1)', c)

# Handle ^{...} and _{...}
c = re.sub(r'\^\{([^}]+)\}', r'^(\1)', c)
c = re.sub(r'_\{([^}]+)\}', r'_\1', c)

# Remove braces { and }
c = re.sub(r'\\\{', '{', c)
c = re.sub(r'\\\}', '}', c)
# But keep regular braces - they're just grouping
c = re.sub(r'\{([^{}]+)\}', r'\1', c)

# Remove any remaining backslash commands
c = re.sub(r'\\[a-zA-Z]+', '', c)

# Clean up double/triple backslashes
c = c.replace('\\\\', '\\')

with open('data/prob-stat-questions.js', 'w', encoding='utf-8') as f:
    f.write(c)

# Verify
remaining = set(re.findall(r'\\[a-zA-Z]+', c))
if remaining:
    print('Remaining LaTeX commands: ' + str(remaining))
else:
    print('All LaTeX commands converted!')
print('Backslashes left: ' + str(c.count(chr(92))))
print('File size: ' + str(len(c)) + ' chars')
