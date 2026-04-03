# Hệ thống dự báo thông minh cho vận hành đài quan sát thiên văn: tổng quan chuyên sâu (ESO, Rubin/LSST, TMT, ELT, đài nhỏ, SQM)

## Bối cảnh và khung phân loại hệ thống dự báo

Trong vận hành đài quan sát, “dự báo thông minh” thường không chỉ là dự báo thời tiết theo nghĩa khí tượng mà là một chuỗi năng lực liên kết: (i) thu thập đa nguồn dữ liệu (cảm biến tại chỗ, vệ tinh, mô hình NWP), (ii) biến đổi dữ liệu thành các tham số có ý nghĩa quan sát (mây/độ trong suốt, seeing, τ0, PWV…), (iii) dự báo theo nhiều chân trời thời gian (phút–giờ cho nowcasting; 1–7 ngày cho planning), và (iv) chuyển dự báo thành quyết định vận hành (mở/đóng mái, chọn dải lọc, ưu tiên OB/queue, bảo vệ bề mặt quang học). Kiến trúc “scheduler thích nghi theo điều kiện thời tiết/độ trong suốt” là một ví dụ điển hình: tài liệu của Rubin nhấn mạnh scheduler phải “tự động và thích nghi với điều kiện thời tiết” và trong vận hành thực, scheduler lấy telemetry thời tiết/điều kiện đài quan sát từ hệ thống điều khiển. citeturn14view2turn14view1

Về mặt tham số, kinh nghiệm ở các cơ sở lớn cho thấy các biến dẫn dắt quyết định quan sát thường gồm: mây/độ trong suốt (hoặc cloud extinction), seeing (FWHM_500 và “delivered seeing” sau khi tính airmass và hệ thống), PWV (đặc biệt cho IR), gió/độ rung, độ ẩm–điểm sương (an toàn), và độ sáng bầu trời (moon/twilight/sky brightness). Ở Paranal, chính các tham số như gió, seeing, τ0, ground-layer fraction, PWV được nêu rõ là tiêu chí để lọc và xếp hạng observing blocks. citeturn10view0turn12view0

Trong các phần dưới đây, với mỗi hệ thống/cụm hệ thống, tôi trình bày theo bốn trục mà bạn yêu cầu: **nguồn dữ liệu**, **phương pháp dự báo/tích hợp**, **độ chính xác được báo cáo**, và **trích dẫn đầy đủ (kèm DOI khi có)**.

## Hệ thống ESO cho vận hành và lập lịch quan sát

### ASM tại Paranal: dữ liệu tại chỗ và cách tham số hoá “điều kiện quan sát”

ASM tại Paranal được mô tả là một “suite” instrument để theo dõi liên tục điều kiện khí tượng và khí quyển, phục vụ **an toàn**, **kỹ thuật**, và **khoa học**; trong đó, vận hành khoa học dùng trực tiếp các tham số như gió, seeing, τ0, ground-layer fraction, PWV để lọc/xếp hạng OB. citeturn10view0turn12view0

Các nguồn dữ liệu chính (theo mô tả chính thức của ASM) gồm:  
- **DIMM** đo integrated seeing; seeing được chuẩn hoá về zenith và bước sóng 500 nm, và được ghi vào FITS header theo keywords TEL AMBI FWHM START/END. citeturn12view0  
- **MASS** ghép với DIMM để suy ra các chỉ tiêu như **θ0** và **τ0** theo thời gian thực và cung cấp free-atmosphere seeing; trang ASM cũng đưa thống kê ground-layer fraction dài hạn tại Paranal (~62%). citeturn12view0  
- **SLODAR** cung cấp profile nhiễu loạn lớp thấp tới ~1500 m, gọi rõ vai trò đối với các mode AO rộng trường. citeturn12view0  
- **Stereo-SCIDAR** dùng cho theo dõi dài hạn profile nhiễu loạn và profile gió theo độ cao (monthly, thường vào đêm trăng tròn), tới ~20 km. citeturn12view0  
- **LHATPRO radiometer** đo PWV qua kênh 183 GHz (H₂O) và dải O₂ 51–58 GHz, lấy profile nhiệt–ẩm tới ~12 km; kèm IR sensor đo “sky brightness temperature” và phân loại độ trong suốt (photometric/clear/cirrus mỏng/dày) dựa trên thống kê biến thiên IR trong cửa sổ 30 phút. citeturn12view0  
- **Trạm khí tượng** (nêu rõ hãng) với cảm biến gió/mưa/nhiệt/ẩm/áp, lắp ở nhiều độ cao (2–30 m) để phục vụ cả an toàn và hiệu chỉnh các đại lượng cần cho điều khiển (ví dụ khúc xạ khí quyển). citeturn12view0  
- **All-sky camera** (ALPACA) để theo dõi độ trong suốt ban đêm. citeturn12view0  

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Paranal Astronomical Site Monitor DIMM tower","Paranal MASS DIMM instrument","LHATPRO microwave radiometer observatory","all-sky camera observatory night sky"],"num_per_query":1}

### Công cụ dự báo khí tượng của ESO và tích hợp NWP

**Nguồn NWP và sản phẩm dự báo.** Trên trang “Meteorological Forecasts” cho các đài ở Chile (mô tả công khai mức tổng quan), ESO nêu rõ hệ thống dựa trên sản phẩm từ entity["organization","European Centre for Medium-Range Weather Forecasts","global nwp center"], cập nhật mỗi 6 giờ, với forecast ngắn hạn tới T+90 giờ (bước 1 giờ) và dài hạn tới T+168 giờ (bước 6 giờ). Trang này cũng mô tả cách “site-tailoring”: profile trên mỗi đài được tái tạo bằng **nội suy song tuyến (bilinear interpolation)** từ bốn điểm lưới gần nhất. citeturn5view0turn4view0

