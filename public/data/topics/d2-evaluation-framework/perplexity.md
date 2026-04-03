<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Help me design a rigorous evaluation framework for comparing my observatory weather dataset with international datasets. I need:

1. **Data quality metrics**:
    - Completeness: percentage of non-missing values per variable
    - Temporal coverage: total duration and continuity
    - Sampling rate consistency
    - Sensor accuracy and calibration standards
    - Data latency (time from measurement to storage)
    - Uptime / availability percentage
2. **Data richness metrics**:
    - Number of distinct variables measured
    - Presence of astronomy-specific parameters (SQM, seeing, etc.)
    - Derived/engineered features available
    - Spatial coverage (single point vs. network)
    - Multi-source integration (local sensors + satellite + NWP)
3. **Data representativeness**:
    - Climate zone coverage
    - Seasonal coverage (does data span all seasons?)
    - Coverage of extreme events (storms, heavy rain periods)
    - Day vs. night coverage balance
    - Distribution of weather conditions (clear nights vs. cloudy nights ratio)
4. **Benchmarking methodology**:
    - How to fairly compare forecasting model performance across different datasets?
    - Normalization strategies for cross-dataset comparison
    - Which baseline models should be run on all datasets for fair comparison?
    - Standard train/validation/test split protocols for time series
5. **Publishability assessment**:
    - What makes a weather/environmental dataset publishable as a "data paper"?
    - Which journals accept data papers? (e.g., Scientific Data, Earth System Science Data, Data in Brief, PASP)
    - What metadata standards should be followed? (e.g., CF conventions, Dublin Core)
    - What data repositories are appropriate? (Zenodo, Harvard Dataverse, NOAA NCEI)
    - Examples of published astronomical site weather datasets

Create a comparison table template I can fill in for my dataset vs. 5-6 international datasets.

Here’s a structured framework you can use, plus a ready-to-fill comparison table template at the end.

## Overall approach

Design the evaluation around four axes—data quality, richness, representativeness, and benchmarking design—and then add a fifth axis for publishability (metadata, repository, and journal fit). This mirrors how climate networks, major archives, and site-testing campaigns describe and compare their datasets.[^1][^2][^3][^4][^5]

***

## 1. Data quality metrics

### 1.1 Completeness

- **Metric:** For each variable $v$ over a period $T$, completeness = $100 \times N_\text{valid} / N_\text{exp}$, where $N_\text{exp}$ is the number of samples implied by the nominal sampling rate and $N_\text{valid}$ is the number of non-missing, quality-controlled samples.[^2]
- **Practice:** Report per variable and per time scale (e.g., annual, seasonal, monthly); WMO guidance for climate networks emphasizes homogeneous, continuous, good-quality observations for each climate element.[^2]


### 1.2 Temporal coverage and continuity

- **Metrics:**
    - Start date, end date, and total duration in years.
    - Maximum gap length; median and percentile of inter-sample intervals.
    - Fraction of time covered by continuous stretches longer than a threshold (e.g., ≥30 days).[^1][^2]
- **Rationale:** Planning and climatological analyses explicitly require long-duration, chronological records without big gaps; quantifying continuity makes this checkable.[^1][^2]


### 1.3 Sampling rate consistency

- **Metric:** For each variable, compute the empirical distribution of time deltas between consecutive records; report median, 5–95% range, and percentage of intervals within, say, ±10% of nominal cadence.[^1]
- **Use:** This is important when comparing datasets originally at different cadences (minutely vs. hourly), or with irregular logging.[^6][^1]


### 1.4 Sensor accuracy and calibration

- **What to capture (per sensor):** Model, manufacturer, specified accuracy and resolution, operating range, calibration schedule, and how calibrations are documented.[^3][^5][^2]
- **Astronomy-specific examples:**
    - DIMM/MASS: seeing accuracy, turbulence profile layers, reference wavelength (often 500 nm) and airmass normalization, as in ESO’s Astronomical Site Monitor.[^5][^3]
    - SQM or similar: field of view, accuracy (e.g., ±10% in surface brightness), and treatment of sensor aging as noted in night-sky brightness work.[^7][^8][^9]


### 1.5 Data latency

- **Metric:** Latency distribution between measurement timestamp and ingestion/archive timestamp: median, 90th, 99th percentiles, by variable or product.[^10][^11]
- **Why it matters:** Many archives distinguish near-real-time vs. fully quality-controlled products; for forecasting applications, latency constraints can dominate which datasets are actually usable.[^11][^10]


