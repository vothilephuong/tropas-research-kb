# TROPAS — Dataset Evaluation & Benchmarking Framework
**Tropical Observatory Atmospheric Prediction System — Quy Nhon Observatory**  
*Rigorous comparison of observatory weather datasets for forecasting research and data publication*

---

## 1. DATA QUALITY METRICS

### 1.1 Completeness C(v)

Per-variable ratio of valid observations to expected observations over the full archive window. Report overall mean and per-variable breakdown. Sentinel variables: rain gauge và barometer thường có completeness thấp nhất ở trạm nhiệt đới do sensor bị bám bẩn và sét đánh.

```
C(v) = valid_obs(v) / expected_obs(v) × 100%
```

| Score | Threshold |
|-------|-----------|
| Poor | < 90% |
| Acceptable | 90 – 98% |
| Good | ≥ 99% |

---

### 1.2 Temporal Coverage & Continuity Index (CI)

Archive duration in years, plus Continuity Index: ratio of longest contiguous block to total span. Flag any gap > 24 h as a named interruption. Phân biệt nguyên nhân: sensor failure / power outage / network loss / scheduled maintenance.

```
CI = max_contiguous_days / total_span_days
```

| Score | Threshold |
|-------|-----------|
| Poor | < 1 year |
| Acceptable | 1–3 yr, CI > 0.90 |
| Good | ≥ 3 yr + CI > 0.95 |

---

### 1.3 Sampling Rate Consistency

Expected interval (e.g., 1 min) vs. actual median. Coefficient of Variation (CV) of inter-arrival times across the full record. Flag double-sampled timestamps and missed steps separately.

```
CV(Δt) = std(Δt) / mean(Δt)
```

| Score | Threshold |
|-------|-----------|
| Poor | CV > 0.05 |
| Acceptable | 0.01 – 0.05 |
| Good | CV < 0.01 |

---

### 1.4 Sensor Accuracy & Calibration

Document: manufacturer accuracy spec, calibration frequency, traceable standard (WMO CIMO Guide / BIPM), inter-comparison results nếu có. Assign one of three tiers. Đính kèm calibration certificates làm supplementary material trong data paper.

```
Tier: Research-grade > Operational > Consumer-grade
```

| Score | Threshold |
|-------|-----------|
| Poor | No calibration record |
| Acceptable | Annual calibration |
| Good | ≤ 6-month + WMO-traceable |

---

### 1.5 Data Latency

Time from physical measurement to persistent storage. Report từng stage: sensor→logger, logger→database, database→public archive. Đối với TROPAS (NWP validation use case), archive latency ảnh hưởng trực tiếp đến khả năng đánh giá real-time vs. near-real-time.

```
L = t_stored − t_measured  (seconds)
```

| Score | Threshold |
|-------|-----------|
| Poor | > 1 hour |
| Acceptable | 1–10 min |
| Good | < 60 sec |

---

### 1.6 System Uptime / Availability

System-level metric: % of scheduled observation windows where at least one valid reading was recorded. Phân biệt với per-variable completeness (về nội dung dữ liệu); chỉ số này đo độ ổn định hạ tầng sensor network.

```
U = windows_with_data / scheduled_windows × 100%
```

| Score | Threshold |
|-------|-----------|
| Poor | < 95% |
| Acceptable | 95 – 99% |
| Good | ≥ 99.5% |

---

### QC Flag Scheme (recommended)

Adopt 5-level flags per CMEMS/Copernicus standard:

| Flag | Meaning |
|------|---------|
| 0 | No QC applied |
| 1 | Good data |
| 2 | Probably good |
| 3 | Probably bad |
| 4 | Bad / spike / outlier |

Implement automated checks: range test (physical limits), spike detection (3σ rolling window), climatological bounds (monthly P5–P95), step test (max Δ between consecutive readings). Store flags in a parallel column (e.g., `T_flag` alongside `T`) rather than filtering the original data.

---

## 2. DATA RICHNESS METRICS

### 2.1 Variable Count by Tier

