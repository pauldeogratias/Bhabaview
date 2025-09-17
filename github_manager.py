# import os
# import base64
# import json
# import shutil
# import subprocess
# import tkinter as tk
# from tkinter import ttk, filedialog, messagebox, simpledialog
# import requests
# from threading import Thread
# import tempfile
# import zipfile
# from pathlib import Path
# import webbrowser
# from datetime import datetime

# class EnhancedGitHubManager:
#     def __init__(self, root):
#         self.root = root
#         self.root.title("Enhanced GitHub Manager")
#         self.root.geometry("1400x900")
#         self.root.configure(bg='#1e1e1e')
        
#         # Configuration
#         self.github_token = ""
#         self.repo_owner = ""
#         self.repo_name = ""
#         self.current_branch = "main"
#         self.current_path = ""
        
#         # Style configuration
#         self.setup_styles()
        
#         # Create main interface
#         self.create_widgets()
        
#         # Load configuration if exists
#         self.load_config()
        
#         # Bind events
#         self.bind_events()
    
#     def setup_styles(self):
#         """Setup modern dark theme styles"""
#         style = ttk.Style()
#         style.theme_use('clam')
        
#         # Dark theme colors
#         bg_color = '#1e1e1e'
#         fg_color = '#ffffff'
#         select_color = '#0d7377'
#         entry_color = '#2d2d2d'
        
#         style.configure('Dark.TFrame', background=bg_color)
#         style.configure('Dark.TLabel', background=bg_color, foreground=fg_color)
#         style.configure('Dark.TButton', background='#404040', foreground=fg_color)
#         style.configure('Dark.TEntry', fieldbackground=entry_color, foreground=fg_color)
#         style.configure('Title.TLabel', font=('Segoe UI', 18, 'bold'), background=bg_color, foreground='#4CAF50')
#         style.configure('Heading.TLabel', font=('Segoe UI', 12, 'bold'), background=bg_color, foreground=fg_color)
#         style.configure('Status.TLabel', font=('Segoe UI', 10), background='#2d2d2d', foreground=fg_color)
    
#     def create_widgets(self):
#         """Create the enhanced GUI"""
#         # Main container
#         main_frame = ttk.Frame(self.root, style='Dark.TFrame')
#         main_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
#         # Title and quick actions
#         self.create_header(main_frame)
        
#         # Quick setup panel
#         self.create_quick_setup(main_frame)
        
#         # Main content area
#         content_frame = ttk.Frame(main_frame, style='Dark.TFrame')
#         content_frame.pack(fill='both', expand=True, pady=(10, 0))
        
#         # Left panel - Navigation and controls
#         self.create_navigation_panel(content_frame)
        
#         # Right panel - File browser
#         self.create_file_browser(content_frame)
        
#         # Bottom panel - Actions and status
#         self.create_bottom_panel(main_frame)
    
#     def create_header(self, parent):
#         """Create header with title and quick actions"""
#         header_frame = ttk.Frame(parent, style='Dark.TFrame')
#         header_frame.pack(fill='x', pady=(0, 15))
        
#         # Title
#         title_label = ttk.Label(header_frame, text="GitHub Manager", style='Title.TLabel')
#         title_label.pack(side='left')
        
#         # Quick actions
#         quick_frame = ttk.Frame(header_frame, style='Dark.TFrame')
#         quick_frame.pack(side='right')
        
#         ttk.Button(quick_frame, text="New File", command=self.quick_create_file, style='Dark.TButton').pack(side='left', padx=2)
#         ttk.Button(quick_frame, text="New Folder", command=self.quick_create_folder, style='Dark.TButton').pack(side='left', padx=2)
#         ttk.Button(quick_frame, text="Upload", command=self.quick_upload, style='Dark.TButton').pack(side='left', padx=2)
#         ttk.Button(quick_frame, text="Download All", command=self.download_repository, style='Dark.TButton').pack(side='left', padx=2)
    
#     def create_quick_setup(self, parent):
#         """Create simplified setup panel"""
#         setup_frame = ttk.LabelFrame(parent, text=" Quick Setup ", padding=10, style='Dark.TFrame')
#         setup_frame.pack(fill='x', pady=(0, 10))
        
#         # Repository URL input (simplified)
#         url_frame = ttk.Frame(setup_frame, style='Dark.TFrame')
#         url_frame.pack(fill='x', pady=5)
        
#         ttk.Label(url_frame, text="Repository URL:", style='Dark.TLabel').pack(side='left', padx=(0, 10))
#         self.repo_url_var = tk.StringVar()
#         url_entry = ttk.Entry(url_frame, textvariable=self.repo_url_var, width=50, style='Dark.TEntry')
#         url_entry.pack(side='left', fill='x', expand=True, padx=(0, 10))
        
#         ttk.Button(url_frame, text="Connect", command=self.quick_connect, style='Dark.TButton').pack(side='right')
        
#         # Status and token
#         status_frame = ttk.Frame(setup_frame, style='Dark.TFrame')
#         status_frame.pack(fill='x', pady=5)
        
#         ttk.Label(status_frame, text="Token:", style='Dark.TLabel').pack(side='left', padx=(0, 10))
#         self.token_var = tk.StringVar()
#         ttk.Entry(status_frame, textvariable=self.token_var, show="*", width=30, style='Dark.TEntry').pack(side='left', padx=(0, 10))
        
#         self.connection_status = ttk.Label(status_frame, text="Not connected", style='Dark.TLabel')
#         self.connection_status.pack(side='left', padx=(20, 0))
    
#     def create_navigation_panel(self, parent):
#         """Create navigation and branch panel"""
#         nav_frame = ttk.LabelFrame(parent, text=" Navigation ", padding=10, style='Dark.TFrame')
#         nav_frame.pack(side='left', fill='y', padx=(0, 10))
#         nav_frame.configure(width=300)
        
#         # Branch selection
#         branch_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
#         branch_frame.pack(fill='x', pady=(0, 10))
        
#         ttk.Label(branch_frame, text="Branch:", style='Heading.TLabel').pack(anchor='w')
#         self.branch_var = tk.StringVar(value="main")
#         self.branch_combo = ttk.Combobox(branch_frame, textvariable=self.branch_var, state='readonly', width=25)
#         self.branch_combo.pack(fill='x', pady=5)
        
#         # Path navigation
#         path_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
#         path_frame.pack(fill='x', pady=(0, 10))
        
#         ttk.Label(path_frame, text="Current Path:", style='Heading.TLabel').pack(anchor='w')
#         self.path_var = tk.StringVar(value="/")
#         path_display = ttk.Label(path_frame, textvariable=self.path_var, style='Dark.TLabel', relief='sunken')
#         path_display.pack(fill='x', pady=5)
        
#         # Navigation buttons
#         nav_buttons = ttk.Frame(nav_frame, style='Dark.TFrame')
#         nav_buttons.pack(fill='x', pady=(0, 10))
        
#         ttk.Button(nav_buttons, text="Up", command=self.go_up, style='Dark.TButton').pack(side='left', padx=(0, 5))
#         ttk.Button(nav_buttons, text="Root", command=self.go_root, style='Dark.TButton').pack(side='left')
        
#         # Repository info
#         info_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
#         info_frame.pack(fill='both', expand=True)
        
#         ttk.Label(info_frame, text="Repository Info:", style='Heading.TLabel').pack(anchor='w', pady=(10, 5))
#         self.info_text = tk.Text(info_frame, height=8, width=35, bg='#2d2d2d', fg='white', 
#                                 font=('Consolas', 9), wrap='word')
#         self.info_text.pack(fill='both', expand=True)
    
#     def create_file_browser(self, parent):
#         """Create enhanced file browser"""
#         browser_frame = ttk.LabelFrame(parent, text=" Files ", padding=10, style='Dark.TFrame')
#         browser_frame.pack(side='right', fill='both', expand=True)
        
#         # File browser toolbar
#         toolbar = ttk.Frame(browser_frame, style='Dark.TFrame')
#         toolbar.pack(fill='x', pady=(0, 10))
        
#         ttk.Button(toolbar, text="Refresh", command=self.refresh_files, style='Dark.TButton').pack(side='left', padx=(0, 5))
#         ttk.Button(toolbar, text="Download", command=self.download_selected, style='Dark.TButton').pack(side='left', padx=(0, 5))
#         ttk.Button(toolbar, text="Delete", command=self.delete_selected, style='Dark.TButton').pack(side='left', padx=(0, 5))
#         ttk.Button(toolbar, text="View", command=self.view_file, style='Dark.TButton').pack(side='left', padx=(0, 5))
        
#         # Search
#         search_frame = ttk.Frame(toolbar, style='Dark.TFrame')
#         search_frame.pack(side='right')
        
