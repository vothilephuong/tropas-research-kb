# Tổng quan kỹ thuật về kiến trúc học sâu cho dự báo chuỗi thời gian khí tượng

## Bối cảnh và tiến hóa của học sâu cho chuỗi thời gian

Dự báo chuỗi thời gian khí tượng (meteorological time series forecasting) bao trùm nhiều “hình thái dữ liệu” và “thang đo”: (i) chuỗi quan trắc tại trạm (nhiệt độ 2 m, gió 10 m, mưa ngày/giờ…), thường có tính mùa vụ mạnh, nhiễu đo đạc, khoảng trống dữ liệu và phi tuyến; (ii) chuỗi đa biến theo tầng/độ cao (áp suất/tốc độ gió theo mực khí áp); (iii) trường không–thời gian trên lưới (reanalysis/NWP, radar, ảnh vệ tinh), nơi cấu trúc không gian quan trọng không kém cấu trúc thời gian. Các thước đo đánh giá vì thế cũng “đa hệ”: RMSE/MAE/MSE, hệ số tương quan, Anomaly Correlation Coefficient (ACC) cho trường lưới; với bài toán mưa theo ảnh/radar thường thêm CSI/ETS/F1/Precision/Recall theo ngưỡng. Việc chuẩn hoá so sánh mô hình đã được thúc đẩy mạnh nhờ các bộ chuẩn đánh giá chuyên dụng như WeatherBench và WeatherBench 2, vốn định nghĩa rõ tác vụ, dữ liệu và metric cho dự báo toàn cầu trung hạn dựa trên ERA5. citeturn33search4turn33search1

### Các bước ngoặt kiến trúc và ý nghĩa đối với dự báo khí tượng

Bảng dưới đây tóm lược các “đột phá cốt lõi” trong tiến hóa kiến trúc DL cho chuỗi thời gian (tập trung vào khả năng mô hình hoá phụ thuộc dài hạn, huấn luyện ổn định, và mở rộng cho chuỗi dài/đa biến), đồng thời nêu liên hệ điển hình tới bài toán khí tượng.

| Giai đoạn | Bước ngoặt kỹ thuật | Ý nghĩa/di sản cho dự báo chuỗi thời gian khí tượng |
|---|---|---|
| RNN cổ điển (1990s) | RNN kiểu “context/state” của entity["people","Jeffrey L. Elman","rnn researcher"] giúp đưa ký ức trạng thái vào mô hình hoá chuỗi. citeturn40search0 | Đặt nền cho dự báo chuỗi bằng NN hồi tiếp; nhưng học phụ thuộc dài gặp vấn đề suy giảm/bùng nổ gradient. citeturn40search0 |
| LSTM (1997) | entity["people","Sepp Hochreiter","lstm coauthor"] và entity["people","Jürgen Schmidhuber","lstm coauthor"] đề xuất LSTM với cơ chế cổng và “cell state” để duy trì dòng gradient qua thời gian dài. citeturn40search1 | Trở thành xương sống dự báo khí tượng dạng chuỗi (trạm, NWP hậu xử lý) vì ổn định hơn RNN thường khi học mùa vụ/chu kỳ dài và quan hệ phi tuyến. citeturn40search1 |
| GRU (2014) | entity["people","Kyunghyun Cho","gru coauthor"] và cộng sự (RNN Encoder–Decoder) phổ biến hoá GRU như một biến thể “gọn” hơn LSTM; nghiên cứu thực nghiệm cho thấy GRU thường tiệm cận LSTM về chất lượng với ít tham số hơn. citeturn41search2turn41search8 | Đặc biệt hữu ích khi dữ liệu trạm ít hoặc cần mô hình nhẹ; là “điểm giữa” hiệu năng–chi phí trong dự báo khí tượng cục bộ. citeturn41search8 |
| Attention (2014–2015) | Attention kiểu “alignment” của entity["people","Dzmitry Bahdanau","attention coauthor"], entity["people","Yoshua Bengio","deep learning researcher"] đề xuất giải nút thắt vector cố định trong encoder–decoder bằng cách “tìm mềm” các vị trí đầu vào liên quan. citeturn40search3turn40search7 | Trong dự báo khí tượng, attention giúp: (i) chọn thời điểm/độ trễ quan trọng (front, chu kỳ ngày–đêm), (ii) tăng hiệu quả multi-step/multi-horizon, (iii) hỗ trợ giải thích (interpretability) mức thời điểm/biến. citeturn40search7 |
| Transformer (2017) | entity["people","Ashish Vaswani","transformer paper"] và cộng sự đưa ra Transformer “chỉ dùng self-attention”, loại bỏ recurrence/convolution trong backbone, tăng khả năng song song hoá và mô hình hóa phụ thuộc dài. citeturn40search2turn40search6 | Mở đường cho mô hình chuỗi dài/đa biến quy mô lớn (reanalysis/NWP grid), và sau đó là “mô hình nền” (foundation) cho chuỗi thời gian. citeturn40search6turn33search1 |
| Transformer cho dự báo chuỗi dài (2019–2024) | Các biến thể như TFT (2019), Informer (2021), Autoformer (2021), FEDformer (2022), iTransformer (2024) tập trung vào: multi-horizon + giải thích; giảm độ phức tạp attention; đưa decomposition/chu kỳ/tần số/đa biến vào kiến trúc. citeturn42search0turn34search9turn42search1turn42search2turn42search3 | Phù hợp với chuỗi dài (mùa vụ dài, ENSO), dữ liệu lưới toàn cầu, và bối cảnh nhiều biến ngoại sinh (NWP guidance, lịch, địa lý). citeturn42search1turn42search2 |
| Foundation models cho chuỗi thời gian (2023–2025) | TimeGPT (2023), Chronos (2024), Moirai-MoE (2024) và các survey (2024–2025) cho thấy xu hướng pretrain–zero-shot–fine-tune trên dữ liệu chuỗi đa miền. citeturn32search0turn32search4turn32search1turn32search2turn32search14 | Với khí tượng: dẫn tới “Large Weather Models”/weather foundation models huấn luyện trên reanalysis đa thập kỷ, tạo dự báo nhanh hơn NWP và đôi khi vượt chuẩn vận hành trên nhiều chỉ tiêu. citeturn35view2turn45view0turn46search0turn35view3 |