Classify all variables into three tiers:
- **Tier 1 — Core meteorological:** T, RH, P, WS, WD, precipitation
- **Tier 2 — Astronomy-specific:** SQM, Seeing (FWHM), PWV, Scintillation index, Sky temperature, Transparency
- **Tier 3 — Derived/calculated:** Dew point, VPD, wet-bulb T, photometric night flag, cloud fraction proxy, K-index, etc.

Count each tier separately for fair cross-dataset comparison.

| Score | Threshold |
|-------|-----------|
| Poor | < 6 total variables |
| Acceptable | 6–12 variables |
| Good | ≥ 13 incl. astronomy-specific |

---

### 2.2 Astronomy-Specific Parameters

High-value variables that fundamentally distinguish observatory datasets from generic meteorological stations. Sự có mặt của bất kỳ biến nào trong số này sẽ nâng đáng kể giá trị novelty và khả năng publication.

Key parameters: **SQM · Seeing FWHM · PWV · Scintillation index · Sky temperature · Atmospheric transparency**

> **Note:** PWV đặc biệt quan trọng cho submillimeter và infrared astronomy; seeing cho optical/NIR.

| Score | Threshold |
|-------|-----------|
| Poor | None |
| Acceptable | 1–2 parameters |
| Good | ≥ 3 parameters |

---

### 2.3 Derived / Engineered Features

Document computation formula for each derived variable:

| Variable | Formula / Method |
|----------|-----------------|
| Dew point | Magnus formula |
| Vapor Pressure Deficit (VPD) | VPD = e_s(T) − e_a |
| Wet-bulb temperature | Psychrometric equation |
| Photometric night flag | No precip + RH < 70% + WS < 15 m/s + cloud proxy |
| Cloud fraction proxy | IR sky-T deviation from clear-sky model |
| K-index | K = T850 − T500 + Td850 − (T700 − Td700) |

---

### 2.4 Spatial Coverage

| Score | Description |
|-------|-------------|
| Poor | 1 point, 1 sensor per variable |
| Acceptable | Multi-height sensors or 2 co-located points |
| Good | Sensor network or documented satellite co-location |

---

### 2.5 Multi-Source Integration

| Score | Description |
|-------|-------------|
| Poor | In-situ sensors only |
| Acceptable | + satellite retrievals OR NWP reanalysis |
| Good | All three sources: in-situ + satellite + NWP |

---

### 2.6 Temporal Resolution Options

Số lượng aggregation levels published cho người dùng:

| Level | Example |
|-------|---------|
| Raw | 1-minute |
| Sub-hourly | 10-minute |
| Hourly | 60-minute means |
| Daily | 24-hour climatology |
| Monthly | Monthly climatology |

---

## 3. DATA REPRESENTATIVENESS

### 3.1 Climate Zone Coverage (Köppen-Geiger)

Classify using Beck et al. (2018) updated map. **Quy Nhon = Aw (Tropical savanna)** — rare in observatory site characterization literature.

| Published site | Köppen zone | Elevation |
|---------------|-------------|-----------|
| Paranal (ESO) | BWk — Cold desert | 2635 m |
| Mauna Kea | Cfb/Dfb — Oceanic | 4205 m |
| La Palma (ORM) | BSk — Cold semi-arid | 2396 m |
| Sutherland (SAAO) | BSk — Cold semi-arid | 1798 m |
| **Quy Nhon (TROPAS)** | **Aw — Tropical savanna** | **~10 m** |

> **Novelty argument:** Tropical astronomy sites are genuinely understudied. TROPAS sẽ là dataset đầu tiên thuộc loại này từ Đông Nam Á — đây là luận điểm novelty mạnh nhất cho bài data paper.

---

### 3.2 Seasonal Coverage

