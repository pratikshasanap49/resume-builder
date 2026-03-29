from pyngrok import ngrok, conf
import http.server
import socketserver
import threading
import os
import sys

# ── Change to this file's directory ──────────────────────────
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8080

# ── Read authtoken ────────────────────────────────────────────
# Store your token in a file called ngrok_token.txt next to this script,
# OR paste it directly into NGROK_TOKEN below.
NGROK_TOKEN = ""   # <── paste your token here if you don't want a file

TOKEN_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ngrok_token.txt")
if not NGROK_TOKEN and os.path.exists(TOKEN_FILE):
    with open(TOKEN_FILE, "r") as f:
        NGROK_TOKEN = f.read().strip()

if not NGROK_TOKEN:
    print("\n" + "="*55)
    print("  ngrok authtoken not found!")
    print("  Get yours FREE at: https://dashboard.ngrok.com/get-started/your-authtoken")
    print("  Then either:")
    print("    1. Paste it into NGROK_TOKEN in this file, OR")
    print("    2. Save it in a file called  ngrok_token.txt  next to deploy.py")
    print("="*55)
    NGROK_TOKEN = input("\nPaste your ngrok authtoken here and press Enter: ").strip()
    if NGROK_TOKEN:
        with open(TOKEN_FILE, "w") as f:
            f.write(NGROK_TOKEN)
        print("Token saved to ngrok_token.txt — you won't need to enter it again.")

# ── Start HTTP server in a background thread ─────────────────
class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args): pass   # silence request logs

def start_server():
    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

# ── Local URL always available ────────────────────────────────
local_base = f"http://localhost:{PORT}"
print("\n" + "="*55)
print(f"  LOCAL URL: {local_base}")
print("="*55)

# ── Try ngrok public URL ──────────────────────────────────────
public_url = None
if NGROK_TOKEN:
    try:
        conf.get_default().auth_token = NGROK_TOKEN
        tunnel      = ngrok.connect(PORT)
        public_url  = str(tunnel).replace("NgrokTunnel: \"","").split(" ")[0].strip('"')
        # pyngrok >=1 returns an object; get the string public_url
        if hasattr(tunnel, 'public_url'):
            public_url = tunnel.public_url
        print("\n" + "="*55)
        print("  ✅  YOUR WEBSITE IS NOW LIVE PUBLICLY!")
        print("="*55)
        print(f"\n  🌐  PUBLIC URL : {public_url}")
        print(f"  📱  Share on WhatsApp!")
    except Exception as e:
        print(f"\n  ⚠️  ngrok failed: {e}")
        print("  Running on local URL only.")
else:
    print("  (ngrok skipped — no token provided)")

base = public_url if public_url else local_base
print("\nPages:")
print(f"   Home:      {base}/index.html")
print(f"   Login:     {base}/login.html")
print(f"   Sign Up:   {base}/signup.html")
print(f"   Dashboard: {base}/dashboard.html")
print(f"   Admin:     {base}/admin.html")
print("\n  ⚠️  Keep this window open to keep the website running.\n")

try:
    input("Press Enter to stop the server...\n")
except KeyboardInterrupt:
    pass

if public_url:
    ngrok.disconnect(public_url)
print("Server stopped.")
print("Server stopped.")