## LSTM và biến thể trong dự báo khí tượng

### LSTM chuẩn và vì sao hợp với dữ liệu thời tiết

LSTM chuẩn có ba cổng (input/forget/output) điều tiết cập nhật và “ghi nhớ” của trạng thái ô (cell state). Về mặt học, thiết kế này nhằm duy trì dòng gradient qua nhiều bước thời gian, giảm suy giảm gradient khi học phụ thuộc dài (ví dụ: chu kỳ ngày–đêm, mùa vụ, độ trễ mưa–ẩm–mây). citeturn40search1 Những ưu điểm này đặc biệt phù hợp với chuỗi khí tượng vốn (i) phi tuyến, (ii) có chu kỳ và tính tự tương quan mạnh, và (iii) thường cần dự báo nhiều bước/horizons. citeturn40search1turn33search4

Trong thực hành, LSTM khí tượng thường được dùng theo ba dạng: (1) **univariate** (chỉ một biến như nhiệt độ), (2) **multivariate** (nhiệt độ + áp suất + độ ẩm + gió…), và (3) **exogenous forecasting** (đầu vào gồm cả dự báo từ mô hình vật lý/NWP hoặc biến đã biết trong tương lai như “giờ trong ngày”). Các thiết kế tiền xử lý phổ biến gồm chuẩn hoá, điền khuyết, và biến đổi theo mùa vụ/chu kỳ; nhiều nghiên cứu nhấn mạnh chỉ cần “timestamp predictors” (giờ/ngày/tháng) cũng có thể cải thiện RMSE đáng kể khi dự báo nhiệt độ đô thị bằng LSTM. citeturn22view0

### LSTM một lớp và LSTM chồng tầng

**LSTM chồng tầng (stacked/deep LSTM)** tăng chiều sâu biểu diễn: tầng dưới học mẫu cục bộ (local dynamics) còn tầng trên có thể học cấu trúc dài hạn hơn. Tuy nhiên, sâu hơn không luôn tốt trong khí tượng vì (i) số mẫu hiệu dụng thường không lớn bằng các miền “big data” khác khi xét theo từng trạm/địa điểm, (ii) nhiễu đo và trôi phân phối theo mùa/khí hậu dễ gây quá khớp, và (iii) tối ưu hoá khó hơn. citeturn22view0

Một minh hoạ rõ là nghiên cứu dự báo nhiệt độ không khí đô thị ở entity["city","Hong Kong","hong kong, china"] sử dụng quan trắc giờ từ mạng trạm của entity["organization","Hong Kong Observatory","weather agency, hong kong"]: họ chạy tìm kiếm siêu tham số quy mô lớn (21.600 thử nghiệm) và kết luận **kiến trúc đơn giản một lớp, một chiều** cho kết quả tối ưu; tăng độ phức tạp không đem lại cải thiện tương ứng. citeturn22view0 Trái lại, với dữ liệu dài và đa biến (≈10 năm, gần 96.453 bản ghi giờ) một nghiên cứu so sánh LSTM–Transformer–SARIMAX cho thấy LSTM hai lớp/thiết lập phù hợp có thể rất mạnh ở dự báo ngắn hạn (một tuần), trong khi Transformer lại phát huy ở dự báo dài (6 tháng). citeturn24view0

**Kết luận thực nghiệm thường gặp**: độ sâu hữu ích khi (a) bài toán có đủ dữ liệu theo thời gian, (b) nhiều biến ngoại sinh và quan hệ phi tuyến phức tạp, (c) mục tiêu là đa bước và cần “phân tầng” đặc trưng; ngược lại, với dữ liệu hạn chế hoặc nhiễu lớn, LSTM nông + regularization thường ổn định hơn. citeturn22view0turn18view0

