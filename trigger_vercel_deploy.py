import requests
import os

# === CONFIGURATION ===
# Use an environment variable OR paste the Deploy Hook URL directly here
VERCEL_DEPLOY_HOOK_URL = os.environ.get(
    "VERCEL_DEPLOY_HOOK_URL",
    "https://api.vercel.com/v1/integrations/deploy/prj_oKCN0eQqyfK9FSRZBlVvpaaph7AB/05uk4JxuO9"  # Replace with your actual URL
)

def trigger_vercel_deploy():
    """Trigger a new deployment on Vercel using the latest GitHub code."""
    
    if "prj_" not in VERCEL_DEPLOY_HOOK_URL:
        print("❌ ERROR: Invalid or missing Vercel Deploy Hook URL.")
        return

    print("🚀 Triggering deployment from GitHub latest code...")
    
    try:
        # POST request to Vercel Deploy Hook
        response = requests.post(VERCEL_DEPLOY_HOOK_URL)

        if response.status_code == 200:
            print("✅ Deployment started successfully!")
            print("Vercel response:", response.json())
        else:
            print(f"❌ Failed to trigger deployment. Status Code: {response.status_code}")
            print("Response:", response.text)

    except requests.exceptions.RequestException as e:
        print("❌ An error occurred:", e)

if __name__ == "__main__":
    trigger_vercel_deploy()