#         ttk.Label(search_frame, text="Search:", style='Dark.TLabel').pack(side='left', padx=(0, 5))
#         self.search_var = tk.StringVar()
#         search_entry = ttk.Entry(search_frame, textvariable=self.search_var, width=20, style='Dark.TEntry')
#         search_entry.pack(side='left')
        
#         # File tree with better columns
#         tree_frame = ttk.Frame(browser_frame, style='Dark.TFrame')
#         tree_frame.pack(fill='both', expand=True)
        
#         # Create treeview with scrollbars
#         self.file_tree = ttk.Treeview(tree_frame, columns=('type', 'size', 'modified'), show='tree headings', height=20)
        
#         # Configure columns
#         self.file_tree.heading('#0', text='Name')
#         self.file_tree.heading('type', text='Type')
#         self.file_tree.heading('size', text='Size')
#         self.file_tree.heading('modified', text='Modified')
        
#         self.file_tree.column('#0', width=300, minwidth=200)
#         self.file_tree.column('type', width=80, minwidth=60)
#         self.file_tree.column('size', width=100, minwidth=80)
#         self.file_tree.column('modified', width=150, minwidth=120)
        
#         # Scrollbars
#         v_scrollbar = ttk.Scrollbar(tree_frame, orient='vertical', command=self.file_tree.yview)
#         h_scrollbar = ttk.Scrollbar(tree_frame, orient='horizontal', command=self.file_tree.xview)
#         self.file_tree.configure(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
#         # Pack scrollbars and treeview
#         self.file_tree.pack(side='left', fill='both', expand=True)
#         v_scrollbar.pack(side='right', fill='y')
#         h_scrollbar.pack(side='bottom', fill='x')
    
#     def create_bottom_panel(self, parent):
#         """Create bottom panel with actions and status"""
#         bottom_frame = ttk.Frame(parent, style='Dark.TFrame')
#         bottom_frame.pack(fill='x', pady=(10, 0))
        
#         # Action buttons
#         action_frame = ttk.Frame(bottom_frame, style='Dark.TFrame')
#         action_frame.pack(side='left')
        
#         ttk.Button(action_frame, text="Clone Repository", command=self.clone_dialog, style='Dark.TButton').pack(side='left', padx=(0, 10))
#         ttk.Button(action_frame, text="Create Branch", command=self.create_branch_dialog, style='Dark.TButton').pack(side='left', padx=(0, 10))
#         ttk.Button(action_frame, text="Open in Browser", command=self.open_in_browser, style='Dark.TButton').pack(side='left', padx=(0, 10))
        
#         # Status bar
#         self.status_var = tk.StringVar(value="Ready")
#         status_label = ttk.Label(bottom_frame, textvariable=self.status_var, style='Status.TLabel', relief='sunken')
#         status_label.pack(side='right', fill='x', expand=True, padx=(10, 0))
    
#     def bind_events(self):
#         """Bind events for better interaction"""
#         # Double-click to open folders or view files
#         self.file_tree.bind('<Double-1>', self.on_double_click)
        
#         # Right-click context menu
#         self.file_tree.bind('<Button-3>', self.show_context_menu)
        
#         # Branch change
#         self.branch_combo.bind('<<ComboboxSelected>>', self.on_branch_change)
        
#         # Search
#         self.search_var.trace('w', self.on_search_change)
    
#     def quick_connect(self):
#         """Quick connect using repository URL"""
#         url = self.repo_url_var.get().strip()
#         token = self.token_var.get().strip()
        
#         if not url:
#             messagebox.showerror("Error", "Please enter a repository URL")
#             return
        
#         # Parse GitHub URL
#         if 'github.com' in url:
#             parts = url.replace('https://github.com/', '').replace('.git', '').split('/')
#             if len(parts) >= 2:
#                 self.repo_owner = parts[0]
#                 self.repo_name = parts[1]
#                 self.github_token = token
                
#                 # Test connection
#                 Thread(target=self._test_and_connect, daemon=True).start()
#             else:
#                 messagebox.showerror("Error", "Invalid GitHub URL format")
#         else:
#             messagebox.showerror("Error", "Please enter a valid GitHub URL")
    
#     def _test_and_connect(self):
#         """Test connection and load repository"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}"
#             response = requests.get(url, headers=headers)
            
#             if response.status_code == 200:
#                 repo_data = response.json()
                
#                 # Update UI in main thread
#                 self.root.after(0, self._update_connection_success, repo_data)
#             else:
#                 self.root.after(0, self._update_connection_failure, response.json().get('message', 'Unknown error'))
        
#         except Exception as e:
#             self.root.after(0, self._update_connection_failure, str(e))
    
#     def _update_connection_success(self, repo_data):
#         """Update UI after successful connection"""
#         self.connection_status.config(text="Connected", foreground='#4CAF50')
        
#         # Update repository info
#         info = f"""Repository: {repo_data['full_name']}
# Description: {repo_data.get('description', 'No description')}
# Language: {repo_data.get('language', 'Not specified')}
# Stars: {repo_data['stargazers_count']}
# Forks: {repo_data['forks_count']}
# Default Branch: {repo_data['default_branch']}
# """
#         self.info_text.delete(1.0, tk.END)
#         self.info_text.insert(1.0, info)
        
#         # Load branches and files
#         self.load_branches()
#         self.load_files()
        
#         # Save config
#         self.save_config()
    
#     def _update_connection_failure(self, error_msg):
#         """Update UI after connection failure"""
#         self.connection_status.config(text="Failed", foreground='#f44336')
#         messagebox.showerror("Connection Failed", f"Failed to connect: {error_msg}")
    
#     def load_branches(self):
#         """Load repository branches"""
#         Thread(target=self._fetch_branches, daemon=True).start()
    
#     def _fetch_branches(self):
#         """Fetch branches in background"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/branches"
#             response = requests.get(url, headers=headers)
            
#             if response.status_code == 200:
#                 branches = [branch['name'] for branch in response.json()]
#                 self.root.after(0, self._update_branches, branches)
        
#         except Exception as e:
#             print(f"Failed to fetch branches: {e}")
    
#     def _update_branches(self, branches):
#         """Update branch combobox"""
#         self.branch_combo['values'] = branches
#         if branches and self.current_branch not in branches:
#             self.branch_var.set(branches[0])
#             self.current_branch = branches[0]
    
#     def load_files(self, path=""):
#         """Load files from current path"""
#         self.current_path = path
#         self.path_var.set(f"/{path}" if path else "/")
#         Thread(target=self._fetch_files, args=(path,), daemon=True).start()
    
#     def _fetch_files(self, path=""):
#         """Fetch files in background"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
#             params = {"ref": self.branch_var.get()}
#             response = requests.get(url, headers=headers, params=params)
            
#             if response.status_code == 200:
#                 contents = response.json()
#                 self.root.after(0, self._update_file_tree, contents)
#             else:
#                 self.root.after(0, lambda: self.update_status(f"Failed to load files: {response.status_code}"))
        
#         except Exception as e:
#             self.root.after(0, lambda: self.update_status(f"Error loading files: {str(e)}"))
    
#     def _update_file_tree(self, contents):
#         """Update file tree with contents"""
#         # Clear existing items
#         for item in self.file_tree.get_children():
#             self.file_tree.delete(item)
        
#         # Sort: directories first, then files
#         contents.sort(key=lambda x: (x['type'] != 'dir', x['name'].lower()))
        
#         for item in contents:
#             name = item['name']
#             item_type = "Folder" if item['type'] == 'dir' else "File"
#             size = self.format_size(item['size']) if item['type'] == 'file' else ""
            
#             # Add item to tree
#             item_id = self.file_tree.insert('', 'end', text=name, values=(item_type, size, ""))
            
#             # Store additional data
#             self.file_tree.set(item_id, 'full_data', json.dumps(item))
        
#         self.update_status(f"Loaded {len(contents)} items")
    
#     def format_size(self, size):
#         """Format file size"""
#         if size == 0:
#             return "0 B"
        
#         for unit in ['B', 'KB', 'MB', 'GB']:
#             if size < 1024.0:
#                 return f"{size:.1f} {unit}"
#             size /= 1024.0
#         return f"{size:.1f} TB"
    
#     def on_double_click(self, event):
#         """Handle double-click on file tree items"""
#         selection = self.file_tree.selection()
#         if not selection:
#             return
        
#         item = selection[0]
#         data = json.loads(self.file_tree.set(item, 'full_data'))
        
#         if data['type'] == 'dir':
#             # Navigate into directory
#             new_path = data['path']
#             self.load_files(new_path)
#         else:
#             # View file
#             self.view_file()
    
#     def on_branch_change(self, event):
#         """Handle branch change"""
#         self.current_branch = self.branch_var.get()
#         self.load_files(self.current_path)
    
#     def on_search_change(self, *args):
#         """Handle search input changes"""
#         search_term = self.search_var.get().lower()
        
