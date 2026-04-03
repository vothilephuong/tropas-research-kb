# TROPAS Research KB — Backlog Vận Hành

> **Nguyên tắc:** Chỉ làm khi có pain point thật. Không build vì "có thể cần".

**Trạng thái hiện tại:** v1.0-internal-operational — đủ dùng, đang vận hành.

---

## Tier 1 — Nên làm đầu tiên khi có nhu cầu

### Search cơ bản
**Làm khi:** nhớ nội dung nhưng không nhớ ở topic nào, phải bấm nhiều topic để tìm lại.
- Full-text search qua `search-index.json` (offline, static)
- Kết quả gồm: topic + AI source + snippet
- Click mở đúng Comparator/Reader

### Citation improvements
**Làm khi:** dùng Citations page nhiều để quyết định paper nào đáng tin hơn.
- Filter mạnh hơn (theo topic / AI / year)
- Thống kê paper nào được nhiều AI đồng thuận nhất
- Link ngược citation → comparator rõ hơn

### Tooling thêm topic nhanh hơn
**Làm khi:** bắt đầu thêm nhiều topic và thấy quy trình thủ công phiền.
- Script `add-topic.mjs` — copy file + tạo meta.json template
- Validation mạnh hơn
- Checklist chuẩn khi nhập dữ liệu mới

---

## Tier 2 — Làm khi workflow đã ổn định

### Comparator polish
- Sync scroll (optional — tốn thời gian, không bắt buộc)
- Highlight sự khác biệt rõ hơn
- Header metadata thêm: ngày tạo, file size

### Reader polish
- Reader nhớ vị trí đang đọc
- Breadcrumb rõ hơn
- PDF viewer tốt hơn

### Thesis Mode
**Làm khi:** sắp demo cho hội đồng.
- Fullscreen clean mode (ẩn sidebar/control)
- Font và spacing tối ưu trình chiếu
- Route share sạch cho hội đồng

---

## Tier 3 — Để rất sau

- PDF/DOCX render nâng cao
- Automation nhập dữ liệu từ research repo
- Semantic/vector search
- Annotation trong app

---

## Không làm (không bao giờ, trừ khi scope thay đổi hoàn toàn)

Backend · Database · Auth · Collaborative editing · Realtime sync · Mobile optimization sâu · Refactor lớn khi chưa có đau thật

---

## Quy tắc quyết định

| Triệu chứng | Làm gì |
|------------|--------|
| Không tìm thấy nội dung đã đọc | **Search** |
| Khó đánh giá paper nào quan trọng | **Citation improvements** |
| Thêm topic thấy phiền | **Tooling** |
| Đọc comparator thấy mệt mắt | **Comparator polish** |
| Sắp demo hội đồng | **Thesis Mode** |
