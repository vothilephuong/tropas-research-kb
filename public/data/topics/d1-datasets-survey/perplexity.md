# Survey of Astronomical Weather and Sky-Quality Datasets and Assessment of the Quy Nhon Observatory Dataset

## 1. Overview

This report surveys major datasets used for weather forecasting and sky-quality assessment in ground-based astronomy, with emphasis on site-monitoring time series and auxiliary global products (reanalyses, satellite, and citizen-science networks). It then evaluates how a local, high-cadence dataset from Quy Nhon Observatory (Vietnam) compares to these benchmarks and discusses prospects for publication as a data paper.


## 2. Major site-specific observational datasets

### 2.1 ESO Ambient Conditions Database (La Silla, Paranal, APEX)

ESO operates a long-running ambient conditions database covering La Silla, Paranal, and Chajnantor (APEX) in Chile’s Atacama Desert.[^1][^2][^3]

**Location and climate**
- La Silla: ~29.16° S, 70.73° W, altitude ~2400 m, coastal desert climate in the southern Atacama.[^1]
- Paranal: ~24.63° S, 70.40° W, altitude ~2635 m, extremely arid subtropical desert.[^1]
- Chajnantor / APEX: high-altitude Atacama plateau (~5100 m), cold desert with very low precipitable water vapour (PWV).[^2][^4]

**Period and temporal resolution**
- La Silla meteorological station online database from 1 Jan 1994 to present; similar multi-decade coverage at Paranal.[^2][^1]
- Sensors sampled every 2 s (digital) or 1 min (analogue), with 1‑min averages ingested; statistics (mean, RMS, min, max) over preset 20‑min averaging periods.[^1]
- ESO also maintains seeing and turbulence measurements (DIMM/MASS, PWV, etc.) accessible via the TAP_OBS interface in the `asm` schema.[^3]

**Variables / parameters**
- Standard meteo: wind speed and direction at 30 m; temperature and relative humidity near 2–2.5 m; barometric pressure at 2 m.[^1]
- Astroclimate: atmospheric seeing from dedicated monitors; additional tables for turbulence, PWV, and related parameters in `asm`.[^3]

**Data volume and uptime / quality**
- At 1‑min cadence over ~30 years, each site has of order 15–20 million time steps per parameter, but ESO does not publish a specific record count or explicit uptime fraction; gaps are visible in graphical monitors but are not systematically quantified in public documentation.[^2][^1]

**Sky brightness / SQM**
- ESO publishes long-term natural sky brightness statistics at Paranal in UBVRI bands, derived from archival science imaging rather than a dedicated SQM network.[^5]
- Typical dark-time V-band zenith brightness is ~21.6 mag arcsec⁻² with hundreds of measurements; no standard Unihedron-style SQM time series is exposed in the ambient database.[^5]

**Public access and usage**
- Data are accessible through web query forms (graphical monitor and tabular download) and via the VO-compliant TAP_OBS service, which exposes ambient tables, seeing, PWV, and related metadata.[^3][^2]
- ESO ambient and astroclimatology data underpin many site-characterization and climate-change impact studies, including multi-site assessments of temperature, humidity, PWV, and seeing using both in situ data and ERA5/PRIMAVERA climate projections, and long-term ERA5-based analysis of IWV at Paranal.[^4][^6]


### 2.2 Mauna Kea Weather Center (MKWC) and associated data

The Mauna Kea Weather Center (MKWC) provides custom forecasts and nowcasts for the Maunakea summit, supported by local observations and WRF model output.[^7][^8]

**Location and climate**
- Maunakea observatories are at ~4200 m on Hawaii’s Big Island, in a high-altitude, dry, subtropical island climate above a marine boundary layer.[^9][^8]

**Services, period, and resolution**
- MKWC issues forecasts several times per week (often twice daily) using WRF runs configured for the summit region, with products including cloud cover, fog, summit winds and temperature, PWV, and optical-turbulence diagnostics (seeing, \(C_n^2\), wind profiles).[^8]
- Forecasts are typically hourly in time and extend several days into the future; MKWC maintains a comprehensive data archive according to internal presentations, but detailed public metadata (uptime, total record counts) are not published.[^8]

**Underlying datasets**
- Local observatory weather stations (Keck, CFHT, Subaru, Gemini, etc.) provide surface meteorology (temperature, humidity, pressure, wind, dewpoint) and seeing estimates from DIMM/MASS instruments; KOA notes that ancillary weather and seeing data, including DIMM and MASS time series, are preserved and plotted per night.[^10]
- MKWC WRF-based optical-turbulence forecasts have been used and evaluated in multiple studies and are now being emulated by machine-learning models that use several years of MKWC observational and forecast data to predict nightly total and free-atmosphere seeing over Maunakea.[^11][^12]

**Public availability**
- MKWC web pages provide graphical forecasts, some historical plots, and access to forecast fields; full raw archives and local station time series are primarily available to partner observatories.


### 2.3 TMT site testing campaign (multiple sites including Mauna Kea 13N)

The Thirty Meter Telescope (TMT) site testing campaign assembled a highly instrumented, multi-year dataset at five candidate sites: several Chilean mountains, San Pedro Mártir (Baja California), and Mauna Kea 13N.[^13][^14][^15]

**Locations and climates**
- Coastal and interior Chilean sites (Cerro Tolar, Armazones, Tolonchar): extremely arid Atacama climate.[^13]
- San Pedro Mártir: high-elevation site in Baja California with semi-arid montane climate.[^13]
- Mauna Kea 13N: high-altitude volcanic island climate similar to other Maunakea observatories.[^13]

**Period and temporal resolution**
- Minimum of ~2 years of data per site, with overlapping campaigns in the 2004–2009 timeframe.[^14][^13]
- Weather station records (wind, temperature, humidity, pressure, solar radiation, heat flux) and seeing/turbulence data (DIMM, MASS, SODAR, IR radiometers, all-sky cameras, etc.) typically logged at roughly 2‑min cadence during the night; documentation for a Mauna Kea TMT mirror at Keck describes DIMM, MASS, and weather data logged approximately every two minutes.[^16]

**Variables / instruments**
- Weather: temperature, humidity, wind speed/direction, pressure, solar radiation, heat flux.[^13]
- Optical turbulence: seeing (DIMM), coherence time and basic photometry, vertical turbulence profiles (MASS), 20–800 m turbulence and wind profiles (SODAR).[^13]
- Clouds and sky: all-sky cameras and satellite cloud statistics, including cirrus and light-pollution assessments.[^13]