#         # Simple filtering - hide items that don't match
#         for item in self.file_tree.get_children():
#             name = self.file_tree.item(item, 'text').lower()
#             if search_term in name or not search_term:
#                 self.file_tree.reattach(item, '', 'end')
#             else:
#                 self.file_tree.detach(item)
    
#     def go_up(self):
#         """Navigate up one directory"""
#         if self.current_path:
#             parent_path = '/'.join(self.current_path.split('/')[:-1])
#             self.load_files(parent_path)
    
#     def go_root(self):
#         """Navigate to root directory"""
#         self.load_files("")
    
#     def refresh_files(self):
#         """Refresh current directory"""
#         self.load_files(self.current_path)
    
#     def view_file(self):
#         """View selected file content"""
#         selection = self.file_tree.selection()
#         if not selection:
#             messagebox.showwarning("Warning", "Please select a file to view")
#             return
        
#         item = selection[0]
#         data = json.loads(self.file_tree.set(item, 'full_data'))
        
#         if data['type'] == 'file':
#             Thread(target=self._fetch_and_show_file, args=(data,), daemon=True).start()
    
#     def _fetch_and_show_file(self, file_data):
#         """Fetch and show file content"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = file_data['url']
#             response = requests.get(url, headers=headers)
            
#             if response.status_code == 200:
#                 content_data = response.json()
#                 content = base64.b64decode(content_data['content']).decode('utf-8', errors='ignore')
#                 self.root.after(0, self._show_file_content, file_data['name'], content)
#             else:
#                 self.root.after(0, lambda: messagebox.showerror("Error", "Failed to fetch file content"))
        
#         except Exception as e:
#             self.root.after(0, lambda: messagebox.showerror("Error", f"Error viewing file: {str(e)}"))
    
#     def _show_file_content(self, filename, content):
#         """Show file content in a new window"""
#         viewer = tk.Toplevel(self.root)
#         viewer.title(f"Viewing: {filename}")
#         viewer.geometry("800x600")
#         viewer.configure(bg='#1e1e1e')
        
#         # Create text widget with scrollbar
#         frame = ttk.Frame(viewer, style='Dark.TFrame')
#         frame.pack(fill='both', expand=True, padx=10, pady=10)
        
#         text_widget = tk.Text(frame, bg='#2d2d2d', fg='white', font=('Consolas', 10), wrap='none')
#         scrollbar_y = ttk.Scrollbar(frame, orient='vertical', command=text_widget.yview)
#         scrollbar_x = ttk.Scrollbar(frame, orient='horizontal', command=text_widget.xview)
        
#         text_widget.configure(yscrollcommand=scrollbar_y.set, xscrollcommand=scrollbar_x.set)
        
#         text_widget.pack(side='left', fill='both', expand=True)
#         scrollbar_y.pack(side='right', fill='y')
#         scrollbar_x.pack(side='bottom', fill='x')
        
#         text_widget.insert(1.0, content)
#         text_widget.config(state='disabled')
    
#     def download_selected(self):
#         """Download selected files"""
#         selection = self.file_tree.selection()
#         if not selection:
#             messagebox.showwarning("Warning", "Please select files to download")
#             return
        
#         dest_dir = filedialog.askdirectory(title="Select download destination")
#         if dest_dir:
#             Thread(target=self._download_files, args=(selection, dest_dir), daemon=True).start()
    
#     def _download_files(self, selection, dest_dir):
#         """Download files in background"""
#         downloaded = 0
        
#         for item in selection:
#             data = json.loads(self.file_tree.set(item, 'full_data'))
            
#             if data['type'] == 'file':
#                 if self._download_single_file(data, dest_dir):
#                     downloaded += 1
#                     self.root.after(0, lambda: self.update_status(f"Downloaded {downloaded} files"))
        
#         self.root.after(0, lambda: messagebox.showinfo("Success", f"Downloaded {downloaded} files"))
    
#     def _download_single_file(self, file_data, dest_dir):
#         """Download a single file"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             response = requests.get(file_data['url'], headers=headers)
            
#             if response.status_code == 200:
#                 content_data = response.json()
#                 content = base64.b64decode(content_data['content'])
                
#                 file_path = os.path.join(dest_dir, file_data['name'])
#                 with open(file_path, 'wb') as f:
#                     f.write(content)
                
#                 return True
        
#         except Exception as e:
#             print(f"Failed to download {file_data['name']}: {e}")
        
#         return False
    
#     def quick_create_file(self):
#         """Quick create file in current directory"""
#         filename = simpledialog.askstring("Create File", "Enter filename:")
#         if filename:
#             content = simpledialog.askstring("File Content", "Enter initial content (optional):", initialvalue="")
#             Thread(target=self._create_file, args=(filename, content or ""), daemon=True).start()
    
#     def quick_create_folder(self):
#         """Quick create folder in current directory"""
#         foldername = simpledialog.askstring("Create Folder", "Enter folder name:")
#         if foldername:
#             # Create folder with .gitkeep file
#             path = f"{self.current_path}/{foldername}/.gitkeep" if self.current_path else f"{foldername}/.gitkeep"
#             Thread(target=self._create_file, args=(path, ""), daemon=True).start()
    
#     def _create_file(self, filename, content):
#         """Create file on GitHub"""
#         try:
#             path = f"{self.current_path}/{filename}" if self.current_path else filename
#             encoded_content = base64.b64encode(content.encode('utf-8')).decode()
            
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
            
#             data = {
#                 "message": f"Create {filename}",
#                 "content": encoded_content,
#                 "branch": self.branch_var.get()
#             }
            
#             response = requests.put(url, json=data, headers=headers)
            
#             if response.status_code == 201:
#                 self.root.after(0, lambda: messagebox.showinfo("Success", f"Created {filename}"))
#                 self.root.after(0, self.refresh_files)
#             else:
#                 self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create file: {response.json().get('message', 'Unknown error')}"))
        
#         except Exception as e:
#             self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create file: {str(e)}"))
    
#     def quick_upload(self):
#         """Quick upload files"""
#         files = filedialog.askopenfilenames(title="Select files to upload")
#         if files:
#             Thread(target=self._upload_files, args=(files,), daemon=True).start()
    
#     def _upload_files(self, files):
#         """Upload multiple files"""
#         uploaded = 0
        
#         for file_path in files:
#             filename = os.path.basename(file_path)
            
#             try:
#                 with open(file_path, 'rb') as f:
#                     content = base64.b64encode(f.read()).decode()
                
#                 path = f"{self.current_path}/{filename}" if self.current_path else filename
#                 headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#                 url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
                
#                 data = {
#                     "message": f"Upload {filename}",
#                     "content": content,
#                     "branch": self.branch_var.get()
#                 }
                
#                 response = requests.put(url, json=data, headers=headers)
                
#                 if response.status_code in [200, 201]:
#                     uploaded += 1
#                     self.root.after(0, lambda: self.update_status(f"Uploaded {uploaded} files"))
            
#             except Exception as e:
#                 print(f"Failed to upload {filename}: {e}")
        
#         self.root.after(0, lambda: messagebox.showinfo("Upload Complete", f"Successfully uploaded {uploaded} files"))
#         self.root.after(0, self.refresh_files)
    
#     def delete_selected(self):
#         """Delete selected files"""
#         selection = self.file_tree.selection()
#         if not selection:
#             messagebox.showwarning("Warning", "Please select files to delete")
#             return
        
#         if messagebox.askyesno("Confirm Delete", "Are you sure you want to delete the selected files?"):
#             Thread(target=self._delete_files, args=(selection,), daemon=True).start()
    
#     def _delete_files(self, selection):
#         """Delete files in background"""
#         deleted = 0
        
#         for item in selection:
#             data = json.loads(self.file_tree.set(item, 'full_data'))
            
#             if self._delete_single_file(data):
#                 deleted += 1
#                 self.root.after(0, lambda: self.update_status(f"Deleted {deleted} files"))
        
#         self.root.after(0, lambda: messagebox.showinfo("Delete Complete", f"Deleted {deleted} files"))
#         self.root.after(0, self.refresh_files)
    
#     def _delete_single_file(self, file_data):
#         """Delete a single file"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{file_data['path']}"
            
#             data = {
#                 "message": f"Delete {file_data['name']}",
#                 "sha": file_data['sha'],
#                 "branch": self.branch_var.get()
#             }
            
#             response = requests.delete(url, json=data, headers=headers)
#             return response.status_code == 200
        
#         except Exception as e:
#             print(f"Failed to delete {file_data['name']}: {e}")
#             return False
    
#     def clone_dialog(self):
#         """Show clone repository dialog"""
#         clone_window = tk.Toplevel(self.root)
#         clone_window.title("Clone Repository")
#         clone_window.geometry("500x300")
#         clone_window.configure(bg='#1e1e1e')
        
