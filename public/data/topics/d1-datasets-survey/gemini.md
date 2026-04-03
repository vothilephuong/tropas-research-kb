# **Comprehensive Evaluation and Benchmarking of Astronomical Meteorological Datasets: A Global and Regional Perspective**

## **Introduction to Astroclimatology and Site Characterization**

The precise characterization of atmospheric and meteorological conditions is a foundational requirement for both the selection of astronomical observatory sites and the dynamic scheduling of observational queues. As ground-based astronomy advances toward extremely large telescopes and massive synoptic surveys, the margin for error introduced by atmospheric turbulence, water vapor absorption, and cloud cover has necessitated a paradigm shift. Observatories no longer rely solely on reactive weather monitoring; instead, they integrate high-frequency local sensor data, global satellite imagery, and Numerical Weather Prediction (NWP) models to facilitate predictive astroclimatology.

The evaluation of a localized, high-resolution dataset requires a rigorous benchmarking process against established international standards. By surveying the methodologies, temporal resolutions, parameter scopes, and data-sharing architectures of apex observatories (such as Paranal, Mauna Kea, and Cerro Tololo) alongside regional Southeast Asian facilities, a comprehensive framework emerges. This report provides an exhaustive analysis of major astronomical weather datasets, explores the state-of-the-art in multi-source machine learning data fusion, and delivers a nuanced evaluation of an independent dataset collected at the Quy Nhon Observatory in Vietnam, assessing its scientific value and publication viability.

## **1\. European Southern Observatory (ESO) Ambient Conditions Database**

The European Southern Observatory (ESO) maintains one of the most comprehensive ambient conditions databases in the world, covering the Paranal, La Silla, and Chajnantor (APEX) sites in Northern Chile.1 Located in the hyper-arid Atacama Desert, these sites represent the pinnacle of stable, dry astronomical environments. The ESO dataset provides an uninterrupted, highly calibrated stream of meteorological and atmospheric turbulence data, publicly accessible via a web-based query interface.2

| Feature | ESO Paranal & La Silla Ambient Conditions |
| :---- | :---- |
| **Name & Source** | ESO Ambient Conditions Database (European Southern Observatory).1 |
| **Geographic Location & Climate** | Northern Chile (Atacama Desert); Hyper-arid desert climate (Köppen BWk). Paranal elevation: \~2600m.1 |
| **Time Period** | August 1998 to present.3 |
| **Temporal Resolution** | 1-minute averages for most ground sensors; high-frequency integration for turbulence.4 |
| **Total Data Points** | Tens of millions of records (continuous 1-minute logging over 25+ years).4 |
| **Parameters Measured** | Ambient/Dew Temp (\~0.1°C accuracy), Relative Humidity (1% linearity), Air Pressure, Particle Counts, Wind Speed/Dir (\~2% accuracy), MASS-DIMM Seeing, Coherence Time, Isoplanatic Angle, Turbulence Altitude/Velocity, Liquid Water Path, PWV.4 |
| **Data Quality & Uptime** | Exceptionally high uptime with systematic obsolescence management. Maximum operational wind speeds capped at 18m/s.4 |
| **Sky Quality / SQM** | Sky brightness temperature is measured via LHATPRO radiometers; monthly photometric fractions recorded.5 |
| **Public Availability** | Publicly accessible via the ESO Science Archive Facility (SAF).7 |
| **Related Publications** | Extensively used in VLT/E-ELT site testing, including predictive modeling by Haslebacher et al. (2022).6 |
| **DOI / Download Link** | http://archive.eso.org/cms/eso-data/ambient-conditions.html.1 |

In April 2016, the Paranal Astronomical Site Monitoring (ASM) system underwent a major upgrade to support advanced adaptive optics requirements, replacing older Differential Image Motion Monitors (DIMM) with integrated Multi-Aperture Scintillation Sensor (MASS)-DIMM instruments and SLOpe Detection And Ranging (SLODAR) telescopes.5 This dataset demonstrates the critical importance of vertical atmospheric profiling. While surface-level temperature and wind speed dictate dome operations, it is the integration of the LHATPRO microwave radiometer—which profiles precipitable water vapor (PWV) using the 183 GHz emission line—that enables precision infrared astronomy.6 The continuous logging of 1-minute averages establishes a high-frequency baseline necessary for modeling rapid microclimate shifts.

## **2\. Mauna Kea Weather Center (MKWC) Data**

Mauna Kea in Hawaii is highly regarded for its stable atmospheric boundary layer and minimal light pollution. The Mauna Kea Weather Center (MKWC) provides not only archival data but heavily utilizes the Weather Research and Forecasting (WRF) model and the MM5 mesoscale model to generate specialized optical turbulence forecasts.10

| Feature | Mauna Kea Weather Center (MKWC) Archive |
| :---- | :---- |
| **Name & Source** | MKWC Archive (University of Hawaii Institute for Astronomy).12 |
| **Geographic Location & Climate** | Mauna Kea, Hawaii, USA; High-altitude alpine/tundra climate, elevation \~4200m.13 |
| **Time Period** | Historical archives span decades (1990-present for station data, 1999-present for models).14 |
| **Temporal Resolution** | Hourly and nightly averages (8pm to 4am HST), 00/12 UTC cycles for forecasts.10 |
| **Total Data Points** | Millions of composite records (34 complete years of point and gridded data).15 |
| **Parameters Measured** | Temp, RH, Barometric Pressure, Wind Speed/Dir, Optical Turbulence (Cn2), Seeing, PWV (via 225 GHz and 183 GHz radiometers), Vertical Wind Shear, Potential Temp.6 |
| **Data Quality & Uptime** | Highly curated; integrated via the Hawaiʻi Climate Data Portal (HCDP) with quality-controlled metrics.15 |
| **Sky Quality / SQM** | Uses all-sky cameras (CONCAM) and 10-micron cirrus monitors.18 |
| **Public Availability** | Open source and freely available to noncommercial users.15 |
| **Related Publications** | Cherubini et al. 2008 (JAMC); Businger et al. 2002; Lyman et al. 2020\.14 |
| **DOI / Download Link** | http://mkwc.ifa.hawaii.edu/archive/.12 |

The MKWC methodology is notable for its integration of the Local Analysis and Prediction System (LAPS) to assimilate local sensor data into WRF models, providing a blueprint for generating actionable seeing forecasts.10 The MKWC relies on information regarding turbulence kinetic energy provided by planetary boundary layer schemes to estimate the turbulent fluctuations of the atmospheric refractive index and seeing over the summit area.14

## **3\. Cerro Tololo Inter-American Observatory (CTIO)**

Located in the Coquimbo Region of Chile, the Cerro Tololo Inter-American Observatory (CTIO) provides crucial datasets for time-domain astronomy. The historical weather logs from CTIO are invaluable for understanding long-term climatological impacts on optical astronomy.

| Feature | Cerro Tololo Meteorological Data |
| :---- | :---- |
| **Name & Source** | CTIO Environmental Conditions Archive (NOIRLab / AURA).19 |
| **Geographic Location & Climate** | Coquimbo Region, Chile; Arid, high-altitude desert, elevation \~2200m.19 |
| **Time Period** | Historical cloud records since 1975; DIMM/MASS data active since the early 2000s.21 |
| **Temporal Resolution** | Quarters of nights (historical cloud logs); continuous sub-minute logging for modern DIMM/MASS.6 |
| **Total Data Points** | Over 28,000 low-resolution turbulence profiles combined with decades of weather logs.22 |
| **Parameters Measured** | Temp, Wind Speed/Dir, RH, DIMM seeing, MASS turbulence profiles, Weather Loss statistics.6 |
| **Data Quality & Uptime** | Weather loss ranges from 15.3% to 33.4% of science time annually. Strict wind closure protocols (\>15 mph).23 |
| **Sky Quality / SQM** | RASICAM (radiometric all-sky IR camera) monitors optical depth of clouds and photometricity.20 |
| **Public Availability** | Internal VPN for live feeds; historical aggregates available via NOIRLab archives.20 |
| **Related Publications** | Flaugher et al. 2015 (DES performance); Tokovinin & Kornilov 2002\.21 |
| **DOI / Download Link** | http://139.229.13.222/web/CTIO/environ\_dimm2.php (Internal).24 |