**Public access and usage**
- Travouillon et al. note that data are available for download at `sitedata.tmt.org`, implying some level of public or collaborator access.[^13]
- The dataset has been widely used in comparative astroclimatology and for calibrating or validating NWP models and optical-turbulence parametrizations.


### 2.4 LSST / Rubin Observatory site characterization data (Cerro Pachón / El Peñón)

Rubin Observatory (formerly LSST) selected the El Peñón summit on the Cerro Pachón ridge in Chile and conducted an extended site-monitoring campaign.[^17][^18]

**Location and climate**
- El Peñón, Cerro Pachón ridge near Cerro Tololo in the southern Atacama, altitude ~2600–2700 m, arid subtropical desert.[^18]

**Period and resolution**
- Meteorological data at El Peñón have been collected since 2003, with seeing measurements (LSST DIMM) from 2006 onward; DIMM dataset at El Peñón covers 2006–2010 in one summarized study.[^17][^18]
- LSST DIMM and other site-monitoring instruments typically operate on 10–20‑min sampling intervals for seeing, with meteo at 1–10‑min cadence.

**Variables**
- Meteorology: standard surface meteo (temperature, humidity, wind, pressure) from site towers.[^18]
- Seeing / turbulence: DIMM measurements at El Peñón plus MASS at nearby stations (Tololo, Pachón, etc.); microthermal towers with probes every 2 m up to 30 m for boundary-layer turbulence.[^17]

**Results and usage**
- LSST DIMM data show median seeing ~0.84 arcsec over 2006–2010, similar to other good Chilean sites; comparisons with TMT DIMM at nearby positions reveal wind-direction-dependent differences.[^18]
- Data feed into Rubin’s Engineering and Facility Database, and are used for PSF and seeing modelling for image simulations and performance forecasts.[^19][^20]

**Public access**
- Detailed site-monitoring time series are not broadly distributed in a single curated public product; instead, derived astroclimate statistics appear in technical reports and papers.[^17][^18]


### 2.5 Cerro Tololo Inter-American Observatory (CTIO) and DES-related climatology

CTIO, in the same region as Cerro Pachón, has long-standing weather and sky-condition records.[^21][^22]

**Location and climate**
- CTIO on Cerro Tololo in northern Chile’s Coquimbo region, altitude ~2200 m, Atacama desert climate with high fraction of clear nights.[^22]

**Datasets**
- CTIO has kept human-estimated cloud-cover logs in quarters of nights since ~1975; these were analysed to assess observing efficiency for the Dark Energy Survey (DES) and to relate cloud statistics to DES data yield.[^23]
- Additional weather-station and sky-condition data (including Gemini South and other facilities on Tololo and Pachón) have been collected but are generally exposed through facility-specific portals rather than a single unified CTIO ambient database.[^23][^18]

**Temporal resolution and period**
- Cloud logs are per quarter-night, spanning several decades.[^23]
- Weather-station and seeing monitor cadences are typically 1–10 min, but full metadata and uptime fractions are not summarised publicly.

**Public availability**
- CTIO cloud logs have been used in DES internal and published analyses; raw logs are not packaged as a standalone public dataset but could be reconstructed from observatory archives.[^23]


### 2.6 SDSS / Apache Point Observatory (APO) weather and seeing data

The Sloan Digital Sky Survey (SDSS) operates from the 2.5 m telescope at APO in New Mexico.[^24][^25]

**Location and climate**
- APO on Sacramento Peak in south-central New Mexico’s Lincoln National Forest, with semi-arid, high-altitude continental climate.[^26][^24]

**Weather and observing logs**
- APO maintains regional weather pages with recent weather plots, satellite images, and forecasts, and provides night logs that include weather and seeing information for SDSS operations.[^27][^26]
- Example SDSS astrological logs show nightly observing logs with weather entries (temperature, dewpoint, winds, cloud conditions) and quality flags stored as plain text per night.[^28]

**Resolution and coverage**
- Weather logs and engineering telemetry are typically sampled at 1–5‑min cadence, but SDSS public data releases focus on science products; there is no single, curated “SDSS weather database” akin to ESO’s ambient database.

**Public availability**
- Individual log files (including weather sections) can be accessed via SDSS/Apache Point servers for specific nights; systematic extraction into a unified dataset would require custom scraping and parsing.


### 2.7 AERONET (Aerosol Robotic Network)

AERONET is a global network of standardized CIMEL sun/sky radiometers providing column aerosol optical properties and associated sky radiances.[^29][^30]

**Locations and climate coverage**
- Hundreds of sites worldwide across diverse climates; key reference sites include Mauna Loa Observatory, used as a primary calibration site.[^29]
- AERONET sites exist near many observatories or candidate sites; e.g., Mauna Loa AERONET data were used to infer circumsolar radiance relevant for daytime coronal imaging.[^31][^29]

**Period and resolution**
- Network has operated for over 25 years, with many long-running sites (e.g., Mauna Loa since ~2000 in V2/V3 databases).[^30][^31]
- Measurements are typically every 3–15 min during daylight, depending on algorithm and cloud screening.[^30]

**Variables**
- Aerosol optical depth (AOD) at multiple wavelengths (e.g., 340–1020 nm), Ångström exponent, single-scattering albedo, phase function, and inversion products for refractive index and size distribution, plus column water vapour from specific channels.[^30]

**Data quality and availability**
- Version 3 implements fully automatic cloud screening and anomaly detection, providing near-real-time quality-controlled (Level 1.5) and later Level 2.0 “quality assured” AOD; typical AOD uncertainty is about 0.02.[^30]
- Data are openly accessible via the AERONET web portal with download in text, CSV, or other formats.

**Use in astronomy**
- Studies have combined AERONET aerosol inversions with coronagraph sky brightness measurements at Mauna Loa to derive circumsolar radiance and assess sky quality for solar coronal observations, using multi-decadal AERONET time series from 2000–2025.[^31][^29]


### 2.8 Global reanalysis datasets: ERA5 and MERRA‑2

#### ERA5 / ERA5-Land (ECMWF)

ERA5 is ECMWF’s fifth-generation global atmospheric reanalysis. ERA5-Land is a derived land-surface reanalysis.[^32]