### BiLSTM trong ứng dụng khí tượng

BiLSTM (bidirectional) xử lý chuỗi theo cả hai hướng thời gian (quá khứ→tương lai và ngược lại), phù hợp khi: (i) bài toán là **ước lượng/hậu nghiệm** (smoothing) hoặc dự báo trong bối cảnh có thể dùng toàn bộ cửa sổ quan sát (không phải online strict), (ii) muốn khai thác cấu trúc đối xứng theo thời gian trong dữ liệu, hoặc (iii) mô hình hoá chuỗi “được trích xuất” từ video/ảnh khi toàn bộ đoạn đã có sẵn. citeturn27view0turn19view1 Dĩ nhiên, trong dự báo vận hành thời gian thực, dùng BiLSTM trực tiếp cho horizon tương lai có thể không thực tế nếu nó “nhìn thấy” tương lai của đầu vào; do đó BiLSTM thường xuất hiện trong: (a) mô hình học từ các chuỗi đã phân đoạn, (b) các pipeline hậu xử lý (bias correction), hoặc (c) bài toán dự báo “nội ngày” nơi cửa sổ đầu vào có thể trượt mà không cần tương lai của chính biến mục tiêu. citeturn19view0turn27view0

Một ví dụ khí tượng đặc trưng là dự báo mưa tháng ở Simtokha (Bhutan): nghiên cứu dùng LSTM, GRU, BLSTM… và đề xuất mô hình lai BLSTM–GRU. Dữ liệu gốc là chuỗi tham số khí tượng dạng ngày 1997–2017; phần 1997–2015 dùng huấn luyện, 2016–2017 kiểm thử. LSTM một tầng (1024 units) trong nhóm “vanilla” đạt MSE ≈ 0.013 và tương quan ≈ 0.90; mô hình BLSTM–GRU cải thiện lên MSE ≈ 0.0075 và hệ số tương quan ≈ 0.938. citeturn27view0

### LSTM với attention

Attention trong dự báo chuỗi thời gian thường xuất hiện theo hai cách: (1) **temporal attention**: chú ý lên các time steps trong cửa sổ đầu vào (độ trễ quan trọng), (2) **feature/variable attention**: chú ý lên biến đầu vào quan trọng theo thời gian. Cơ sở ý tưởng của attention là thay vì “nén” toàn bộ quá khứ vào một vector cố định, mô hình học trọng số mềm để “truy hồi” phần thông tin liên quan khi dự đoán. citeturn40search7

Trong khí tượng, attention thường được dùng để chống “regression to mean” khi dự báo hiện tượng cực đoan (mưa đối lưu mạnh, gió giật…), bằng cách giúp mô hình tập trung vào các tín hiệu tiền dẫn (precursors) hiếm. Ví dụ, một nghiên cứu dự báo mưa đối lưu mạnh dùng kiến trúc ResNet–Attention–BiLSTM (đầu vào radar theo chuỗi thời gian), trong đó ResNet trích đặc trưng và thành phần attention hỗ trợ tập trung vào mẫu liên quan; mục tiêu là giảm xu hướng “co về trung bình” khi dự báo cực đoan. citeturn37search18turn40search7

### Các công trình tiêu biểu dùng LSTM theo từng bài toán và đặc tính dữ liệu

**Dự báo nhiệt độ (temperature prediction)**  
Một nghiên cứu so sánh LSTM và Transformer trên bộ dữ liệu “Weather in Szeged 2006–2016” (Hungary) gồm 96.453 bản ghi giờ; đầu vào gồm nhiệt độ, độ ẩm, áp suất và biến thời gian. Thiết lập: chia 95% train/5% test (≈6 tháng cuối), dùng MAE/MSE/R² để đánh giá; kết luận chính: LSTM và SARIMAX bám xu hướng tốt ở ngắn hạn, trong khi Transformer cho dự báo dài hạn tốt hơn. citeturn24view0  
Một tuyến nghiên cứu khác tập trung vào “cấu hình thực hành” (input strategy + tuning) cho dự báo nhiệt độ đô thị bằng LSTM ở Hong Kong: thêm biến timestamp và chiến lược tuning có thể giảm RMSE >5% so với chỉ dùng chuỗi nhiệt độ, và tăng độ phức tạp LSTM không giúp thêm. citeturn22view0

**Dự báo mưa (rainfall prediction)**  
(1) Mưa tháng (Bhutan): mô hình BLSTM–GRU cải thiện đáng kể so với LSTM thuần, với RMSE ≈ 0.087 và ACC/“R-value” ~0.870 (theo báo cáo), trên dữ liệu 1997–2017. citeturn27view0  
(2) Hiệu chỉnh dự báo mưa từ mô hình số (bias correction): một nghiên cứu dùng LSTM để hiệu chỉnh dự báo mưa 12 giờ dựa trên dự báo ENS control ở khu vực (20–40°N, 110–130°E). Họ dùng 12 “tháng mùa lũ” (June–September cho các năm 2015–2017), tổng 287.973 mẫu; train 10 tháng (235.053), test 2 tháng (52.920). Thước đo gồm Threat Score (TS) và RMSE, cho thấy mô hình LSTM có thể cải thiện kỹ năng dự báo mưa ở bài toán hậu xử lý. citeturn9view0turn19view0