The CTIO dataset provides a highly pragmatic metric for observatories: "weather loss" statistics. Studies comparing historical cloud cover to actual operational efficiency reveal that ground-layer turbulence (the first 500 meters) contributes up to 60% of the total turbulence integral at the site.22 The deployment of RASICAM, an infrared all-sky camera, allows CTIO to detect the optical depth of clouds autonomously, removing human bias from photometric assessments.20

## **4\. LSST / Vera C. Rubin Observatory Site Characterization Data**

Adjacent to CTIO is the Vera C. Rubin Observatory (formerly LSST), positioned on Cerro Pachón. As the observatory prepares for its decade-long Legacy Survey of Space and Time, its approach to environmental data is arguably the most sophisticated in modern astronomy.

| Feature | Rubin Observatory Engineering Facility Database |
| :---- | :---- |
| **Name & Source** | Rubin Observatory Data Preview 1 (DP1) / EFD.25 |
| **Geographic Location & Climate** | Cerro Pachón, Chile; Arid, high-altitude desert, elevation 2682m.27 |
| **Time Period** | Late 2024 (DP1 release) to present.25 |
| **Temporal Resolution** | Sub-minute telemetry logging via the Engineering Facility Database (EFD).26 |
| **Total Data Points** | \~10 million alerts/night, 20TB/night generated during operations.28 |
| **Parameters Measured** | Complete technical telemetry, weather logs, all-sky camera, seeing, PSF FWHM.25 |
| **Data Quality & Uptime** | Unprecedented fidelity; DP1 median seeing 1.13 arcseconds across 15 sq. degrees.25 |
| **Sky Quality / SQM** | Derived from comprehensive focal plane calibrations and all-sky imagery.25 |
| **Public Availability** | DP1 is restricted to data rights holders via the Rubin Science Platform (RSP); weather metadata is public.29 |
| **Related Publications** | Ivezić et al. 2019 (LSST Science Drivers); DP1 Technical Notes.25 |
| **DOI / Download Link** | 10.71929/rubin/2570308.30 |

The Rubin Observatory treats meteorological data not merely as an operational constraint, but as crucial metadata required for the systematic correction of science pixels during post-processing. The primary repository, the Engineering Facility Database (EFD), captures time-dependent housekeeping data and non-telemetry records simultaneously with every 30-second science exposure.26 This ensures that any atmospheric degradation can be mapped directly to specific imaging artifacts.

## **5\. TMT Site Testing Campaign Data**

The Thirty Meter Telescope (TMT) site testing campaign represents one of the most exhaustive comparative astroclimatology studies ever conducted. Between 2003 and 2008, the TMT project deployed identical instrument suites across five candidate sites to ensure objective evaluation.33

| Feature | TMT Site Testing Campaign |
| :---- | :---- |
| **Name & Source** | TMT Site Testing Data (TMT Observatory Corporation).33 |
| **Geographic Location & Climate** | Mauna Kea 13N (Hawaii); Cerro Tolar, Armazones, Tolonchar (Chile); San Pedro Mártir (Mexico).34 |
| **Time Period** | 2003 to 2008 (5-year continuous campaign).35 |
| **Temporal Resolution** | Continuous measurements; aggregate median profiles calculated for comparative analysis.34 |
| **Total Data Points** | Comprehensive 5-year multi-site high-frequency logs.35 |
| **Parameters Measured** | Cloud cover, 30m tower wind/temp, DIMM seeing, MASS, SODAR turbulence profiles, Dust/Particle concentration, IRMA PWV, ASCA.33 |
| **Data Quality & Uptime** | Highly rigorous; instruments were side-by-side cross-calibrated.38 |
| **Sky Quality / SQM** | All-Sky Cameras (ASCA) assessed light pollution and usable photometric time.33 |
| **Public Availability** | Initially restricted, with subset data published through site selection reports.33 |
| **Related Publications** | Schoeck et al. 2009 (PASP); Travouillon et al. 2011; Els et al. 2007\.35 |
| **DOI / Download Link** | 10.1086/599287 39; 10.48550/arXiv.1101.3213.35 |

A critical insight derived from the TMT campaign is the necessity of rigorous calibration when managing acoustic boundary layer sensors. Raw turbulence data from acoustic sounders (SODAR) required complex post-processing and calibration against kinetic heat flux measurements to yield quantitative profiles of the temperature fluctuation constant (![][image1]), which dictates boundary-layer seeing.40

## **6\. Sloan Digital Sky Survey (SDSS) Weather Logs**

Operating primarily from the Apache Point Observatory (APO) in New Mexico, the Sloan Digital Sky Survey (SDSS) pioneered automated environmental data logging to support robotic spectrographic surveys.

| Feature | SDSS Weather Logs (Apache Point Observatory) |
| :---- | :---- |
| **Name & Source** | SDSS Night Logs and Weather Data (Astrophysical Research Consortium).41 |
| **Geographic Location & Climate** | Sunspot, New Mexico, USA; Montane forest climate, elevation 2800m.42 |
| **Time Period** | 1998 to present (SDSS Phases I through V).41 |
| **Temporal Resolution** | Continuous robotic telemetry and nightly aggregate logs (idWeather.par).44 |
| **Total Data Points** | Decades of continuous multi-instrument telemetry encompassing over 930,000 galaxy records.41 |
| **Parameters Measured** | Cloud detection via 10km all-sky camera, transparency, extinction coefficients, wind, temperature, humidity.46 |
| **Data Quality & Uptime** | High reliability, managed by an unsupervised software robot that automatically rejects cloudy data.46 |
| **Sky Quality / SQM** | Derived empirically via real-time extinction coefficient calculations from photometric standards.46 |
| **Public Availability** | Open access via the Science Archive Server (SAS) and Catalog Archive Server (CAS).44 |
| **Related Publications** | Gunn et al. 2006; Nidever et al. 2015\.49 |
| **DOI / Download Link** | http://das.sdss.org/nightly/.44 |

The SDSS architecture utilizes an unsupervised software "robot" that automatically reduces and analyzes photometric standards in real time. This robot integrates data from an all-sky 10km camera to detect clouds, automatically rejecting photometric data taken under compromised conditions without human intervention.46

## **7\. AERONET (Aerosol Robotic Network) Near Observatories**

Local in situ measurements are inherently limited by their geographic footprint. To establish synoptic context regarding atmospheric extinction, astronomical datasets are frequently augmented with federated remote sensing networks like AERONET.

| Feature | AERONET (Aerosol Robotic Network) |
| :---- | :---- |
| **Name & Source** | AERONET (NASA Goddard Space Flight Center / PHOTONS).51 |
| **Geographic Location & Climate** | Global network, including high-altitude observatories (e.g., Mauna Loa, Izaña).51 |
| **Time Period** | 1993 to present.52 |
| **Temporal Resolution** | \~15 minutes during daylight hours.54 |
| **Total Data Points** | Millions of continuous multi-spectral observations globally.51 |
| **Parameters Measured** | Aerosol Optical Depth (AOD) at multiple wavelengths (340-1640nm), PWV, Angstrom Parameter, Lunar AOD.51 |
| **Data Quality & Uptime** | Rigorous quality control: Level 1.0 (unscreened), Level 1.5 (cloud-screened), Level 2.0 (quality-assured).52 |
| **Sky Quality / SQM** | Directly relates to sky transparency and extinction via AOD and phase functions.57 |
| **Public Availability** | Open access via NASA Data Portal and web services.52 |
| **Related Publications** | Smirnov et al. 2000; Dubovik et al. 2000; Giles et al. 2019\.56 |
| **DOI / Download Link** | http://aeronet.gsfc.nasa.gov/.52 |

AERONET utilizes CIMEL and Microtops II sun photometers to measure the extinction of direct beam spectral solar radiation.53 For nighttime astronomical observations, AERONET recently introduced a Lunar AOD product. This relies on the Robotic Lunar Observatory (ROLO) irradiance model to provide highly accurate nighttime aerosol monitoring during the bright half of the lunar phase cycle, a critical advancement for observatories measuring time-domain extinction.51

## **8\. ERA5 Reanalysis Data (ECMWF)**

Reanalysis datasets combine historical observations with advanced NWP models to generate a consistent, spatially complete representation of past atmospheric conditions, filling the physical gaps between ground sensors.