- Spatial resolution: global ~31 km grid on 137 vertical levels up to 1 Pa for atmospheric fields; ERA5-Land at ~9 km for surface variables.[^33][^32]
- Temporal resolution: hourly fields since 1950 for ERA5 and ERA5-Land, with near-real-time updates ~5 days behind real time.[^33][^32]
- Variables: a comprehensive set including temperature, winds, humidity, pressure, clouds, precipitation, PWV, and many diagnostics suitable for astroclimate (e.g., winds at 200 hPa for jet-stream seeing proxies, cloud fraction, PWV).[^32]
- Access: open via the Copernicus Climate Data Store (CDS) with free registration.[^33][^32]

ERA5 has been used to characterise current and future astroclimate at major observatories, including multi-variable comparison of in situ measurements and ERA5 at eight major sites and long-term ERA5-based IWV time series at Paranal.[^6][^4]

#### MERRA‑2 (NASA

MERRA‑2 is NASA GMAO’s modern-era reanalysis product.[^34][^35]

- Native resolution: 0.5° latitude × 0.625° longitude, 72 hybrid sigma–pressure levels.[^35][^34]
- Temporal resolution: hourly or 3‑hourly, depending on product; continuous coverage from 1980 onward.
- Variables: atmospheric state, radiation, and detailed aerosol fields, enabling joint analysis of weather and aerosol impacts on sky quality.[^34][^35]
- Access: freely available via NASA repositories (e.g., GES DISC) with Earthdata login.

MERRA‑2 is widely used in atmospheric and climate research and can support astronomical site studies where aerosol properties are relevant to sky background and extinction.


### 2.9 WRF and other NWP model outputs used in astroclimatology

The Weather Research and Forecasting (WRF) model and other mesoscale models (e.g., Meso‑NH) are extensively used to forecast or reconstruct optical turbulence and weather at observatory sites.

**Examples**
- At Observatorio del Roque de los Muchachos (ORM, La Palma), a study ran WRF with a Trinquet–Vernin turbulence parametrization, producing hourly forecasts of standard meteorological parameters and optical parameters (seeing, coherence time, isoplanatic angle) for more than 4500 h in 2009; forecasts were compared to AWS, DIMM, and MASS measurements.[^36][^37][^38]
- Meso‑NH simulations at Mt Graham (Arizona) used generalized scidar turbulence profiles from 41 nights across seasons to calibrate and validate simulations of \(C_n^2\), seeing, isoplanatic angle, and coherence time.[^39][^12]
- Mauna Kea Weather Center integrates WRF-based optical-turbulence forecasts, including seeing, \(C_n^2\), and wind profiles, into operational products for Maunakea observatories.[^12][^8]

**Resolution and usage**
- Typical WRF studies use horizontal resolutions from a few km down to sub-km nests and temporal outputs at 10–60 min, then compare to observational time series aggregated to the same temporal resolution.[^37][^36]


### 2.10 Asian and Southeast Asian observatory and site-testing datasets

While fewer long-term astroclimatology datasets are publicly documented from Asia and Southeast Asia than from Chile, Hawaii, or the Canary Islands, several relevant studies exist.

- **Timau National Observatory (Indonesia):** Weather conditions were assessed using ERA5 reanalysis from 2002–2021, deriving surface temperature, humidity, PWV, and cloud cover, and revealing near-constant ~18.9 °C temperatures with small diurnal range and relatively high PWV (>18 mm) that constrains IR observing.[^40]
- **LAMOST / Xinglong (China):** A campaign combined a DIMM and Single Star Scidar with WRF model outputs to characterise optical turbulence at the LAMOST site, enabling comparison of modelled and measured seeing and turbulence profiles.[^41]
- **Fuxian Solar Observatory (China):** Long-term measurements with a tower-based system quantified boundary-layer seeing and \(C_n^2\) profiles at multiple heights between 6–30 m, presenting detailed climatology of turbulence and its dependence on height and time of day.[^42]
- **Muztagh-ata site (western China):** An extensive analysis of optical turbulence in the atmospheric surface layer used ultrasonic anemometers at five levels on a 30‑m tower from 2021 onward, deriving \(C_n^2\) and seeing climatology (median nighttime seeing ~0.24 arcsec between 6–30 m).[^43]

These studies illustrate growing coverage in Asian high-altitude and mid-latitude sites, though tropical maritime or monsoon observatories remain relatively underrepresented.


### 2.11 Light-pollution and sky-brightness monitoring networks

#### Globe at Night and GaN‑MN

Globe at Night is a global citizen-science project in which participants report naked-eye limiting magnitude using constellation star charts; since 2006 it has amassed more than 185 000 observations from 180 countries.[^44][^45]

- Data model: each observation includes limiting magnitude estimate, location, date/time, and cloud-cover descriptors; some contributions include paired SQM readings (via handheld meters or SQM‑LE integration).[^45][^46]
- Access: yearly data releases are accessible via interactive maps and downloadable CSVs, allowing extraction by year and region; the GaN Sky Brightness Monitoring Network (GaN‑MN) extends this with a network of fixed SQM‑LE meters providing long-term, calibrated sky-brightness time series.[^47][^45]

#### TESS / STARS4ALL network

The STARS4ALL project developed TESS and TESS‑W photometers as low-cost, calibrated devices for night-sky brightness monitoring.[^48][^49][^50]

- TESS‑W uses a TSL237 photodiode with a red-extended filter relative to SQM, plus an MLX90614 IR thermometer used to estimate cloud cover; data are transmitted via Wi‑Fi using an ESP8266 microcontroller (IoT design).[^49][^48]
- The TESS network comprises ~30 stations in Central Europe and more than 250 worldwide, measuring sky brightness at zenith in mag arcsec⁻².[^50]
- Measurement cadence is typically 1 min, with real-time data publishing and open access in CSV/JSON formats.[^50]

These networks offer global context for SQM-like sky-brightness measurements and can be used to cross-calibrate local SQM data or to provide comparative benchmarks.


## 3. Multi-source data integration in the literature

### 3.1 Local sensors + NWP model output

Several studies combine in situ observatory measurements with mesoscale NWP models to forecast seeing and weather for flexible scheduling.

- At ORM, WRF forecasts were validated against Automatic Weather Station (AWS) meteorology, DIMM seeing, and MASS turbulence profiles for more than 4500 h of simulations in 2009; forecasts were hourly and compared to measured pressure, temperature, wind speed, humidity, PWV, and optical parameters.[^38][^36][^37]
- At Mt Graham, Meso‑NH simulations used scidar turbulence profiles as calibration data, providing joint analysis of \(C_n^2\) profiles and integrated astroclimatic parameters.[^39][^12]
- MKWC integrates WRF runs with local observatory weather stations and seeing monitors, generating products like cloud forecasts, PWV, seeing, and wind profiles tuned to summit needs.[^11][^12][^8]

