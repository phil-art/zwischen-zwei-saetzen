#!/usr/bin/env python3
"""Serve the static candidate and verify every browser-facing asset."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.request import urlopen
import contextlib
import os
import re

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "", "index.html", "styles.css", "app.mjs", "runtime.mjs", "storage.mjs",
    "data.mjs", "content-w9.mjs", "flow.mjs", "datenschutz.html"
]

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass

old = Path.cwd()
os.chdir(ROOT)
server = ThreadingHTTPServer(("127.0.0.1", 0), Quiet)
thread = Thread(target=server.serve_forever, daemon=True)
thread.start()
try:
    base = f"http://127.0.0.1:{server.server_port}/"
    for relative in REQUIRED:
        with contextlib.closing(urlopen(base + relative, timeout=5)) as response:
            assert response.status == 200, relative
            content = response.read()
            assert content or relative == ".nojekyll", relative
    app = (ROOT / "app.mjs").read_text(encoding="utf-8")
    for imported in re.findall(r'from\s+"\./([^"]+)"', app):
        assert (ROOT / imported).is_file(), imported
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    assert 'href="datenschutz.html"' in html
    assert 'src="app.mjs"' in html
    print({"status": "passed", "assets": len(REQUIRED), "root": str(ROOT)})
finally:
    server.shutdown()
    server.server_close()
    os.chdir(old)

