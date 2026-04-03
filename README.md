# TROPAS Research KB — Runbook

**Live:** https://vothilephuong.github.io/tropas-research-kb/
**Repo:** https://github.com/vothilephuong/tropas-research-kb
**Version:** v1.0-internal-operational

---

## Chạy local

```bash
nvm use          # Node >= 20
npm install
npm run dev      # http://localhost:5173/tropas-research-kb/
```

## Chuẩn bị nội dung

```bash
npm run kb:prepare
```

Chạy sau mỗi lần thêm/sửa topic. Script này sẽ:
1. Validate tất cả `meta.json` và file tham chiếu
2. Tạo lại `manifest.json`

## Build & Deploy

```bash
npm run build    # Kiểm tra trước khi push
git push origin main   # GitHub Actions tự deploy
```

## Thêm 1 topic mới

```bash
# 1. Tạo folder
mkdir -p public/data/topics/{topic-id}/assets

# 2. Copy 4 file AI
cp "source/claude.md"    public/data/topics/{topic-id}/claude.md
cp "source/chatgpt.md"   public/data/topics/{topic-id}/chatgpt.md
cp "source/gemini.md"    public/data/topics/{topic-id}/gemini.md
cp "source/perplexity.md" public/data/topics/{topic-id}/perplexity.md

# 3. Tạo meta.json
```

```json
{
  "id": "topic-id",
  "title": "Tên topic",
  "description": "Mô tả ngắn",
  "tags": ["tag1", "tag2"],
  "status": "complete",
  "created": "2026-04-03",
  "files": {
    "claude": "claude.md",
    "chatgpt": "chatgpt.md",
    "gemini": "gemini.md",
    "perplexity": "perplexity.md"
  }
}
```

```bash
# 4. Chạy pipeline
npm run kb:prepare

# 5. Push → tự deploy
git add -A && git commit -m "add: topic-id" && git push
```

---

## Scope vận hành

Đây là tool để **đọc, so sánh, rà citation** — không phải biên tập hay lưu trữ.

- ✅ Xem song song output 4 AI theo từng topic
- ✅ Đọc full text từng AI trong Reader
- ✅ Tra cứu citation theo tag/sort
- ❌ Không phải kho lưu trữ toàn bộ tài liệu
- ❌ Không mở feature mới nếu chưa có pain point thật