In these cases, local time series at 1–10‑min cadence are typically aggregated to the model’s output grid (e.g., hourly means or medians) before statistical comparison or model calibration.


### 3.2 Local sensors + reanalysis (ERA5, MERRA‑2) + climate projections

Reanalysis datasets are frequently used alongside in situ observatory data.

- Haslebacher et al. combined in situ measurements at eight major observatories with ERA5 and high-resolution PRIMAVERA climate simulations to evaluate agreement in temperature, specific humidity, and PWV, then project site conditions to 2050.[^4]
- A climate-change impact study on astronomical observations at Paranal extracted IWV at the Paranal location from ERA5, complemented by ERA20C to extend the time span back to the early 20th century, and compared reanalysis-derived PWV with on-site measurements.[^6]
- A recent assessment of the AlUla Manara site in Saudi Arabia used ERA5 data for seeing, temperature, wind, cloud cover, and PWV to characterise astroclimate and then deployed a dedicated Astronomical Site Monitor to validate and refine reanalysis-based estimates.[^51][^52]

These works typically downscale ERA5 fields (e.g., bilinear interpolation to site coordinates) and focus on nightly or monthly statistics (medians, percentiles) rather than strict time-step-by-time-step alignment, which reduces sensitivity to small timing offsets between model and observations.[^51][^4][^6]


### 3.3 Local sensors + satellite imagery / radiances

Satellite data are integrated with ground-based measurements for both cloud/seeing and light-pollution analyses.

- A study estimated seeing from GOES‑12 infrared night-time data at Paranal and ORM, achieving ~90% correlation between satellite-derived and ground-based seeing values and enabling photometric night-quality forecasts based on afternoon satellite data.[^53]
- For daytime coronal observations at Mauna Loa, coronagraphic measurements of circumsolar sky brightness were compared directly with near-Sun radiances inferred from AERONET aerosol inversions, enabling extension to multi-decadal analyses using AERONET alone.[^31][^29]
- Citizen-science and SQM-based light-pollution time series (Globe at Night, GaN‑MN, Loss of the Night app, and SQM measurements) have been correlated with satellite-based night-lights products (e.g., DMSP-OLS and VIIRS) to track long-term trends in skyglow.[^54][^55][^44][^45]

These approaches involve spatial collocation (matching satellite pixels or footprints to observatory or city locations) and temporal aggregation (e.g., averaging satellite passes over a month and comparing to monthly medians of ground-based data).


### 3.4 Handling different temporal resolutions

The literature typically addresses differing temporal resolutions by:

- Aggregating higher-frequency data (e.g., 1‑min local sensors) to the coarser time grid of models or satellites (hourly or daily) using means, medians, or robust statistics before comparison, as in the ORM WRF validation and multi-decade ERA5 comparisons.[^36][^37][^4]
- Focusing on nightly, seasonal, or monthly statistics (e.g., medians of seeing, PWV, cloud fraction) when comparing reanalysis or climate simulations to in situ data, which reduces sensitivity to exact timing.[^4][^6][^51]
- For light-pollution and sky-brightness studies, integrating citizen-science observations within defined observing windows (e.g., 1–2 h after sunset, moon-free) and matching those to satellite overpass times or nightly-mean SQM/TESS data.[^54][^44][^45]

When prediction rather than climatology is the goal (e.g., nightly seeing forecast), some studies interpolate model outputs to observation times or vice versa, but they still report performance in terms of nightly or hourly aggregates.


### 3.5 Handling missing data

Common strategies for missing data include:

- Discarding nights or intervals with excessive gaps, especially where derived turbulence parameters (seeing, coherence time) require continuous windows; this is implicit in studies that only use nights with complete DIMM/MASS/AWS sets.[^37][^36]
- Using robust statistics like medians and percentiles that are less sensitive to missing intervals when computing climatologies from long time series (e.g., multi-year seeing distributions or PWV percentiles from ERA5 vs in situ data).[^43][^6][^4]
- In citizen-science datasets (Globe at Night), relying on large sample sizes and replication rather than imputing missing entries; individual missing submissions simply reduce density in time/space.[^44][^45]
- In multi-sensor networks like AERONET, using automatic quality control and flagging rather than infilling, with users choosing Level 2.0 quality-assured data for analyses that require robustness.[^30]

Explicit statistical imputation (e.g., model-based gap filling) is less common in published astroclimatology papers than discarding or down-weighting incomplete intervals.


### 3.6 Feature engineering and data fusion strategies

Feature engineering for multi-source weather data in astronomy often includes:

- Deriving turbulence proxies from standard meteorological variables, such as wind speed at 200 hPa, potential temperature gradients, or Richardson number, to relate to seeing.[^56][^36]
- Converting reanalysis or model outputs into variables directly comparable to observables (e.g., PWV from humidity profiles, synthetic sky radiance from aerosol properties).[^6][^31][^4]
- Aggregating high-frequency variability into summary statistics at physically meaningful timescales (e.g., nightly median seeing, interquartile ranges of wind or temperature) for use in ML models or climate projections.[^36][^11][^4]

Data fusion approaches include:

- **Early fusion (feature-level):** concatenating features from local sensors, NWP outputs, and satellite or reanalysis fields into a single input vector for ML models, as in Maunakea seeing forecasts using MKWC observational and forecast data.[^57][^11][^8]
- **Late fusion (decision-level):** combining separate models trained on different data sources (e.g., satellite-only vs in situ-only) via weighted averaging or voting, more common in generic data-assimilation or data-fusion literature.[^58][^59][^60]
- **Hybrid / assimilation-based fusion:** embedding remote-sensing data and conventional observations into a unified state estimate via data assimilation, as in general NWP systems underlying ERA5 and MERRA‑2, which can then be resampled at observatory locations.[^60][^34][^32]

Attention-based fusion and deep-learning architectures are increasingly common in geoscience and satellite data assimilation, but astronomy-specific seeing or sky-quality prediction frameworks remain dominated by classic feature engineering plus tree-based or shallow ML models.[^58][^57][^11]


## 4. Positioning the Quy Nhon Observatory dataset

### 4.1 Key characteristics of the Quy Nhon dataset (from user description)