- Yêu cầu tối thiểu: ≥ 2 complete annual cycles for a credible data paper
- Tính monthly means ± σ cho tất cả key variables
- Flag bất kỳ calendar month nào có completeness < 80% như một caveat
- Với tropical sites: báo cáo **dry season (Nov–Mar)** và **wet/monsoon season (May–Oct)** riêng biệt, ngoài các grouping DJF/MAM/JJA/SON tiêu chuẩn
- Document monsoon onset và withdrawal dates từ chính record

---

### 3.3 Extreme Event Coverage

Inventory systematic:

| Event type | Cross-reference dataset | Threshold |
|------------|------------------------|-----------|
| Typhoon / tropical storm passages | IBTrACS (proximity ≤ 500 km) | Tropical storm intensity or above |
| Heavy precipitation | GPCC | ≥ 50 mm/day |
| Drought periods | SPI index | SPI ≤ −1.0 for ≥ 3 months |

> **Important:** Việc sensors **sống sót và ghi nhận được qua** các extreme events là một *tài sản chất lượng dữ liệu*, không phải nhược điểm. Đưa case studies của 1–2 sự kiện đáng chú ý vào supplementary figures trong data paper.

---

### 3.4 Day / Night Balance

Với astronomy applications, xác minh:
- Không có systematic night-hour data loss do power cycling hoặc comms issues
- Astronomical twilight periods (civil / nautical / astronomical) được phân loại và included
- Seeing và SQM data được thu thập qua all lunar phases
- Không có sensor saturation trong full-moon nights

**Report:** % of civil night hours with valid seeing/SQM data. Reference benchmarks: Paranal ~70%, Mauna Kea ~70%, La Palma ~72%.

---

### 3.5 Photometric Night Fraction

**Định nghĩa photometric night:**
```
No precipitation AND RH < 70% AND cloud-cover proxy < threshold AND WS < 15 m/s
```

Nếu không có cloud sensor: dùng IR sky temperature deviation from clear-sky model (Berdja & Irbah 2007 method).

| Site | Photometric night fraction |
|------|--------------------------|
| ESO Paranal | ~65–70% |
| Mauna Kea | ~55–65% |
| La Palma (ORM) | ~70% |
| OHP (France) | ~55% |
| Sutherland (SAAO) | ~58–62% |
| **TROPAS (estimate)** | **~40–55%** |

Report monthly and annual fractions. Provide a sky condition calendar (heatmap by month × hour) as a figure.

---

## 4. BENCHMARKING METHODOLOGY

### 4.1 Common Variable Subset Protocol

Trước bất kỳ cross-dataset comparison nào, xác định intersection set of variables available in ALL datasets at comparable quality:

**Minimum common subset:** T, RH, P, WS, WD

- Chạy tất cả primary models trên intersection này
- Chạy extended variable models trên full variable set từng dataset và báo cáo riêng
- Label rõ kết quả nào là "comparable across datasets" vs. "dataset-specific"

---

### 4.2 Temporal Resolution Harmonization

- Downsample tất cả datasets về coarsest common resolution (thường là hourly)
- **Không được upsample** lower-resolution datasets — điều này tạo ra artificial autocorrelation và inflate tất cả performance metrics
- Report TROPAS-native-resolution results riêng như một additional contribution

---

### 4.3 Evaluation Window Normalization

- Dùng **identical-length held-out test windows** across datasets
- Recommended: last **365 consecutive days** of each archive
- Report skill scores relative to persistence baseline computed on **that same window**
- Điều này loại bỏ climate variability confounding (site có lower natural variability sẽ luôn có lower raw RMSE)

---

### 4.4 Skill Score Normalization

**Dùng Skill Score thay vì raw RMSE:**

```
SS = 1 − MAE_model / MAE_persistence
```

| SS value | Interpretation |
|----------|---------------|
| SS = 1.0 | Perfect forecast |
| SS = 0.0 | No better than persistence |
| SS < 0.0 | Worse than persistence |

Cũng report **Continuous Ranked Probability Score (CRPS)** cho probabilistic forecasts. Cả hai đều dimensionless và genuinely comparable across sites.

---

### 4.5 Mandatory Baseline Model Suite