**Dự báo mây/độ che phủ mây (cloud cover forecasting)**  
Một công trình (IJCNN 2022) xây dựng chuỗi thời gian “Total Cloud Cover (TCC)” từ video ảnh vệ tinh: mỗi chuỗi có ~250 ảnh ban ngày; tổng 12.500 ảnh và 112.500 giá trị TCC (9 vùng). So sánh LSTM, BiLSTM, CNN–LSTM: BiLSTM cho test RMSE trung bình ≈ 0.0283 (NRMSE ≈ 0.0333); dự báo đa bước 125 bước (nửa ngày) đạt RMSE ≈ 0.0543, và 250 bước (cả ngày) đạt RMSE ≈ 0.0823. citeturn19view1turn19view0  
Ở hướng “mây như trường ảnh” (spatiotemporal), một nghiên cứu dùng dữ liệu mây từ vệ tinh GK2A (10 phút, 2 km) so sánh 3D-CNN, LSTM và ConvLSTM; họ ghi nhận ConvLSTM ổn định và tổng quát tốt hơn, trong khi transformer video dễ quá khớp khi dữ liệu nhỏ. citeturn18view0

**Dự báo “atmospheric seeing” (quang học khí quyển cho thiên văn)**  
Một bài toán sát khí tượng–thiên văn: ước lượng và dự báo seeing tại Dome A (Nam Cực) bằng dữ liệu khí tượng nhiều tầng (AWS) và đo DIMM. Công trình dùng LSTM để dự báo tham số khí tượng tương lai và Gaussian Process Regression để ánh xạ sang seeing. Dữ liệu: KLAWS-2G lấy mẫu 10 giây, tổng ~630.000 phép đo; KL-DIMM lấy mẫu mỗi phút, ~160.000 phép đo năm 2019; dữ liệu đồng bộ dùng cho train/test chỉ khoảng 1 tháng. Hiệu năng: RMSE ước lượng seeing ≈ 0.18 arcsec; dự báo trước 20 phút RMSE ≈ 0.12 arcsec (seeing 0–2.2 arcsec), giảm RMSE 37% so với persistence; thời gian suy luận <1 giây. Hạn chế: dữ liệu ngắn (1 tháng), chỉ một trạm nên thiếu thông tin không gian; hiệu năng giảm khi seeing dao động mạnh. citeturn44view0

## Transformer cho dự báo chuỗi thời gian khí tượng

### Nền tảng: self-attention và ưu điểm/điểm yếu so với hồi tiếp

Transformer thay recurrence bằng self-attention, cho phép mô hình hoá phụ thuộc dài với đường truyền thông tin “ngắn” (mọi vị trí có thể chú ý trực tiếp nhau) và huấn luyện song song hiệu quả hơn. citeturn40search2turn40search6 Tuy vậy, self-attention chuẩn có độ phức tạp bậc hai theo chiều dài chuỗi, khiến việc dự báo chuỗi dài (long-sequence) cần các biến thể tối ưu hoá hoặc thủ thuật biểu diễn. citeturn34search9turn42search2

Trong khí tượng, Transformer trở nên hấp dẫn khi cửa sổ lịch sử dài (mùa vụ dài), dữ liệu đa biến/thể tích lớn (reanalysis theo tầng), hoặc bài toán multi-horizon/multi-target. citeturn42search1turn33search1

### Temporal Fusion Transformer

TFT là kiến trúc lai “RNN + attention” cho multi-horizon forecasting: nó dùng tầng hồi tiếp để xử lý cục bộ, và self-attention “có thể diễn giải” để học phụ thuộc dài. Đồng thời, TFT có khối chọn biến (variable selection) và cơ chế gating để triệt phần không cần thiết, nhắm tới cả hiệu năng và interpretability trong bối cảnh có covariates tĩnh, covariates biết trước tương lai, và covariates chỉ biết trong quá khứ. citeturn42search0turn42search8  
Trong bài toán khí tượng, “known future inputs” có thể là đặc trưng lịch (giờ/ngày/năm), vị trí mặt trời, hoặc thậm chí là đầu ra NWP sẵn có cho các giờ tới (guidance), khiến TFT phù hợp về mặt mô hình hoá dữ liệu hỗn hợp. citeturn42search0turn22view0

### Informer, Autoformer, FEDformer: xử lý chuỗi dài