- Location: Quy Nhon Observatory, coastal mountain site near 13.75° N in south-central Vietnam, tropical monsoon climate (Köppen Am) adjacent to the South China Sea.
- Period: October 2022 – March 2025 (~2.5 years).
- Temporal resolution: 1‑min sampling.
- Volume: ~1 million raw data points (likely across many channels).
- Variables: air temperature, relative humidity, dew point, station and sea-level pressure, wind speed/direction/gust, rain status and hourly/daily accumulation, SQM, NELM, lux, sky ambient and object temperature, cloud-cover estimate, vapour-pressure deficit (VPD).
- Hardware: ESP32-based custom IoT system with BME280 sensor, SQM sensor, rain gauge, wind sensors.
- Uptime: ~99.7%.

These characteristics are accepted here as given by the user.


### 4.2 Comparison with international benchmarks

#### Temporal resolution and uptime

- ESO ambient conditions: 1‑min ingested data with statistical summaries every 20 min, over ~30 years.[^1]
- TMT site testing: ~2‑min logging at night for multi-year campaigns.[^16]
- TESS network: 1‑min brightness measurements with real-time publishing since 2016.[^50]

A 1‑min cadence with ~99.7% uptime over 2.5 years is fully comparable to or finer than standard observatory meteorological monitoring and light-pollution networks, and better in uptime than many citizen-science or IoT deployments.[^45][^50]

#### Parameter set and integration

- ESO and CTIO-type site monitors provide standard meteorology and often seeing/turbulence but do not generally integrate calibrated SQM/NELM or lux sensors in a single, unified dataset; sky brightness is often derived from science images rather than dedicated monitors.[^5][^3][^23][^1]
- TMT and LSST site campaigns emphasise wind, temperature, humidity, pressure, turbulence profiles (DIMM, MASS, SODAR), and sometimes IR radiometers and all-sky cameras; light pollution and SQM-style continuous measurements are less central.[^18][^17][^13]
- TESS and GaN networks focus on sky brightness (mag arcsec⁻²) and cloud proxies (IR temperature), with limited local meteorology beyond what is necessary for operation.[^48][^49][^45][^50]

The Quy Nhon dataset’s combination of:
- full basic meteorology,
- rain accumulation,
- continuous SQM, NELM estimates, and lux,
- sky and object IR temperatures, and
- derived quantities like VPD and cloud-cover estimates

is unusually integrated compared to most observatory meteo datasets, which typically separate astroclimatology, weather, and light-pollution monitoring into distinct systems.[^50][^18][^1][^13]

#### Climatological representativeness

Most well-documented long-term observatory datasets are in arid or semi-arid climates (Atacama, Mauna Kea, Canary Islands, Arizona, New Mexico), with relatively few detailed astroclimate studies in tropical monsoon or maritime environments.
Examples of tropical or monsoon-influenced observatory analyses include Timau (Indonesia) using ERA5 and high PWV, and some Chinese plateau sites, but these are still comparatively rare.[^42][^40][^43]

Quy Nhon, as a low-latitude, coastal-mountain, tropical monsoon site, occupies a poorly sampled region of parameter space in current astroclimatology literature, making the dataset particularly valuable for comparative studies of cloud cover, PWV proxies, sky brightness, and light pollution in tropical Asia.[^61][^40]


### 4.3 Strengths of the Quy Nhon dataset

1. **High temporal resolution and uptime**
   - 1‑min resolution and ~99.7% uptime over 2.5 years yields a dense time series suitable for both short-term forecasting model training and robust climatological statistics, comparable to ESO and TESS network practices but over a distinct climate regime.[^50][^1]

2. **Rich, integrated parameter set**
   - Inclusion of both standard meteorological variables and multiple sky-quality proxies (SQM, NELM, lux, sky/object IR, cloud fraction, VPD) in a single, coherent dataset is an unusual strength compared with single-focus datasets (e.g., pure meteo, pure SQM, or pure turbulence).[^45][^50][^1][^13]

3. **Underrepresented climate and geography**
   - Tropical monsoon conditions, proximity to maritime convection, and complex coastal mountains provide a counterpoint to arid high-desert observatory sites; analogous work at Timau and some Asian plateau sites shows strong interest in non-traditional climates for astronomy.[^40][^42][^43]

4. **IoT architecture and potential for replication**
   - ESP32-based design with BME280 and SQM-like sensors parallels TESS‑W’s use of low-cost microcontrollers and IoT protocols, enabling scalable deployment of similar nodes across Vietnam and the region if desired.[^49][^48][^50]

5. **Direct relevance to both weather forecasting and light pollution monitoring**
   - The coexistence of rain and wind data, cloud proxies, and SQM/NELM/lux enables multi-objective use: forecasting observing conditions (clouds, rain, seeing proxies) and tracking long-term evolution of light pollution and natural sky brightness, similar to the dual use of Globe at Night, GaN‑MN, and TESS networks.[^54][^44][^45][^50]


### 4.4 Weaknesses and limitations

1. **Limited duration relative to multi-decade benchmarks**
   - At ~2.5 years, the dataset is shorter than multi-decade ESO ambient conditions or ERA5/AERONET reanalysis-based studies; long-term climate variability and low-frequency trends cannot be robustly assessed yet.[^32][^30][^1]

2. **Lack of vertical turbulence profiling**
   - Unlike TMT, LSST, or dedicated site-testing campaigns, the system does not include DIMM, MASS, SODAR, or scidar measurements, so it cannot directly decompose seeing into boundary-layer vs free-atmosphere contributions or provide \(C_n^2\) profiles.[^42][^43][^18][^13]

3. **Dependence on low-cost sensors**
   - BME280-class sensors are widely used but have limitations in absolute accuracy, drift, and long-term stability compared to professional observatory-grade meteorological stations (e.g., Vaisala systems at ESO); rigorous cross-calibration against a reference instrument is essential for publication-level confidence.[^48][^49][^1]

4. **Calibration and standardisation of sky-brightness measurements**
   - SQM and lux readings must be carefully calibrated and corrected for temperature, spectral response, and field-of-view differences if they are to be quantitatively compared with networks like TESS or GaN‑MN; these networks invest significantly in absolute radiometric calibration and standardised filters.[^49][^44][^5][^50]

5. **Single-site coverage**
   - As a single observatory, the dataset cannot provide regional gradients or inter-site comparisons; many multi-site campaigns (TMT, LSST, AERONET) gain strength from spatial networks.[^18][^30][^13]