### 1.6 Uptime / availability

- **Metric:** Percentage of time the station/network delivers all core variables (“hard” uptime), plus optionally per-variable availability and “soft” uptime that tolerates single-variable gaps.[^2]
- **Astronomy angle:** Site monitors at major observatories aim for near-continuous seeing, turbulence and met logging; publishing uptime shows how close you are to that operational standard.[^3][^5]

***

## 2. Data richness metrics

### 2.1 Number and diversity of variables

- **Metric:** Count of distinct meteorological variables (T, RH, P, wind, cloud, precipitation, radiation, etc.) plus astronomy-specific ones (seeing, coherence time, isoplanatic angle, PWV, sky brightness, aerosol index).[^12][^5][^3]
- **Benchmark:** Large environmental databases such as ClimateForecasts expose dozens of variables (49 environmental variables at over 15 000 stations) – useful as a “richness” reference.[^13][^14]


### 2.2 Astronomy-specific parameters

- **Key checks:**
    - Seeing (DIMM/MASS), turbulence profiles, coherence time, isoplanatic angle (following ESO ASM / MASS–DIMM systems).[^15][^5][^3]
    - Night-sky brightness via SQM or instruments described in reviews and site-testing studies (units, cadence, angular response).[^16][^17][^8][^9][^7]
    - Observing-duty metrics: fraction of photometric vs. spectroscopic nights, fraction of time lost to clouds or high winds, as in multi-site comparison papers.[^12]


### 2.3 Derived and engineered features

- **Meteorological:** Dew point, vapour pressure, stability indices, heat index, etc., derived from raw T, RH, P.[^6][^2]
- **Astronomy-specific:** Clear-sky flags, sky-brightness classes, seeing quality classes, and night-quality metrics derived from SQM and seeing time series.[^18][^16]
- **Forecast-friendly:** Inclusion of lagged features, calendar features (hour of night, season), and aligned external drivers (e.g., reanalysis or NWP variables) as precomputed columns, as seen in ML-oriented weather datasets.[^19][^6]


### 2.4 Spatial coverage and vertical structure

- **Metrics:**
    - Number of stations, their coordinates, elevation and orographic context.[^14][^13]
    - Whether the dataset is single-site, local network, or multi-site network (compare to multi-site climatologies like JapanFlux and global station collections).[^4][^20][^13]
    - Whether vertical profiles (tower levels, MASS layers, SODAR, etc.) are available and documented.[^5][^3][^2]


### 2.5 Multi-source integration

- **Checklist:**
    - Local instruments only vs. combined with radar, satellite, reanalysis, or NWP outputs (as in many power and EO-focused weather datasets).[^21][^6]
    - Document co-location radii, time-interpolation strategy and bias corrections.
    - Provenance indicators per record (original source, processing level) so users can filter purely in-situ vs. fused products.[^22][^1]

***

## 3. Data representativeness

### 3.1 Climate-zone and regional coverage

- **Metric:** Climate classification (e.g., Köppen–Geiger) for each site; count of climate zones covered across your international comparison set.[^23][^2]
- **Usage:** Show whether your dataset covers or complements key regimes already represented by other astronomical sites and climate datasets.[^23][^12]


### 3.2 Seasonal coverage

- **Metrics:**
    - Number of full seasonal cycles (years × seasons) covered; highlight if you have at least several years in each season.[^23][^2]
    - Seasonal completeness for each variable (e.g., JJA completeness for humidity, DJF completeness for cloud cover), similar to how early-instrumental and modern climate datasets evaluate seasonal coverage.[^23]


### 3.3 Extreme-event coverage

- **Approach:**
    - Define thresholds for “extreme”: heavy rain, strong winds, severe storms, highly degraded sky brightness, etc., based on regional climatology or WMO recommendations.[^22][^2]
    - Count events per year and overall; if possible, cross-check with known regional extreme events or impact studies.[^22]


### 3.4 Day vs. night balance

- **Metrics:**
    - Nighttime completeness and uptime vs. daytime; for astronomy, nighttime is the primary focus.[^17][^2]
    - Within night, completeness for astronomical dark-time windows (e.g., sun < −18°) vs. twilight; this can be derived similarly to sky-brightness site-testing work.[^17][^12]


### 3.5 Distribution of weather/sky conditions