**Cách NWP đi vào vận hành.** Một bài viết của entity["organization","ECMWF","nwp centre eu"] (tác giả entity["people","Marc Sarazin","astronomer ESO"]) mô tả rất cụ thể các điểm “nối” giữa forecast và vận hành: ESO nhận forecast từ năm 1998; forecast nhiệt độ môi trường được dùng để tiền-làm lạnh khối kính/khối nhà vòm của entity["point_of_interest","Very Large Telescope","ESO, chile"] trước khi mở vòm; profile gió theo độ cao được dùng để dự đoán hiệu năng AO và hỗ trợ chọn chương trình quan sát phù hợp. citeturn1view0

**Forecast mây/hơi nước và ảnh vệ tinh.** Từ tài liệu nền (blue book) cho site characterization, ESO cho biết cloudiness được “routinely monitored and forecasted” tại entity["point_of_interest","La Silla Observatory","coquimbo, chile"] và Paranal từ 1999 bằng ảnh vệ tinh mỗi 3 giờ ở các kênh 10.7 µm và 6.7 µm; hit rate “satisfactory” nhưng có misses khi mây rất mỏng hoặc ngắn-lived. citeturn27view5

### ML/DL (đã thử nghiệm/định hướng triển khai) cho dự báo điều kiện quan sát

Ở ESO, phần “ML/DL” trong vận hành công khai thường xuất hiện nhiều dưới dạng **nghiên cứu thử nghiệm** hoặc “demonstrator” hơn là mô tả hệ thống production. Hai nhánh nổi bật có trích dẫn rõ ràng là:

**Nowcasting nhiễu loạn (ML) theo chân trời 1–2 giờ.** Bài “Nowcasting the turbulence at the Paranal Observatory” (entity["people","Julien Milli","astronomer"] và cộng sự) đặt bài toán rất “operations-driven”: đa số quan sát service mode ngắn hơn 2 giờ, seeing có thể thay đổi trong vài phút, và “hiện không có hệ thống dự báo OT dùng trong vận hành” để hỗ trợ night astronomer. citeturn36view2 Bài này mô tả pipeline ML dùng dữ liệu lịch sử từ ASM “kết hợp dữ liệu phụ trợ” trong khuôn khổ machine learning. citeturn36view2 Từ phần kỹ thuật, tác giả bàn về (i) hàm loss tối ưu theo mục tiêu vận hành (thay vì RMSE thuần), và (ii) mô hình **MLP** so với **LSTM** (RNN), trong đó LSTM cho lỗi dự báo nhỏ hơn ở nhiều khoảng seeing khi chuyển sang cách dự báo xác suất theo “seeing categories”. citeturn36view3 Bài cũng chỉ ra vai trò của dữ liệu “ancillary” từ dự báo NWP (ví dụ gió theo độ cao) để giải thích/bắt các “bursts” seeing và đề xuất hợp nhất NWP + mạng cảm biến không gian để cải thiện nowcast. citeturn36view3

**Dự báo OT bằng mesoscale model chuyên dụng (MOSE / Astro-Meso-NH).** Bài MNRAS “Optical turbulence forecast: ready for an operational application” (entity["people","Elena Masciadri","astrophysicist"] và cộng sự) tổng kết dự án MOSE: dùng mã **ASTRO-MESO-NH** để forecast các tham số liên quan OT (C_N², seeing ε, θ0, τ0), đối sánh với quan trắc trên một mẫu đêm lớn, và đánh giá bằng bias, RMSE, σ và các chỉ số từ contingency table như PC/POD; bài cũng nêu kế hoạch triển khai “demonstrator” vận hành tự động tại VLT và E-ELT. citeturn36view0

> **Lưu ý về “độ chính xác”:** Tài liệu trên xác nhận hệ chỉ số đánh giá (bias/RMSE/PC/POD) và kết luận “rất tốt” để tạo tác động tích cực lên service mode, nhưng các giá trị số chi tiết nằm trong các bảng/figure của bài báo; khi viết survey, bạn nên trích các bảng RMSE/bias theo từng tham số và theo threshold category từ bản PDF đầy đủ. citeturn36view0

### Tóm tắt theo yêu cầu (ESO)

| Thành phần | Nguồn dữ liệu | Phương pháp dự báo/tích hợp | Độ chính xác được báo cáo | Ghi chú triển khai / vận hành | Tài liệu then chốt |
|---|---|---|---|---|---|
| ASM (monitoring) | DIMM/MASS/SLODAR/Stereo‑SCIDAR; radiometer PWV+IR; met tower; all‑sky cam | Chủ yếu là **đo tại chỗ** và suy luận tham số (seeing, τ0, θ0, PWV, transparency) cho lọc/xếp hạng OB | Không phải “forecast”; độ chính xác phụ thuộc thiết bị, mô hình suy luận (ví dụ DIMM 500 nm/zenith) | Được mô tả là dữ liệu trực tiếp cho vận hành | citeturn10view0turn12view0 |
| Forecast khí tượng “site-tailored” | NWP từ ECMWF; sản phẩm nội bộ | Nội suy song tuyến từ lưới NWP để dựng profile trên đài; sử dụng forecast ngắn/dài hạn | Không công bố metric ở trang web; mô tả quy trình và dải thời hạn forecast | Dùng cho planning và hỗ trợ vận hành | citeturn5view0turn4view0 |
| Forecast hỗ trợ vận hành VLT | ECMWF forecast + nhu cầu vận hành (pre‑cooling, AO) | Dùng forecast nhiệt độ để set-point làm lạnh; dùng forecast gió theo độ cao để ước tính AO | Bài mô tả ứng dụng, không đưa RMSE | Mô tả như thực hành vận hành lâu năm | citeturn1view0 |
| ML nowcasting OT | Dữ liệu lịch sử ASM + dữ liệu phụ trợ (gợi ý NWP, multi-site) | MLP/LSTM; tối ưu loss theo mục tiêu vận hành; dự báo theo categories | Báo cáo xu hướng “LSTM tốt hơn MLP” trong nhiều khoảng; nêu seeing biến thiên RMS ~0.2″ ở 10% xấu nhất trên thang 5 phút | Nghiên cứu hướng vận hành, nhấn mạnh “hiện không có OT forecast dùng operations” | citeturn36view2turn36view3 |
| Forecast seeing/photometric quality bằng vệ tinh (ngữ cảnh Armazones) | MODIS + GOES13 | Thuật toán forecast ngắn hạn từ vệ tinh, phân tích tương quan giữa hai site lân cận | Thông tin chi tiết/metric nằm trong bài | Nghiên cứu theo hướng “site/operations forecast” | citeturn24search6 |