| Feature | ERA5 Atmospheric Reanalysis |
| :---- | :---- |
| **Name & Source** | ERA5 (European Centre for Medium-Range Weather Forecasts \- ECMWF / Copernicus).59 |
| **Geographic Location & Climate** | Global coverage.60 |
| **Time Period** | January 1940 to present (updated daily with a 5-day latency).59 |
| **Temporal Resolution** | Hourly estimates.59 |
| **Total Data Points** | Petabytes of gridded spatial-temporal data.61 |
| **Parameters Measured** | Temp, Humidity, Pressure, Wind (U/V), Cloud Cover, Precipitation, Geopotential Height.6 |
| **Data Quality & Uptime** | 31km horizontal grid (0.25° x 0.25°), 137 vertical levels up to 80km. Includes 3-hourly uncertainty estimates.59 |
| **Sky Quality / SQM** | Can derive theoretical photometricity via total cloud cover and total column water metrics.6 |
| **Public Availability** | Open access via the Copernicus Climate Data Store (CDS API).63 |
| **Related Publications** | Hersbach et al. 2020 (Q.J.R. Meteorol. Soc.).65 |
| **DOI / Download Link** | 10.1002/qj.3803.65 |

ERA5 is widely utilized in astroclimatology because it bridges the gap between ground-based sensors and Global Circulation Models (GCMs).6 It provides robust estimates of variables at various pressure levels, making it invaluable for simulating atmospheric turbulence, jet stream velocity, and precipitable water vapor when local radiosondes are absent.6

## **9\. MERRA-2 Reanalysis Data (NASA)**

The Modern-Era Retrospective analysis for Research and Applications, Version 2 (MERRA-2), is NASA's premier atmospheric reanalysis product.

| Feature | MERRA-2 Reanalysis |
| :---- | :---- |
| **Name & Source** | MERRA-2 (NASA Global Modeling and Assimilation Office \- GMAO).66 |
| **Geographic Location & Climate** | Global coverage.66 |
| **Time Period** | 1980 to present.66 |
| **Temporal Resolution** | Hourly.66 |
| **Total Data Points** | Terabytes of netCDF4 gridded data.66 |
| **Parameters Measured** | Aerosol Optical Depth (AOD), Dust PM2.5, Black Carbon, Sea Salt, Sulfate, Air Temp, Geopotential Height, PWV.66 |
| **Data Quality & Uptime** | 0.5° latitude by 0.625° longitude grid, 72 vertical levels.66 |
| **Sky Quality / SQM** | Aerosol assimilation directly impacts transparency and sky glow models.67 |
| **Public Availability** | Open access via NASA Goddard Earth Sciences (GES) DISC.69 |
| **Related Publications** | Gelaro et al. 2017 (J. Clim.).70 |
| **DOI / Download Link** | 10.1175/JCLI-D-16-0758.1 70; 10.5067/VJAFPLI1CSIV.71 |

A unique strength of MERRA-2 in the context of astronomical site characterization is its assimilation of space-based aerosol observations. It accurately represents the interaction between aerosols and physical climate processes, providing robust reanalysis data for dust, sea salt, black carbon, and sulfate.67 This is highly beneficial for observatories modeling the degradation of atmospheric transparency due to regional biomass burning or industrial pollution.67

## **10\. WRF Model Output in Astronomical Studies**

The Weather Research and Forecasting (WRF) model is not a static dataset but a next-generation mesoscale NWP system utilized by observatories to generate high-resolution local predictions.

* **Application:** Observatories like the Mauna Kea Weather Center use WRF integrated with the Local Analysis and Prediction System (LAPS) to assimilate local sensor data, generating custom seeing and turbulence forecasts.10  
* **Southeast Asian Context:** The National Astronomical Research Institute of Thailand (NARIT) utilizes WRF-Chem models to simulate atmospheric flow and optimize optical turbulence profiles for observation scheduling, specifically accounting for mesoscale vortex structures and regional pollution.73 The output of these models provides essential vertical profiles (temperature, wind shear) that surface sensors cannot capture.

## **11\. Asian and Southeast Asian Observatory Datasets**

When evaluating a dataset collected in Vietnam, it is vital to benchmark it against regional peers operating in similar climatic regimes, where extreme precipitation and high humidity are persistent challenges.

| Feature | Southeast Asian Astronomical Datasets (Bosscha, NARIT, SACA\&D) |
| :---- | :---- |
| **Name & Source** | Bosscha Observatory (Indonesia), NARIT (Thailand), SACA\&D.74 |
| **Geographic Location & Climate** | Tropical Monsoon/Equatorial (Köppen Am/Af). Elevations: Bosscha (1300m), Doi Inthanon (\~2400m).73 |
| **Time Period** | Bosscha SQM: 2011–2018; SACA\&D: 1981-present.75 |
| **Temporal Resolution** | Nightly SQM (Bosscha); Daily extremes (SACA\&D).75 |
| **Total Data Points** | Bosscha: 1,692 nightly records. SACA\&D: 11,887 series across 10,066 stations.75 |
| **Parameters Measured** | SQM (mag/arcsec²), Temp, Precip, RH, Solar Radiation, PBL Height, AOD via MODIS MAIAC.62 |
| **Data Quality & Uptime** | Often plagued by missing data due to hardware failures in high-humidity environments, requiring heavy imputation.78 |
| **Sky Quality / SQM** | Bosscha utilizes portable photometers; NARIT utilizes EASMNet for RGB sky classification.74 |
| **Public Availability** | SACA\&D is 17% public for non-commercial use.76 Observatory datasets are generally restricted/published via papers. |
| **Related Publications** | Herdiwijaya et al. 2020 (Bosscha Sky Brightness).75 |

The Bosscha Observatory in Indonesia conducted a comprehensive seven-year study (2011–2018) yielding 1,692 nightly SQM records, revealing median sky brightness values of 19.73 mag/arcsec² heavily influenced by the tropical coupled climate system.75 Due to the scarcity of high-resolution ground sensors, Southeast Asian researchers heavily rely on spatial data development, integrating ERA5 reanalysis and MODIS MAIAC satellite data to model AOD and PWV.77 At NARIT, recognizing the challenges of automated sky condition classification in thick humidity, researchers deployed the EASMNet (EfficientNet-Attention-SPP Multi-scale Network), a physics-aware deep learning framework processing hemispherical all-sky imagery.74

## **12\. Globe at Night and TESS-W Light Pollution Networks**

Light pollution monitoring has been democratized through global citizen science initiatives and IoT-enabled sensor networks, moving beyond isolated observatory measurements.

| Feature | Globe at Night & TESS-W Networks |
| :---- | :---- |
| **Name & Source** | Globe at Night (NOAO) / TESS-W (STARS4ALL).79 |
| **Geographic Location & Climate** | Global, crowdsourced deployment.79 |
| **Time Period** | 2006 to present.81 |
| **Temporal Resolution** | TESS-W streams at 0.143 Hz (7s) to 1-minute intervals.82 |
| **Total Data Points** | Hundreds of thousands of visual and photometric measurements annually.81 |
| **Parameters Measured** | Visual limiting magnitude, Zenithal SQM (mag/arcsec²), Ambient Temp, Cloud Cover (via IR sensor in TESS-W).83 |
| **Data Quality & Uptime** | High variable quality. TESS-W utilizes dichroic filters for extended red bandpass accuracy.85 |
| **Sky Quality / SQM** | The foundational metric of the entire network.81 |
| **Public Availability** | Fully open source. GaN-MN data available via CSV; TESS-W available via live MQTT brokers and Grafana panels.79 |
| **Related Publications** | Zamorano et al. 2016; Bará et al. 2019 (Sensors).79 |
| **DOI / Download Link** | https://globeatnight.org/maps-data/.81 |

The Sky Quality Meter (SQM) produced by Unihedron is the industry standard for measuring zenithal night sky brightness.87 The TESS-W improves upon the basic SQM by incorporating a dichroic filter to extend the bandpass into the red range, and an infrared MLX90614ESF-BA thermometer module to independently estimate cloud cover.84 These devices publish data via MQTT protocols to central brokers, allowing for real-time, highly granular spatial mapping of regional light pollution without human intervention.79