Chạy tất cả 6 baselines trên TẤT CẢ datasets:

| # | Model | Notes |
|---|-------|-------|
| 1 | **Persistence (lag-1)** | Simplest possible baseline |
| 2 | **Climatological mean** | Monthly average |
| 3 | **AR(1)** | Linear autoregression |
| 4 | **ARIMA** | Classic time series |
| 5 | **XGBoost / LightGBM** | Best non-deep tabular baseline |
| 6 | **LSTM** | Minimum deep learning baseline |

> Báo cáo cả 6 trên tất cả datasets. Điều này ngăn chặn việc cherry-pick model class phù hợp riêng với một dataset cụ thể.

---

### 4.6 Train / Validation / Test Splits

**Quy tắc bắt buộc cho time series:**

```
Chronological (non-shuffled) splits only
Recommended: 60% train / 20% val / 20% test (by time order)
```

Với multi-year archives, **year-based blocking** rõ ràng hơn:
- **Test:** final full calendar year
- **Val:** penultimate year  
- **Train:** all prior years

> ⚠️ **KHÔNG BAO GIỜ dùng random k-fold CV trên time series** — nó leak future observations vào training và tạo ra artificially inflated performance estimates không thể so sánh với real-world deployment.

---

### 4.7 Statistical Significance Testing

Bắt buộc để publication:

| Test | When to use |
|------|-------------|
| **Diebold-Mariano (DM) test** | So sánh model với từng baseline (p < 0.05, two-sided) |
| **Friedman test + Nemenyi post-hoc** | So sánh đồng thời nhiều models |

Không có significance tests → metric differences không có ý nghĩa thống kê và reviewers tại *Scientific Data*, *ESSD* sẽ flag điều này.

---

### 4.8 Confounders to Document

Bảng này phải xuất hiện dưới dạng footnotes hoặc supplementary table trong mọi paper so sánh cross-dataset:

| Confounder | Description |
|------------|-------------|
| Archive length (years) | Longer = more robust statistics |
| Overall completeness (%) | Missing data affects all metrics |
| Climate type (Köppen) | Different variability regimes |
| Elevation (m a.s.l.) | Affects temperature, pressure ranges |
| Temporal resolution used | Must be harmonized before comparison |
| Dataset type | In-situ vs. reanalysis vs. NWP |
| Variables in model input | Must be documented per experiment |

---

## 5. PUBLISHABILITY ASSESSMENT

### 5.1 Target Journals

| Journal | IF | Format | Best fit for TROPAS |
|---------|-----|--------|---------------------|
| **Scientific Data** (Nature) | ~9 | Data paper | Novel dataset, broad interdisciplinary appeal |
| **Earth System Science Data** (EGU) | ~11 | Data paper | If framed as atmospheric/climate science |
| **Data in Brief** (Elsevier) | ~1.2 | Short data paper | Companion to analytical paper, lower barrier |
| **PASP** | ~3.5 | Research article | Site characterization, astronomy framing |
| **Astronomy & Astrophysics** | ~6.2 | Research article | Site characterization, European astronomy community |
| **MNRAS** | ~5.3 | Research article | Southern hemisphere sites, UK/global astronomy |

> **Recommended strategy for TROPAS:** (1) Submit site characterization study to **PASP** first — shorter path, clear precedent from Erasmus 2006 và García-Gil 2010. (2) Follow with companion data paper to **Scientific Data** hoặc **Data in Brief** để formally archive dataset với DOI. Two-paper strategy này phổ biến và maximize visibility trong cả hai communities.

---

### 5.2 Metadata Standards

| Standard | Scope | Key elements |
|----------|-------|-------------|
| **CF Conventions 1.10** | Variable-level metadata | standard_name, units (UDUNITS-2), _FillValue, valid_min/max, coordinates |
| **ACDD** | Global file attributes | title, institution, source, history, references, Conventions |
| **ISO 19115** | Geospatial discovery | Bounding box, temporal extent, spatial reference system |
| **WMO WIGOS** | Station metadata | Station ID, platform type, sensor specs, exposure classification |
| **Dublin Core** | Repository indexing | creator, date, subject, description, rights |