## Rubin Observatory và LSST scheduler: dữ liệu thời tiết và tham số khí quyển

### Cách “scheduler” gắn với dữ liệu thời tiết (telemetry) trong vận hành

Tài liệu vận hành mô tả Scheduler CSC thu thập telemetry từ EFD và 실행 thuật toán lập lịch; “weather data” được nêu như một loại “Feature” bên cạnh vị trí kính và lịch sử quan sát. citeturn14view1 Bộ tài liệu `rubin_scheduler` nhấn mạnh scheduler phải “fully automated and adaptable to weather conditions”, và trong mô phỏng thì `site_models` cung cấp “realistic weather telemetry” gồm seeing và lịch sử cloud cover. citeturn14view2turn16view2

Quan trọng với câu hỏi của bạn: phần mềm và tài liệu công khai cho thấy Rubin/LSST **dựa mạnh vào (a) telemetry thời tiết/điều kiện hiện tại và (b) dữ liệu lịch sử/mô phỏng**; cơ chế “dự báo mây trong tương lai” ở cấp code được thiết kế như chỗ cắm (hook) hơn là một pipeline forecast đã mô tả đầy đủ.

### Những tham số khí quyển nào đi vào scheduling?

Trong `rubin_scheduler.site_models`, các lớp và giao diện chỉ ra rõ các tham số “đi vào” điều kiện quan sát:

- **Cloud coverage / cloud map**: `CloudData` trả về “fraction of the sky that is cloudy” theo bậc 1/8 và mặc định đọc từ một cloud database (tên file mặc định được chỉ ra). citeturn19view0  
- **CloudModel**: hiện tại trả về cloud coverage từ database và nhân đều toàn bầu trời để tạo map; tài liệu code ghi rõ “đây là nơi sẽ cắm cloud transparency maps and predictions”. citeturn19view0turn19view1  
- **Seeing**: `SeeingData` trả về FWHM_500 cho mô phỏng; `SeeingModel` chuyển FWHM_500 thành delivered seeing (FWHM_eff/FWHM_geom) với scaling theo airmass và bước sóng, đồng thời cộng các đóng góp hệ thống (telescope/optical/camera) theo các công thức nêu rõ. citeturn19view0  

Ở cấp “thuật toán lập lịch tổng thể”, poster về Operations Simulator mô tả rõ vòng lặp cho điểm (scoring) và sau đó “modify scores according to observing conditions (e.g., seeing, airmass, and sky brightness)”; cloudiness và seeing trong mô phỏng lấy từ dữ liệu site ở Chile (seeing autocorrelation lấy từ ~4 năm DIMM Cerro Pachón; cloud record 10 năm từ Cerro Tololo, được mã hoá theo octants). citeturn23view0

Ngoài “science scheduling”, tài liệu vận hành về weather constraints (đặc biệt cho AuxTel) nhấn mạnh các biến an toàn như **wind**, **humidity/dew point difference**, và **cloud cover**; đồng thời hướng dẫn quan sát viên phải kiểm tra “forecast for the night” và xu hướng từ weather station (kể cả dùng trạm của entity["organization","Gemini Observatory","international observatory"] khi telemetry nội bộ chưa sẵn). citeturn14view0

### Dự báo thời tiết được dùng thế nào (và giới hạn công khai hiện có)

Ở mức tài liệu code, `CloudMap` có “extinction_forecast(mjd)” như “spot to put in projected cloud extinction in the future”. citeturn19view0 Đồng thời phần source code `CloudModel` ghi thẳng: hiện tại chỉ trả cloud coverage từ database, và “đây là nơi sẽ cắm” cloud transparency maps/predictions (tức dự báo mây/độ trong suốt). citeturn19view1

Từ góc độ mô phỏng survey strategy, RTN-022 (seeing values for strategy simulations) cho thấy việc mô hình hoá seeing trong simulation đã đi khá sâu theo time-series: dùng dữ liệu DIMM từ 2004, mô hình hoá thành phần mùa vụ và nhiễu ngắn hạn bằng AR(1) (cả cấp nightly residuals và cấp 5‑minute residuals), và chuyển đổi Kolmogorov → von Kármán theo công thức Tokovinin với outer scale giả định. citeturn21view0turn21view1turn21view2 Điều này giúp scheduler “phản ứng” hợp lý với biến động seeing trong mô phỏng, nhưng đó vẫn là **mô hình điều kiện**, không phải “forecast NWP theo thời gian thực”.

### Tóm tắt theo yêu cầu (Rubin/LSST scheduler)