6. **Unspecified formal QA/QC procedures**
   - Uptime is high, but publication will require explicit documentation of data-validation steps (range checks, spike detection, handling of sensor failures, calibration logs, versioning) akin to AERONET’s automated quality-control framework.[^30]


### 4.5 Recommended supplementary data sources for integration

To maximise scientific value and comparability, the following external datasets are recommended for fusion with the Quy Nhon time series.

1. **ERA5 / ERA5-Land at the Quy Nhon grid cell**
   - Hourly reanalysis of winds (including 200 hPa jets), temperature, humidity, PWV, and cloud fraction will allow comparison of local measurements with large-scale conditions and align the site with global analyses used at major observatories.[^33][^4][^32][^6]
   - ERA5-Land can provide high-resolution (~9 km) surface variables, enabling investigation of orographic effects and land–sea contrasts.[^33]

2. **MERRA‑2 for aerosols and independent meteorological cross-checks**
   - MERRA‑2’s aerosol and radiation diagnostics can support estimation of aerosol-driven extinction and sky background, offering an independent check on ERA5 and on local sky-brightness variations.[^35][^34]

3. **AERONET or regional aerosol observations**
   - If an AERONET station exists within a few hundred kilometres (or a new one can be deployed), joint analysis of AOD, Ångström exponent, and PWV with Quy Nhon sky-brightness and meteorological data would mirror Mauna Loa studies linking AERONET inversions and circumsolar radiance.[^29][^31][^30]

4. **Geostationary satellite cloud and convection products**
   - Himawari‑8 or similar GEO imagery over Vietnam (often used in tropical cyclone and convective studies) can supply high-frequency cloud-cover and cloud-top-temperature fields; these can be statistically related to local cloud-cover estimates, sky IR temperature, and SQM readings as in Paranal/ORM GOES‑12 seeing studies.[^53][^61]

5. **Night-time lights and light-pollution datasets**
   - VIIRS DNB night-lights products and harmonised DMSP/VIIRS global NTL datasets can provide context for regional light-pollution trends, facilitating comparisons between Quy Nhon SQM/lux time series and changes in urban lighting.[^62][^63][^55]
   - Globe at Night data and GaN‑MN records for Vietnam or nearby regions can serve as external validation for NELM and SQM-based sky-brightness assessments.[^44][^54][^45]

6. **WRF or other mesoscale model simulations**
   - Running WRF with nested grids over central Vietnam using ERA5 or MERRA‑2 boundary conditions would allow replication of ORM-style seeing and weather forecasts and evaluation of model skill against the high-cadence Quy Nhon dataset.[^37][^8][^36]


### 4.6 Is the Quy Nhon dataset publishable as a data paper?

The astroclimatology and site-testing literature includes numerous data-focused or site-characterisation papers based on shorter or comparable time spans, especially when the site is new or in an under-studied climate.
Examples include:

- Fuxian Solar Observatory boundary-layer seeing climatology.[^42]
- Optical turbulence characterisation at LAMOST/Xinglong.[^41]
- Optical turbulence in the surface layer at Muztagh-ata.[^43]
- Timau National Observatory site conditions derived from ERA5.[^40]
- Multi-site climate-change impact on observatories, where in situ datasets are combined with ERA5 and PRIMAVERA simulations.[^4]

Given these precedents, a 2.5‑year, 1‑min, multi-parameter dataset at an underrepresented tropical monsoon site with high uptime and integrated sky-quality metrics is clearly of publishable interest, provided that:

- Instrumentation, calibration procedures, and uncertainties (absolute and relative) are documented in detail, including any laboratory calibration of SQM/lux sensors and co-location tests with reference instruments.[^48][^5][^49]
- Data-processing and QA/QC pipelines are described, including handling of missing data, outliers, sensor replacements, and versioning, following good practices from networks like AERONET and TESS.[^50][^30]
- The released product includes both raw and quality-controlled data, with clear flags and metadata; open access via a persistent repository (e.g., Zenodo, institutional archive, or VO service) with a DOI is provided.
- The paper contextualises Quy Nhon’s climate and sky conditions by comparison to global benchmarks (e.g., ESO, Mauna Kea, CTIO, ERA5-based studies), highlighting both similarities and differences.[^6][^40][^4][^1]

A plausible structure for a data paper would include:

1. Site description and climatological context (using ERA5, MERRA‑2, and regional climate classifications).
2. Instrumentation and system architecture (ESP32 network, sensors, sampling, data logging, calibration).
3. Data processing and quality control (filters, flagging, gap statistics, uptime analysis).
4. Summary climatology for key variables (temperature, humidity, pressure, wind, rain, SQM, NELM, lux, cloud cover proxies, VPD) with seasonal and diurnal patterns.
5. Comparisons with selected external datasets (ERA5, regional AERONET or satellite products, potentially GaN or TESS if available).
6. Access information and usage notes for the dataset.

On this basis, the Quy Nhon dataset is suitable for a dedicated data paper in journals that publish astroclimatology, site-testing, or data-descriptor articles, especially if supplemented with ERA5-based context and, where feasible, cross-calibration against external networks.

---

## References