**Informer (2021)** đề xuất ProbSparse attention và cơ chế “distilling” để giảm chi phí, nhắm tới long sequence time-series forecasting; bài báo báo cáo cải thiện rõ trên các bộ dữ liệu chuỗi dài quy mô lớn. citeturn34search9  
**Autoformer (2021)** đưa decomposition (xu hướng + mùa vụ) “vào trong” block mạng và thay self-attention bằng Auto-Correlation để khai thác tính chu kỳ ở mức “sub-series”, tuyên bố cải thiện tương đối 38% trên 6 benchmark, trong đó có nhóm ứng dụng “weather”. citeturn42search5turn42search1  
**FEDformer (2022)** kết hợp decomposition với ý tưởng thưa trong miền tần số (Fourier) để đạt độ phức tạp tuyến tính theo chiều dài chuỗi; báo cáo giảm lỗi dự báo 14.8% (đa biến) và 22.6% (đơn biến) trên 6 benchmark. citeturn42search2turn42search14

Với khí tượng (đặc biệt chuỗi dài theo mùa/khí hậu), nhóm mô hình “decomposition + attention biến thể” thường hữu ích khi tín hiệu xu hướng/mùa vụ mạnh và horizon dài, nơi LSTM dễ suy giảm khi rollout nhiều bước. citeturn42search1turn34search9

### PatchTST và iTransformer: xu hướng biểu diễn mới cho dự báo đa biến

PatchTST (2023) theo hướng “patching” (biến chuỗi thành các đoạn/patche) để giảm độ dài hiệu dụng và học phụ thuộc dài tốt hơn, đồng thời dùng “channel independence” cho chuỗi đa biến—một thiết kế đặc biệt phù hợp khi số biến lớn và mỗi biến có động học riêng. citeturn34search20  
iTransformer (ICLR 2024) đảo chiều tokenization: thay vì coi *thời điểm* là token, iTransformer coi *biến (variate)* là token và nhúng toàn bộ lookback của mỗi biến vào biểu diễn, để attention tập trung học tương quan đa biến; công trình nhấn mạnh hiệu quả và tính “backbone” cho dự báo chuỗi thời gian. citeturn42search3turn42search7

### Khi nào Transformer thắng LSTM, và khi nào ngược lại?

Kết luận thực nghiệm (không tuyệt đối) thường theo “chế độ dữ liệu–horizon”:

- **Transformer thường vượt khi**: (i) horizon rất dài, (ii) chuỗi đầu vào dài, (iii) đa biến nhiều kênh, (iv) dữ liệu đủ lớn để học attention ổn định. Điều này phù hợp với các công trình long-sequence (Informer/Autoformer/FEDformer) vốn thiết kế riêng cho chuỗi dài và báo cáo cải thiện mạnh trên benchmark chuỗi dài. citeturn34search9turn42search5turn42search14  
- **LSTM thường mạnh khi**: (i) dữ liệu hạn chế, (ii) horizon ngắn–trung bình, (iii) cần mô hình nhẹ, (iv) tín hiệu chủ yếu mang tính “local dynamics”. Trong ví dụ nhiệt độ Hungary, báo cáo cho thấy LSTM nắm bắt tốt hơn ở ngắn hạn, còn Transformer tốt hơn ở dài hạn. citeturn24view0  
- **Rủi ro của Transformer trên dữ liệu nhỏ**: ở bài toán mây từ GK2A, transformer video cho training tốt nhưng dễ overfit, trong khi ConvLSTM tổng quát tốt hơn trên tập kiểm thử khi dữ liệu hạn chế. citeturn18view0

## Kiến trúc lai và mô hình hoá không–thời gian

### CNN–LSTM: trích đặc trưng + mô hình hoá thời gian

CNN–LSTM được hiểu rộng là dùng CNN (1D/2D/3D) để trích đặc trưng cục bộ (spatial hoặc local temporal patterns), rồi dùng LSTM để học tiến hoá theo thời gian. Trong dự báo TCC ở trên, CNN–LSTM là một baseline; tuy có cải thiện so với LSTM thuần ở một số cấu hình nhưng BiLSTM vẫn vượt trong báo cáo đó, nhấn mạnh rằng “lai” không mặc định tốt hơn nếu pipeline trích đặc trưng chưa thật phù hợp dữ liệu. citeturn19view0  
Trong nowcasting mưa, khung 3D-CNN + LSTM được dùng để trích đặc trưng không gian–thời gian ngắn hạn rồi học phụ thuộc thời gian, nhằm cải thiện độ chính xác và tính kịp thời ở dự báo ngắn hạn. citeturn39search13

### ConvLSTM: mở rộng LSTM cho trường spatiotemporal

ConvLSTM (2015) mở rộng FC-LSTM bằng cách thay phép nhân ma trận ở chuyển trạng thái bằng tích chập (convolution) cho cả input-to-state và state-to-state, trực tiếp mô hình hoá tương quan không–thời gian trong dữ liệu dạng lưới/ảnh (radar, vệ tinh). Bài báo gốc đặt bài toán nowcasting mưa như sequence forecasting không–thời gian và báo cáo ConvLSTM bắt tương quan không–thời gian tốt hơn FC-LSTM và vượt một thuật toán vận hành (ROVER) trong thực nghiệm. citeturn28search0turn28search1

Trong khí tượng, ConvLSTM thường được dùng cho: (i) dự báo phản hồi radar, (ii) nowcasting mưa, (iii) dự báo mây/đối lưu, và (iv) các bài toán ảnh vệ tinh theo chuỗi. citeturn28search0turn18view0