| Thành phần | Nguồn dữ liệu | Phương pháp | Độ chính xác được báo cáo | Nhận xét | Tài liệu then chốt |
|---|---|---|---|---|---|
| Scheduler CSC (operations) | Telemetry từ EFD, gồm weather data | Feature‑Based Scheduler: features → basis functions → reward → chọn target | Không công bố “forecast accuracy” trong tài liệu vận hành | Hệ thống lấy telemetry và ra queue; dự báo mây được nhắc như “feature”/hook | citeturn14view1 |
| `site_models` (sim/ops interface) | Seeing & cloud (simulated DB; ops: EFD) | Đọc seeing/cloud; thêm hiệu ứng airmass/wavelength | Không phải bài báo accuracy; mô tả chức năng | Cầu nối quan trọng giữa dữ liệu điều kiện và scheduler | citeturn16view2turn19view0 |
| CloudModel/CloudMap | Cloud database (CTIO; 1/8 bầu trời) | Hiện tại trả cloud coverage; có hook cho cloud transparency maps/predictions; có placeholder extinction_forecast | Chưa có metric (vì placeholder) | Cho thấy dự báo mây là hướng tích hợp trực tiếp trong scheduler | citeturn19view1turn19view0 |
| Seeing model trong OpSim/opsim4 | DIMM Cerro Pachón + cloud CTIO | Autocorrelation seeing; time-series AR(1); cloud octants | Mục tiêu là “realistic telemetry”; không phải verification như NWP | Mấu chốt để đánh giá chiến lược survey và độ nhạy theo điều kiện | citeturn23view0turn21view1 |
| Weather constraints (an toàn) | Forecast đêm + weather station; cloud cameras | Quy tắc đóng/mở theo ngưỡng gió/ẩm/điểm sương/mây | Không báo cáo accuracy; là SOP | Thể hiện “forecast” được dùng ở mức quyết định vận hành (open/close) | citeturn14view0 |

## Phương pháp dự báo trong nghiên cứu chọn vị trí TMT và ELT

### TMT: kết hợp vệ tinh + tái phân tích khí hậu + đo tại chỗ

TMT Site Testing Final Report mô tả quy trình chọn candidate site bắt đầu từ danh sách toàn cầu, thu hẹp bằng tri thức site‑selection trước đó, rồi “final list” dựa trên **nghiên cứu vệ tinh về cloud cover và PWV** do entity["people","D. A. Erasmus","astronomer"] thực hiện. citeturn27view0turn27view2

Bảng tổng hợp trong report cung cấp (ở mức lựa chọn candidates) **clear/usable cloud fraction** và **median/10% PWV** cho 5 site chính. Ví dụ: Armazones “80%/86% cloud fraction” và PWV median/10% là “2.87/1.15 mm”; Mauna Kea 13N “69%/78%” và “1.86/0.72 mm”. citeturn27view1

Trong phần “Satellite Data Analysis”, report giải thích mô hình tích hợp dài hạn: satellite studies dùng để (i) pre‑select và (ii) đặt dữ liệu đo tại chỗ vào bối cảnh dài hạn; họ làm so sánh satellite vs ground (ASCA) để **verify** và đặt “upper limits” cho error bars; sau đó dùng **NCEP reanalysis** 28 năm để xem giai đoạn site testing có đại diện dài hạn hay không. citeturn27view2 Report cũng đưa số liệu đối chiếu: cloud cover từ satellite và ASCA “consistent… within <2%” cho Tolar/Armazones/San Pedro Mártir/Mauna Kea 13N, còn Tolonchar lệch ở mức ~6% (được diễn giải là do địa hình phức tạp hơn). citeturn27view2

Tài liệu tổng quan TMT site testing (arXiv) nêu rõ các nhóm tham số được đo/quan tâm tại site testing gồm: cloud cover fraction, photometric fraction, low/high‑elevation wind profile, nhiệt độ nhiều cao độ + soil temperature, humidity, PWV, và các chỉ tiêu nhiễu loạn (overall seeing, turbulence profiles, isoplanatic angle, turbulence time constant). citeturn27view4

### ELT: vệ tinh (mây) và mesoscale/NWP (nhiễu loạn) trong bối cảnh site characterization

Trong tài liệu site characterization (blue book), ESO mô tả cloudiness “routinely monitored and forecasted” tại La Silla và Paranal từ 1999 bằng ảnh vệ tinh 3‑hourly ở 10.7 và 6.7 µm; hit rate “satisfactory” nhưng có misses khi mây ngắn-lived hoặc cực mỏng—một chi tiết quan trọng khi bạn viết phần hạn chế/uncertainty của satellite‑based monitoring. citeturn27view5

Ở nhánh “forecast seeing/photometric quality cho site ELT”, một ví dụ tiêu biểu trong văn học là bài về “satellite‑based forecasts for seeing and photometric quality” tại site Armazones, dùng MODIS (Aqua) và GOES‑13. citeturn24search6 Cho survey paper, bài này đáng đặt cạnh các hướng “mesoscale turbulence forecast” (MOSE/Astro‑Meso‑NH) vì chúng đại diện hai “gia đình” dự báo khác nhau: **dựa vệ tinh (remote sensing + heuristic/algorithm)** và **dựa mô hình vật lý (mesoscale + mô hình OT)**.

### Tóm tắt theo yêu cầu (TMT & ELT)