## **13\. Multi-Source Data Integration in the Literature**

The modern paradigm of astronomical weather forecasting relies on multi-source data integration. Observatories must fuse local IoT sensor data, numerical weather prediction (NWP) outputs, and satellite imagery to generate highly accurate nowcasts of atmospheric stability, visibility, and cloud cover.88

### **Handling Resolution Discrepancies and Missing Data**

A primary challenge in multi-source integration is the temporal and spatial misalignment of datasets. Local IoT sensors generate data at minute-intervals, whereas satellite passes may occur twice daily, and NWP outputs (like ERA5) are provided hourly on a \~31km grid.59

To resolve these discrepancies, researchers employ rigorous interpolation and imputation techniques. Studies dealing with meteorological forecasting in Southeast Asia successfully applied Last Observation Carried Forward (LOCF), Nearest Observation Carried Backward (NOCB), and k-nearest neighbors (KNN) to bridge missing data gaps in high-resolution time-series data.78 Furthermore, spatial mismatches are commonly addressed by extracting the nearest grid points from reanalysis datasets and applying lapse-rate corrections to adjust for altitude differences between the model's topography and the actual sensor elevation.68

### **Feature Engineering Strategies**

Effective feature engineering transforms raw meteorological variables into predictive vectors. Literature utilizing WRF and local sensors often engineer secondary thermodynamic variables. For example, vertical wind shear is calculated between the 600 mb and 200 mb pressure levels to predict high-altitude turbulence.17 Vapor Pressure Deficit (VPD) is derived from ambient temperature and relative humidity, serving as a highly sensitive proxy for atmospheric moisture stress and potential condensation on optics. Rather than relying solely on absolute values, machine learning models (like LightGBM and XGBoost) benefit significantly from the inclusion of temporal gradient features (e.g., 1-hour, 3-hour, and 6-hour deltas) to capture the trajectory of incoming weather fronts and predict severe visibility drops.90

### **Data Fusion Techniques**

The synthesis of multi-modal data (e.g., 1D time-series sensor data \+ 2D satellite imagery \+ 3D NWP volume data) requires advanced neural network architectures.88 The literature identifies three primary methodologies:

1. **Early Fusion (Feature-Level):** Raw data from satellites, NWP models, and local sensors are interpolated to a common temporal grid, concatenated into a single high-dimensional vector, and fed into a machine learning algorithm. While computationally straightforward, this approach struggles when the signal-to-noise ratio of the datasets is highly variable, often masking local sensor signals beneath dominant stochastic meteorology.91  
2. **Late Fusion (Decision-Level):** Independent models are trained on separate modalities (e.g., a Convolutional Neural Network for satellite cloud imagery and a recurrent network for local telemetry). The final predictions of these sub-models are then aggregated. The Boosting-based Fusion Model (BFM), which fuses RAEMS numerical outputs with MODIS AOD and local sensor data, utilizes this approach to dramatically improve visibility forecasting over standard NWP models.90 This approach is highly robust against missing data streams.  
3. **Attention-Based Fusion:** State-of-the-art forecasting models (such as DFMM-Precip) employ attention mechanisms to dynamically weigh the importance of different data modalities based on the current meteorological context.93 During a rapidly developing convective storm, an attention mechanism will automatically assign higher weights to real-time satellite infrared imagery and local barometric pressure drops, temporarily suppressing the influence of slower-moving NWP forecasts.93 Distance-attention frameworks using Nadaraya-Watson kernels have also been effectively utilized to fuse sparse, heterogeneous ground sensor data with continuous gridded models, optimizing the spatial influence of isolated sensors.94

## **14\. Evaluation of the Quy Nhon Observatory Dataset**

Against this backdrop of international benchmarks and advanced fusion methodologies, the custom dataset collected at the Quy Nhon Observatory presents a compelling case study.

| Feature | Quy Nhon Observatory Dataset |
| :---- | :---- |
| **Period Covered** | October 2022 – March 2025 (\~2.5 years). |
| **Temporal Resolution** | 1-minute intervals. |
| **Total Data Points** | \~1 million raw records. |
| **Parameters Measured** | Temperature, humidity, dew point, pressure (station \+ sea level), wind speed/direction/gust, rain status/accumulation, SQM, NELM, lux, sky ambient/object temperature, cloud cover estimate, VPD. |
| **Hardware** | ESP32-based custom IoT system (BME280, SQM sensor, rain gauge, wind sensors). |
| **Location & Climate** | 13.75°N, Coastal mountain, Tropical monsoon climate (Köppen Am). |
| **Data Quality / Uptime** | \~99.7% uptime. |

### **Strengths of the Dataset**

**1\. Exceptional Temporal Resolution:** The 1-minute logging interval matches the highest standards of top-tier facilities like the ESO Paranal Observatory.4 This granularity is exceedingly rare in Southeast Asian datasets, where hourly averages or daily extremes are the norm (as seen in the SACA\&D database).76 It allows for the precise tracking of micro-climatic shifts, sudden wind gusts, and rapid condensation events common in coastal mountain environments.

**2\. Outstanding Uptime and Consistency:** Achieving a 99.7% continuous uptime over 2.5 years using a custom ESP32 IoT system is a remarkable engineering feat. Established observatories often face significant data gaps due to sensor failure or extreme weather; CTIO reports technical and weather losses ranging from 15% to 33% annually.23 This consistency makes the dataset highly suitable for training recurrent neural networks (RNNs) and LSTM models, which degrade rapidly when fed fragmented time-series data.95

**3\. Integration of Photometric and Thermodynamic Variables:** By concurrently logging standard meteorological data alongside direct photometric indicators (SQM, NELM, lux) and advanced thermodynamic variables (VPD, infrared sky temperature), the dataset provides a holistic view of the observing environment. The inclusion of an IR cloud cover estimate mimics the highly successful methodology of the TESS-W photometer 84, allowing for the automated filtering of photometric data without relying on subjective human observer logs.

**4\. Unique Climatological Context:**

The vast majority of heavily profiled astronomical sites exist in arid deserts (Chile) or above the atmospheric inversion layer (Hawaii). High-resolution, multi-parameter datasets from Tropical Monsoon (Köppen Am) coastal mountains are severely underrepresented in the astroclimatology literature. This dataset fills a critical geographical and climatological gap, providing insights into boundary layer behaviors entirely distinct from traditional observatories.

### **Weaknesses and Vulnerabilities**

**1\. Limited Longitudinal Baseline:** While 1 million data points offer deep granular insight, the 2.5-year span is climatologically brief. Standard atmospheric baseline studies require 10 to 30 years of continuous data to account for macro-level phenomena such as the El Niño-Southern Oscillation (ENSO), which profoundly impacts cloud cover, aerosol distribution, and rainfall in Southeast Asia.96

**2\. Absence of Vertical Turbulence Profiling:** Top-tier datasets (such as TMT and ESO) heavily utilize MASS, DIMM, and SODAR instruments to measure high-altitude optical turbulence and the vertical profile of the refractive index (![][image2]).5 The Quy Nhon dataset relies exclusively on ground-level sensors. Without DIMM measurements, calculating the actual optical degradation (seeing in arcseconds) caused by the local boundary layer versus the free atmosphere is impossible.22

**3\. Sensor Calibration Uncertainties:** While the BME280 is a reliable commercial sensor, it lacks the scientific-grade linearity and precision of the specialized instruments deployed at major observatories (e.g., the 0.1°C accuracy and 1% humidity linearity required by ESO).4 Without documented cross-calibration against standard meteorological station equipment or radiosondes, the absolute accuracy of the extremes (e.g., behavior during 99% humidity events) may be subject to non-linear drift.

### **Recommendations for Supplementary Integration**

To elevate this dataset to an international benchmarking standard and compensate for its localized nature, the following supplementary integrations are highly recommended utilizing late-fusion or attention-based machine learning architectures:

* **NWP Integration via ERA5:** Downscale ERA5 hourly single-level and pressure-level reanalysis data for the 13.75°N grid cell.59 This will provide the missing vertical profiles of temperature and wind shear, enabling the derivation of approximated seeing using boundary layer kinetic energy models (similar to the MKWC MM5 approach).11  
* **Aerosol Optical Depth (AOD) via MERRA-2 or AERONET:** Incorporate MERRA-2 aerosol reanalysis or locate the nearest Southeast Asian AERONET station to append AOD values.51 Coastal tropical environments are highly susceptible to marine aerosols and regional biomass burning, which silently degrade atmospheric transparency and alter SQM readings.67  
* **Satellite Cloud Imagery:** Utilize geostationary satellite infrared imagery (e.g., Himawari-8/9) to validate the local IR sky temperature cloud estimates, fulfilling the "multi-source fusion" paradigm to predict incoming weather fronts.90

### **Viability as a Published Data Paper**

The Quy Nhon Observatory dataset is highly viable for publication as a standalone data descriptor in reputable journals such as *Nature Scientific Data*, *Earth System Science Data*, or the *Journal of Astronomical Instrumentation*.

Journals focusing on data descriptors do not require groundbreaking scientific discoveries; rather, they require the dataset to be scientifically valuable, methodologically rigorous, and strictly adherent to FAIR (Findable, Accessible, Interoperable, and Reusable) principles.97

To ensure successful publication, the manuscript must thoroughly document:

1. The hardware architecture, sensor specifications, and the exact placement/elevation of the instruments.  
2. The calibration procedures used to validate the BME280 and SQM sensors against known standards or radiometric models.99  
3. The data processing pipeline, clearly defining how the 99.7% uptime was achieved and how the remaining 0.3% of missing data was flagged or imputed.  
4. The hosting of the raw data on a repository that issues a persistent Digital Object Identifier (DOI), such as Zenodo, InvenioRDM, or Dryad.97

By publishing this dataset, the Quy Nhon Observatory will provide the global astroclimatology community with a much-needed, high-resolution benchmark for tropical, low-altitude coastal environments, laying the groundwork for future machine-learning-driven observation scheduling in complex climates worldwide.

#### **Nguồn trích dẫn**