### ResNet–LSTM và biến thể đa tầng/đa thang

Một hướng phổ biến để giảm “mất chi tiết” và hiện tượng dự báo bị làm mượt là kết hợp residual learning (ResNet) với recurrent/attention. Ví dụ, mô hình ResNet–Attention–BiLSTM cho dự báo mưa đối lưu mạnh trên dữ liệu radar tận dụng ResNet để học phần dư (residual) của quan sát, nhằm giảm “regression to mean” và tăng nhạy với cực đoan. citeturn37search18  
Ở lớp “multi-scale”, nhiều kiến trúc dự báo không–thời gian dùng mô-đun kiểu Inception (nhiều kernel song song) để học chuyển động/biến dạng ở đa thang—thường đặt ở “translator” giữa encoder–decoder trong các mô hình video prediction/nowcasting; các survey/khung gần đây về nowcasting mô tả việc dùng translator có Inception modules để học chuyển động theo thời gian. citeturn39search14turn39search0

### GNN + mô hình thời gian cho mẫu hình không gian khí tượng

Khi dự báo liên quan mạng trạm hoặc lưới toàn cầu, cấu trúc đồ thị (graph) tự nhiên xuất hiện: nút là trạm/lưới, cạnh thể hiện lân cận/động lực truyền dẫn. Một tiền đề quan trọng là cách tiếp cận GNN cho dự báo thời tiết toàn cầu có thể học bước tiến 6 giờ của trạng thái khí quyển 3D và rollout nhiều ngày, huấn luyện trên ERA5 hoặc GFS. citeturn28search16  
Ở quy mô thành phố, mô hình đồ thị tận dụng tương tác không gian giữa trạm có thể cải thiện so với LSTM “thuần địa phương”; một nghiên cứu 2026 tại Hong Kong báo cáo mô hình đồ thị đạt RMSE thấp hơn baseline LSTM (ví dụ GSAGE 0.96 °C so với LSTM 1.06 °C cho dự báo 1–6 giờ). citeturn21search11  
Ở tuyến vận hành/hyperlocal, một hướng lai là dùng trường dự báo toàn cầu làm điều kiện biên động (dynamic boundary) cho mô hình quy mô thành phố—ví dụ một framework thành phố sử dụng trường từ GraphCast như điều kiện biên động để dự báo quy mô đô thị. citeturn28search6

## Mô hình nền tảng thời tiết và khí hậu giai đoạn 2023–2025

### Từ NWP truyền thống tới “Large Weather Models”

Mô hình dự báo số truyền thống (NWP) giải gần đúng hệ phương trình động lực học khí quyển (PDE) với điều kiện đầu và tham số hoá quá trình dưới lưới; chất lượng dự báo tăng cùng chi phí tính toán và độ phân giải. citeturn35view2turn45view0 Các mô hình AI thế hệ mới thay thế (một phần hoặc toàn bộ) bước giải số bằng mạng học sâu huấn luyện trên reanalysis/forecast archive đa thập kỷ, tạo dự báo nhanh hơn nhiều và đôi khi cạnh tranh/vượt các hệ thống vận hành trên nhiều chỉ tiêu. citeturn45view0turn35view1turn35view2

### Pangu-Weather

Pangu-Weather triển khai kiến trúc transformer “Earth-specific” (3DEST) với patch embedding và biểu diễn dạng “khối 3D”, dự báo quyết định (deterministic) trên lưới 0.25°×0.25°. Họ so sánh với IFS vận hành của entity["organization","European Centre for Medium-Range Weather Forecasts","weather forecast centre"] và FourCastNet, dùng RMSE/ACC; đồng thời đánh giá theo bài toán tracking xoáy thuận nhiệt đới (IBTrACS) và báo cáo lỗi vị trí trung bình 3 ngày/5 ngày nhỏ hơn ECMWF-HRES trong tập 88 bão năm 2018 (120.29 km và 195.65 km cho Pangu-Weather so với 162.28 km và 272.10 km). citeturn45view0  
Về tốc độ, Pangu-Weather được báo cáo nhanh hơn IFS >10.000 lần, cho phép ensemble lớn với chi phí thấp; tuy nhiên họ ghi nhận ensemble đơn giản (thêm nhiễu đầu vào) có thể kém hơn ở very short range nhưng hữu ích ở lead 5–7 ngày. citeturn45view0turn46search3  
Hạn chế chính được tác giả nêu: huấn luyện/đánh giá trên reanalysis (khác với vận hành dựa quan trắc/assimilation), chưa khảo sát biến như precipitation, dự báo AI có xu hướng mượt hơn gây nguy cơ “giảm biên độ cực đoan”, và có thể có bất nhất thời gian khi dùng nhiều mô hình lead khác nhau. citeturn45view0

### GraphCast