| Bối cảnh | Nguồn dữ liệu | Phương pháp “dự báo/ước lượng” | Độ chính xác được báo cáo | Ghi chú | Tài liệu then chốt |
|---|---|---|---|---|---|
| TMT: pre‑selection candidates | Vệ tinh cloud cover + PWV (Erasmus) | Ước lượng dài hạn từ archive vệ tinh để chọn site | Bảng cloud fraction & PWV cho candidates | Đây là “climatological screening” hơn là forecast ngắn hạn | citeturn27view0turn27view1 |
| TMT: verification & representativeness | Vệ tinh + ground (ASCA) + NCEP reanalysis 28 năm | Cross‑validation; dùng reanalysis để đánh giá đại diện | Satellite vs ASCA cloud cover: <2% (một số site), ~6% (Tolonchar) | Là ví dụ hiếm có về “accuracy” vệ tinh được lượng hoá cho site testing | citeturn27view2 |
| TMT: list tham số đo/đánh giá | Instrument suite tại site + dữ liệu dài hạn | Đo trực tiếp; tổng hợp thống kê | Không phải forecast accuracy; là taxonomy tham số | Hữu ích để xây taxonomy cho survey | citeturn27view4 |
| ELT: cloud forecast tại ESO sites | Ảnh vệ tinh 3‑hourly 10.7/6.7 µm | Monitoring + forecast kinh nghiệm | Hit‑rate “satisfactory”, có misses khi mây mỏng/ngắn | Nhấn mạnh hạn chế quan sát “thin cirrus” | citeturn27view5 |
| ELT: forecast seeing/photometric quality (Armazones) | MODIS + GOES13 | Thuật toán dự báo ngắn hạn từ vệ tinh | Chi tiết trong bài báo | Đại diện hướng remote sensing | citeturn24search6 |

## Đài quan sát nhỏ và kính thiên văn robot: giải pháp thực dụng và chi phí thấp

### Thực tế vận hành ở quy mô nhỏ

Các đài nhỏ/robotic thường không có đội “meteo+forecasting” riêng, nên hệ dự báo vận hành thường có hai tầng:

1) **Tầng an toàn (hard constraints, fail‑safe):** đóng mái/park telescope khi mưa, mây dày/độ ẩm cao, gió mạnh, trời sáng…; ưu tiên hoạt động ngay cả khi máy điều khiển treo. Một ví dụ thương mại phổ biến (được dokument hoá rõ trong datasheet) là Boltwood Cloud Sensor: các sensor “primary” để quyết định safe/unsafe gồm cloud detection, rain detection, wind speed limits, daylight; có relay/contact closure để đóng mái khi phát hiện điều kiện xấu và có thể đặt ngưỡng thêm cho humidity/temperature. citeturn30search5  

2) **Tầng tối ưu hoá khoa học (soft constraints):** dùng cloud map/all‑sky cam để chọn vùng trời ít mây; dùng ước lượng seeing/transparency mục tiêu để ưu tiên chương trình; ở quy mô nhỏ, tầng này thường là heuristic hoặc mô hình đơn giản. Các tài liệu vận hành của Rubin cũng phản ánh “văn hoá vận hành” này: trước khi mở vòm phải kiểm tra forecast, xem xu hướng weather station, và quan sát cloud fronts (dù đây là đài lớn). citeturn14view0

### Các ví dụ “literature-documented” hữu ích cho survey paper

- **Robot observatory dùng cảm biến thời tiết để tự động hoá:** “The OAdM Robotic Observatory” mô tả việc dùng cảm biến để tăng an toàn và đòi hỏi một công cụ quản lý dữ liệu/cảnh báo (một mô típ quen thuộc của đài nhỏ tự động). citeturn30search2  

- **Thiết kế mở/chi phí thấp cho bảo vệ kính:** bài “Open‑Design for a Smart Cover of a Night‑Time Telescope…” mô tả rõ ràng một kiến trúc chi phí thấp: weather station dùng Arduino để theo dõi nhiệt/ẩm/gió/mưa (phục vụ quyết định an toàn), và all‑sky camera (đang/được xem xét) cho theo dõi bầu trời. citeturn30search13  

- **Robot telescope network và lựa chọn Boltwood:** một tài liệu mô tả thực hành ở “Baker Robotic Autonomous Telescope” nêu Boltwood như sensor “all‑in‑one” chứa humidity/wind/dew point/cloud detection/visual light/rain detection; kèm contacts để điều khiển dome trực tiếp cả khi computer gặp sự cố; và nhắc tới “open source drivers”. citeturn30search24  

- **All‑sky camera để dự báo rất ngắn hạn (nowcasting mây):** bài trên RASTI (2025) trình bày phương pháp detection–tracking–prediction mây ban đêm bằng all‑sky camera nhằm tăng hiệu quả và giảm rủi ro vận hành kính robot. citeturn13search11 Một bài tổng quan EPJ Web of Conferences cũng mô tả cách tạo “cloud map” từ all‑sky camera để dự đoán chuyển động mây. citeturn24search33  

- **Hạ tầng cảm biến rẻ cho logging:** một ví dụ ngoài thiên văn nhưng hay để trích trong survey (phần “low‑cost sensor stack”) là weather station nhúng đo liên tục nhiệt/ẩm/áp/gió (tốc độ + hướng) và truyền dữ liệu để ghi và hiển thị. citeturn30search21  

- **Phần mềm open‑source cho all‑sky camera:** `indi-allsky` là một dự án mã mở quản lý all‑sky camera theo framework INDI (gợi ý khả năng xây hệ “low‑cost monitoring” dựa trên phần mềm cộng đồng). citeturn30search18  

### Tóm tắt theo yêu cầu (đài nhỏ/robotic)

| Mẫu hệ thống | Nguồn dữ liệu | Phương pháp | Độ chính xác | Ghi chú | Tài liệu then chốt |
|---|---|---|---|---|---|
| Safety monitor (phổ biến) | Cloud/rain/wind/daylight + ngưỡng humidity/temp | Quy tắc ngưỡng + relay fail‑safe | Vendor spec (không phải bài báo) | Trụ cột “đóng mái an toàn” | citeturn30search5 |
| Robotic dome + sensor all‑in‑one | Bộ cảm biến (dew point, cloud, rain…) | Tự động đóng mái ngay cả khi PC lỗi | N/A | Ví dụ thực hành tại một robotic telescope | citeturn30search24 |
| Open design smart cover | Arduino weather station + (all‑sky cam) | Low‑cost monitoring + điều khiển cover | N/A | Tài liệu kỹ thuật có ích cho “60 cm‑class” | citeturn30search13 |
| All‑sky camera nowcasting | Ảnh all‑sky | Detect–track–predict mây | Metric tuỳ bài (không trích hết ở đây) | Nhánh “AI/vision” dễ chuyển giao cho đài nhỏ | citeturn13search11turn24search33 |
| Open-source all‑sky stack | INDI + camera | Quản lý/đẩy dữ liệu, tích hợp pipeline | N/A | Hướng “low‑cost + open” | citeturn30search18 |

