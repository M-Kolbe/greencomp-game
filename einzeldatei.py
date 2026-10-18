"""Builds Spuren.html: the whole app in one file, to send around or put on any web space.

Run from this folder: python3 einzeldatei.py
The file opens in any current browser, also without a server (double-click). Everything the app needs is inside,
including the QR library; only the two fonts come from Google Fonts and fall back to system fonts when offline.
Progress stays in the browser of each device, as in the normal app.
"""
import base64, pathlib, re

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "Spuren.html"
QR_LIB = HERE / "vendor" / "qrcode-generator-1.4.4.js"

html = (HERE / "index.html").read_text(encoding="utf-8")
icon = "data:image/svg+xml;base64," + base64.b64encode((HERE / "icon.svg").read_bytes()).decode()
html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', "")
html = html.replace('<link rel="icon" href="icon.svg" type="image/svg+xml">', f'<link rel="icon" href="{icon}" type="image/svg+xml">')


def inline(match):
    src = match.group(1)
    path = QR_LIB if "qrcode-generator" in src else HERE / src
    code = path.read_text(encoding="utf-8")
    assert "</script" not in code.lower(), src
    return f"<script>/* {path.name} */\n{code}\n</script>"


html, n = re.subn(r'<script src="([^"]+)"></script>', inline, html)
assert n == 17, n
OUT.write_text(html, encoding="utf-8")
print(f"{OUT.name}: {n} scripts inlined, {OUT.stat().st_size // 1024} KB")
