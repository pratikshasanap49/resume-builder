import http.server
import os
import socketserver
import threading

try:
    from pyngrok import conf, ngrok
    HAS_NGROK = True
except Exception:
    HAS_NGROK = False


# Change to this script's directory.
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8080
NGROK_TOKEN = ""  # Optional: paste token here.
TOKEN_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ngrok_token.txt")


def get_ngrok_token():
    if NGROK_TOKEN:
        return NGROK_TOKEN.strip()
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as f:
            return f.read().strip()
    return ""


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def start_server():
    with ReusableTCPServer(("", PORT), QuietHandler) as httpd:
        print(f"Server running on port {PORT}")
        httpd.serve_forever()


server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

local_base = f"http://localhost:{PORT}"
print("\n" + "=" * 55)
print(f"  LOCAL URL: {local_base}")
print("=" * 55)

public_url = None
token = get_ngrok_token()

if HAS_NGROK and token:
    try:
        conf.get_default().auth_token = token
        tunnel = ngrok.connect(PORT)
        public_url = tunnel.public_url if hasattr(tunnel, "public_url") else str(tunnel)
        print("\n" + "=" * 55)
        print("  YOUR WEBSITE IS NOW LIVE PUBLICLY")
        print("=" * 55)
        print(f"\n  PUBLIC URL: {public_url}")
    except Exception as e:
        print(f"\n  ngrok failed: {e}")
        print("  Running on local URL only.")
elif not HAS_NGROK:
    print("\n  pyngrok is not installed. Running on local URL only.")
else:
    print("\n  ngrok token not found. Running on local URL only.")
    print("  To enable public URL, create ngrok_token.txt next to deploy.py")

base = public_url if public_url else local_base
print("\nPages:")
print(f"   Home:      {base}/index.html")
print(f"   Login:     {base}/login.html")
print(f"   Sign Up:   {base}/signup.html")
print(f"   Dashboard: {base}/dashboard.html")
print(f"   Admin:     {base}/admin.html")
print("\nKeep this window open to keep the website running.\n")

try:
    input("Press Enter to stop the server...\n")
except KeyboardInterrupt:
    pass

if public_url and HAS_NGROK:
    ngrok.disconnect(public_url)

print("Server stopped.")