- **Method:**
    - Use cloud-cover, sky-brightness and seeing thresholds to classify each night (or hour) into clear, partly cloudy, or overcast, plus “good/medium/poor” seeing classes.[^24][^18][^12]
    - Summarize clear-night fraction, photometric and spectroscopic night fractions, and their seasonal dependence; MNRAS site-comparison work uses this style of summarization.[^12][^17]

***

## 4. Benchmarking methodology

### 4.1 Making model comparisons fair

To compare forecasting models across different datasets:

- **Align targets and horizons:** Choose consistent prediction targets (e.g., 1 h ahead seeing, 6 h ahead cloud fraction, 24 h ahead sky brightness index) and apply them across all datasets.[^25][^6]
- **Common temporal resolution:** Resample all inputs to a shared cadence (e.g., hourly), recording how you aggregate (mean, max, min) or downsample from higher rates, as in typical weather-prediction and ML teaching datasets.[^19][^6]
- **Shared evaluation windows:** Either restrict evaluation to overlapping time periods or stratify your results by climate regime and season, to avoid rewarding datasets that just happen to have “easier” periods.[^26][^23]


### 4.2 Normalization strategies

- **Per-station climatology normalization:** Subtract station-specific climatological mean and divide by its standard deviation, so models see anomalies and can be compared across climates.[^27][^23]
- **Train-only scaling:** Compute scaling parameters (mean, std, min, max) using training data only, then apply to validation/test, following time-series ML best practice.[^28][^27]
- **Transform skewed variables:** Apply log or square-root transforms to highly skewed variables (e.g., precipitation), consistently across datasets, as is common in environmental modeling.[^6][^19]


### 4.3 Baseline models to run everywhere

To ensure fair benchmarking, run the same simple baselines on all datasets:

- **Persistence:** Forecast equals the last observed value (or last-known state vector); widely used as the simplest weather forecasting method and as a ML baseline.[^29][^30][^31]
- **Climatology / seasonal:** Use long-term mean or seasonal/hour-of-day climatology as a baseline, analogous to climate normals used in climate applications.[^2][^23]
- **(Optional) Simple statistical:** ARIMA or exponential smoothing for continuous series, but only if they can be parameterized similarly across datasets; persistence and climatology are usually sufficient as common baselines.[^29][^28]


### 4.4 Train/validation/test splitting for time series

- **Chronological split:** Use non-shuffled chronological splits (e.g., 70% train, 20% validation, 10% test), as recommended in time-series tutorials and guides.[^32][^33][^27][^28]
- **Walk-forward validation:** Implement rolling-origin or walk-forward validation, where the training window moves forward and each forecast is evaluated on the next period, yielding more robust performance estimates.[^33][^32]
- **Leakage controls:** Ensure normalization and feature engineering are computed only from training data; tutorials emphasize this as “non-negotiable” for reliable time-series evaluation.[^32][^27]


### 4.5 Error metrics and skill scores

- **Continuous variables:** Report MAE, RMSE, and bias; optionally add metrics like NSE (Nash–Sutcliffe Efficiency) or its normalized variants to measure skill relative to mean/climatology.[^34][^35][^36][^22]
- **Event-based:** For clear vs. cloudy nights or good vs. poor seeing, use precision, recall, F1 and Brier score, ensuring identical thresholds across datasets, aligning with how sky-condition classifiers are evaluated.[^18][^22]

***

## 5. Publishability assessment

### 5.1 What makes it “data-paper ready”

Data journals and archives look for:

- **High-quality, reusable data:** Clear scientific value, robust QC, error characterization, and clear potential for reuse beyond the original project.[^37][^20][^4]
- **Transparent methods:** Detailed documentation of instruments, calibration, processing chain, quality flags, and limitations, in line with climate-network and archive practices.[^10][^11][^4][^2]
- **Open access and DOIs:** Data must be in an accessible repository with stable DOIs and appropriate licensing, enabling citation and long-term availability.[^38][^39][^4]


### 5.2 Journals for data papers

You already mentioned good targets; here’s how they fit:

- **Earth System Science Data (ESSD):** Dedicated to high-quality Earth system datasets, including atmospheric and meteorological time series; expects rigorous QC and broad community value.[^20][^4]
- **Scientific Data (Nature Portfolio):** Publishes Data Descriptors with structured metadata and narrative; well-suited to comprehensive, well-curated environmental and site datasets.[^40][^37]
- **Data in Brief:** Multidisciplinary data journal publishing short data articles; widely used for environmental and geoscience datasets and numerically one of the biggest data-journal venues.[^41][^38]
- **Astronomy journals:** While not “data journals” per se, journals such as MNRAS and similar astronomy outlets publish site-testing and dataset-description studies (e.g., multi-site weather overview, night-sky brightness maps), which are good models for PASP-style papers.[^42][^16][^12]


### 5.3 Metadata standards to adopt

- **CF conventions:** For NetCDF and similar files, CF defines standard names, units, coordinates, and temporal/spatial metadata, and is widely adopted for station, satellite, and model climate data.[^43][^44]
- **Dublin Core:** Generic but widely used record-level schema (title, creator, subject, description, etc.) in repositories; often forms the basis for dataset landing pages.[^45][^46]
- **ISO 19115 family:** International geospatial metadata standard (19115‑1 fundamentals plus extensions) covering identification, extent, quality, spatial/temporal schema, and distribution of geospatial data.[^47][^48][^49][^50]
- **Repository profiles:** Many environmental data centers define their own ISO/CF profiles; aligning with their templates (e.g., those used by CEDA and similar centers) improves discoverability.[^44][^50]


### 5.4 Repositories suitable for your dataset

- **Zenodo:** General-purpose, DOI-minting repository widely used for environmental and climate datasets; climate/weather examples show multi-variable, station-based datasets hosted there.[^13][^14][^19]
- **Harvard Dataverse:** Open-source platform with collections dedicated to exposure, extreme weather and related datasets; suitable for cross-domain exposure and health applications of your data.[^51][^39]
- **NOAA NCEI / CDO-style archives:** For long-term stewardship and broader reuse, national archives like NOAA NCEI host large atmospheric and climate collections and provide standardized access tools.[^11][^10]


### 5.5 Example astronomical site datasets/papers

- **ESO Astronomical Site Monitor (Paranal, La Silla):** Long-term seeing, turbulence, PWV, and meteorological records documented via manuals and online ASM instrument descriptions; a strong template for how to present an observatory’s ambient conditions data.[^3][^5]
- **Weather at selected astronomical sites (MNRAS):** Comparative analysis of cloud cover, high-level winds, PWV, etc. for 15 sites using reanalysis data; good example of multi-site climatological comparison.[^12]
- **Muztagh‑Ata site-testing:** Combined ground meteorology, seeing and sky-brightness monitoring with SQM and DIMM, including distributions of sky brightness and clear-night statistics.[^15][^17]
- **Night-sky brightness monitoring papers:** Long-term SQM networks over cities and dark-sky areas demonstrating how to document instrument characteristics, accuracy and aging, and link sky-brightness changes to observing conditions.[^8][^9][^7][^16]

***

## 6. Comparison table template

Here is a Markdown template you can paste into your own notes or repo and fill in for “My observatory” plus up to six international datasets:

```markdown
| Category              | Metric                                   | Definition / how to compute                                                  | My observatory | Dataset 1 | Dataset 2 | Dataset 3 | Dataset 4 | Dataset 5 | Dataset 6 |
|-----------------------|------------------------------------------|-------------------------------------------------------------------------------|----------------|----------|----------|----------|----------|----------|----------|
| Data quality          | Completeness (%) per key variable        | 100 × (valid samples / expected samples) over chosen period                  |                |          |          |          |          |          |          |
| Data quality          | Total temporal coverage (years)          | End date − start date                                                        |                |          |          |          |          |          |          |
| Data quality          | Max gap length                           | Longest interval without valid data                                          |                |          |          |          |          |          |          |
| Data quality          | Sampling rate consistency                | Median and 5–95% quantile of sampling interval; % intervals within tolerance |                |          |          |          |          |          |          |
| Data quality          | Sensor accuracy summary                  | Typical accuracy (e.g., ±0.2 K temp, ±10% RH, seeing, SQM, etc.)             |                |          |          |          |          |          |          |
| Data quality          | Calibration practices                    | Documented schedule and methods (yes/no; brief notes)                        |                |          |          |          |          |          |          |
| Data quality          | Median data latency                      | Median and 95th percentile latency from measurement to archive               |                |          |          |          |          |          |          |
| Data quality          | Station uptime (%)                       | Fraction of time core variables available                                    |                |          |          |          |          |          |          |
| Data richness         | Number of meteorological variables       | Count of distinct met variables (T, RH, P, wind, precip, clouds, etc.)      |                |          |          |          |          |          |          |
| Data richness         | Astronomy-specific parameters            | Seeing, coherence time, PWV, SQM, turbulence profile (list / yes–no)        |                |          |          |          |          |          |          |
| Data richness         | Derived features available               | Dew point, clear-sky flags, duty-cycle metrics, etc.                         |                |          |          |          |          |          |          |
| Data richness         | Spatial coverage                         | Single site / local network / regional network                               |                |          |          |          |          |          |          |
| Data richness         | Vertical profiling                       | Surface only / tower / SODAR / MASS-DIMM layers                              |                |          |          |          |          |          |          |
| Data richness         | Multi-source integration                 | Local sensors + satellite / radar / reanalysis / NWP                         |                |          |          |          |          |          |          |
| Representativeness    | Climate zone                             | Köppen–Geiger class or similar                                               |                |          |          |          |          |          |          |
| Representativeness    | Seasonal coverage                        | Number of full seasonal cycles; per-season completeness                      |                |          |          |          |          |          |          |
| Representativeness    | Extreme events captured                  | Count of storms, heavy rain, high-wind events, etc.                          |                |          |          |          |          |          |          |
| Representativeness    | Nighttime coverage (%)                   | Fraction of nighttime hours with valid data                                  |                |          |          |          |          |          |          |
| Representativeness    | Clear vs. cloudy nights ratio            | Fraction of clear / photometric / spectroscopic nights                       |                |          |          |          |          |          |          |
| Benchmarking          | Forecast targets and horizons            | Variables and lead times modeled (e.g., 1 h seeing, 6 h cloud)               |                |          |          |          |          |          |          |
| Benchmarking          | Temporal resolution for modeling         | Common cadence used (e.g., 10 min, hourly)                                   |                |          |          |          |          |          |          |
| Benchmarking          | Baselines implemented                    | Persistence, climatology, others (list)                                      |                |          |          |          |          |          |          |
| Benchmarking          | Train/val/test split                     | Split strategy (e.g., 70/20/10 chronological; walk-forward details)          |                |          |          |          |          |          |          |
| Benchmarking          | Primary error metrics                    | MAE, RMSE, NSE, Brier, etc.                                                  |                |          |          |          |          |          |          |
| Publishability        | Public repository and DOI                | Repository name and DOI (if available)                                       |                |          |          |          |          |          |          |
| Publishability        | Metadata standards used                  | CF / ISO 19115 / Dublin Core / other                                         |                |          |          |          |          |          |          |
| Publishability        | Documentation and user manual            | Existence and depth of technical documentation                               |                |          |          |          |          |          |          |
| Publishability        | Prior data or site-testing papers        | Key references describing the dataset or site                                |                |          |          |          |          |          |          |
```

You can add more rows for very site-specific metrics (e.g., fraction of usable telescope time per instrument, AO-specific turbulence metrics) once you see how these basic comparisons look.
<span style="display:none">[^52][^53][^54][^55][^56][^57][^58]</span>

<div align="center">⁂</div>

[^1]: https://www.esig.energy/wp-content/uploads/2023/10/ESIG-Weather-Datasets-full-report-2023b.pdf

[^2]: https://www.uncclearn.org/wp-content/uploads/library/wmo107.pdf

[^3]: https://archive.eso.org/cms/eso-data/ambient-conditions/Astronomical_Site_Monitor_Data_User_Manual_v20181026.pdf

[^4]: https://www.earth-system-science-data.net

[^5]: https://www.eso.org/sci/facilities/paranal/astroclimate/asm-instruments.html

[^6]: https://apxml.com/courses/time-series-analysis-forecasting/chapter-6-model-evaluation-selection/train-test-split-time-series

[^7]: https://www.soa.org/resources/research-reports/2022/practical-guide-working-weather-datasets/

[^8]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10564792/

[^9]: https://www.nature.com/articles/s41598-023-44423-w

[^10]: https://www.unihedron.com/projects/sqm-l/

[^11]: https://www.ncei.noaa.gov/cdo-web/

[^12]: https://www.ncei.noaa.gov

[^13]: https://academic.oup.com/mnras/article/482/4/4941/5159474

[^14]: https://zenodo.org/records/15037343

[^15]: https://zenodo.org/records/10776414

[^16]: https://arxiv.org/html/2509.03558v2

[^17]: https://arxiv.org/abs/2207.03551