GraphCast dùng kiến trúc đồ thị để dự báo hàng trăm biến khí tượng toàn cầu tới 10 ngày ở 0.25°, với thời gian suy luận “dưới một phút”; báo cáo vượt hệ dự báo quyết định vận hành mạnh nhất trên ~90% của 1.380 mục tiêu kiểm định (biến × lead time). citeturn35view1turn29search3 Việc GraphCast dựa trên huấn luyện trực tiếp từ reanalysis làm nổi bật một khác biệt phương pháp: thay vì cải tiến solver vật lý, mô hình học thống kê động lực từ kho dữ liệu lịch sử lớn. citeturn35view1turn28news44

### GenCast

GenCast nhắm tới khoảng trống quan trọng của các mô hình ML quyết định: **bất định (uncertainty) và dự báo tổ hợp (ensemble)**. Bài báo Nature giới thiệu GenCast như mô hình dự báo xác suất, tạo ensemble dự báo 15 ngày toàn cầu (bước 12h, 0.25°) cho >80 biến, thời gian suy luận ~8 phút; báo cáo kỹ năng cao hơn ENS của ECMWF trên 97.2% của 1.320 targets và dự báo tốt hơn các hiện tượng cực đoan, quỹ đạo bão nhiệt đới, v.v. citeturn35view2 Các đoạn mô tả cũng nhấn mạnh lý do ensemble là thiết yếu trong khí tượng do tính phi tuyến khiến sai số điều kiện đầu phóng đại nhanh. citeturn35view2

### FourCastNet

FourCastNet (entity["company","NVIDIA Corporation","gpu company"] và cộng sự) là “Earth system emulator” dựa trên neural operator (Adaptive Fourier Neural Operators) nhằm tăng tốc dự báo thời tiết toàn cầu. Bài báo mô tả khả năng tạo dự báo medium-range nhanh hơn NWP tới bậc 10^5 và huấn luyện quy mô siêu máy tính (hàng nghìn GPU A100), đồng thời hỗ trợ ensemble lớn để nắm bắt cực đoan tốt hơn. citeturn46search1 FourCastNet cũng được dùng như baseline/đối chiếu trong các nghiên cứu khác (ví dụ Pangu-Weather) và được thảo luận như công cụ hỗ trợ ensemble/perturbation. citeturn45view0turn46search3

### ClimaX

ClimaX là foundation model theo hướng “pretrain self-supervised” trên dữ liệu khí hậu (CMIP6-derived) và fine-tune cho nhiều tác vụ: dự báo đa thang (multi-scale), climate projections, downscaling… Công trình nhấn mạnh việc một model tiền huấn luyện có thể fine-tune cho các biến/độ phân giải/vùng địa lý khác nhau, kể cả tình huống “chưa thấy trong tiền huấn luyện”. citeturn29search2turn29search9 Điều này tạo tiền đề quan trọng cho câu hỏi “fine-tune hyperlocal”: ClimaX về nguyên tắc hỗ trợ thích nghi theo tác vụ/vùng, nhưng vẫn phụ thuộc chất lượng và độ đại diện của dữ liệu fine-tune. citeturn29search2

### FuXi

FuXi là hệ thống ML phân tầng (cascaded) nhắm tới dự báo dài 15 ngày, độ phân giải 0.25°, bước thời gian 6 giờ; công trình nhấn mạnh tích luỹ sai số khi rollout dài khiến “một mô hình đơn” khó tối ưu đồng thời ngắn và dài hạn, do đó đề xuất cascade. FuXi được phát triển trên 39 năm ERA5 và đánh giá bằng RMSE/ACC có trọng số vĩ độ; báo cáo hiệu năng “tương đương ECMWF ensemble mean” ở dự báo 15 ngày. citeturn46search0turn46search4

### Aurora

Aurora mở rộng khái niệm foundation sang “Earth system” đa miền (khí tượng, sóng biển, chất lượng không khí…) với tiền huấn luyện trên >1 triệu giờ dữ liệu địa vật lý đa nguồn, sau đó fine-tune cho các tác vụ downstream; kiến trúc gồm encoder/decoder kiểu Perceiver và bộ xử lý (processor) là 3D Swin Transformer, tổng ~1.3B tham số. citeturn35view3 Aurora báo cáo vượt các hệ dự báo vận hành ở nhiều bài toán (ô nhiễm không khí, sóng biển, track bão, thời tiết độ phân giải 0.1°) với chi phí tính toán thấp hơn nhiều; đồng thời nhấn mạnh khả năng fine-tune “chi phí vừa phải” cho ứng dụng đa dạng. citeturn35view3

### Có thể fine-tune cho dự báo địa phương/hyperlocal không?

Về mặt nguyên lý, hai hướng fine-tune mạnh nhất hiện nay là:
1) **Foundation theo kiểu ClimaX/Aurora**: tiền huấn luyện tổng quát → tinh chỉnh theo vùng/biến/mục tiêu (có thể ở độ phân giải cao hơn hoặc bài toán chuyên biệt) với chi phí thấp hơn phát triển NWP mới. citeturn29search2turn35view3  
2) **Ghép tầng (global-to-local)**: dùng mô hình toàn cầu tạo trường nền/điều kiện biên, sau đó mô hình cục bộ (GNN/CNN/RCNN) học hiệu chỉnh/downscaling cho khu vực nhỏ. Ví dụ, một framework dự báo quy mô thành phố dùng trường GraphCast làm điều kiện biên động. citeturn28search6turn21search11

