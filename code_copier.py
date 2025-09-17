#!/usr/bin/env python3
"""
Code Directory Copier - Copy code files from directories to a single text file
Author: Assistant
Date: 2025

This script provides two modes:
1. Copy all code files from a directory (including subdirectories)
2. Copy specific files by providing their names/paths
"""

import os
import sys
from pathlib import Path
from typing import List, Set

class CodeCopier:
    def __init__(self):
        # Common code file extensions
        self.code_extensions = {
            '.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.sass',
            '.java', '.cpp', '.c', '.h', '.hpp', '.cs', '.php', '.rb', '.go',
            '.rs', '.swift', '.kt', '.scala', '.r', '.sql', '.sh', '.bash',
            '.ps1', '.bat', '.cmd', '.yml', '.yaml', '.json', '.xml', '.md',
            '.txt', '.ini', '.cfg', '.conf', '.dockerfile', '.makefile',
            '.gradle', '.maven', '.vue', '.svelte', '.dart', '.lua', '.perl',
            '.pl', '.pm', '.tcl', '.vb', '.fs', '.fsx', '.ml', '.mli', '.elm'
        }
        
    def is_code_file(self, file_path: Path) -> bool:
        """Check if a file is a code file based on its extension"""
        return file_path.suffix.lower() in self.code_extensions or file_path.name.lower() in ['makefile', 'dockerfile', 'rakefile']
    
    def get_all_code_files(self, directory: str) -> List[Path]:
        """Get all code files from directory and subdirectories"""
        code_files = []
        directory_path = Path(directory)
        
        if not directory_path.exists():
            print(f"Error: Directory '{directory}' does not exist.")
            return []
        
        if not directory_path.is_dir():
            print(f"Error: '{directory}' is not a directory.")
            return []
        
        # Walk through directory and subdirectories
        for root, dirs, files in os.walk(directory_path):
            # Skip common non-code directories
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in 
                      ['node_modules', '__pycache__', 'venv', 'env', 'build', 'dist', 'target']]
            
            for file in files:
                file_path = Path(root) / file
                if self.is_code_file(file_path) and not file.startswith('.'):
                    code_files.append(file_path)
        
        return sorted(code_files)
    
    def get_specific_files(self, file_list: List[str], base_directory: str = None) -> List[Path]:
        """Get specific files from the provided list (supports both files and directories)"""
        files = []
        base_path = Path(base_directory) if base_directory else Path.cwd()
        
        for file_name in file_list:
            file_path = Path(file_name)
            
            # If it's not an absolute path, make it relative to base_directory
            if not file_path.is_absolute():
                file_path = base_path / file_path
            
            if file_path.exists():
                if file_path.is_file():
                    files.append(file_path)
                elif file_path.is_dir():
                    # If it's a directory, get all code files from it
                    print(f"'{file_name}' is a directory. Getting all code files from it...")
                    dir_files = self.get_all_code_files(str(file_path))
                    files.extend(dir_files)
                else:
                    print(f"Warning: '{file_name}' exists but is neither a file nor directory.")
            else:
                print(f"Warning: '{file_name}' not found.")
        
        return files
    
    def read_file_content(self, file_path: Path) -> str:
        """Read file content with proper encoding handling"""
        try:
            # Try UTF-8 first
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        except UnicodeDecodeError:
            try:
                # Fallback to latin-1
                with open(file_path, 'r', encoding='latin-1') as f:
                    return f.read()
            except Exception as e:
                return f"Error reading file: {str(e)}"
        except Exception as e:
            return f"Error reading file: {str(e)}"
    
    def copy_files_to_text(self, files: List[Path], output_file: str, include_tree: bool = True):
        """Copy all files content to a single text file"""
        if not files:
            print("No files to copy.")
            return
        
        try:
            with open(output_file, 'w', encoding='utf-8') as out_file:
                # Write header
                out_file.write("=" * 80 + "\n")
                out_file.write("CODE FILES COMPILATION\n")
                out_file.write(f"Generated on: {Path().cwd()}\n")
                out_file.write(f"Total files: {len(files)}\n")
                out_file.write("=" * 80 + "\n\n")
                
                # Write file tree if requested
                if include_tree:
                    out_file.write("FILE STRUCTURE:\n")
                    out_file.write("-" * 40 + "\n")
                    for i, file_path in enumerate(files, 1):
                        out_file.write(f"{i:3d}. {file_path}\n")
                    out_file.write("\n" + "=" * 80 + "\n\n")
                
                # Write each file's content
                for i, file_path in enumerate(files, 1):
                    out_file.write(f"FILE {i}: {file_path}\n")
                    out_file.write("=" * 80 + "\n")
                    
                    content = self.read_file_content(file_path)
                    out_file.write(content)
                    
                    if not content.endswith('\n'):
                        out_file.write('\n')
                    
                    out_file.write("\n" + "=" * 80 + "\n\n")
                
            print(f"Successfully copied {len(files)} files to '{output_file}'")
            
        except Exception as e:
            print(f"Error writing to output file: {str(e)}")

