#!/usr/bin/env python3
"""
GitHub Actions 自动解压脚本
功能：
1. 递归查找所有 ZIP 文件
2. 解压到同名文件夹（避免覆盖）
3. 可选删除原 ZIP
4. 生成解压报告
"""

import os
import sys
import zipfile
import shutil
from pathlib import Path
from datetime import datetime

def find_zip_files(root_dir='.'):
    """递归查找所有 ZIP 文件，排除隐藏目录和 .git"""
    zip_files = []
    for path in Path(root_dir).rglob('*.zip'):
        # 排除 .git 目录和隐藏文件夹
        if '.git' not in str(path) and not any(part.startswith('.') for part in path.parts[:-1]):
            zip_files.append(path)
    return sorted(zip_files)

def safe_unzip(zip_path, extract_to=None, delete_after=None):
    """
    安全解压 ZIP 文件

    Args:
        zip_path: ZIP 文件路径
        extract_to: 指定解压目录（默认使用 ZIP 文件名）
        delete_after: 解压后是否删除原文件（默认从环境变量读取）
    """
    zip_path = Path(zip_path)

    if not zip_path.exists():
        print(f"❌ 文件不存在: {zip_path}")
        return False

    # 确定解压目录
    if extract_to is None:
        extract_to = zip_path.parent / zip_path.stem
    else:
        extract_to = Path(extract_to)

    # 如果目录已存在，添加数字后缀
    counter = 1
    original_extract_to = extract_to
    while extract_to.exists():
        extract_to = Path(f"{original_extract_to}_{counter}")
        counter += 1

    print(f"📦 正在解压: {zip_path.name}")
    print(f"📂 解压到: {extract_to}")

    try:
        # 创建解压目录
        extract_to.mkdir(parents=True, exist_ok=True)

        # 解压文件
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            # 安全检查：防止 Zip Slip 攻击
            for member in zip_ref.namelist():
                member_path = extract_to / member
                try:
                    member_path.resolve().relative_to(extract_to.resolve())
                except ValueError:
                    print(f"⚠️  跳过危险路径: {member}")
                    continue

            zip_ref.extractall(extract_to)

            # 统计信息
            file_count = len(zip_ref.namelist())
            print(f"✅ 成功解压 {file_count} 个文件")

        # 是否删除原 ZIP
        if delete_after is None:
            delete_after = os.getenv('DELETE_AFTER', 'true').lower() == 'true'

        if delete_after:
            zip_path.unlink()
            print(f"🗑️  已删除原文件: {zip_path.name}")
        else:
            print(f"💾 保留原文件: {zip_path.name}")

        return True

    except zipfile.BadZipFile:
        print(f"❌ 损坏的 ZIP 文件: {zip_path.name}")
        return False
    except Exception as e:
        print(f"❌ 解压失败: {e}")
        return False

def generate_report(results, output_file='UNZIP_REPORT.md'):
    """生成解压报告"""
    report = f"""# 📋 自动解压报告

生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 📊 统计

| 项目 | 数量 |
|------|------|
| 发现 ZIP 文件 | {len(results)} |
| 成功解压 | {sum(1 for r in results if r['success'])} |
| 失败 | {sum(1 for r in results if not r['success'])} |

## 📁 详细记录

"""

    for result in results:
        status = "✅ 成功" if result['success'] else "❌ 失败"
        report += f"
### {result['file']}
"
        report += f"- 状态: {status}
"
        report += f"- 输出目录: `{result.get('extract_to', 'N/A')}`
"
        if 'error' in result:
            report += f"- 错误: {result['error']}
"

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"
📝 报告已生成: {output_file}")

def main():
    """主函数"""
    print("🔍 开始扫描 ZIP 文件...
")

    # 查找所有 ZIP 文件
    zip_files = find_zip_files()

    if not zip_files:
        print("ℹ️  未发现 ZIP 文件")
        return

    print(f"发现 {len(zip_files)} 个 ZIP 文件:
")
    for zf in zip_files:
        print(f"  - {zf}")
    print()

    # 解压所有文件
    results = []
    for zip_path in zip_files:
        print("-" * 50)
        success = safe_unzip(zip_path)
        results.append({
            'file': zip_path.name,
            'success': success,
            'extract_to': zip_path.stem if success else None
        })
        print()

    # 生成报告
    generate_report(results)

    # 输出摘要
    success_count = sum(1 for r in results if r['success'])
    print("=" * 50)
    print(f"🎉 完成: {success_count}/{len(results)} 个文件解压成功")

    # 如果有失败，返回非零退出码
    if success_count < len(results):
        sys.exit(1)

if __name__ == "__main__":
    main()