## Vai trò của SQM trong vận hành và các mạng lưới theo dõi bầu trời tối

### SQM đo gì và vì sao liên quan trực tiếp tới vận hành?

SQM được thiết kế để đo **độ sáng bầu trời đêm** theo đơn vị **mag/arcsec²**, với mục tiêu định lượng chất lượng bầu trời (từ đài thiên văn tốt đến vùng ô nhiễm ánh sáng), hỗ trợ chọn đêm/site và theo dõi biến thiên theo thời gian. citeturn31search1 Trong bối cảnh vận hành, SQM hữu ích vì nó là cảm biến “một kênh” nhưng liên hệ với nhiều trạng thái quan sát: mây, trăng, phát sáng nền trời (skyglow), thậm chí (qua thuật toán) phân loại photometric vs non‑photometric.

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["Unihedron SQM-LE Sky Quality Meter outdoors","Sky Quality Meter device","TESS-W photometer STARS4ALL","Globe at Night sky brightness monitoring SQM"],"num_per_query":1}

### SQM cho “operational forecasting”: phát hiện mây ban đêm và suy ra điều kiện quang trắc

Một đóng góp rất sát với câu hỏi “forecasting vận hành” là bài của entity["people","Stefano Cavazzani","astronomer"] và cộng sự về dùng SQM để phân tích mây ban đêm và đối chiếu vệ tinh. Bài báo dùng SQM‑LE hướng thiên đỉnh với độ phân giải thời gian cao (3 phút ở La Silla; 5 phút ở Asiago/Ekar) và xây thuật toán suy ra cloud cover từ SQM, sau đó tương quan với dữ liệu từ GOES và AQUA (MODIS). citeturn34view0turn34view1

Các kết quả định lượng quan trọng (bạn có thể trích nguyên văn số liệu trong survey):  
- Tương quan giữa SQM‑based cloud detection và cloud cover từ vệ tinh đạt **97.2% tại La Silla** và **94.6% tại Asiago**. citeturn34view0  
- Thuật toán cũng phân loại photometric nights (PN) và spectroscopic nights (SN); ví dụ tại La Silla năm 2018: **59.1% PN**, **21.7% SN**, tổng “clear nights time” **80.8%**. citeturn34view0  
- Bài còn thảo luận bất định: nêu error/uncertainty tổng đêm cỡ ~5% tại La Silla và ~8% tại Asiago (trong khuôn khổ đối chiếu của bài). citeturn34view2  

### Quan hệ SQM–điều kiện quan sát: vì sao “cùng là mây” nhưng SQM có thể tăng/giảm?

Bài Cavazzani et al. chỉ ra một điểm vận hành rất thực tế: **mây có thể tác động “ngược dấu” lên độ sáng bầu trời tuỳ mức ô nhiễm ánh sáng nền**. Ở site ít bị ALAN, mây (đặc biệt khi có trăng) có thể lọc moonlight làm bầu trời tối hơn; ở site bị ALAN, mây làm tăng tán xạ skyglow khiến bầu trời sáng hơn và biến thiên lớn hơn. Bài mô tả định lượng ví dụ: tại La Silla, mây với full moon làm sky brightness “tối hơn” (magnitude tăng từ 15.0 lên 16.0), trong khi tại Asiago magnitude giảm từ 18.5 xuống 18.0 (bầu trời sáng hơn) và độ phân tán tăng. citeturn34view2

Trong “survey paper về operations”, điểm này nên được nối trực tiếp tới quyết định: **SQM không chỉ là “light pollution sensor” mà còn là proxy của transparency/cloudiness**, đặc biệt nếu có thuật toán tách đóng góp trăng/Dải Ngân hà và hiệu chỉnh theo chu kỳ Mặt Trăng như bài đề xuất. citeturn34view1turn34view2

### SQM trong các mạng lưới theo dõi ô nhiễm ánh sáng

**Globe at Night – Sky Brightness Monitoring Network.** Globe at Night mô tả GaN‑MN như một mạng đo độ sáng bầu trời toàn cầu dùng thiết bị thương mại SQM‑LE cho giám sát dài hạn. citeturn32search9turn31search6 (Bạn cũng có thể trích thêm các abstract ADS về GaN‑MN khi viết phần lịch sử dự án. citeturn32search3)

**TESS‑W / STARS4ALL (mạng cảm biến NSB chi phí thấp).** Trang tổng hợp của nhóm STARS4ALL mô tả TESS‑W là photometer chi phí thấp để đo NSB và hướng tới mạng trạm đo toàn cầu (TESS network). citeturn32search2 Bài “STARS4ALL Night Sky Brightness Photometer” mô tả chi tiết thiết bị: TESS‑W có dải đáp ứng mở rộng về đỏ so với SQM; kết nối Wi‑Fi và gửi dữ liệu tự động bằng giao thức IoT; và có **cảm biến hồng ngoại để ước lượng cloud coverage**—một cầu nối trực tiếp giữa “light pollution monitoring” và “operational sky condition monitoring”. citeturn32search17turn31search15

### Vấn đề hiệu chuẩn và độ ổn định dài hạn

