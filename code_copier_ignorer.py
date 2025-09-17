#!/usr/bin/env python3
"""
Enhanced Code Directory Copier - Copy code files from directories to a single text file
Author: Assistant
Date: 2025

This script provides two modes:
1. Copy all code files from a directory (including subdirectories)
2. Copy specific files by providing their names/paths

Features:
- Automatically removes comments from code files
- Supports multiple programming languages
- Handles both single-line and multi-line comments
- Option to include or exclude comments
"""

import os
import sys
import re
from pathlib import Path
from typing import List, Set, Tuple

class CommentRemover:
    def __init__(self):
        # Define comment patterns for different file types
        self.comment_patterns = {
            # Python
            '.py': {
                'single_line': [r'#.*$'],
                'multi_line': [
                    (r'""".*?"""', re.DOTALL),
                    (r"'''.*?'''", re.DOTALL)
                ]
            },
            # JavaScript/TypeScript
            '.js': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.ts': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.jsx': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.tsx': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # HTML
            '.html': {
                'single_line': [],
                'multi_line': [(r'<!--.*?-->', re.DOTALL)]
            },
            # CSS/SCSS/SASS
            '.css': {
                'single_line': [],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.scss': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.sass': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # Java
            '.java': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # C/C++
            '.c': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.cpp': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.h': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            '.hpp': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # C#
            '.cs': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # PHP
            '.php': {
                'single_line': [r'//.*$', r'#.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # Ruby
            '.rb': {
                'single_line': [r'#.*$'],
                'multi_line': [(r'=begin.*?=end', re.DOTALL)]
            },
            # Go
            '.go': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # Rust
            '.rs': {
                'single_line': [r'//.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # SQL
            '.sql': {
                'single_line': [r'--.*$'],
                'multi_line': [(r'/\*.*?\*/', re.DOTALL)]
            },
            # Shell scripts
            '.sh': {
                'single_line': [r'#.*$'],
                'multi_line': []
            },
            '.bash': {
                'single_line': [r'#.*$'],
                'multi_line': []
            },
            # PowerShell
            '.ps1': {
                'single_line': [r'#.*$'],
                'multi_line': [(r'<#.*?#>', re.DOTALL)]
            },
            # Batch files
            '.bat': {
                'single_line': [r'REM.*$', r'::.*$'],
                'multi_line': []
            },
            '.cmd': {
                'single_line': [r'REM.*$', r'::.*$'],
                'multi_line': []
            },
            # R
            '.r': {
                'single_line': [r'#.*$'],
                'multi_line': []
            }
        }

    def remove_comments(self, content: str, file_extension: str) -> str:
        """Remove comments from code content based on file type"""
        if file_extension.lower() not in self.comment_patterns:
            return content  # Return original if no pattern defined
        
        patterns = self.comment_patterns[file_extension.lower()]
        
        # First, handle multi-line comments
        for pattern, *flags in patterns['multi_line']:
            flag = flags[0] if flags else 0
            content = re.sub(pattern, '', content, flags=flag)
        
        # Then handle single-line comments (line by line to preserve structure)
        lines = content.split('\n')
        processed_lines = []
        
        for line in lines:
            processed_line = line
            for pattern in patterns['single_line']:
                # Check if the comment is inside a string literal
                if not self._is_comment_in_string(line, pattern):
                    processed_line = re.sub(pattern, '', processed_line, flags=re.MULTILINE)
            
            # Keep the line if it's not just whitespace after removing comments
            if processed_line.strip() or not line.strip():
                processed_lines.append(processed_line.rstrip())
        
        # Remove empty lines that were created by removing comments
        final_lines = []
        for line in processed_lines:
            if line.strip() or (final_lines and final_lines[-1].strip()):
                final_lines.append(line)
        
        # Remove trailing empty lines
        while final_lines and not final_lines[-1].strip():
            final_lines.pop()
            
        return '\n'.join(final_lines)
    
    def _is_comment_in_string(self, line: str, comment_pattern: str) -> bool:
        """Check if a comment pattern occurs inside a string literal"""
        # This is a simplified check - a more robust solution would need
        # a proper parser, but this handles most common cases
        
        # Find potential comment positions
        comment_match = re.search(comment_pattern.replace('.*$', ''), line)
        if not comment_match:
            return False
        
        comment_pos = comment_match.start()
        
        # Check for string literals before the comment
        string_patterns = [r'"[^"]*"', r"'[^']*'", r'`[^`]*`']
        
        for pattern in string_patterns:
            for match in re.finditer(pattern, line):
                if match.start() <= comment_pos <= match.end():
                    return True
        
        return False

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
        
        self.comment_remover = CommentRemover()
        
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
                      ['node_modules', '__pycache__', 'venv', 'env', 'build', 'dist', 'target', 'backend']]
            
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
    
    def read_file_content(self, file_path: Path, remove_comments: bool = True) -> str:
        """Read file content with proper encoding handling and optional comment removal"""
        try:
            # Try UTF-8 first
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            try:
                # Fallback to latin-1
                with open(file_path, 'r', encoding='latin-1') as f:
                    content = f.read()
            except Exception as e:
                return f"Error reading file: {str(e)}"
        except Exception as e:
            return f"Error reading file: {str(e)}"
        
        # Remove comments if requested
        if remove_comments:
            content = self.comment_remover.remove_comments(content, file_path.suffix)
        
        return content
    
    def copy_files_to_text(self, files: List[Path], output_file: str, include_tree: bool = True, remove_comments: bool = True):
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
                out_file.write(f"Comments removed: {'Yes' if remove_comments else 'No'}\n")
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
                    
                    content = self.read_file_content(file_path, remove_comments)
                    
                    # Only write non-empty content
                    if content.strip():
                        out_file.write(content)
                        
                        if not content.endswith('\n'):
                            out_file.write('\n')
                    else:
                        out_file.write("(File contains no non-comment code)\n")
                    
                    out_file.write("\n" + "=" * 80 + "\n\n")
                
            print(f"Successfully copied {len(files)} files to '{output_file}'")
            if remove_comments:
                print("Comments have been removed from the code files.")
            
        except Exception as e:
            print(f"Error writing to output file: {str(e)}")

def main():
    copier = CodeCopier()
    
    print("Enhanced Code Directory Copier")
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
                
            elif choice in ['1', '2']:
                # Common settings for both modes
                remove_comments = input("Remove comments from code? (y/n, default: y): ").strip().lower()
                remove_comments = remove_comments != 'n'
                
                include_tree = input("Include file tree? (y/n, default: y): ").strip().lower()
                include_tree = include_tree != 'n'
                
                if choice == '1':
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
                    
                    copier.copy_files_to_text(files, output_file, include_tree, remove_comments)
                    
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
                    
                    copier.copy_files_to_text(files, output_file, include_tree, remove_comments)
                    
            else:
                print("Invalid choice. Please enter 1, 2, or 3.")
                
        except KeyboardInterrupt:
            print("\n\nOperation cancelled by user.")
            break
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()