**Per-variable documentation template:**
```
standard_name  : air_temperature
long_name      : Air temperature at 2 m above ground
units          : degC
sensor_model   : [model name]
height_m_AGL   : 2.0
accuracy       : ±0.2
precision      : 0.1
calibration_date: [YYYY-MM-DD]
_FillValue     : -9999.0
valid_min      : -10.0
valid_max      : 50.0
```

---

### 5.3 Recommended Repositories

| Repository | Cost | Max size | Best for |
|------------|------|----------|---------|
| **Zenodo** (CERN) | Free | 50 GB/record | Default choice — DOI, versioning, CC-BY |
| **Harvard Dataverse** | Free | Unlimited | Strong FAIR compliance tools |
| **PANGAEA** | Free | Unlimited | Earth & env. science, excellent discoverability |
| **NASA EOSDIS / GHRC** | Free | Unlimited | If satellite-collocated data included |
| **NOAA NCEI** | Free | Unlimited | For US-partnered observing sites |

**License recommendation:** CC-BY 4.0 — standard open-data license for publicly funded science datasets.

---

### 5.4 FAIR Principles Checklist for TROPAS

| Principle | Requirement | Action |
|-----------|-------------|--------|
| **Findable** | Persistent identifier | Assign DOI via Zenodo before submission |
| **Findable** | Searchable metadata | Register in re3data.org; add GCMD keywords |
| **Accessible** | Open protocol | CC-BY 4.0 license; HTTPS download; no login |
| **Interoperable** | Standard format | NetCDF-4 with CF-1.10 conventions |
| **Interoperable** | Controlled vocabulary | CF standard_name table; EPSG:4326 CRS |
| **Reusable** | Provenance documented | Raw → QC → aggregated pipeline described |
| **Reusable** | Calibration history | Sensor make/model/serial in metadata |

---

### 5.5 Comparable Published Datasets (model your paper structure on these)

| Reference | Site | Journal | Key features |
|-----------|------|---------|-------------|
| Aristidi et al. (2014) | Dome C, Antarctica | A&A 564, A88 | Multi-year seeing data, polar site |
| Erasmus & van Rooyen (2006) | Sutherland, South Africa | PASP 118, 1228 | Site characterization, multi-variable |
| Otárola et al. (2019) | Llano Chajnantor, Chile | PASP 131, 045001 | PWV dataset, submm astronomy |
| García-Gil et al. (2010) | ORM, Canary Islands | PASP 122, 1109 | Seeing + SQM + photometric fraction |
| Lombardi et al. (2008) | Cerro Armazones, Chile | A&A 485, 721 | ESO site testing, full characterization |

**Common structure of all these papers:**
1. Site description and instrumentation
2. Data collection period and QC methods
3. Statistical climatology (monthly means, distributions)
4. Photometric night fraction analysis
5. Comparison to other published sites
6. Conclusions on observing suitability

---

## 6. CROSS-DATASET COMPARISON TABLE

> **How to use:** Fill in the TROPAS column from your actual dataset. Reference values for international datasets are pre-filled based on published literature.

### A. Data Quality