def main():
    copier = CodeCopier()
    
    print("Code Directory Copier")
    print("=" * 50)
    print("1. Copy all code files from directory (including subdirectories)")
    print("2. Copy specific files by name/path")
    print("3. Exit")
    
    while True:
        try:
            choice = input("\nEnter your choice (1-3): ").strip()
            
            if choice == '3':
                print("Goodbye!")
                break
                
            elif choice == '1':
                # Mode 1: Copy all files from directory
                directory = input("Enter directory path: ").strip()
                if not directory:
                    print("Directory path cannot be empty.")
                    continue
                
                print(f"Scanning directory: {directory}")
                files = copier.get_all_code_files(directory)
                
                if not files:
                    print("No code files found in the specified directory.")
                    continue
                
                print(f"Found {len(files)} code files:")
                for i, file_path in enumerate(files[:10], 1):  # Show first 10
                    print(f"  {i}. {file_path}")
                if len(files) > 10:
                    print(f"  ... and {len(files) - 10} more files")
                
                output_file = input("Enter output file name (default: code_compilation.txt): ").strip()
                if not output_file:
                    output_file = "code_compilation.txt"
                
                include_tree = input("Include file tree? (y/n, default: y): ").strip().lower()
                include_tree = include_tree != 'n'
                
                copier.copy_files_to_text(files, output_file, include_tree)
                
            elif choice == '2':
                # Mode 2: Copy specific files
                print("\nEnter file names/paths or directory names (one per line).")
                print("You can use relative or absolute paths.")
                print("For directories, all code files within them will be included.")
                print("Enter an empty line when done:")
                
                file_list = []
                while True:
                    file_name = input("File/Directory: ").strip()
                    if not file_name:
                        break
                    file_list.append(file_name)
                
                if not file_list:
                    print("No files or directories specified.")
                    continue
                
                base_directory = input("Enter base directory (optional, default: current directory): ").strip()
                if not base_directory:
                    base_directory = None
                
                files = copier.get_specific_files(file_list, base_directory)
                
                if not files:
                    print("No valid files found.")
                    continue
                
                print(f"Found {len(files)} valid files:")
                for i, file_path in enumerate(files, 1):
                    print(f"  {i}. {file_path}")
                
                output_file = input("Enter output file name (default: selected_code_files.txt): ").strip()
                if not output_file:
                    output_file = "selected_code_files.txt"
                
                include_tree = input("Include file tree? (y/n, default: y): ").strip().lower()
                include_tree = include_tree != 'n'
                
                copier.copy_files_to_text(files, output_file, include_tree)
                
            else:
                print("Invalid choice. Please enter 1, 2, or 3.")
                
        except KeyboardInterrupt:
            print("\n\nOperation cancelled by user.")
            break
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()