Những rào cản lớn khi đi tới hyperlocal gồm: (i) thiếu dữ liệu quan trắc dày theo không gian để fine-tune, (ii) cần mô hình hoá địa hình/đô thị/biển–đất tinh vi và phi tuyến mạnh, (iii) dịch chuyển phân phối do khí hậu biến đổi (training-on-past) và sai lệch do reanalysis vs observation (đặc biệt được nêu rõ trong Pangu-Weather). citeturn45view0turn35view3

## Học đa nhiệm trong dự báo thời tiết

### Dự báo đồng thời nhiều biến khí tượng

Các biến khí tượng có liên kết vật lý (T, q, gió, áp suất…), do đó **multi-task learning (MTL)** hấp dẫn: mô hình dùng backbone chung học biểu diễn động lực ẩn, rồi các “heads” dự báo từng biến. Trên quy mô toàn cầu, GraphCast công khai mục tiêu dự báo “hàng trăm biến” và đánh giá trên hàng nghìn targets, cho thấy MTL (multi-target) là cấu hình mặc định của các mô hình thời tiết lớn. citeturn35view1turn29search3

### Chia sẻ tham số: shared trunk vs task-specific heads

Thiết kế cơ bản là shared encoder/trunk và heads riêng. Một hướng tinh tế hơn là chia sẻ mềm bằng “cross-stitch units” (học tổ hợp tuyến tính giữa activation các nhánh), nhằm tối ưu mức chia sẻ và giảm negative transfer khi nhiệm vụ xung đột. citeturn31search5turn31search1 Ý tưởng này đặc biệt hợp khí tượng khi một số biến “liên kết chặt” (T–q–mây) nhưng một số khác có nhiễu/đặc tính riêng (mưa cực đoan) dễ làm hại nhiệm vụ khác nếu chia sẻ quá mạnh. citeturn45view0turn40search7

### Thiết kế hàm mất mát cho MTL khí tượng

Vấn đề trung tâm của MTL là **cân bằng loss** vì các nhiệm vụ khác đơn vị, thang đo, độ nhiễu và độ hiếm. Ba nhóm chiến lược có ảnh hưởng lớn:

- **Uncertainty weighting**: dùng “homoscedastic uncertainty” để suy ra trọng số loss tự động thay vì chỉnh tay; áp dụng được cho cả classification và regression. citeturn31search4turn31search0  
- **GradNorm**: cân bằng tốc độ học của các task bằng chuẩn hoá gradient, giảm overfit và cải thiện độ ổn định học đa nhiệm. citeturn31search2  
- **Dynamic Weight Average (DWA)**: điều chỉnh trọng số theo tốc độ thay đổi loss theo thời gian huấn luyện. citeturn31search3

Trong bối cảnh khí tượng, các chiến lược này hữu ích khi ghép nhiệm vụ “dày dữ liệu” (nhiệt độ, áp suất) với nhiệm vụ “thưa/cực đoan” (mưa lớn, gió giật), hoặc khi ghép trường phân loại (mưa/không mưa) với trường hồi quy (cường độ mưa). citeturn31search4turn35view2

### Công trình kết hợp phân loại và hồi quy trong cùng mô hình

Một ví dụ chất lượng cao là công trình trên Geophysical Research Letters đề xuất MTL để **đồng thời học phân loại mưa/không mưa và ước lượng lượng mưa** từ dữ liệu vi ba thụ động (passive microwave), thay cho pipeline hai giai đoạn; bài báo nêu rõ động cơ: hai nhiệm vụ bổ trợ nhau và MTL có thể cải thiện cả hai. citeturn30search1  
Trong miền mây, một công trình multi-task (cloud masking + cloud phase classification + COT regression) mô tả cách kết hợp classification và regression, thậm chí dùng cross-attention để khai thác tương hỗ giữa các nhiệm vụ. citeturn29search14turn30search4

### Cơ hội và hạn chế của MTL trong dự báo thời tiết

Cơ hội chính là tận dụng cấu trúc vật lý chung và giảm nhu cầu dữ liệu cho từng biến riêng lẻ; đây cũng là trực giác thường được dùng để biện minh cho hướng foundation/multi-variable forecasting trong khí tượng hiện đại. citeturn29search2turn35view3turn35view1 Hạn chế gồm: negative transfer (nhiệm vụ xung đột), mất cân bằng dữ liệu (rare extremes), và nguy cơ mô hình đánh đổi “mượt hoá” để tối ưu loss trung bình—hạn chế mà các mô hình AI thời tiết quy mô lớn cũng thừa nhận (ví dụ xu hướng dự báo mượt hơn và có thể đánh giá thấp cực đoan). citeturn45view0turn35view2