1. [ESO Ambient Conditions Database](https://archive.eso.org/eso/ambient-database.html) - The ESO Ambient Conditions Database includes measurements of the environmental parameter at both ESO...

2. [ESO - Ambient Conditions Database](http://archive.eso.org/cms/eso-data/ambient-conditions.html) - The ESO ambient conditions database includes measurements of environmental parameters for the La Sil...

3. [ESO TAP_OBS: a TAP service to browse and access raw and reduced data, and to query the ambient measurements, of the La Silla Paranal Observatory. Virtual Observatory Resource](https://dc.g-vo.org/rr/q/lp/custom/eso.org/tap_obs)

4. [Impact of climate change on site characteristics of eight major ...](https://centaur.reading.ac.uk/106833/9/aa42493-21.pdf) - by C Haslebacher · 2022 · Cited by 22 — DIMM-MASS seeing values measured at Paranal observatory betw...

5. [Natural Sky Brightness - ESO](http://www.eso.org/sci/facilities/paranal/astroclimate/Obsconditions/NSB.html) - ESO is the European Organisation for Astronomical Research in the Southern Hemisphere. It operates t...

6. [[PDF] The impact of climate change on astronomical observations - arXiv](https://arxiv.org/pdf/2009.11779.pdf) - Here, we extracted the IWV at the Paranal observatory location from the ERA5 reanalysis, complemente...

7. [MKWC Forecast - Mauna Kea Weather Center](http://mkwc.ifa.hawaii.edu/forecast/mko/) - No information is available for this page.

8. [[PDF] The Mauna Kea Weather Center](https://tfa.cfht.hawaii.edu/presentations/Businger_tfa_3Mar2011.pdf) - Proposal to expand MKWC service to Chile. 30. Textbook Now Available. 31. Seeing Clearly ... 2.1 Rem...

9. [Mauna Kea Weather Forecast (4205m)](https://www.mountain-forecast.com/peaks/Mauna-Kea/forecasts/4205) - The weather forecast for Mauna Kea is: A moderate fall of snow, heaviest on Mon afternoon. Temperatu...

10. [KOA Weather Service - Keck Observatory Archive](https://koa.ipac.caltech.edu/UserGuide/weather_help.html) - The Keck Observatory Archive preserves ancillary weather data for each night, including observatory-...

11. [Forecasting seeing for the Maunakea observatories with machine ...](https://academic.oup.com/mnras/article/509/1/232/6391506) - ABSTRACT. The staff at the Maunakea Weather Center (MKWC) has provided daily forecasts of optical tu...

12. [[PDF] Optical turbulence simulations at Mt Graham using the Meso ... - arXiv](https://arxiv.org/pdf/1105.2667.pdf) - optical turbulence (OT) at different astronomical sites. ... Businger, S., & Cherubini, T., Mauna Ke...

13. [Lessons learned from the TMT site testing](https://site2010.sai.msu.ru/media/doc/TTravouillon_TMT_site_testing_site2010.pdf) - ... 2 years of data at each site. Comprehensive measurement of turbulence, weather conditions, PWV a...

14. [Lessons learned from the TMT site testing campaign](https://arxiv.org/pdf/1101.3213.pdf)

15. [TMT.SiteSelectionFinalReport.08-04-08.dvi](https://sitedata.tmt.org/docs/TMT.SiteTestingFinalReport.08-04-08.pdf)

16. [[PDF] Accessing the Mauna Kea Thirty Meter Telescope Seeing & Weather ...](https://www.oir.caltech.edu/twiki_oir/pub/Keck/NGAO/NewKAONs/KAON420.pdf)

17. [Results from the LSST Site Monitoring](https://ifa.uv.cl/astromet/sitetestingdata/talks/day3/3.2)valpoLSSTsitetalk.pdf) - by S Els · Cited by 8 — DIMM is one of the site testing standard tool and delivers the total seeing ...

18. [RESULTS FROM THE LSST SITE MONITORING](https://www.astroscu.unam.mx/rmaa/RMxAC..41/PDF/RMxAC..41_sels.pdf) - by SG Els · 2011 · Cited by 8 — In 2006, the El Pe˜non summit on the Cerro Pachon mountain ridge was...

19. [Differential Image Motion Monitor (DIMM) Tower - Rubin Observatory](https://rubinobservatory.org/explore/how-rubin-works/technology/dimm) - How Differential Image Motion Monitors (DIMMs) help us figure out what's going on in the atmosphere ...

20. [Generation of realistic input parameters for simulating ...](https://arxiv.org/html/2310.10855v2) - Rubin Observatory in Chile – using weather data and historical seeing for a geographic location near...

21. [Cerro Tololo Inter-American Observatory (CTIO)](https://www.copernical.com/organisations-public/item/2145-cerro-tololo-inter-american-observatory-ctio) - The Cerro Tololo Inter-American Observatory (CTIO) is an astronomical observatory located on Cerro T...

22. [Cerro Tololo Inter-American Observatory](https://en.wikipedia.org/wiki/Cerro_Tololo_Inter-American_Observatory) - The Cerro Tololo Inter-American Observatory (CTIO) is an astronomical observatory located on the sum...

23. [Clouds at CTIO and the Dark Energy Survey](https://lss.fnal.gov/archive/test-fn/1000/fermilab-fn-1002-ae-cd.pdf) - by EH Neilsen Jr · Cited by 2 — Plots and tables here relate human recorded cloud-cover to collectio...

24. [Site](https://www.astro.princeton.edu/PBOOK/site/site.htm) - The 3.5 m data thus confirm that the seeing at APO is good enough enough of the clear time (25%) to ...

25. [Apache Point Observatory](https://www.apo.nmsu.edu) - Through our webpages, you can find information about visiting the site, local weather, our telescope...

26. [Regional Weather - Apache Point Observatory](https://www.apo.nmsu.edu/mainpage/regionalweather/) - Apache Point Observatory ... This page contains the latest weather data plots, satellite images, and...

27. [Accessing Data - Apache Point Observatory](https://www.apo.nmsu.edu/mainpage/accessingdata/) - Weather Log; Staffing Schedule. Observing Tools. UTC to MST converter · TUI Stars · Sky View · Aladi...

28. [https://sas.sdss.org/sas/dr16/apo/astrolog/52606/m...](https://sas.sdss.org/sas/dr16/apo/astrolog/52606/manualLog-full.txt) - APACHE POINT OBSERVATORY SDSS 2.5M OBSERVING LOG ... see the log. Still problem with passing S/N for...

29. [Joint Diagnostics of Circumsolar Sky Brightness Using ... - arXiv.org](https://arxiv.org/html/2603.09196v1)

30. [Advancements in the Aerosol Robotic Network (AERONET ... - AMT](https://amt.copernicus.org/articles/12/169/2019/) - Abstract. The Aerosol Robotic Network (AERONET) has provided highly accurate, ground-truth measureme...

31. [Joint Diagnostics of Circumsolar Sky Brightness Using Coronagraphic Measurements and Aerosol Optical Inversions at Mauna Loa](https://arxiv.org/abs/2603.09196) - Atmospheric aerosols strongly influence daytime sky quality for solar coronal imaging, yet few studi...

32. [ERA5 atmospheric reanalysis - Climate Data Guide](https://climatedataguide.ucar.edu/climate-data/era5-atmospheric-reanalysis)

33. [ECMWF Reanalysis v5 - Land](https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5-land) - ERA5-Land is a reanalysis dataset providing a hourly high resolution information of surface variable...

34. [MERRA-2 - Geos-chem](http://wiki.seas.harvard.edu/geos-chem/index.php/MERRA-2)

35. [MERRA-2](https://wiki.seas.harvard.edu/geos-chem/index.php/MERRA-2)

36. [Atmospheric and seeing forecast: WRF model validation with in situ ...](https://academic.oup.com/mnras/article/430/4/3102/1111310) - Other attempt was performed above the Mauna Kea observatory by use of the MM5 model (Cherubini et al...

37. [Atmospheric and seeing forecast: WRF model validation with in situ measurements at ORM](https://www.iac.edu.es/en/science-and-technology/publications/atmospheric-and-seeing-forecast-wrf-model-validation-situ-measurements-orm) - We present a comparison between in situ measurements and forecasted data at the Observatorio del Roq...

38. [Atmospheric and seeing forecast: WRF model validation ...](https://www.iac.es/es/ciencia-y-tecnologia/publicaciones/atmospheric-and-seeing-forecast-wrf-model-validation-situ-measurements-orm) - We present a comparison between in situ measurements and forecasted data at the Observatorio del Roq...

39. [Optical turbulence simulations at Mt Graham using the Meso-NH ...](https://academic.oup.com/mnras/article/412/4/2695/1022536) - ... optical turbulence above the site. The measurements are distributed ... See also the web page fo...

40. [Weather conditions at Timau National Observatory from ...](https://www.cambridge.org/core/journals/publications-of-the-astronomical-society-of-australia/article/weather-conditions-at-timau-national-observatory-from-era5/69299B159076833C3169FAA472F0DFF4) - by R Priyatikanto · 2024 · Cited by 5 — Comprehensive site testing and monitoring give valuable info...

41. [Optical Turbulence Characterization at LAMOST Site](https://arxiv.org/pdf/1505.05436.pdf) - by LY Liu · 2015 · Cited by 22 — A DIMM and a Single Star Scidar have been set up during the campaig...

42. [Climatological analysis of the seeing at Fuxian Solar ...](http://www.raa-journal.org/issues/all/2019/v19n1/202203/P020220324632159965813.pdf)

43. [Optical turbulence in the atmospheric surface layer at the Pamir ...](https://academic.oup.com/mnras/article/535/1/1193/7848605) - ABSTRACT. In this paper, we conducted a detailed analysis of optical turbulence in the atmospheric s...

44. [Citizen Science Provides Valuable Data for Monitoring ...](https://www.academia.edu/107354335/Citizen_Science_Provides_Valuable_Data_for_Monitoring_Global_Night_Sky_Luminance) - The GLOBE at Night citizen science project allows individual observers to quantify skyglow using sta...

45. [Globe at Night - Sky Brightness Monitoring Network](http://globeatnight-network.org) - A spreadsheet of the data is downloadable from any year. One can compare Globe at Night data with a ...

46. [Easy way to store SQM-L observations with GLOBE at Night](https://unihedron.com/forum/index.php?topic=41.0) - I just wanted to let everyone know that there's now an even easier way to add your SQM-L observation...

47. [My Sky at Night](http://www.myskyatnight.com) - Filterdownload csv get_app. All Years. 2006. 2007. 2008. 2009. 2010. 2011. 2012 ... The data that go...

48. [TESS-W Night Sky Brightness Photometer](https://www.instructables.com/TESS-W-Night-Sky-Brightness-Photometer/) - TESS-W is a photometer designed to measure and continuous monitoring the night sky brightness for li...

49. [STARS4ALL Night Sky Brightness Photometer](https://lightingjournal.org/index.php/path/article/download/21/24/74) - by J Zamorano · 2016 · Cited by 64 — TESS-W connects to a router via WIFI and it sends automatically...

50. [TESS Network – STARS4ALL - DARKERSKY4CE - INAF](https://darkersky4ce.inaf.it/instrument-sheet-tess-network-stars4all/) - The project developed the TESS photometers, a family of new devices to measure the night sky brightn...

51. [Assessment of the AlUla Manara astronomical site in Saudi Arabia using ECMWF ERA5 Reanalysis data](https://arxiv.org/abs/2507.15572) - As part of Saudi Arabia Vision 2030 and under the guidance of the Royal Commission for AlUla (RCU), ...

52. [Assessment of the AlUla Manara astronomical site in Saudi Arabia ...](https://arxiv.org/html/2507.15572v1)

53. [evaluation of seeing using satellite-based data - Bohrium](https://www.bohrium.com/paper-details/site-testing-at-astronomical-sites-evaluation-of-seeing-using-satellite-based-data/813355043649486848-524) - Download the full PDF of Site testing at astronomical sites: evaluation of seeing using. Includes co...

54. [Visualizing Light Pollution Data with SQLite and Datasette](https://www.bswanson.dev/blog/visualizing-globe-at-night-data-sqlite-datasette) - How I created data visualizations with Globe At Night's open light pollution dataset—and what they s...

55. [Harmonized Global Night Time Lights (1992-2021)](https://gee-community-catalog.org/projects/hntl/) - This temporally extended DMSP NTL dataset provides valuable support for various studies related to h...

56. [Astronomical seeing with DIMM and wind-speed distributions with ...](https://academic.oup.com/mnras/article/539/3/2077/8115784) - 2020), the Llano de Chajnantor (Atacama), and the Cerro Paranal (Antofagasta) (Valeria, Martínez-Led...

57. [Assimilation of Transformed Retrievals From Satellite High ...](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022JD038153) - This work was conducted at the Mauna Kea Weather Center (MKWC) in Hawaii. ... An operational perspec...

58. [[PDF] Data Fusion through Synergy of Data Assimilation and Remote ...](https://www.star.nesdis.noaa.gov/data/star_docs/meetings/2018JPSSAnnual/Thursday/5_0_Garrett_LunctimeBB_DataFusion_v2.pdf)

59. [PowerPoint Presentation](https://www.star.nesdis.noaa.gov/star/documents/meetings/2018JPSSAnnual/Thursday/5_0_Garrett_LunctimeBB_DataFusion_v2.pdf)

60. [Real-Time Weather and Atmospheric Characterization Data](https://ccsds.org/Pubs/140x1g2.pdf) - “Experimental Verification of Optical Backhaul Links for. High-Altitude Platform Networks: Atmospher...

61. [Remote sensing and analysis of tropical cyclones - ScienceDirect.com](https://www.sciencedirect.com/science/article/pii/S2225603223000553) - Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASAA). Himawari-8 r...

62. [Nighttime Lights](https://www.earthdata.nasa.gov/topics/human-dimensions/nighttime-lights) - Get Nighttime Lights Data. Access a range of datasets and data tools to further your nighttime light...

63. [nightlights data - National Centers for Environmental Information](https://ngdc.noaa.gov/eog/download.html) - No information is available for this page.

