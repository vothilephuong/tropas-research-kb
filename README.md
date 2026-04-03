# TROPAS Research KB

Knowledge Base hỗ trợ nghiên cứu luận án **dự báo khí tượng thiên văn nhiệt đới (TROPAS)**.

So sánh song song output của 4 AI tools — **Claude, ChatGPT, Gemini, Perplexity** — theo từng topic nghiên cứu, kèm quản lý danh sách tài liệu tham khảo.

**🌐 Live:** https://vothilephuong.github.io/tropas-research-kb/
**📦 Repo:** https://github.com/vothilephuong/tropas-research-kb
**🏷️ Version:** v1.0-internal-operational

---

## Dự án này là gì

Khi nghiên cứu, thường dùng nhiều AI tool để hỏi cùng một câu hỏi — mỗi AI trả lời theo cách khác nhau. App này giúp:

- **Đọc song song** 4 AI cùng lúc trên 1 màn hình (Comparator)
- **Đọc sâu** từng AI trên full page (Reader)
- **Tra cứu tài liệu tham khảo** kèm tag, sort, filter, và xem AI nào đồng thuận (Citations)

Không có backend. Toàn bộ là file tĩnh — deploy trên GitHub Pages, không cần server.

---

## Trạng thái hiện tại

| Thành phần | Trạng thái |
|-----------|-----------|
| 5 topics, 20 documents (4 AI × 5) | ✅ Production |
| Comparator 4 cột + column toggle | ✅ Production |
| Reader full markdown | ✅ Production |
| Citations page (filter/sort/expand) | ✅ Production |
| Content pipeline (validate + manifest) | ✅ Production |
| GitHub Actions auto-deploy | ✅ Production |
| Production QA | ✅ 8/8 pass |

**Các topic hiện có:**
- `a1-overview` — Weather Forecasting for Astronomical Observation
- `a2-forecasting-systems` — Intelligent Forecasting Systems for Observatory Operations
- `b1-deep-learning` — Deep Learning for Meteorological Time Series Forecasting
- `d1-datasets-survey` — Astronomical Weather & Sky-Quality Datasets Survey
- `d2-evaluation-framework` — Observatory Weather Data Evaluation Framework

---

## Kiến trúc

```
Static site — React 19 + TypeScript + Tailwind v4 + Vite 8
Không backend · Không database · Deploy GitHub Pages
```

```
public/data/
├── manifest.json          ← auto-generated bởi kb:prepare
├── citations.json         ← hand-curated
└── topics/
    └── {topic-id}/
        ├── meta.json
        ├── claude.md
        ├── chatgpt.md
        ├── gemini.md
        ├── perplexity.md
        └── assets/

src/
├── components/
│   ├── comparator/   ComparatorView, AiColumn
│   ├── reader/       ReaderPage, MarkdownViewer
│   ├── citations/    CitationsPage
│   ├── layout/       AppShell, Header, Sidebar
│   └── navigator/    TopicTree
├── hooks/            useManifest, useMarkdown, useCitations
├── lib/              constants, fetchers, citation-utils
└── types/            manifest, topic, citation

scripts/
├── validate-content.mjs
├── generate-manifest.mjs
└── kb-prepare.mjs          ← chạy 2 script trên theo thứ tự
```

---

## Chạy local

```bash
nvm use          # Node >= 20
npm install
npm run kb:prepare
npm run dev      # http://localhost:5173/tropas-research-kb/
```

## Chuẩn bị nội dung

```bash
npm run kb:prepare
```

Chạy sau mỗi lần thêm/sửa topic. Script validate rồi tạo lại `manifest.json`.

## Build & Deploy

```bash
npm run build        # kiểm tra build trước khi push
git push origin main # GitHub Actions tự build + deploy
```

## Thêm 1 topic mới

```bash
# 1. Tạo folder
mkdir -p public/data/topics/{topic-id}/assets

# 2. Copy 4 file AI (đặt tên theo chuẩn)
cp "nguồn/claude.md"     public/data/topics/{topic-id}/claude.md
cp "nguồn/chatgpt.md"    public/data/topics/{topic-id}/chatgpt.md
cp "nguồn/gemini.md"     public/data/topics/{topic-id}/gemini.md
cp "nguồn/perplexity.md" public/data/topics/{topic-id}/perplexity.md

# 3. Tạo meta.json
```

```json
{
  "id": "topic-id",
  "title": "Tên topic",
  "description": "Mô tả ngắn — sẽ hiện trên card và header",
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
# 4. Validate + cập nhật manifest
npm run kb:prepare

# 5. Commit và deploy
git add -A && git commit -m "add: {topic-id}" && git push
```

App tự nhận topic mới — không cần sửa code.

---

## Scope vận hành

Đây là tool để **đọc, so sánh, rà citation** — không phải biên tập hay lưu trữ.

- ✅ Xem song song output 4 AI theo từng topic
- ✅ Đọc full text từng AI trong Reader
- ✅ Tra cứu, lọc, sort citation
- ❌ Không phải kho lưu trữ toàn bộ tài liệu nghiên cứu
- ❌ Không mở feature mới nếu chưa có pain point thật

---

## Những gì sẽ làm trong tương lai

Xem chi tiết trong [BACKLOG.md](./BACKLOG.md). Tóm tắt theo thứ tự ưu tiên:

| Ưu tiên | Feature | Khi nào làm |
|---------|---------|-------------|
| Cao | Search full-text | Khi số topic nhiều, hay bị mất nội dung |
| Cao | Citation improvements | Khi cần đánh giá paper quan trọng hơn |
| Cao | Tooling thêm topic nhanh | Khi thêm topic thủ công thấy phiền |
| Trung bình | Comparator polish (sync scroll) | Khi đọc thấy mệt |
| Trung bình | Reader polish | Khi cần đọc sâu hơn |
| Thấp | Thesis Mode | Khi sắp demo hội đồng |

**Không làm:** backend, database, auth, semantic search, mobile deep optimization.

---

## Tech stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 + Typography plugin
- react-markdown + remark-gfm + rehype-highlight
- react-router-dom (Hash Router)
- lucide-react + clsx