1. Ambient Conditions Database \- ESO Archive, truy cập vào tháng 3 23, 2026, [http://archive.eso.org/cms/eso-data/ambient-conditions.html](http://archive.eso.org/cms/eso-data/ambient-conditions.html)  
2. ASM Database \- ESO, truy cập vào tháng 3 23, 2026, [https://www.eso.org/sci/facilities/paranal/astroclimate/ASMDatabase.html](https://www.eso.org/sci/facilities/paranal/astroclimate/ASMDatabase.html)  
3. La Silla Astroclimatology \- Eso.org, truy cập vào tháng 3 23, 2026, [https://www.eso.org/sci/facilities/lasilla/astclim.html](https://www.eso.org/sci/facilities/lasilla/astclim.html)  
4. ESO Ambient Conditions Database, truy cập vào tháng 3 23, 2026, [https://archive.eso.org/eso/ambient-database.html](https://archive.eso.org/eso/ambient-database.html)  
5. Paranal Ambient Query Forms \- ESO Archive, truy cập vào tháng 3 23, 2026, [http://archive.eso.org/cms/eso-data/ambient-conditions/paranal-ambient-query-forms.html](http://archive.eso.org/cms/eso-data/ambient-conditions/paranal-ambient-query-forms.html)  
6. Impact of climate change on site characteristics of eight major astronomical observatories using high-resolution global climate \- CentAUR, truy cập vào tháng 3 23, 2026, [https://centaur.reading.ac.uk/106833/9/aa42493-21.pdf](https://centaur.reading.ac.uk/106833/9/aa42493-21.pdf)  
7. ESO \- Archive Home, truy cập vào tháng 3 23, 2026, [http://archive.eso.org/](http://archive.eso.org/)  
8. OWL-TRE-ESO-0000-0001 Issue 2, truy cập vào tháng 3 23, 2026, [https://www.eso.org/sci/facilities/eelt/owl/Blue\_Book/OWL\_Blue\_Book\_II.pdf](https://www.eso.org/sci/facilities/eelt/owl/Blue_Book/OWL_Blue_Book_II.pdf)  
9. Volume Table of Contents \- SPIE Digital Library, truy cập vào tháng 3 23, 2026, [https://www.spiedigitallibrary.org/conference-proceedings-of-SPIE/9145.toc](https://www.spiedigitallibrary.org/conference-proceedings-of-SPIE/9145.toc)  
10. The Mauna Kea Weather Center, truy cập vào tháng 3 23, 2026, [https://tfa.cfht.hawaii.edu/presentations/Businger\_tfa\_3Mar2011.pdf](https://tfa.cfht.hawaii.edu/presentations/Businger_tfa_3Mar2011.pdf)  
11. Modeling Optical Turbulence and Seeing over Mauna Kea\* \- American Meteorological Society, truy cập vào tháng 3 23, 2026, [https://journals.ametsoc.org/view/journals/apme/47/4/2007jamc1487.1.pdf](https://journals.ametsoc.org/view/journals/apme/47/4/2007jamc1487.1.pdf)  
12. MAUNAKEA COMPREHENSIVE MANAGEMENT PLAN OUTCOME ANALYSIS REPORT \- Department of Land and Natural Resources \- Hawaii.gov, truy cập vào tháng 3 23, 2026, [https://dlnr.hawaii.gov/occl/files/2021/11/OAR-Final-2021-08-19.pdf](https://dlnr.hawaii.gov/occl/files/2021/11/OAR-Final-2021-08-19.pdf)  
13. The Sites | Gemini Observatory, truy cập vào tháng 3 23, 2026, [https://www.gemini.edu/observing/telescopes-and-sites/sites](https://www.gemini.edu/observing/telescopes-and-sites/sites)  
14. Modeling Optical Turbulence and Seeing over Mauna Kea: Verification and Algorithm Refinement\* \- American Meteorological Society, truy cập vào tháng 3 23, 2026, [https://journals.ametsoc.org/view/journals/apme/47/12/2008jamc1839.1.pdf](https://journals.ametsoc.org/view/journals/apme/47/12/2008jamc1839.1.pdf)  
15. The Hawai'i Climate Data Portal (HCDP) in \- AMS Journals \- American Meteorological Society, truy cập vào tháng 3 23, 2026, [https://journals.ametsoc.org/view/journals/bams/105/7/BAMS-D-23-0188.1.xml](https://journals.ametsoc.org/view/journals/bams/105/7/BAMS-D-23-0188.1.xml)  
16. Weather Archive Mauna Kea \- meteoblue, truy cập vào tháng 3 23, 2026, [https://www.meteoblue.com/en/weather/historyclimate/weatherarchive/mauna-kea\_united-states\_5850911](https://www.meteoblue.com/en/weather/historyclimate/weatherarchive/mauna-kea_united-states_5850911)  
17. Forecasting seeing for the Maunakea observatories with machine learning | Monthly Notices of the Royal Astronomical Society | Oxford Academic, truy cập vào tháng 3 23, 2026, [https://academic.oup.com/mnras/article/509/1/232/6391506](https://academic.oup.com/mnras/article/509/1/232/6391506)  
18. Mauna Kea Weather \- Gemini Observatory |, truy cập vào tháng 3 23, 2026, [https://webarchive.gemini.edu/sciops/telescope/telMKWeather.html](https://webarchive.gemini.edu/sciops/telescope/telMKWeather.html)  
19. Cerro Tololo Inter-American Observatory (MSO-CTIO) \- NOIRLab, truy cập vào tháng 3 23, 2026, [https://noirlab.edu/science/programs/ctio](https://noirlab.edu/science/programs/ctio)  
20. Cerro Tololo Weather | NOIRLab Science, truy cập vào tháng 3 23, 2026, [https://noirlab.edu/science/observing-noirlab/weather-webcams/cerro-tololo](https://noirlab.edu/science/observing-noirlab/weather-webcams/cerro-tololo)  
21. Clouds at CTIO and the Dark Energy Survey, truy cập vào tháng 3 23, 2026, [https://lss.fnal.gov/archive/test-fn/1000/fermilab-fn-1002-ae-cd.pdf](https://lss.fnal.gov/archive/test-fn/1000/fermilab-fn-1002-ae-cd.pdf)  
22. Statistics of turbulence profile at Cerro Tololo | Monthly Notices of the Royal Astronomical Society | Oxford Academic, truy cập vào tháng 3 23, 2026, [https://academic.oup.com/mnras/article/340/1/52/1130015](https://academic.oup.com/mnras/article/340/1/52/1130015)  
23. SOAR Observing Statistics | NOIRLab Science, truy cập vào tháng 3 23, 2026, [https://noirlab.edu/science/observing-noirlab/observing-ctio/observing-soar/observing-statistics](https://noirlab.edu/science/observing-noirlab/observing-ctio/observing-soar/observing-statistics)  
24. Bad weather protocol at CTIO | NOIRLab Science, truy cập vào tháng 3 23, 2026, [https://noirlab.edu/science/observing-noirlab/observing-ctio/cerro-tololo/bad-weather-protocol-at-ctio](https://noirlab.edu/science/observing-noirlab/observing-ctio/cerro-tololo/bad-weather-protocol-at-ctio)  
25. RTN-095: The Vera C. Rubin Observatory Data Preview 1 (Dataset) \- OSTI, truy cập vào tháng 3 23, 2026, [https://www.osti.gov/dataexplorer/biblio/dataset/2570536](https://www.osti.gov/dataexplorer/biblio/dataset/2570536)  
26. Construction Completeness and Operations Readiness Criteria | SITCOMTN-005 \- lsst.io, truy cập vào tháng 3 23, 2026, [https://sitcomtn-005.lsst.io/SITCOMTN-005.pdf](https://sitcomtn-005.lsst.io/SITCOMTN-005.pdf)  
27. Vera C. Rubin Observatory \- Wikipedia, truy cập vào tháng 3 23, 2026, [https://en.wikipedia.org/wiki/Vera\_C.\_Rubin\_Observatory](https://en.wikipedia.org/wiki/Vera_C._Rubin_Observatory)  
28. LSST Data Science Overview, truy cập vào tháng 3 23, 2026, [https://issc.science.lsst.org/pages/DataScienceOverview.html](https://issc.science.lsst.org/pages/DataScienceOverview.html)  
29. Vera C. Rubin Observatory Data Policy | RDO-13 ( v1.2.5) \- DocuShare \- LSST.org, truy cập vào tháng 3 23, 2026, [https://docushare.lsst.org/docushare/dsweb/Get/RDO-013](https://docushare.lsst.org/docushare/dsweb/Get/RDO-013)  
30. Vera C. Rubin Observatory Data Preview 1 (DP1) — DP1, truy cập vào tháng 3 23, 2026, [https://dp1.lsst.io/](https://dp1.lsst.io/)  
31. Future data products | Rubin Observatory, truy cập vào tháng 3 23, 2026, [https://rubinobservatory.org/for-scientists/data-products/planned-data-products](https://rubinobservatory.org/for-scientists/data-products/planned-data-products)  
32. Key numbers | Rubin Observatory, truy cập vào tháng 3 23, 2026, [https://rubinobservatory.org/for-scientists/rubin-101/key-numbers](https://rubinobservatory.org/for-scientists/rubin-101/key-numbers)  
33. TMT SITE TESTING FINAL REPORT, truy cập vào tháng 3 23, 2026, [https://sitedata.tmt.org/docs/TMT.SiteTestingFinalReport.08-04-08.pdf](https://sitedata.tmt.org/docs/TMT.SiteTestingFinalReport.08-04-08.pdf)  
34. Turbulence and wind speed profiles for simulating the TMT AO performances, truy cập vào tháng 3 23, 2026, [https://ao4elt.edpsciences.org/articles/ao4elt/pdf/2010/01/ao4elt\_03001.pdf](https://ao4elt.edpsciences.org/articles/ao4elt/pdf/2010/01/ao4elt_03001.pdf)  
35. \[1101.3213\] Lessons learned from the TMT site testing campaign \- arXiv.org, truy cập vào tháng 3 23, 2026, [https://arxiv.org/abs/1101.3213](https://arxiv.org/abs/1101.3213)  
36. The Multi Aperture Scintillation Sensor (MASS) used in the site selection of the Thirty Meter Telescope (TMT) | Request PDF \- ResearchGate, truy cập vào tháng 3 23, 2026, [https://www.researchgate.net/publication/241579003\_The\_Multi\_Aperture\_Scintillation\_Sensor\_MASS\_used\_in\_the\_site\_selection\_of\_the\_Thirty\_Meter\_Telescope\_TMT](https://www.researchgate.net/publication/241579003_The_Multi_Aperture_Scintillation_Sensor_MASS_used_in_the_site_selection_of_the_Thirty_Meter_Telescope_TMT)  
37. Instruments Used During TMT Site Testing, truy cập vào tháng 3 23, 2026, [https://sitedata.tmt.org/Available\_data/instruments.html](https://sitedata.tmt.org/Available_data/instruments.html)  
38. STATUS OF THE TMT SITE EVALUATION PROCESS \- Instituto de Astronomía \- UNAM, truy cập vào tháng 3 23, 2026, [https://www.astroscu.unam.mx/rmaa/RMxAC..31/PDF/RMxAC..31\_mschoeck.pdf](https://www.astroscu.unam.mx/rmaa/RMxAC..31/PDF/RMxAC..31_mschoeck.pdf)  
39. \[0904.1183\] Thirty Meter Telescope Site Testing I: Overview \- arXiv.org, truy cập vào tháng 3 23, 2026, [https://arxiv.org/abs/0904.1183](https://arxiv.org/abs/0904.1183)  
40. SODAR Calibration for turbulence profiling in TMT site testing \- ResearchGate, truy cập vào tháng 3 23, 2026, [https://www.researchgate.net/publication/252246266\_SODAR\_Calibration\_for\_turbulence\_profiling\_in\_TMT\_site\_testing](https://www.researchgate.net/publication/252246266_SODAR_Calibration_for_turbulence_profiling_in_TMT_site_testing)  
41. Sloan Digital Sky Survey (SDSS), truy cập vào tháng 3 23, 2026, [https://classic.sdss.org/home.php](https://classic.sdss.org/home.php)  
42. Apache Point Observatory : Facilities, Operations, and Partnerships \- The National Academies of Sciences, Engineering, and Medicine, truy cập vào tháng 3 23, 2026, [https://www8.nationalacademies.org/astro2010/DetailFileDisplay.aspx?id=438](https://www8.nationalacademies.org/astro2010/DetailFileDisplay.aspx?id=438)  
43. Sloan Digital Sky Survey \- Wikipedia, truy cập vào tháng 3 23, 2026, [https://en.wikipedia.org/wiki/Sloan\_Digital\_Sky\_Survey](https://en.wikipedia.org/wiki/Sloan_Digital_Sky_Survey)  
44. Sloan Digital Sky Survey Data Processing and Products, truy cập vào tháng 3 23, 2026, [https://classic.sdss.org/dr7/algorithms/dataProcessing.php](https://classic.sdss.org/dr7/algorithms/dataProcessing.php)  
45. The Imaging Pipeline \- SDSS, truy cập vào tháng 3 23, 2026, [https://www.sdss4.org/dr12/imaging/the-imaging-pipeline/](https://www.sdss4.org/dr12/imaging/the-imaging-pipeline/)  
46. A Photometricity and Extinction Monitor at the Apache Point Observatory \- Harvard DASH, truy cập vào tháng 3 23, 2026, [https://dash.harvard.edu/bitstreams/7312037e-0e85-6bd4-e053-0100007fdf3b/download](https://dash.harvard.edu/bitstreams/7312037e-0e85-6bd4-e053-0100007fdf3b/download)  
47. CFHT Weather Main \- Canada France Hawaii Telescope, truy cập vào tháng 3 23, 2026, [https://www.cfht.hawaii.edu/ObsInfo/Weather/](https://www.cfht.hawaii.edu/ObsInfo/Weather/)  
48. Data Access \- Sloan Digital Sky Survey (SDSS), truy cập vào tháng 3 23, 2026, [https://www.sdss.org/dr19/data\_access/](https://www.sdss.org/dr19/data_access/)  
49. APOGEE \- SDSS Documentation \- MAST \- STScI Outerspace, truy cập vào tháng 3 23, 2026, [https://outerspace.stsci.edu/spaces/SDSS/pages/286852469/APOGEE](https://outerspace.stsci.edu/spaces/SDSS/pages/286852469/APOGEE)  
50. Technical Publications \- Sloan Digital Sky Survey (SDSS), truy cập vào tháng 3 23, 2026, [https://www.sdss.org/science/publications/technical-publications/](https://www.sdss.org/science/publications/technical-publications/)  
51. Aerosol Robotic Network (AERONET) Homepage, truy cập vào tháng 3 23, 2026, [https://aeronet.gsfc.nasa.gov/](https://aeronet.gsfc.nasa.gov/)  
52. Aeronet AOD \- Dataset \- NASA Open Data Portal, truy cập vào tháng 3 23, 2026, [https://data.nasa.gov/dataset/aeronet-aod](https://data.nasa.gov/dataset/aeronet-aod)  
53. NASA AERONET (Aerosol Robotic Network) \- Mauna Loa Observatory \- NOAA Global Monitoring Laboratory, truy cập vào tháng 3 23, 2026, [https://gml.noaa.gov/obop/mlo/programs/coop/nasa/aeronet/aeronet.html](https://gml.noaa.gov/obop/mlo/programs/coop/nasa/aeronet/aeronet.html)  
54. NASA AERONET Data \- AppalAIR, truy cập vào tháng 3 23, 2026, [https://appalair.appstate.edu/aerosol-research-program/nasa-aeronet-data](https://appalair.appstate.edu/aerosol-research-program/nasa-aeronet-data)  
55. Data \- Aerosol Robotic Network (AERONET) Homepage, truy cập vào tháng 3 23, 2026, [https://aeronet.gsfc.nasa.gov/new\_web/man\_data.html](https://aeronet.gsfc.nasa.gov/new_web/man_data.html)  
56. Advancements in the Aerosol Robotic Network (AERONET) Version 3 database – automated near-real-time quality control algorithm with improved cloud screening for Sun photometer aerosol optical depth (AOD) measurements \- AMT, truy cập vào tháng 3 23, 2026, [https://amt.copernicus.org/articles/12/169/2019/](https://amt.copernicus.org/articles/12/169/2019/)  
57. AERONET's Version 2.0 quality assurance criteria, truy cập vào tháng 3 23, 2026, [https://aeronet.gsfc.nasa.gov/new\_web/PDF/AERONETcriteria\_final1.pdf](https://aeronet.gsfc.nasa.gov/new_web/PDF/AERONETcriteria_final1.pdf)  
58. AERONET Inversion Products (Version 3), truy cập vào tháng 3 23, 2026, [https://aeronet.gsfc.nasa.gov/new\_web/Documents/Inversion\_products\_for\_V3.pdf](https://aeronet.gsfc.nasa.gov/new_web/Documents/Inversion_products_for_V3.pdf)  
59. ERA5 atmospheric reanalysis \- Climate Data Guide, truy cập vào tháng 3 23, 2026, [https://climatedataguide.ucar.edu/climate-data/era5-atmospheric-reanalysis](https://climatedataguide.ucar.edu/climate-data/era5-atmospheric-reanalysis)  
60. ERA5 hourly data on single levels from 1940 to present \- Climate Data Store \- Copernicus, truy cập vào tháng 3 23, 2026, [https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels)  
61. ERA5 hourly data on single levels from 1940 to present \- Climate Data Store, truy cập vào tháng 3 23, 2026, [https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels?tab=download](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels?tab=download)  
62. Development of Meteorological Criteria for Classifying PM2.5 Risk in a Coastal Industrial Province in Thailand \- Aerosol and Air Quality Research, truy cập vào tháng 3 23, 2026, [https://aaqr.org/articles/aaqr-23-12-oa-0321](https://aaqr.org/articles/aaqr-23-12-oa-0321)  
63. ECMWF Reanalysis v5 (ERA5), truy cập vào tháng 3 23, 2026, [https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5](https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5)  
64. Complete ERA5 global atmospheric reanalysis \- Climate Data Store, truy cập vào tháng 3 23, 2026, [https://cds.climate.copernicus.eu/datasets/reanalysis-era5-complete?tab=d\_download](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-complete?tab=d_download)  
65. ERA5 Reanalysis (Select Events) ... — VEDA Dashboard \- NASA Earthdata, truy cập vào tháng 3 23, 2026, [https://www.earthdata.nasa.gov/dashboard/data-catalog/blizzard-era5](https://www.earthdata.nasa.gov/dashboard/data-catalog/blizzard-era5)  
66. NASA's MERRA2 reanalysis \- Climate Data Guide, truy cập vào tháng 3 23, 2026, [https://climatedataguide.ucar.edu/climate-data/nasas-merra2-reanalysis](https://climatedataguide.ucar.edu/climate-data/nasas-merra2-reanalysis)  
67. Spatial and Temporal Distribution of PM 2.5 Pollution over Northeastern Mexico: Application of MERRA-2 Reanalysis Datasets \- MDPI, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/2072-4292/12/14/2286](https://www.mdpi.com/2072-4292/12/14/2286)  
68. Characterizing long-term astroclimate parameters at the Muztagh-Ata site in the Pamir plateau with ERA5 and MERRA-2 data | Monthly Notices of the Royal Astronomical Society | Oxford Academic, truy cập vào tháng 3 23, 2026, [https://academic.oup.com/mnras/article/535/4/3543/7901347](https://academic.oup.com/mnras/article/535/4/3543/7901347)  
69. Data Access \- GMAO \- Modern-Era Retrospective analysis for Research and Applications, Version 2, truy cập vào tháng 3 23, 2026, [https://gmao.gsfc.nasa.gov/gmao-products/merra-2/data-access\_merra-2/](https://gmao.gsfc.nasa.gov/gmao-products/merra-2/data-access_merra-2/)  
70. Documentation \- GMAO \- Modern-Era Retrospective analysis for Research and Applications, Version 2, truy cập vào tháng 3 23, 2026, [https://gmao.gsfc.nasa.gov/gmao-products/merra-2/documentation\_merra-2/](https://gmao.gsfc.nasa.gov/gmao-products/merra-2/documentation_merra-2/)  
71. Global Modeling and Assimilation Office MERRA-2: File Specification \- NASA GMAO, truy cập vào tháng 3 23, 2026, [https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich785.pdf](https://gmao.gsfc.nasa.gov/pubs/docs/Bosilovich785.pdf)  
72. Modern-Era Retrospective analysis for Research and Applications, Version 2 \- NASA GMAO, truy cập vào tháng 3 23, 2026, [https://gmao.gsfc.nasa.gov/gmao-products/merra-2/](https://gmao.gsfc.nasa.gov/gmao-products/merra-2/)  
73. Seeing and turbulence profile simulations over complex terrain at the Thai National Observatory using a chemistry-coupled regional forecasting model | Monthly Notices of the Royal Astronomical Society | Oxford Academic, truy cập vào tháng 3 23, 2026, [https://academic.oup.com/mnras/article/530/2/1414/7627457](https://academic.oup.com/mnras/article/530/2/1414/7627457)  
74. Day–Night All-Sky Scene Classification with an Attention-Enhanced EfficientNet \- MDPI, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/2220-9964/15/2/66](https://www.mdpi.com/2220-9964/15/2/66)  
75. Measurements of sky brightness at Bosscha Observatory, Indonesia \- ResearchGate, truy cập vào tháng 3 23, 2026, [https://www.researchgate.net/publication/343737781\_Measurements\_of\_sky\_brightness\_at\_Bosscha\_Observatory\_Indonesia](https://www.researchgate.net/publication/343737781_Measurements_of_sky_brightness_at_Bosscha_Observatory_Indonesia)  
76. Home Southeast Asian Climate Assessment & Dataset, truy cập vào tháng 3 23, 2026, [https://sacad.bmkg.go.id/](https://sacad.bmkg.go.id/)  
77. Machine learning-based spatial data development for optimizing ..., truy cập vào tháng 3 23, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10588834/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10588834/)  
78. Enhancing PM 2.5 prediction coverage in Northern Thailand using ground station information assisted with aerosol optical depth a \- TU e-Thesis (Thammasat University), truy cập vào tháng 3 23, 2026, [http://ethesisarchive.library.tu.ac.th/thesis/2023/TU\_2023\_6522040564\_19029\_28439.pdf](http://ethesisarchive.library.tu.ac.th/thesis/2023/TU_2023_6522040564_19029_28439.pdf)  
79. . TESS photometers | Night Sky Brightness photometers for Light Pollution studies \- GUAIX \- Universidad Complutense de Madrid, truy cập vào tháng 3 23, 2026, [https://guaix.fis.ucm.es/tess/](https://guaix.fis.ucm.es/tess/)  
80. Globe At Night: Home, truy cập vào tháng 3 23, 2026, [https://globeatnight.org/](https://globeatnight.org/)  
81. Maps & Data \- Globe At Night, truy cập vào tháng 3 23, 2026, [https://globeatnight.org/maps-data/](https://globeatnight.org/maps-data/)  
82. Long-term trends of light pollution assessed from SQM measurements and an empirical atmospheric model \- Oxford Academic, truy cập vào tháng 3 23, 2026, [https://academic.oup.com/mnras/article/518/3/4449/6764726](https://academic.oup.com/mnras/article/518/3/4449/6764726)  
83. How to conduct a night sky quality survey | DarkSky International, truy cập vào tháng 3 23, 2026, [https://darksky.org/resources/guides-and-how-tos/how-to-conduct-a-night-sky-quality-survey/](https://darksky.org/resources/guides-and-how-tos/how-to-conduct-a-night-sky-quality-survey/)  
84. TESS-W Night Sky Brightness Photometer \- Instructables, truy cập vào tháng 3 23, 2026, [https://www.instructables.com/TESS-W-Night-Sky-Brightness-Photometer/](https://www.instructables.com/TESS-W-Night-Sky-Brightness-Photometer/)  
85. Astrotourism and Night Sky Brightness Forecast: First Probabilistic Model Approach \- MDPI, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/1424-8220/19/13/2840](https://www.mdpi.com/1424-8220/19/13/2840)  
86. Absolute Radiometric Calibration of TESS-W and SQM Night Sky Brightness Sensors, truy cập vào tháng 3 23, 2026, [https://www.researchgate.net/publication/331848261\_Absolute\_Radiometric\_Calibration\_of\_TESS-W\_and\_SQM\_Night\_Sky\_Brightness\_Sensors](https://www.researchgate.net/publication/331848261_Absolute_Radiometric_Calibration_of_TESS-W_and_SQM_Night_Sky_Brightness_Sensors)  
87. Light pollution measurement \- Globe at Night \- Sky Brightness Monitoring Network, truy cập vào tháng 3 23, 2026, [http://globeatnight-network.org/lp-measurement.html](http://globeatnight-network.org/lp-measurement.html)  
88. Deep learning-based astronomical multimodal data fusion: A comprehensive review \- arXiv, truy cập vào tháng 3 23, 2026, [https://arxiv.org/html/2603.00699v1](https://arxiv.org/html/2603.00699v1)  
89. ERA5-Land hourly data from 1950 to present \- NSF Arctic Data Center, truy cập vào tháng 3 23, 2026, [https://arcticdata.io/catalog/view/doi%3A10.18739%2FA2RX93G07](https://arcticdata.io/catalog/view/doi%3A10.18739%2FA2RX93G07)  
90. Application of Machine-Learning-Based Fusion Model in Visibility Forecast: A Case Study of Shanghai, China \- MDPI, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/2072-4292/13/11/2096](https://www.mdpi.com/2072-4292/13/11/2096)  
91. Machine Learning for Sensor Analytics: A Comprehensive Review and Benchmark of Boosting Algorithms in Healthcare, Environmental, and Energy Applications \- PMC, truy cập vào tháng 3 23, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12694449/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12694449/)  
92. Development of Hourly Resolution Air Temperature Across Titicaca Lake on Auxiliary ERA5 Variables and Machine Learning-Based Gap-Filling \- PMC, truy cập vào tháng 3 23, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12693869/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12693869/)  
93. DFMM-Precip: Deep Fusion of Multi-Modal Data for Accurate Precipitation Forecasting, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/2073-4441/16/24/3702](https://www.mdpi.com/2073-4441/16/24/3702)  
94. Data fusion of sparse, heterogeneous, and mobile sensor devices using adaptive distance attention | Environmental Data Science \- Cambridge University Press & Assessment, truy cập vào tháng 3 23, 2026, [https://www.cambridge.org/core/journals/environmental-data-science/article/data-fusion-of-sparse-heterogeneous-and-mobile-sensor-devices-using-adaptive-distance-attention/14F5F461955D8FCBBAF0EEA3D29E45D2](https://www.cambridge.org/core/journals/environmental-data-science/article/data-fusion-of-sparse-heterogeneous-and-mobile-sensor-devices-using-adaptive-distance-attention/14F5F461955D8FCBBAF0EEA3D29E45D2)  
95. Interpolation and Machine Learning Methods for Sub-Hourly Missing Rainfall Data Imputation in a Data-Scarce Environment: One- and Two-Step Approaches \- MDPI, truy cập vào tháng 3 23, 2026, [https://www.mdpi.com/2306-5338/12/11/297](https://www.mdpi.com/2306-5338/12/11/297)  
96. Search \- NASA SVS, truy cập vào tháng 3 23, 2026, [https://svs.gsfc.nasa.gov/search/?search=%22Cambodia%22](https://svs.gsfc.nasa.gov/search/?search=%22Cambodia%22)  
97. Data Availability Statements | Publish your research \- Springer Nature, truy cập vào tháng 3 23, 2026, [https://www.springernature.com/gp/authors/research-data-policy/data-availability-statements](https://www.springernature.com/gp/authors/research-data-policy/data-availability-statements)  
98. Towards FAIR Astrophysical Simulations \- arXiv, truy cập vào tháng 3 23, 2026, [https://arxiv.org/html/2602.08416v1](https://arxiv.org/html/2602.08416v1)  
99. Absolute Radiometric Calibration of TESS-W and SQM Night Sky Brightness Sensors \- PMC, truy cập vào tháng 3 23, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6470928/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6470928/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAXCAYAAAD+4+QTAAABaklEQVR4Xt2UzytEURTHjx8b+bEYPxbKj2JWVmzYWVrZkbFnwXYUpUR2spElZWtLZKn4G2wom1F+lJIwKPE9nXfd8477ZOqN4lOf5p5z7rvnzn3dR/RHqIOTcNYW0mQo+q2G7zCvaiVRDytsErTDR9gcxdzk1Je/pw2+kjy0C0fhAryEffDJT6VGNeb5OypOhCeyDbYAmuADSd0yDLdsMsQEyQIrtqDYgDc2Ca5hpU1ankkauPNNIgenVFwDj1V8oMYx+kkaFG0hwKCJeXMFeEHy/Ha87NknafKjM1X0kn+HzqXYDIWbkLWFNOEGdxS+C6nBTQ5tMsAt+RteMnxL30i+Q0m0wnEV78Fz2AO7SDbaDTvgWhTHmIuSiybvqIVHJncFW1SsF83AexV/wv/GNeLdOGbgMqxSOaZTjXlR/oY5BuCmir8wAufhKpw2tSTWSU6jrJyQXOiyMUaBl5w2Z/QLTbjBi03+Tz4AtbhK3KhE4v0AAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAABZUlEQVR4XtWUPS8FQRSGXx8RkagUGpGIxi1EhEqBUqFQoxEViU6n8RF+AImPToheRyehEG4nURMRQSORqAjeuWc29+zZlR13r8KTPLkz75mc3Z29O8A/YJmu0XpbyMsWnaXb9NrUgmgy8zrvAf1SuRt3qXkqfZCFzj06Q9fpG230eY9f2+l/HR9I3kgMt3/v9IJ2m1ovvaUvtDZeKqGfIsEKZMGkLSjchedtCNmiNhtqXONNGxpuaL/JlmjRZDEukfFYnnMzH4G8h4h2NS5xCmm8aPIsjlB+8ZEJosKALVSDH69aDUKbN9AWG2YR2vzMBiHcQ5qnfRgR05B1v6aZXtEHW/AMQZrnYgPyBJ+QLXilO0j/8gr0kY7RfXpMF2IrUhiHnC+rdMLUNIf0hD6jfIi5m8pNK+2AnIK7Kg/5UwTjmk2p+ZMa5+ZOjefoICr8u1rcPo+q+TDkjKpRWcWkNUmciH/GNyHfSf2Ma0sDAAAAAElFTkSuQmCC>