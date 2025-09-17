import os
import base64
import requests

# --- CONFIGURATION ---
GITHUB_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"
REPO_OWNER = "pauldeogratias"
REPO_NAME = "Bhaba"
BRANCH = "main"
FOLDER_PATH = r"C:\src\Bhaba_com\bhaba-marketplace\src\hooks"

# GitHub API URL for creating/updating files
API_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents"

# --- FUNCTION TO PUSH FILES ---
def push_file(file_path, repo_path):
    with open(file_path, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    
    url = f"{API_URL}/{repo_path}"
    
    # Check if file already exists to get SHA
    response = requests.get(url, params={"ref": BRANCH}, headers={"Authorization": f"token {GITHUB_TOKEN}"})
    sha = response.json().get("sha") if response.status_code == 200 else None
    
    data = {
        "message": f"Update {repo_path}",
        "content": content,
        "branch": BRANCH
    }
    if sha:
        data["sha"] = sha  # Needed to update existing file
    
    res = requests.put(url, json=data, headers={"Authorization": f"token {GITHUB_TOKEN}"})
    if res.status_code in [200, 201]:
        print(f"Uploaded: {repo_path}")
    else:
        print(f"Failed: {repo_path}, {res.json()}")

# --- WALK THROUGH THE FOLDER AND UPLOAD FILES ---
for root, dirs, files in os.walk(FOLDER_PATH):
    for file in files:
        local_file_path = os.path.join(root, file)
        # Construct repo path relative to the folder
        relative_path = os.path.relpath(local_file_path, os.path.dirname(FOLDER_PATH))
        relative_path = relative_path.replace("\\", "/")  # For GitHub paths
        push_file(local_file_path, relative_path)
