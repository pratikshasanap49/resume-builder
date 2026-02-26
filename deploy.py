from pyngrok import ngrok
import http.server
import socketserver
import threading
import os

# Change to the website directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8080

# Start HTTP server in a thread
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running on port {PORT}")
        httpd.serve_forever()

# Start server thread
server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()

# Create ngrok tunnel
print("\n" + "="*50)
print("🚀 Creating public URL for your website...")
print("="*50 + "\n")

public_url = ngrok.connect(PORT)

print("\n" + "="*50)
print("✅ YOUR WEBSITE IS NOW LIVE!")
print("="*50)
print(f"\n🌐 PUBLIC URL: {public_url}")
print(f"\n📱 Share this link on WhatsApp!")
print("\nPages:")
print(f"   Home:      {public_url}/index.html")
print(f"   Login:     {public_url}/login.html")
print(f"   Sign Up:   {public_url}/signup.html")
print(f"   Dashboard: {public_url}/dashboard.html")
print("\n⚠️  Keep this window open to keep the website running.")
print("Press Ctrl+C to stop.\n")

# Keep running
try:
    input("Press Enter to stop the server...\n")
except KeyboardInterrupt:
    pass

ngrok.disconnect(public_url)
print("Server stopped.")