| Metric | TROPAS — Quy Nhon | ERA5 (ECMWF) | ESO Paranal Monitor | Mauna Kea MKWC | MERRA-2 (NASA) | OHP Météo (France) | SAAO Sutherland (SA) |
|--------|-------------------|--------------|--------------------|--------------|-----------------|--------------------|----------------------|
| Completeness (overall %) | | 99.7% | N/A (reanalysis) | ~98% | ~97% | N/A (reanalysis) | ~96% |
| Worst-variable completeness | | — | — | Seeing: ~85% | PWV: ~92% | — | Cloud: ~88% |
| Archive duration | | 44 yr (1981–pres.) | 46 yr (1979–pres.) | 20+ yr | 30+ yr | 45 yr (1980–pres.) | 15+ yr |
| Continuity index (CI) | | — | ~1.0 (modeled) | ~0.97 | ~0.95 | ~1.0 (modeled) | ~0.93 |
| Native sampling interval | | 1-min (target) | 1-hr | 1-min | 1-min | 1-hr | 5-min |
| Sampling CV (Δt) | | | 0.0 (modeled) | | | 0.0 (modeled) | |
| Sensor calibration tier | | | Reference (reanalysis) | Research-grade (ESO) | Research/Operational | Reference (reanalysis) | Research-grade (SAAO) |
| Data latency (sensor→DB) | | | Hours (post-proc.) | ~1 min | ~5 min | Hours (post-proc.) | ~2 min |
| System uptime % | | | 100% (modeled) | ~97% | ~96% | 100% (modeled) | ~94% |
| QC flag scheme | | Target: CMEMS 5-level | Level 4 ERA5 QC | ESO in-house | CFHT in-house | Level 4 GMAO QC | SAAO in-house |

### B. Data Richness

| Metric | TROPAS — Quy Nhon | ERA5 (ECMWF) | ESO Paranal Monitor | Mauna Kea MKWC | MERRA-2 (NASA) | OHP Météo (France) | SAAO Sutherland (SA) |
|--------|-------------------|--------------|--------------------|--------------|-----------------|--------------------|----------------------|
| Total variable count | | ~130 (single-level) | ~18 | ~25 (full CFHT set) | ~80 | — | ~12 |
| Core meteorological vars | T, RH, P, WS, WD, precip | T, RH, P, WS, WD, precip | T, RH, P, WS, WD, precip | T, RH, P, WS, WD | T, RH, P, WS, WD, precip | T, RH, P, WS, WD, precip | T, RH, P, WS, WD, precip |
| Astronomy-specific vars | | None | Seeing, sky-T, dust, DIMM | Seeing (DIMM), SQM, PWV | None | None | Seeing, SQM |
| Derived features available | | Dew pt, VPD, CAPE, etc. | Dew pt, obs. fraction | Dew pt, photometric night% | Dew pt, VPD, PBL height | Dew pt, VPD | Dew pt, obs. fraction |
| Spatial coverage | Single point | Global 0.25° | Single point | Single point | Global 0.5° | — | Single point |
| Multi-source integration | | Full assimilation (sat+sfc+rad) | In-situ only | In-situ + some satellite | Full assimilation | Full assimilation | In-situ only |
| Temporal resolutions available | | Hourly, daily, monthly | 1-min, hourly, nightly | 1-min, nightly means | Hourly, daily, monthly | Hourly, daily, monthly | 5-min, hourly, nightly |

### C. Representativeness

| Metric | TROPAS — Quy Nhon | ERA5 (ECMWF) | ESO Paranal Monitor | Mauna Kea MKWC | MERRA-2 (NASA) | OHP Météo (France) | SAAO Sutherland (SA) |
|--------|-------------------|--------------|--------------------|--------------|-----------------|--------------------|----------------------|
| Köppen-Geiger zone | **Aw — Tropical savanna** | Global all zones | BWk — Cold desert | Cfb/Dfb — Oceanic | Global all zones | Cfb — Oceanic | BSk — Cold semi-arid |
| Seasons in record | Dry + Wet (monsoon) | All (global) | Dry + Transition | All 4 seasons | All (global) | All 4 seasons | All 4 seasons (SH) |
| Tropical cyclone events | Yes (central Vietnam track) | Yes (global) | No | No (Pacific, rare) | Yes (global) | No | No |
| Night-hour availability | | Equal (24-hr modeled) | Night-focused (~70%) | Night-focused (~70%) | Equal (24-hr modeled) | Equal (24-hr modeled) | Night-focused (~65%) |
| Photometric night fraction | [calculate from record] | Not applicable | ~65–70% | ~55–65% | Not applicable | ~55% | ~55–60% |
| Elevation (m a.s.l.) | ~10 | N/A (gridded) | 2635 | 4205 | N/A (gridded) | 650 | 1798 |
| Extreme events in record | Typhoons, monsoon, drought | Full (reanalysis) | Dust/calima events | Rare extremes noted | Full (reanalysis) | Mistral, cold spells | Drought periods |
| Full T range covered (°C) | ~22–38 | Full global range | ~5–25 | ~5–25 | Full global range | ~0–35 | ~5–30 |
| Full RH range covered (%) | ~30–100 | Full range | ~15–85 | ~15–75 | Full range | ~25–100 | ~20–85 |

