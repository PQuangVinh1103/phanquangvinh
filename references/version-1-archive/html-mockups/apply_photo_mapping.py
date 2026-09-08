import os
import json
import re

def apply_mapping():
    base_dir = '/Users/phanquangvinh/Documents/Professional Profile_Phan Quang Vinh/Website phanquangvinh.com'
    mapping_file = os.path.join(base_dir, 'photo_mapping.json')
    
    if not os.path.exists(mapping_file):
        print(f"Error: mapping file not found at {mapping_file}")
        print("Please categorize your photos in organizer.html and click 'Hoàn tất & Xuất JSON' -> 'Tải file JSON'.")
        return
        
    with open(mapping_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
        
    print(f"Loaded mapping with {len(mapping)} images.")
    
    # 1. Process files
    pics_dir = os.path.join(base_dir, 'pictures')
    unused_dir = os.path.join(pics_dir, 'unused')
    if not os.path.exists(unused_dir):
        os.makedirs(unused_dir)
        print(f"Created unused folder: {unused_dir}")
        
    success_count = 0
    unused_count = 0
    
    # Track mapping dictionary for HTML replacement
    html_replacements = {}
    
    for orig_name, info in mapping.items():
        category = info.get('category')
        rename_to = info.get('rename_to')
        
        orig_path = os.path.join(pics_dir, orig_name)
        if not os.path.exists(orig_path):
            print(f"Warning: original file does not exist: {orig_name}")
            continue
            
        if category == 'unused':
            dest_path = os.path.join(unused_dir, orig_name)
            try:
                os.rename(orig_path, dest_path)
                print(f"Moved to unused: {orig_name} -> pictures/unused/{orig_name}")
                unused_count += 1
            except Exception as e:
                print(f"Error moving {orig_name} to unused: {e}")
        else:
            # Collision-safety check
            base_name, ext = os.path.splitext(rename_to)
            counter = 1
            final_rename_to = rename_to
            dest_path = os.path.join(pics_dir, final_rename_to)
            
            while os.path.exists(dest_path):
                final_rename_to = f"{base_name}_{counter}{ext}"
                dest_path = os.path.join(pics_dir, final_rename_to)
                counter += 1
                
            try:
                # Rename the file
                os.rename(orig_path, dest_path)
                if final_rename_to != rename_to:
                    print(f"Renamed (collision safe): {orig_name} -> pictures/{final_rename_to}")
                else:
                    print(f"Renamed: {orig_name} -> pictures/{final_rename_to}")
                success_count += 1
                # Save mapping for HTML file updates (use the first one that has the exact clean name)
                if category not in html_replacements:
                    html_replacements[category] = final_rename_to
            except Exception as e:
                print(f"Error renaming {orig_name} to {final_rename_to}: {e}")

    print(f"\nCompleted file processing: Renamed {success_count} files, moved {unused_count} files to unused/.")
    
    # 2. Update HTML Files
    html_files = ['index.html', 'about.html', 'projects.html', 'blog.html']
    
    # Define mapping replacements
    # category name -> placeholder patterns in HTML files
    placeholders = {
        'avatar': (
            r'<!-- Vui lòng thay thế bằng hình ảnh thật \(tên file gợi ý: avatar_vinh\.jpg\) -->\s*<span class="about__avatar-placeholder">\[Ảnh chân dung Phan Quang Vinh\]</span>',
            r'<img src="pictures/{filename}" alt="Phan Quang Vinh" class="about__avatar-img" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'project_n8n': (
            r'\[Ảnh Dự án: Báo cáo tự động n8n\]',
            r'<img src="pictures/{filename}" alt="Báo cáo tự động n8n" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'project_crm': (
            r'\[Ảnh Dự án: CRM & Marketing\]',
            r'<img src="pictures/{filename}" alt="Marketing Automation & CRM" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'project_web3h': (
            r'\[Ảnh Dự án: Website 3h với AI\]',
            r'<img src="pictures/{filename}" alt="Website hoàn thành trong 3 giờ với AI" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'blog_rwa': (
            r'\[Ảnh Bài viết: RWA & Tokenization\]',
            r'<img src="pictures/{filename}" alt="RWA & Tokenization" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'blog_n8n': (
            r'\[Ảnh Bài viết: Workflow n8n & AI\]',
            r'<img src="pictures/{filename}" alt="Workflow n8n & AI" style="width: 100%; height: 100%; object-fit: cover;">'
        ),
        'blog_mental_models': (
            r'\[Ảnh Bài viết: Mental Models\]',
            r'<img src="pictures/{filename}" alt="Mental Models in Action" style="width: 100%; height: 100%; object-fit: cover;">'
        )
    }
    
    updated_files_count = 0
    
    for html_file in html_files:
        file_path = os.path.join(base_dir, html_file)
        if not os.path.exists(file_path):
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # Apply replacements
        for category, filename in html_replacements.items():
            if category in placeholders:
                pattern, replacement_template = placeholders[category]
                replacement = replacement_template.format(filename=filename)
                content, count = re.subn(pattern, replacement, content)
                if count > 0:
                    print(f"  [{html_file}] Replaced placeholder for category '{category}' ({count} occurrences)")
                    
        # Special check for avatar in about.html and index.html if regular template matches fail
        if 'avatar' in html_replacements:
            avatar_filename = html_replacements['avatar']
            # Fallback direct replacements for the raw text placeholders
            content, count = re.subn(
                r'\[Ảnh chân dung Phan Quang Vinh\]',
                f'<img src="pictures/{avatar_filename}" alt="Phan Quang Vinh" style="width: 100%; height: 100%; object-fit: cover;">',
                content
            )
            if count > 0:
                print(f"  [{html_file}] Applied fallback avatar replacement ({count} occurrences)")
                
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Saved updates to {html_file}")
            updated_files_count += 1
            
    print(f"\nSuccessfully updated {updated_files_count} HTML pages with the new image references!")

if __name__ == '__main__':
    apply_mapping()