#         frame = ttk.Frame(clone_window, style='Dark.TFrame', padding=20)
#         frame.pack(fill='both', expand=True)
        
#         # Repository URL
#         ttk.Label(frame, text="Repository URL:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
#         url_var = tk.StringVar(value=self.repo_url_var.get())
#         ttk.Entry(frame, textvariable=url_var, width=60, style='Dark.TEntry').pack(fill='x', pady=(0, 15))
        
#         # Destination
#         ttk.Label(frame, text="Destination Folder:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
#         dest_frame = ttk.Frame(frame, style='Dark.TFrame')
#         dest_frame.pack(fill='x', pady=(0, 15))
        
#         dest_var = tk.StringVar()
#         ttk.Entry(dest_frame, textvariable=dest_var, style='Dark.TEntry').pack(side='left', fill='x', expand=True, padx=(0, 10))
#         ttk.Button(dest_frame, text="Browse", style='Dark.TButton',
#                   command=lambda: dest_var.set(filedialog.askdirectory())).pack(side='right')
        
#         # Branch
#         ttk.Label(frame, text="Branch:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
#         branch_var = tk.StringVar(value=self.branch_var.get())
#         ttk.Entry(frame, textvariable=branch_var, width=30, style='Dark.TEntry').pack(anchor='w', pady=(0, 20))
        
#         # Buttons
#         button_frame = ttk.Frame(frame, style='Dark.TFrame')
#         button_frame.pack(fill='x')
        
#         ttk.Button(button_frame, text="Clone", style='Dark.TButton',
#                   command=lambda: self._start_clone(url_var.get(), dest_var.get(), branch_var.get(), clone_window)).pack(side='left', padx=(0, 10))
#         ttk.Button(button_frame, text="Cancel", style='Dark.TButton',
#                   command=clone_window.destroy).pack(side='left')
    
#     def _start_clone(self, url, dest, branch, window):
#         """Start cloning repository"""
#         if not url or not dest:
#             messagebox.showerror("Error", "Please fill in all fields")
#             return
        
#         window.destroy()
#         Thread(target=self._clone_repository, args=(url, dest, branch), daemon=True).start()
    
#     def _clone_repository(self, repo_url, dest_path, branch):
#         """Clone repository"""
#         try:
#             self.root.after(0, lambda: self.update_status(f"Cloning {repo_url}..."))
            
#             # Use git if available
#             if self._check_git_available():
#                 cmd = ['git', 'clone', '-b', branch, repo_url]
#                 result = subprocess.run(cmd, cwd=dest_path, capture_output=True, text=True)
                
#                 if result.returncode == 0:
#                     self.root.after(0, lambda: messagebox.showinfo("Success", "Repository cloned successfully!"))
#                 else:
#                     self.root.after(0, lambda: messagebox.showerror("Error", f"Clone failed: {result.stderr}"))
#             else:
#                 # Fallback to download ZIP
#                 self._download_as_zip(repo_url, dest_path, branch)
        
#         except Exception as e:
#             self.root.after(0, lambda: messagebox.showerror("Error", f"Clone failed: {str(e)}"))
#         finally:
#             self.root.after(0, lambda: self.update_status("Ready"))
    
#     def _check_git_available(self):
#         """Check if git is available"""
#         try:
#             subprocess.run(['git', '--version'], capture_output=True)
#             return True
#         except:
#             return False
    
#     def _download_as_zip(self, repo_url, dest_path, branch):
#         """Download repository as ZIP"""
#         # Extract owner/repo from URL
#         parts = repo_url.replace('https://github.com/', '').replace('.git', '').split('/')
#         if len(parts) >= 2:
#             owner, repo = parts[0], parts[1]
            
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             zip_url = f"https://api.github.com/repos/{owner}/{repo}/zipball/{branch}"
            
#             response = requests.get(zip_url, headers=headers, stream=True)
            
#             if response.status_code == 200:
#                 zip_path = os.path.join(dest_path, f"{repo}.zip")
                
#                 with open(zip_path, 'wb') as f:
#                     for chunk in response.iter_content(chunk_size=8192):
#                         f.write(chunk)
                
#                 # Extract ZIP
#                 with zipfile.ZipFile(zip_path, 'r') as zip_file:
#                     zip_file.extractall(dest_path)
                
#                 os.remove(zip_path)
#                 self.root.after(0, lambda: messagebox.showinfo("Success", "Repository downloaded successfully!"))
    
#     def create_branch_dialog(self):
#         """Show create branch dialog"""
#         branch_name = simpledialog.askstring("Create Branch", "Enter new branch name:")
#         if branch_name:
#             base_branch = simpledialog.askstring("Base Branch", "Enter base branch:", initialvalue=self.branch_var.get())
#             if base_branch:
#                 Thread(target=self._create_branch, args=(branch_name, base_branch), daemon=True).start()
    
#     def _create_branch(self, branch_name, base_branch):
#         """Create new branch"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            
#             # Get base branch SHA
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/git/refs/heads/{base_branch}"
#             response = requests.get(url, headers=headers)
            
#             if response.status_code == 200:
#                 base_sha = response.json()['object']['sha']
                
#                 # Create new branch
#                 url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/git/refs"
#                 data = {
#                     "ref": f"refs/heads/{branch_name}",
#                     "sha": base_sha
#                 }
                
#                 response = requests.post(url, json=data, headers=headers)
                
#                 if response.status_code == 201:
#                     self.root.after(0, lambda: messagebox.showinfo("Success", f"Branch '{branch_name}' created!"))
#                     self.root.after(0, self.load_branches)
#                 else:
#                     self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create branch: {response.json().get('message', 'Unknown error')}"))
#             else:
#                 self.root.after(0, lambda: messagebox.showerror("Error", f"Base branch '{base_branch}' not found"))
        
#         except Exception as e:
#             self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create branch: {str(e)}"))
    
#     def open_in_browser(self):
#         """Open repository in browser"""
#         if self.repo_owner and self.repo_name:
#             url = f"https://github.com/{self.repo_owner}/{self.repo_name}"
#             if self.current_path:
#                 url += f"/tree/{self.branch_var.get()}/{self.current_path}"
#             webbrowser.open(url)
    
#     def download_repository(self):
#         """Download entire repository"""
#         dest_dir = filedialog.askdirectory(title="Select download destination")
#         if dest_dir:
#             Thread(target=self._download_repo_zip, args=(dest_dir,), daemon=True).start()
    
#     def _download_repo_zip(self, dest_dir):
#         """Download repository as ZIP"""
#         try:
#             headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
#             url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/zipball/{self.branch_var.get()}"
            
#             response = requests.get(url, headers=headers, stream=True)
            
#             if response.status_code == 200:
#                 zip_path = os.path.join(dest_dir, f"{self.repo_name}-{self.branch_var.get()}.zip")
                
#                 with open(zip_path, 'wb') as f:
#                     for chunk in response.iter_content(chunk_size=8192):
#                         f.write(chunk)
                
#                 self.root.after(0, lambda: messagebox.showinfo("Success", f"Repository downloaded to: {zip_path}"))
#             else:
#                 self.root.after(0, lambda: messagebox.showerror("Error", "Failed to download repository"))
        
#         except Exception as e:
#             self.root.after(0, lambda: messagebox.showerror("Error", f"Download failed: {str(e)}"))
    
#     def show_context_menu(self, event):
#         """Show context menu on right-click"""
#         # Create context menu
#         context_menu = tk.Menu(self.root, tearoff=0, bg='#2d2d2d', fg='white')
        
#         selection = self.file_tree.selection()
#         if selection:
#             item = selection[0]
#             data = json.loads(self.file_tree.set(item, 'full_data'))
            
#             if data['type'] == 'dir':
#                 context_menu.add_command(label="Open Folder", command=lambda: self.load_files(data['path']))
#                 context_menu.add_separator()
#             else:
#                 context_menu.add_command(label="View File", command=self.view_file)
#                 context_menu.add_command(label="Download", command=self.download_selected)
#                 context_menu.add_separator()
            
#             context_menu.add_command(label="Delete", command=self.delete_selected)
#             context_menu.add_command(label="Copy URL", command=lambda: self._copy_file_url(data))
        
#         context_menu.add_separator()
#         context_menu.add_command(label="New File", command=self.quick_create_file)
#         context_menu.add_command(label="New Folder", command=self.quick_create_folder)
#         context_menu.add_command(label="Upload Files", command=self.quick_upload)
        
#         try:
#             context_menu.tk_popup(event.x_root, event.y_root)
#         finally:
#             context_menu.grab_release()
    
#     def _copy_file_url(self, file_data):
#         """Copy file URL to clipboard"""
#         url = f"https://github.com/{self.repo_owner}/{self.repo_name}/blob/{self.branch_var.get()}/{file_data['path']}"
#         self.root.clipboard_clear()
#         self.root.clipboard_append(url)
#         self.update_status("URL copied to clipboard")
    