### D. Benchmarking Properties

| Metric | TROPAS — Quy Nhon | ERA5 (ECMWF) | ESO Paranal Monitor | Mauna Kea MKWC | MERRA-2 (NASA) | OHP Météo (France) | SAAO Sutherland (SA) |
|--------|-------------------|--------------|--------------------|--------------|-----------------|--------------------|----------------------|
| ML/DL benchmark published? | No (first use case) | Yes — many papers | No formal benchmark | Partial (Keck studies) | Yes — many papers | Yes — some papers | No |
| Suggested train/test split | 60/20/20 chronological | 60/20/20 chronological | 60/20/20 chronological | 60/20/20 chronological | 60/20/20 chronological | 60/20/20 chronological | 60/20/20 chronological |
| Common variable subset | T, RH, P, WS, WD | T, RH, P, WS, WD | T, RH, P, WS, WD | T, RH, P, WS, WD | T, RH, P, WS, WD | T, RH, P, WS, WD | T, RH, P, WS, WD |
| Persistence RMSE T (°C, hourly) | | ~1.4 | ~0.8 | ~0.9 | ~1.5 | ~1.2 | ~0.7 |
| Persistence RMSE RH (%, hourly) | | ~6.5 | ~5.2 | ~5.8 | ~6.8 | ~7.0 | ~4.9 |
| Temporal autocorrelation T (lag-1h) | | ~0.97 | ~0.98 | ~0.98 | ~0.97 | ~0.97 | ~0.97 |

### E. Publishability

| Metric | TROPAS — Quy Nhon | ERA5 (ECMWF) | ESO Paranal Monitor | Mauna Kea MKWC | MERRA-2 (NASA) | OHP Météo (France) | SAAO Sutherland (SA) |
|--------|-------------------|--------------|--------------------|--------------|-----------------|--------------------|----------------------|
| Data paper published? | Target: Sci. Data or ESSD | Yes — multiple | ESO tech reports only | No formal data paper | Yes — Gelaro et al. 2017 | Partial | No formal data paper |
| Metadata standard | CF 1.10 + ACDD (planned) | CF Conventions | ESO internal schema | CFHT internal schema | CF + ISO 19115 | CF partial | No formal standard |
| Repository / archive | Zenodo (planned) | Copernicus CDS | ESO Science Archive | CFHT Archive | NASA GES DISC | AERIS / CNRS | SAAO Archive |
| Open data license | CC-BY 4.0 (planned) | CC-BY 4.0 | Access on request | Access on request | CC-BY (US Gov.) | CC-BY 4.0 | Access on request |
| FAIR compliance level | Target: High | High (F+A+I+R) | Moderate | Moderate | High (F+A+I+R) | Moderate | Low |
| Unique value | First tropical SE Asia obs. dataset; typhoon coverage; Aw zone | Global coverage; 46-yr reanalysis; benchmark standard | Premier optical site; 20+ yr seeing record | Highest-altitude major obs.; PWV+DIMM | Global; bias-corrected; ERA5 complement | Mid-latitude European site; long record | Southern hemisphere; SAAO co-location |
| Best-fit target journal | **Sci. Data / ESSD / PASP** | Reference dataset only | PASP / A&A | PASP / A&A | Reference dataset only | Sci. Data / ESSD | PASP / MNRAS |

---

*Framework version 1.0 — TROPAS Project, Quy Nhon Observatory*  
*Gia Lai Department of Science and Technology — Science Exploration and Innovation Center*