[^18]: https://www.raa-journal.org/issues/spe/v20n6/202203/P020220324615013552474.pdf

[^19]: https://pdfs.semanticscholar.org/bf21/ab0c05b0317a87f466c78ba5efb104ca2041.pdf

[^20]: https://zenodo.org/records/7525955

[^21]: https://earth-system-science-data.net

[^22]: https://openaccess.thecvf.com/content/CVPR2022W/EarthVision/papers/Diaconu_Understanding_the_Role_of_Weather_Data_for_Earth_Surface_Forecasting_CVPRW_2022_paper.pdf

[^23]: https://pmc.ncbi.nlm.nih.gov/articles/PMC6024078/

[^24]: https://www.nature.com/articles/s41597-022-01919-w

[^25]: https://www.rivm.nl/bibliotheek/rapporten/680151002.pdf

[^26]: https://arxiv.org/pdf/1903.10012.pdf

[^27]: https://esd.copernicus.org/articles/14/955/2023/

[^28]: https://www.tensorflow.org/tutorials/structured_data/time_series

[^29]: https://towardsdatascience.com/time-series-from-scratch-train-test-splits-and-evaluation-metrics-4fd654de1b37/

[^30]: https://machinelearningmastery.com/persistence-time-series-forecasting-with-python/

[^31]: http://ww2010.atmos.uiuc.edu/(Gh)/guides/mtr/fcst/mth/prst.rxml

[^32]: https://discovery.ucl.ac.uk/id/eprint/10069040/1/Perez Ortiz_mixExpertsPersist.pdf

[^33]: https://www.lightly.ai/blog/train-test-validation-split

[^34]: https://scores.readthedocs.io/en/stable/tutorials/NSE.html

[^35]: https://en.wikipedia.org/wiki/Nash–Sutcliffe_model_efficiency_coefficient

[^36]: https://agrimetsoft.com/calculators/Nash Sutcliffe model Efficiency coefficient

[^37]: https://www.slideshare.net/slideshow/scientific-data-overview-of-data-descriptors-wt-dataliterature-integration-dec-2013/29122613

[^38]: https://wlv.openrepository.com/bitstreams/ac85ad0e-d474-4f56-b074-4b5015e0eae3/download

[^39]: https://www.climatehealthcafe.org/news/celebrating-1-000-datasets-the-cafe-dataverse-community-hits-a-milestone

[^40]: https://eartharxiv.org/repository/object/4559/download/9218/

[^41]: https://www.youtube.com/watch?v=jAqNq_GzFhk

[^42]: https://academic.oup.com/mnras/article/353/4/1107/976887

[^43]: https://cfconventions.org/cf-conventions/cf-conventions.html

[^44]: https://help.ceda.ac.uk/article/4507-the-cf-metadata-convention

[^45]: https://www.lib.uidaho.edu/services/data/data-management/guide/documenting/standards/

[^46]: https://www.slideshare.net/slideshow/introduction-to-dublin-core-metadata/2433002

[^47]: https://www.iso.org/standard/26020.html

[^48]: https://www.iso.org/standard/53798.html

[^49]: https://geo.cepal.org/en/contenido/grupos/Coordinación-y-cooperación-regional/pdf/metadata_day_1_p2.pdf

[^50]: https://www.dcc.ac.uk/resources/metadata-standards/iso-19115

[^51]: https://www.linkedin.com/posts/climate-health-cafe_celebrating-1000-datasets-the-cafe-dataverse-activity-7421631883756675073-Y5mV

[^52]: https://earth.esa.int/eogateway/documents/20142/37627/High_resolution_ground_deformation_monitoring_COSMO-SkyMed_PSP_SAR_interferometry.pdf

[^53]: https://pmc.ncbi.nlm.nih.gov/articles/PMC12275153/

[^54]: https://www.ing.iac.es/astronomy/development/hap/sites.html

[^55]: https://www.reddit.com/r/learnmachinelearning/comments/1h8785r/train_test_validation_split_for_time_series_data/

[^56]: https://ascelibrary.org/doi/10.1061/(ASCE)HE.1943-5584.0001580

[^57]: https://bwi.earth/water-model-evaluation-exploring-nnse-the-smarter-metric-powering-bwis-forecast-accuracy/

[^58]: https://docs.geocat.net/geonetwork-enterprise/2020.5/geonetwork/community/annexes/standards/iso19115-3.2018.html