Đối với vận hành và forecasting dài hạn, hiệu chuẩn/ổn định là bắt buộc:  
- Bará et al. (Sensors 2019) mô tả hiệu chuẩn tuyệt đối (radiometric calibration) cho cả TESS‑W và SQM dựa trên mô hình quang học và xác định độ nhạy phổ + hằng số chuyển đổi của chip irradiance‑to‑frequency. citeturn32search11turn31search23  
- Sánchez de Miguel et al. (MNRAS 2017) nhấn mạnh SQM có đáp ứng phổ rộng nên tương tác phức tạp với phổ bầu trời, đặc biệt khi phổ chiếu sáng nhân tạo thay đổi (LED), gây hệ quả cho diễn giải dữ liệu SQM. citeturn31search12  
- Fiorentin et al. (Sensors 2025) bàn về ageing và ảnh hưởng điều kiện khí quyển tới SQM, nhấn mạnh ổn định đo là vấn đề trung tâm cho NSB monitoring dài hạn. citeturn31search8  

### Tóm tắt theo yêu cầu (SQM)

| Ứng dụng SQM | Nguồn dữ liệu | Phương pháp | Độ chính xác được báo cáo | Ý nghĩa vận hành | Tài liệu then chốt |
|---|---|---|---|---|---|
| Cloud detection/forecast proxy | SQM‑LE time series + vệ tinh (GOES/AQUA) | Thuật toán suy ra cloud cover từ SQM; đối chiếu vệ tinh | Correlation 97.2% (La Silla), 94.6% (Asiago); có ước lượng uncertainty | Có thể dùng để phân loại PN/SN và quyết định ưu tiên chương trình photometric | citeturn34view0turn34view2 |
| Hiểu mây–sky brightness | SQM time series | Phân tích dấu/tác động của mây (dark vs bright site) | Ví dụ magnitude thay đổi khác dấu giữa site | Cảnh báo rủi ro diễn giải “mây = tối hơn” một cách máy móc | citeturn34view2 |
| Monitoring network (GaN‑MN) | SQM‑LE nhiều site | Chuẩn hoá đo, giám sát dài hạn | — | Dữ liệu nền cho quy hoạch/vệ tinh/đánh giá | citeturn32search9turn31search6 |
| TESS‑W network | TESS‑W IoT photometer (+IR cloud proxy) | Gửi dữ liệu tự động; IR ước lượng cloud | — | Mạng chi phí thấp, phù hợp đài nhỏ | citeturn32search17turn32search2turn31search15 |
| Calibration & stability | SQM/TESS‑W + mô hình quang học | Hiệu chuẩn tuyệt đối; phân tích đáp ứng phổ/aging | — | Bắt buộc nếu dùng SQM cho forecasting dài hạn | citeturn32search11turn31search12turn31search8 |

## Tổng hợp so sánh, khoảng trống nghiên cứu, và thư mục tài liệu

### Mẫu kiến trúc chung và khác biệt giữa các hệ thống

Một cách nhìn “hệ thống” tiện cho survey paper là xem mỗi cơ sở như một tổ hợp ba lớp:

- **Lớp sensing/monitoring:** ESO nhấn mạnh ASM là nền tảng, đo trực tiếp seeing/τ0/PWV/transparency để lọc–xếp hạng OB. citeturn10view0turn12view0 Rubin cũng dựa vào telemetry (EFD) như đầu vào. citeturn14view1turn14view2  

- **Lớp dự báo (forecast layer):**  
  - ESO có forecast khí tượng site‑tailored dựa ECMWF. citeturn5view0turn1view0  
  - MOSE/Astro‑Meso‑NH đại diện “forecast OT bằng mesoscale physics model” và định hướng triển khai demonstrator. citeturn36view0  
  - Rubin/LSST công khai mạnh ở mô phỏng “weather/seeing model” (AR1 + autocorrelation) để đánh giá chiến lược survey; và ở mức code có hook cắm cloud predictions. citeturn21view1turn19view1turn23view0  
  - TMT site testing là ví dụ điển hình của “climatological forecasting/estimation” bằng vệ tinh + reanalysis, có kiểm chứng định lượng. citeturn27view2turn27view1  

- **Lớp quyết định (decision layer):** scheduler (Rubin) và queue/service‑mode ranking (ESO) là hình thái rõ nhất; điểm quan trọng là cả hai đều biến input “thời tiết/khí quyển” thành “reward/priority” hoặc “lọc/xếp hạng” theo mục tiêu khoa học và an toàn. citeturn14view1turn23view0turn10view0

### Khoảng trống nghiên cứu bạn có thể nhấn mạnh trong survey

1) **Chuẩn hoá “accuracy” theo đúng ngữ cảnh vận hành.** Bài nowcasting ở Paranal cho thấy RMSE thuần có thể không phản ánh cost vận hành (sai số ở seeing tốt gây mất thời gian lớn hơn sai số ở seeing xấu), do đó cần metric theo category hoặc decision‑theoretic loss. citeturn36view3

2) **Tích hợp đa nguồn thật sự (fusion) thay vì song song.** Nhiều mô tả public là “forecast xem để planning” và “sensor xem để quyết định”, nhưng hợp nhất tối ưu (NWP + sensor + cam + vệ tinh) thành xác suất điều kiện theo không‑thời gian vẫn là bài toán mở; Rubin scheduler thậm chí để sẵn hook “plug in predictions” và “extinction_forecast” nhưng chưa mô tả pipeline forecast cụ thể. citeturn19view1turn19view0

3) **Thin cirrus / transparency estimation vẫn khó.** ESO tài liệu nền thừa nhận satellite method có misses khi mây mỏng hoặc ngắn-lived. citeturn27view5 Điều này liên hệ trực tiếp với nhu cầu cảm biến IR (như radiometer/IR sky temp) hoặc camera‑based estimation theo sao.