#     def update_status(self, message):
#         """Update status bar"""
#         self.status_var.set(f"{datetime.now().strftime('%H:%M:%S')} - {message}")
#         self.root.update_idletasks()
    
#     def save_config(self):
#         """Save configuration"""
#         config = {
#             'github_token': self.github_token,
#             'repo_owner': self.repo_owner,
#             'repo_name': self.repo_name,
#             'repo_url': self.repo_url_var.get()
#         }
        
#         try:
#             with open('github_config.json', 'w') as f:
#                 json.dump(config, f)
#         except Exception as e:
#             print(f"Failed to save config: {e}")
    
#     def load_config(self):
#         """Load saved configuration"""
#         try:
#             if os.path.exists('github_config.json'):
#                 with open('github_config.json', 'r') as f:
#                     config = json.load(f)
                
#                 self.github_token = config.get('github_token', '')
#                 self.repo_owner = config.get('repo_owner', '')
#                 self.repo_name = config.get('repo_name', '')
                
#                 self.token_var.set(self.github_token)
#                 self.repo_url_var.set(config.get('repo_url', ''))
                
#                 # Auto-connect if we have valid config
#                 if all([self.github_token, self.repo_owner, self.repo_name]):
#                     Thread(target=self._test_and_connect, daemon=True).start()
        
#         except Exception as e:
#             print(f"Failed to load config: {e}")


# def main():
#     """Main function"""
#     root = tk.Tk()
#     app = EnhancedGitHubManager(root)
#     root.mainloop()


# if __name__ == "__main__":
#     main()


import os
import base64
import json
import shutil
import subprocess
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, simpledialog
import requests
from threading import Thread
import tempfile
import zipfile
from pathlib import Path
import webbrowser
from datetime import datetime

class EnhancedGitHubManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Enhanced GitHub Manager")
        self.root.geometry("1400x900")
        self.root.configure(bg='#1e1e1e')
        
        # Configuration
        self.github_token = ""
        self.repo_owner = ""
        self.repo_name = ""
        self.current_branch = "main"
        self.current_path = ""
        
        # Style configuration
        self.setup_styles()
        
        # Create main interface
        self.create_widgets()
        
        # Load configuration if exists
        self.load_config()
        
        # Bind events
        self.bind_events()
    
    def setup_styles(self):
        """Setup modern dark theme styles"""
        style = ttk.Style()
        style.theme_use('clam')
        
        # Dark theme colors
        bg_color = '#1e1e1e'
        fg_color = '#ffffff'
        select_color = '#0d7377'
        entry_color = '#2d2d2d'
        
        style.configure('Dark.TFrame', background=bg_color)
        style.configure('Dark.TLabel', background=bg_color, foreground=fg_color)
        style.configure('Dark.TButton', background='#404040', foreground=fg_color)
        style.configure('Dark.TEntry', fieldbackground=entry_color, foreground=fg_color)
        style.configure('Title.TLabel', font=('Segoe UI', 18, 'bold'), background=bg_color, foreground='#4CAF50')
        style.configure('Heading.TLabel', font=('Segoe UI', 12, 'bold'), background=bg_color, foreground=fg_color)
        style.configure('Status.TLabel', font=('Segoe UI', 10), background='#2d2d2d', foreground=fg_color)
    
    def create_widgets(self):
        """Create the enhanced GUI"""
        # Main container
        main_frame = ttk.Frame(self.root, style='Dark.TFrame')
        main_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Title and quick actions
        self.create_header(main_frame)
        
        # Quick setup panel
        self.create_quick_setup(main_frame)
        
        # Main content area
        content_frame = ttk.Frame(main_frame, style='Dark.TFrame')
        content_frame.pack(fill='both', expand=True, pady=(10, 0))
        
        # Left panel - Navigation and controls
        self.create_navigation_panel(content_frame)
        
        # Right panel - File browser
        self.create_file_browser(content_frame)
        
        # Bottom panel - Actions and status
        self.create_bottom_panel(main_frame)
    
    def create_header(self, parent):
        """Create header with title and quick actions"""
        header_frame = ttk.Frame(parent, style='Dark.TFrame')
        header_frame.pack(fill='x', pady=(0, 15))
        
        # Title
        title_label = ttk.Label(header_frame, text="GitHub Manager", style='Title.TLabel')
        title_label.pack(side='left')
        
        # Quick actions
        quick_frame = ttk.Frame(header_frame, style='Dark.TFrame')
        quick_frame.pack(side='right')
        
        ttk.Button(quick_frame, text="New File", command=self.quick_create_file, style='Dark.TButton').pack(side='left', padx=2)
        ttk.Button(quick_frame, text="New Folder", command=self.quick_create_folder, style='Dark.TButton').pack(side='left', padx=2)
        ttk.Button(quick_frame, text="Upload", command=self.quick_upload, style='Dark.TButton').pack(side='left', padx=2)
        ttk.Button(quick_frame, text="Download All", command=self.download_repository, style='Dark.TButton').pack(side='left', padx=2)
    
    def create_quick_setup(self, parent):
        """Create simplified setup panel"""
        setup_frame = ttk.LabelFrame(parent, text=" Quick Setup ", padding=10, style='Dark.TFrame')
        setup_frame.pack(fill='x', pady=(0, 10))
        
        # Repository URL input (simplified)
        url_frame = ttk.Frame(setup_frame, style='Dark.TFrame')
        url_frame.pack(fill='x', pady=5)
        
        ttk.Label(url_frame, text="Repository URL:", style='Dark.TLabel').pack(side='left', padx=(0, 10))
        self.repo_url_var = tk.StringVar()
        url_entry = ttk.Entry(url_frame, textvariable=self.repo_url_var, width=50, style='Dark.TEntry')
        url_entry.pack(side='left', fill='x', expand=True, padx=(0, 10))
        
        ttk.Button(url_frame, text="Connect", command=self.quick_connect, style='Dark.TButton').pack(side='right')
        
        # Status and token
        status_frame = ttk.Frame(setup_frame, style='Dark.TFrame')
        status_frame.pack(fill='x', pady=5)
        
        ttk.Label(status_frame, text="Token:", style='Dark.TLabel').pack(side='left', padx=(0, 10))
        self.token_var = tk.StringVar()
        ttk.Entry(status_frame, textvariable=self.token_var, show="*", width=30, style='Dark.TEntry').pack(side='left', padx=(0, 10))
        
        self.connection_status = ttk.Label(status_frame, text="Not connected", style='Dark.TLabel')
        self.connection_status.pack(side='left', padx=(20, 0))
    
    def create_navigation_panel(self, parent):
        """Create navigation and branch panel"""
        nav_frame = ttk.LabelFrame(parent, text=" Navigation ", padding=10, style='Dark.TFrame')
        nav_frame.pack(side='left', fill='y', padx=(0, 10))
        nav_frame.configure(width=300)
        
        # Branch selection
        branch_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
        branch_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(branch_frame, text="Branch:", style='Heading.TLabel').pack(anchor='w')
        self.branch_var = tk.StringVar(value="main")
        self.branch_combo = ttk.Combobox(branch_frame, textvariable=self.branch_var, state='readonly', width=25)
        self.branch_combo.pack(fill='x', pady=5)
        
        # Path navigation
        path_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
        path_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Label(path_frame, text="Current Path:", style='Heading.TLabel').pack(anchor='w')
        self.path_var = tk.StringVar(value="/")
        path_display = ttk.Label(path_frame, textvariable=self.path_var, style='Dark.TLabel', relief='sunken')
        path_display.pack(fill='x', pady=5)
        
        # Navigation buttons
        nav_buttons = ttk.Frame(nav_frame, style='Dark.TFrame')
        nav_buttons.pack(fill='x', pady=(0, 10))
        
        ttk.Button(nav_buttons, text="Up", command=self.go_up, style='Dark.TButton').pack(side='left', padx=(0, 5))
        ttk.Button(nav_buttons, text="Root", command=self.go_root, style='Dark.TButton').pack(side='left')
        
        # Repository info
        info_frame = ttk.Frame(nav_frame, style='Dark.TFrame')
        info_frame.pack(fill='both', expand=True)
        
        ttk.Label(info_frame, text="Repository Info:", style='Heading.TLabel').pack(anchor='w', pady=(10, 5))
        self.info_text = tk.Text(info_frame, height=8, width=35, bg='#2d2d2d', fg='white', 
                                font=('Consolas', 9), wrap='word')
        self.info_text.pack(fill='both', expand=True)
    
    def create_file_browser(self, parent):
        """Create enhanced file browser"""
        browser_frame = ttk.LabelFrame(parent, text=" Files ", padding=10, style='Dark.TFrame')
        browser_frame.pack(side='right', fill='both', expand=True)
        
        # File browser toolbar
        toolbar = ttk.Frame(browser_frame, style='Dark.TFrame')
        toolbar.pack(fill='x', pady=(0, 10))
        
        ttk.Button(toolbar, text="Refresh", command=self.refresh_files, style='Dark.TButton').pack(side='left', padx=(0, 5))
        ttk.Button(toolbar, text="Download", command=self.download_selected, style='Dark.TButton').pack(side='left', padx=(0, 5))
        ttk.Button(toolbar, text="Delete", command=self.delete_selected, style='Dark.TButton').pack(side='left', padx=(0, 5))
        ttk.Button(toolbar, text="View", command=self.view_file, style='Dark.TButton').pack(side='left', padx=(0, 5))
        
        # Search
        search_frame = ttk.Frame(toolbar, style='Dark.TFrame')
        search_frame.pack(side='right')
        
        ttk.Label(search_frame, text="Search:", style='Dark.TLabel').pack(side='left', padx=(0, 5))
        self.search_var = tk.StringVar()
        search_entry = ttk.Entry(search_frame, textvariable=self.search_var, width=20, style='Dark.TEntry')
        search_entry.pack(side='left')
        
        # File tree with better columns
        tree_frame = ttk.Frame(browser_frame, style='Dark.TFrame')
        tree_frame.pack(fill='both', expand=True)
        
        # Create treeview with scrollbars
        self.file_tree = ttk.Treeview(tree_frame, columns=('type', 'size', 'modified'), show='tree headings', height=20)
        
        # Configure columns
        self.file_tree.heading('#0', text='Name')
        self.file_tree.heading('type', text='Type')
        self.file_tree.heading('size', text='Size')
        self.file_tree.heading('modified', text='Modified')
        
        self.file_tree.column('#0', width=300, minwidth=200)
        self.file_tree.column('type', width=80, minwidth=60)
        self.file_tree.column('size', width=100, minwidth=80)
        self.file_tree.column('modified', width=150, minwidth=120)
        
        # Scrollbars
        v_scrollbar = ttk.Scrollbar(tree_frame, orient='vertical', command=self.file_tree.yview)
        h_scrollbar = ttk.Scrollbar(tree_frame, orient='horizontal', command=self.file_tree.xview)
        self.file_tree.configure(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
        # Pack scrollbars and treeview
        self.file_tree.pack(side='left', fill='both', expand=True)
        v_scrollbar.pack(side='right', fill='y')
        h_scrollbar.pack(side='bottom', fill='x')
    
    def create_bottom_panel(self, parent):
        """Create bottom panel with actions and status"""
        bottom_frame = ttk.Frame(parent, style='Dark.TFrame')
        bottom_frame.pack(fill='x', pady=(10, 0))
        
        # Action buttons
        action_frame = ttk.Frame(bottom_frame, style='Dark.TFrame')
        action_frame.pack(side='left')
        
        ttk.Button(action_frame, text="Clone Repository", command=self.clone_dialog, style='Dark.TButton').pack(side='left', padx=(0, 10))
        ttk.Button(action_frame, text="Create Branch", command=self.create_branch_dialog, style='Dark.TButton').pack(side='left', padx=(0, 10))
        ttk.Button(action_frame, text="Open in Browser", command=self.open_in_browser, style='Dark.TButton').pack(side='left', padx=(0, 10))
        
        # Status bar
        self.status_var = tk.StringVar(value="Ready")
        status_label = ttk.Label(bottom_frame, textvariable=self.status_var, style='Status.TLabel', relief='sunken')
        status_label.pack(side='right', fill='x', expand=True, padx=(10, 0))
    
    def bind_events(self):
        """Bind events for better interaction"""
        # Double-click to open folders or view files
        self.file_tree.bind('<Double-1>', self.on_double_click)
        
        # Right-click context menu
        self.file_tree.bind('<Button-3>', self.show_context_menu)
        
        # Branch change
        self.branch_combo.bind('<<ComboboxSelected>>', self.on_branch_change)
        
        # Search
        self.search_var.trace('w', self.on_search_change)
    
    def quick_connect(self):
        """Quick connect using repository URL"""
        url = self.repo_url_var.get().strip()
        token = self.token_var.get().strip()
        
        if not url:
            messagebox.showerror("Error", "Please enter a repository URL")
            return
        
        # Parse GitHub URL
        if 'github.com' in url:
            parts = url.replace('https://github.com/', '').replace('.git', '').split('/')
            if len(parts) >= 2:
                self.repo_owner = parts[0]
                self.repo_name = parts[1]
                self.github_token = token
                
                # Test connection
                Thread(target=self._test_and_connect, daemon=True).start()
            else:
                messagebox.showerror("Error", "Invalid GitHub URL format")
        else:
            messagebox.showerror("Error", "Please enter a valid GitHub URL")
    
    def _test_and_connect(self):
        """Test connection and load repository"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                repo_data = response.json()
                
                # Update UI in main thread
                self.root.after(0, self._update_connection_success, repo_data)
            else:
                self.root.after(0, self._update_connection_failure, response.json().get('message', 'Unknown error'))
        
        except Exception as e:
            self.root.after(0, self._update_connection_failure, str(e))
    
    def _update_connection_success(self, repo_data):
        """Update UI after successful connection"""
        self.connection_status.config(text="Connected", foreground='#4CAF50')
        
        # Update repository info
        info = f"""Repository: {repo_data['full_name']}
Description: {repo_data.get('description', 'No description')}
Language: {repo_data.get('language', 'Not specified')}
Stars: {repo_data['stargazers_count']}
Forks: {repo_data['forks_count']}
Default Branch: {repo_data['default_branch']}
"""
        self.info_text.delete(1.0, tk.END)
        self.info_text.insert(1.0, info)
        
        # Load branches and files
        self.load_branches()
        self.load_files()
        
        # Save config
        self.save_config()
    
    def _update_connection_failure(self, error_msg):
        """Update UI after connection failure"""
        self.connection_status.config(text="Failed", foreground='#f44336')
        messagebox.showerror("Connection Failed", f"Failed to connect: {error_msg}")
    
    def load_branches(self):
        """Load repository branches"""
        Thread(target=self._fetch_branches, daemon=True).start()
    
    def _fetch_branches(self):
        """Fetch branches in background"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/branches"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                branches = [branch['name'] for branch in response.json()]
                self.root.after(0, self._update_branches, branches)
        
        except Exception as e:
            print(f"Failed to fetch branches: {e}")
    
    def _update_branches(self, branches):
        """Update branch combobox"""
        self.branch_combo['values'] = branches
        if branches and self.current_branch not in branches:
            self.branch_var.set(branches[0])
            self.current_branch = branches[0]
    
    def load_files(self, path=""):
        """Load files from current path"""
        self.current_path = path
        self.path_var.set(f"/{path}" if path else "/")
        Thread(target=self._fetch_files, args=(path,), daemon=True).start()
    
    def _fetch_files(self, path=""):
        """Fetch files in background"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
            params = {"ref": self.branch_var.get()}
            response = requests.get(url, headers=headers, params=params)
            
            if response.status_code == 200:
                contents = response.json()
                self.root.after(0, self._update_file_tree, contents)
            else:
                self.root.after(0, lambda: self.update_status(f"Failed to load files: {response.status_code}"))
        
        except Exception as e:
            self.root.after(0, lambda: self.update_status(f"Error loading files: {str(e)}"))
    
    def _update_file_tree(self, contents):
        """Update file tree with contents"""
        # Clear existing items
        for item in self.file_tree.get_children():
            self.file_tree.delete(item)
        
        # Sort: directories first, then files
        contents.sort(key=lambda x: (x['type'] != 'dir', x['name'].lower()))
        
        for item in contents:
            name = item['name']
            item_type = "Folder" if item['type'] == 'dir' else "File"
            size = self.format_size(item['size']) if item['type'] == 'file' else ""
            
            # Add item to tree
            item_id = self.file_tree.insert('', 'end', text=name, values=(item_type, size, ""))
            
            # Store additional data
            self.file_tree.set(item_id, 'full_data', json.dumps(item))
        
        self.update_status(f"Loaded {len(contents)} items")
    
    def format_size(self, size):
        """Format file size"""
        if size == 0:
            return "0 B"
        
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size < 1024.0:
                return f"{size:.1f} {unit}"
            size /= 1024.0
        return f"{size:.1f} TB"
    
    def on_double_click(self, event):
        """Handle double-click on file tree items"""
        selection = self.file_tree.selection()
        if not selection:
            return
        
        item = selection[0]
        data = json.loads(self.file_tree.set(item, 'full_data'))
        
        if data['type'] == 'dir':
            # Navigate into directory
            new_path = data['path']
            self.load_files(new_path)
        else:
            # View file
            self.view_file()
    
    def on_branch_change(self, event):
        """Handle branch change"""
        self.current_branch = self.branch_var.get()
        self.load_files(self.current_path)
    
    def on_search_change(self, *args):
        """Handle search input changes"""
        search_term = self.search_var.get().lower()
        
        # Simple filtering - hide items that don't match
        for item in self.file_tree.get_children():
            name = self.file_tree.item(item, 'text').lower()
            if search_term in name or not search_term:
                self.file_tree.reattach(item, '', 'end')
            else:
                self.file_tree.detach(item)
    
    def go_up(self):
        """Navigate up one directory"""
        if self.current_path:
            parent_path = '/'.join(self.current_path.split('/')[:-1])
            self.load_files(parent_path)
    
    def go_root(self):
        """Navigate to root directory"""
        self.load_files("")
    
    def refresh_files(self):
        """Refresh current directory"""
        self.load_files(self.current_path)
    
    def view_file(self):
        """View selected file content"""
        selection = self.file_tree.selection()
        if not selection:
            messagebox.showwarning("Warning", "Please select a file to view")
            return
        
        item = selection[0]
        data = json.loads(self.file_tree.set(item, 'full_data'))
        
        if data['type'] == 'file':
            Thread(target=self._fetch_and_show_file, args=(data,), daemon=True).start()
    
    def _fetch_and_show_file(self, file_data):
        """Fetch and show file content"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = file_data['url']
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                content_data = response.json()
                content = base64.b64decode(content_data['content']).decode('utf-8', errors='ignore')
                self.root.after(0, self._show_file_content, file_data['name'], content)
            else:
                self.root.after(0, lambda: messagebox.showerror("Error", "Failed to fetch file content"))
        
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Error viewing file: {str(e)}"))
    
    def _show_file_content(self, filename, content):
        """Show file content in a new window"""
        viewer = tk.Toplevel(self.root)
        viewer.title(f"Viewing: {filename}")
        viewer.geometry("800x600")
        viewer.configure(bg='#1e1e1e')
        
        # Create text widget with scrollbar
        frame = ttk.Frame(viewer, style='Dark.TFrame')
        frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        text_widget = tk.Text(frame, bg='#2d2d2d', fg='white', font=('Consolas', 10), wrap='none')
        scrollbar_y = ttk.Scrollbar(frame, orient='vertical', command=text_widget.yview)
        scrollbar_x = ttk.Scrollbar(frame, orient='horizontal', command=text_widget.xview)
        
        text_widget.configure(yscrollcommand=scrollbar_y.set, xscrollcommand=scrollbar_x.set)
        
        text_widget.pack(side='left', fill='both', expand=True)
        scrollbar_y.pack(side='right', fill='y')
        scrollbar_x.pack(side='bottom', fill='x')
        
        text_widget.insert(1.0, content)
        text_widget.config(state='disabled')
    
    def download_selected(self):
        """Download selected files"""
        selection = self.file_tree.selection()
        if not selection:
            messagebox.showwarning("Warning", "Please select files to download")
            return
        
        dest_dir = filedialog.askdirectory(title="Select download destination")
        if dest_dir:
            Thread(target=self._download_files, args=(selection, dest_dir), daemon=True).start()
    
    def _download_files(self, selection, dest_dir):
        """Download files in background"""
        downloaded = 0
        
        for item in selection:
            data = json.loads(self.file_tree.set(item, 'full_data'))
            
            if data['type'] == 'file':
                if self._download_single_file(data, dest_dir):
                    downloaded += 1
                    self.root.after(0, lambda: self.update_status(f"Downloaded {downloaded} files"))
        
        self.root.after(0, lambda: messagebox.showinfo("Success", f"Downloaded {downloaded} files"))
    
    def _download_single_file(self, file_data, dest_dir):
        """Download a single file"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            response = requests.get(file_data['url'], headers=headers)
            
            if response.status_code == 200:
                content_data = response.json()
                content = base64.b64decode(content_data['content'])
                
                file_path = os.path.join(dest_dir, file_data['name'])
                with open(file_path, 'wb') as f:
                    f.write(content)
                
                return True
        
        except Exception as e:
            print(f"Failed to download {file_data['name']}: {e}")
        
        return False
    
    def quick_create_file(self):
        """Quick create file in current directory"""
        filename = simpledialog.askstring("Create File", "Enter filename:")
        if filename:
            content = simpledialog.askstring("File Content", "Enter initial content (optional):", initialvalue="")
            Thread(target=self._create_file, args=(filename, content or ""), daemon=True).start()
    
    def quick_create_folder(self):
        """Quick create folder in current directory"""
        foldername = simpledialog.askstring("Create Folder", "Enter folder name:")
        if foldername:
            # Create folder with .gitkeep file
            path = f"{self.current_path}/{foldername}/.gitkeep" if self.current_path else f"{foldername}/.gitkeep"
            Thread(target=self._create_file, args=(path, ""), daemon=True).start()
    
    def _create_file(self, filename, content):
        """Create file on GitHub"""
        try:
            path = f"{self.current_path}/{filename}" if self.current_path else filename
            encoded_content = base64.b64encode(content.encode('utf-8')).decode()
            
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
            
            data = {
                "message": f"Create {filename}",
                "content": encoded_content,
                "branch": self.branch_var.get()
            }
            
            response = requests.put(url, json=data, headers=headers)
            
            if response.status_code == 201:
                self.root.after(0, lambda: messagebox.showinfo("Success", f"Created {filename}"))
                self.root.after(0, self.refresh_files)
            else:
                self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create file: {response.json().get('message', 'Unknown error')}"))
        
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create file: {str(e)}"))
    
    def quick_upload(self):
        """Quick upload files"""
        files = filedialog.askopenfilenames(title="Select files to upload")
        if files:
            Thread(target=self._upload_files, args=(files,), daemon=True).start()
    
    def _upload_files(self, files):
        """Upload multiple files"""
        uploaded = 0
        
        for file_path in files:
            filename = os.path.basename(file_path)
            
            try:
                with open(file_path, 'rb') as f:
                    content = base64.b64encode(f.read()).decode()
                
                path = f"{self.current_path}/{filename}" if self.current_path else filename
                headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
                url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{path}"
                
                data = {
                    "message": f"Upload {filename}",
                    "content": content,
                    "branch": self.branch_var.get()
                }
                
                response = requests.put(url, json=data, headers=headers)
                
                if response.status_code in [200, 201]:
                    uploaded += 1
                    self.root.after(0, lambda: self.update_status(f"Uploaded {uploaded} files"))
            
            except Exception as e:
                print(f"Failed to upload {filename}: {e}")
        
        self.root.after(0, lambda: messagebox.showinfo("Upload Complete", f"Successfully uploaded {uploaded} files"))
        self.root.after(0, self.refresh_files)
    
    def delete_selected(self):
        """Delete selected files"""
        selection = self.file_tree.selection()
        if not selection:
            messagebox.showwarning("Warning", "Please select files to delete")
            return
        
        if messagebox.askyesno("Confirm Delete", "Are you sure you want to delete the selected files?"):
            Thread(target=self._delete_files, args=(selection,), daemon=True).start()
    
    def _delete_files(self, selection):
        """Delete files in background"""
        deleted = 0
        
        for item in selection:
            data = json.loads(self.file_tree.set(item, 'full_data'))
            
            if self._delete_single_file(data):
                deleted += 1
                self.root.after(0, lambda: self.update_status(f"Deleted {deleted} files"))
        
        self.root.after(0, lambda: messagebox.showinfo("Delete Complete", f"Deleted {deleted} files"))
        self.root.after(0, self.refresh_files)
    
    def _delete_single_file(self, file_data):
        """Delete a single file"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{file_data['path']}"
            
            data = {
                "message": f"Delete {file_data['name']}",
                "sha": file_data['sha'],
                "branch": self.branch_var.get()
            }
            
            response = requests.delete(url, json=data, headers=headers)
            return response.status_code == 200
        
        except Exception as e:
            print(f"Failed to delete {file_data['name']}: {e}")
            return False
    
    def clone_dialog(self):
        """Show clone repository dialog"""
        clone_window = tk.Toplevel(self.root)
        clone_window.title("Clone Repository")
        clone_window.geometry("500x300")
        clone_window.configure(bg='#1e1e1e')
        
        frame = ttk.Frame(clone_window, style='Dark.TFrame', padding=20)
        frame.pack(fill='both', expand=True)
        
        # Repository URL
        ttk.Label(frame, text="Repository URL:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
        url_var = tk.StringVar(value=self.repo_url_var.get())
        ttk.Entry(frame, textvariable=url_var, width=60, style='Dark.TEntry').pack(fill='x', pady=(0, 15))
        
        # Destination
        ttk.Label(frame, text="Destination Folder:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
        dest_frame = ttk.Frame(frame, style='Dark.TFrame')
        dest_frame.pack(fill='x', pady=(0, 15))
        
        dest_var = tk.StringVar()
        ttk.Entry(dest_frame, textvariable=dest_var, style='Dark.TEntry').pack(side='left', fill='x', expand=True, padx=(0, 10))
        ttk.Button(dest_frame, text="Browse", style='Dark.TButton',
                  command=lambda: dest_var.set(filedialog.askdirectory())).pack(side='right')
        
        # Branch
        ttk.Label(frame, text="Branch:", style='Dark.TLabel').pack(anchor='w', pady=(0, 5))
        branch_var = tk.StringVar(value=self.branch_var.get())
        ttk.Entry(frame, textvariable=branch_var, width=30, style='Dark.TEntry').pack(anchor='w', pady=(0, 20))
        
        # Buttons
        button_frame = ttk.Frame(frame, style='Dark.TFrame')
        button_frame.pack(fill='x')
        
        ttk.Button(button_frame, text="Clone", style='Dark.TButton',
                  command=lambda: self._start_clone(url_var.get(), dest_var.get(), branch_var.get(), clone_window)).pack(side='left', padx=(0, 10))
        ttk.Button(button_frame, text="Cancel", style='Dark.TButton',
                  command=clone_window.destroy).pack(side='left')
    
    def _start_clone(self, url, dest, branch, window):
        """Start cloning repository"""
        if not url or not dest:
            messagebox.showerror("Error", "Please fill in all fields")
            return
        
        window.destroy()
        Thread(target=self._clone_repository, args=(url, dest, branch), daemon=True).start()
    
    def _clone_repository(self, repo_url, dest_path, branch):
        """Clone repository"""
        try:
            self.root.after(0, lambda: self.update_status(f"Cloning {repo_url}..."))
            
            # Use git if available
            if self._check_git_available():
                cmd = ['git', 'clone', '-b', branch, repo_url]
                result = subprocess.run(cmd, cwd=dest_path, capture_output=True, text=True)
                
                if result.returncode == 0:
                    self.root.after(0, lambda: messagebox.showinfo("Success", "Repository cloned successfully!"))
                else:
                    self.root.after(0, lambda: messagebox.showerror("Error", f"Clone failed: {result.stderr}"))
            else:
                # Fallback to download ZIP
                self._download_as_zip(repo_url, dest_path, branch)
        
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Clone failed: {str(e)}"))
        finally:
            self.root.after(0, lambda: self.update_status("Ready"))
    
    def _check_git_available(self):
        """Check if git is available"""
        try:
            subprocess.run(['git', '--version'], capture_output=True)
            return True
        except:
            return False
    
    def _download_as_zip(self, repo_url, dest_path, branch):
        """Download repository as ZIP"""
        # Extract owner/repo from URL
        parts = repo_url.replace('https://github.com/', '').replace('.git', '').split('/')
        if len(parts) >= 2:
            owner, repo = parts[0], parts[1]
            
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            zip_url = f"https://api.github.com/repos/{owner}/{repo}/zipball/{branch}"
            
            response = requests.get(zip_url, headers=headers, stream=True)
            
            if response.status_code == 200:
                zip_path = os.path.join(dest_path, f"{repo}.zip")
                
                with open(zip_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                # Extract ZIP
                with zipfile.ZipFile(zip_path, 'r') as zip_file:
                    zip_file.extractall(dest_path)
                
                os.remove(zip_path)
                self.root.after(0, lambda: messagebox.showinfo("Success", "Repository downloaded successfully!"))
    
    def create_branch_dialog(self):
        """Show create branch dialog"""
        branch_name = simpledialog.askstring("Create Branch", "Enter new branch name:")
        if branch_name:
            base_branch = simpledialog.askstring("Base Branch", "Enter base branch:", initialvalue=self.branch_var.get())
            if base_branch:
                Thread(target=self._create_branch, args=(branch_name, base_branch), daemon=True).start()
    
    def _create_branch(self, branch_name, base_branch):
        """Create new branch"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            
            # Get base branch SHA
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/git/refs/heads/{base_branch}"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                base_sha = response.json()['object']['sha']
                
                # Create new branch
                url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/git/refs"
                data = {
                    "ref": f"refs/heads/{branch_name}",
                    "sha": base_sha
                }
                
                response = requests.post(url, json=data, headers=headers)
                
                if response.status_code == 201:
                    self.root.after(0, lambda: messagebox.showinfo("Success", f"Branch '{branch_name}' created!"))
                    self.root.after(0, self.load_branches)
                else:
                    self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create branch: {response.json().get('message', 'Unknown error')}"))
            else:
                self.root.after(0, lambda: messagebox.showerror("Error", f"Base branch '{base_branch}' not found"))
        
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Failed to create branch: {str(e)}"))
    
    def open_in_browser(self):
        """Open repository in browser"""
        if self.repo_owner and self.repo_name:
            url = f"https://github.com/{self.repo_owner}/{self.repo_name}"
            if self.current_path:
                url += f"/tree/{self.branch_var.get()}/{self.current_path}"
            webbrowser.open(url)
    
    def download_repository(self):
        """Download entire repository"""
        dest_dir = filedialog.askdirectory(title="Select download destination")
        if dest_dir:
            Thread(target=self._download_repo_zip, args=(dest_dir,), daemon=True).start()
    
    def _download_repo_zip(self, dest_dir):
        """Download repository as ZIP"""
        try:
            headers = {"Authorization": f"token {self.github_token}"} if self.github_token else {}
            url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/zipball/{self.branch_var.get()}"
            
            response = requests.get(url, headers=headers, stream=True)
            
            if response.status_code == 200:
                zip_path = os.path.join(dest_dir, f"{self.repo_name}-{self.branch_var.get()}.zip")
                
                with open(zip_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                self.root.after(0, lambda: messagebox.showinfo("Success", f"Repository downloaded to: {zip_path}"))
            else:
                self.root.after(0, lambda: messagebox.showerror("Error", "Failed to download repository"))
        
        except Exception as e:
            self.root.after(0, lambda: messagebox.showerror("Error", f"Download failed: {str(e)}"))
    
    def show_context_menu(self, event):
        """Show context menu on right-click"""
        # Create context menu
        context_menu = tk.Menu(self.root, tearoff=0, bg='#2d2d2d', fg='white')
        
        selection = self.file_tree.selection()
        if selection:
            item = selection[0]
            data = json.loads(self.file_tree.set(item, 'full_data'))
            
            if data['type'] == 'dir':
                context_menu.add_command(label="Open Folder", command=lambda: self.load_files(data['path']))
                context_menu.add_separator()
            else:
                context_menu.add_command(label="View File", command=self.view_file)
                context_menu.add_command(label="Download", command=self.download_selected)
                context_menu.add_separator()
            
            context_menu.add_command(label="Delete", command=self.delete_selected)
            context_menu.add_command(label="Copy URL", command=lambda: self._copy_file_url(data))
        
        context_menu.add_separator()
        context_menu.add_command(label="New File", command=self.quick_create_file)
        context_menu.add_command(label="New Folder", command=self.quick_create_folder)
        context_menu.add_command(label="Upload Files", command=self.quick_upload)
        
        try:
            context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            context_menu.grab_release()
    
    def _copy_file_url(self, file_data):
        """Copy file URL to clipboard"""
        url = f"https://github.com/{self.repo_owner}/{self.repo_name}/blob/{self.branch_var.get()}/{file_data['path']}"
        self.root.clipboard_clear()
        self.root.clipboard_append(url)
        self.update_status("URL copied to clipboard")
    
    def update_status(self, message):
        """Update status bar"""
        self.status_var.set(f"{datetime.now().strftime('%H:%M:%S')} - {message}")
        self.root.update_idletasks()
    
    def save_config(self):
        """Save configuration"""
        config = {
            'github_token': self.github_token,
            'repo_owner': self.repo_owner,
            'repo_name': self.repo_name,
            'repo_url': self.repo_url_var.get()
        }
        
        try:
            with open('github_config.json', 'w') as f:
                json.dump(config, f)
        except Exception as e:
            print(f"Failed to save config: {e}")
    
    def load_config(self):
        """Load saved configuration"""
        try:
            if os.path.exists('github_config.json'):
                with open('github_config.json', 'r') as f:
                    config = json.load(f)
                
                self.github_token = config.get('github_token', '')
                self.repo_owner = config.get('repo_owner', '')
                self.repo_name = config.get('repo_name', '')
                
                self.token_var.set(self.github_token)
                self.repo_url_var.set(config.get('repo_url', ''))
                
                # Auto-connect if we have valid config
                if all([self.github_token, self.repo_owner, self.repo_name]):
                    Thread(target=self._test_and_connect, daemon=True).start()
        
        except Exception as e:
            print(f"Failed to load config: {e}")


def main():
    """Main function"""
    root = tk.Tk()
    app = EnhancedGitHubManager(root)
    root.mainloop()


if __name__ == "__main__":
    main()