4) **Thiếu bộ dữ liệu mở “scheduler‑ready” cho mây/độ trong suốt ban đêm.** Một hướng mới là phát hành dataset all‑sky cloud có mask và sản phẩm map sẵn sàng cho scheduler/alt‑az; các kết quả dạng này đang xuất hiện gần đây trong cộng đồng (ví dụ các công bố all‑sky cloud dataset). citeturn13search6turn18search15

### Thư mục tài liệu then chốt (trích dẫn đầy đủ để bạn đưa vào survey)

Dưới đây là các tài liệu “xương sống” theo từng mảng mà bạn có thể đưa thẳng vào phần References (định dạng gần APA/IEEE; bạn có thể chỉnh theo style của journal):

European Southern Observatory. *Paranal ASM Website / ASM Instruments* (trang mô tả DIMM, MASS, SLODAR, Stereo‑SCIDAR, radiometer PWV/IR, weather stations, all‑sky camera). Cập nhật hiển thị trên trang; truy cập 23‑03‑2026. citeturn12view0turn10view0  

European Southern Observatory. *Meteorological Forecasts* (mô tả forecast ngắn hạn T+90h, dài hạn T+168h; nội suy song tuyến từ lưới ECMWF; cập nhật 6‑hourly). Truy cập 23‑03‑2026. citeturn5view0  

Sarazin, M. (2015). *How forecasts help astronomers peer deep into space.* ECMWF Media Centre. citeturn1view0  

Navarrete, J. et al. (2011). *The VLT dealing with the atmosphere: present and future.* (ESO internal-facing technical paper / proceedings PDF). citeturn0search32  

Milli, J., et al. (2019). *Nowcasting the turbulence at the Paranal Observatory.* AO4ELT6 Proceedings. (ML nowcasting; thảo luận MLP vs LSTM; loss theo vận hành; đề xuất fusion với NWP và cảm biến không gian). citeturn36view2turn36view3  

Masciadri, E., Lascaux, F., Turchi, A., & Fini, L. (2017). *Optical turbulence forecast: ready for an operational application.* *Monthly Notices of the Royal Astronomical Society*, 466, 520–539. DOI: 10.1093/mnras/stw3111. citeturn36view0  

Rubin Observatory Operations Documentation. *Scheduler Operational Procedures* (Scheduler CSC; telemetry từ EFD; weather data như feature). citeturn14view1  

Rubin Observatory Operations Documentation. *Weather Constraints* (wind/humidity/dew point/cloud cover; yêu cầu kiểm tra forecast). citeturn14view0  

`rubin_scheduler` Documentation. *Introduction; Site Models; Site Models API; CloudModel source* (seeing/cloud inputs; hook cho cloud transparency predictions; công thức seeing theo airmass/wavelength). citeturn14view2turn16view2turn19view0turn19view1  

Neilsen, E. (2023). *Seeing values for LSST strategy simulations (RTN‑022).* (AR(1) models; seasonal + short‑timescale; mô hình hoá seeing cho opsim). citeturn21view0turn21view1turn21view2  

Krabbendam, V. et al. (2010). *LSST Operations Simulator* (poster; seeing model từ DIMM Cerro Pachón; cloud record Cerro Tololo; gợi ý look‑ahead/forecasting pending weather). citeturn23view0  

TMT Project. (2008). *TMT Site Testing Final Report* (pre‑selection bằng vệ tinh cloud/PWV; verification với ground; NCEP reanalysis; định lượng sai khác cloud cover). citeturn27view0turn27view1turn27view2  

Schöck, M. et al. (2009). *TMT site testing and selection basics* (arXiv:0904.1183; taxonomy tham số site testing). citeturn27view3turn27view4  

ESO. (Blue Book). *Site Characterisation* (cloudiness monitoring/forecast bằng kênh vệ tinh 10.7/6.7 µm; hit rate và misses). citeturn27view5  

Cedazo, R., et al. (2021). *Open‑Design for a Smart Cover of a Night‑Time Telescope for Education.* (mô tả weather station Arduino + all‑sky camera). citeturn30search13  

Hicks, L. L. (n.d./conference PDF). *The Baker Observatory Robotic Autonomous Telescope* (Boltwood sensor: humidity/wind/dew point/cloud/light/rain; dome contacts; open-source drivers). citeturn30search24  

Diffraction Limited. (2024). *Boltwood Cloud Sensor III – Data Sheet* (sensor set và relay closure). citeturn30search5  

Cavazzani, S., Ortolani, S., Bertolo, A., Binotto, R., Fiorentin, P., Carraro, G., Saviane, I., & Zitelli, V. (2020). *Sky Quality Meter and satellite correlation for the night cloud cover analysis at astronomical sites.* arXiv:2004.03918; (cũng liên kết bản MNRAS). citeturn34view0turn34view2  

Unihedron. *Sky Quality Meter – L* (mô tả đơn vị đo mag/arcsec² và ứng dụng). citeturn31search1  

Globe at Night. *Sky Brightness Monitoring Network (GaN‑MN)* (mạng đo NSB dùng SQM‑LE). citeturn32search9turn31search6  

Zamorano, J., et al. (2016). *STARS4ALL Night Sky Brightness Photometer* (TESS‑W; Wi‑Fi/IoT; IR cloud proxy). citeturn32search17turn31search15  

Bará, S., Tapia, C. E., & Zamorano, J. (2019). *Absolute Radiometric Calibration of TESS‑W and SQM Night Sky Brightness Sensors.* *Sensors*, 19(6), 1336. citeturn32search11turn31search23  

Sánchez de Miguel, A., et al. (2017). *Sky Quality Meter measurements in a colour‑changing world.* *Monthly Notices of the Royal Astronomical Society*, 467(3), 2966–2979. citeturn31search12  

Fiorentin, P., et al. (2025). *SQM Ageing and Atmospheric Conditions: How Do They…* *Sensors*, 25(2), 516. citeturn31search8