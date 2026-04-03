# Intelligent Forecasting Systems for Astronomical Observatory Operations

## Executive summary

This report reviews intelligent forecasting systems used in astronomical observatory operations, with emphasis on ESO Paranal/ELT, Rubin Observatory/LSST, the TMT and E-ELT site campaigns, smaller robotic observatories, and the operational role of Sky Quality Meter (SQM) networks.
It focuses on data sources, prediction methods (physical NWP and ML/DL), reported accuracy, and how forecasts are integrated into scheduling.

## 1. ESO Paranal: Astronomical Site Monitor and forecasting ecosystem

### 1.1 ASM instrumentation and data sources

The Astronomical Site Monitor (ASM) at Paranal is a permanently installed suite of instruments providing continuous monitoring of meteorological and astroclimatic parameters for safety, engineering, and science operations.[^1][^2][^3]
The upgraded ASM integrates a DIMM for integrated seeing, a MASS for free-atmosphere turbulence, a SLODAR for ground-layer turbulence profiling, a water‑vapour radiometer, a refurbished weather tower, and seismic monitoring.[^2][^4]
Meteorological measurements include temperature, humidity, pressure, and wind at the platform; astroclimate outputs include integrated seeing, ground‑layer fraction, coherence time, isoplanatic angle, precipitable water vapour (PWV), and sky transparency flags.[^3][^1][^2]
All ASM data are streamed in real time into an ambient conditions relational database that can be queried for operations and long‑term statistics.[^5][^3]

### 1.2 ESO meteorological forecasts based on global models

ESO has used ECMWF global forecasts operationally for Paranal and La Silla since the 1990s, with fields refreshed every six hours and one‑hour resolution out to 90 h and three‑hour resolution out to seven days.[^6][^7]
Classic work by Damiani et al. ("Meteorological forecasting for the European Southern Observatory", Nuovo Cimento) compared ECMWF analyses and 24–48 h forecasts against Paranal and La Silla surface stations and Chilean radiosondes, finding mean absolute errors of roughly 1.3–1.7 °C in 24‑h 2 m temperature forecasts and correlations around 0.8–0.9 for low‑level temperature and wind.[^8]
Cloud cover at Paranal is estimated from ECMWF total cloud fraction and relative‑humidity fields in a 250 km box, yielding successful clear/cloudy classification rates above about 80% in the 1993 validation period depending on the chosen thresholding scheme.[^8]
These products are used for safety (high winds, humidity), enclosure thermal set‑points, and medium‑term planning of instrument configurations.[^7][^6]

### 1.3 Mesoscale and optical turbulence forecasting for ESO sites

Beyond coarse global fields, ESO has invested in mesoscale modelling of optical turbulence (OT) and related parameters for Paranal and ELT sites via the MOSE and successor projects.[^9][^10][^11]
MOSE (Masciadri et al. 2017, MNRAS 466, 520–539) used the dedicated astro‑Meso‑NH model to forecast 3D \(C_N^2\) fields, integrated seeing, isoplanatic angle, and coherence time above Paranal and Cerro Armazones, validating predictions for a statistical sample of nights against MASS–DIMM and meteorological measurements.[^11]
For key OT parameters, MOSE reported Pearson correlations typically in the 0.6–0.8 range and contingency‑table scores (probability of detection and percentage of correct detection) sufficient to argue that forecasts can measurably improve service‑mode efficiency for VLT and ELT.[^11]
Subsequent work by Turchi et al. (2019, MNRAS 482, 206–216) and related MOSE/ALTA studies extended validation to PWV and vertical wind/temperature profiles, using ALTA Center’s Meso‑NH forecasts driven by ECMWF products, finding “excellent” reconstruction of wind, temperature, and humidity profiles up to ~20 km and robust PWV forecasts at Paranal.[^12][^9]
The more recent FATE project (Forecasting Atmosphere and Turbulence for ESO sites) aims to deliver fully operational OT forecasts for VLT and ELT using WRF‑based or Meso‑NH‑based systems coupled with Italian met‑service infrastructure.[^10][^12]

### 1.4 Integration of NWP models with local sensor data

Operationally, Paranal combines ECMWF fields, mesoscale model output, and ASM sensor data in several ways: direct side‑by‑side validation, post‑processing/forecast calibration, and provision of “precast” atmospheric constraints to scheduling tools.[^6][^7][^8]
Damiani et al. used Kalman‑filter post‑processing of ECMWF forecasts against Paranal/La Silla station data to reduce temperature forecast bias and root‑mean‑square errors at telescope level, demonstrating the benefit of statistical blending of global NWP with local sensors.[^8]
The MOSE validation explicitly compares astro‑Meso‑NH forecasts of seeing, isoplanatic angle, and coherence time with contemporaneous MASS–DIMM and met‑tower data, suggesting these measurements can be used as continuous calibration and potential data‑assimilation inputs in future operational systems.[^9][^11]
At present, ESO’s short‑term scheduler still uses a simple “precast” assumption that the seeing during an observing block is equal to the last 10‑minute median measured by the DIMM, but newer nowcasting systems use ML models trained on the ASM database and external forecasts to provide improved short‑horizon predictions.[^13][^14][^15]

### 1.5 Machine‑learning and deep‑learning models at ESO

ESO has recently explored ML‑based seeing prediction and atmospheric nowcasting in parallel to physics‑based NWP.
Anderson et al. (2024, SPIE 13098‑05, "The optimisation of short‑term scheduling of science observations at Paranal observatory") describe a Paranal short‑term scheduling (STS) simulator that replaces the precast model with ML nowcasts of seeing, evaluated inside a realistic queue‑scheduling environment.[^16][^13]
Their study shows that when user seeing constraints are tightened to match the empirical seeing distribution, ML nowcasts significantly improve the fraction of high‑priority observing blocks executed within constraints compared to using the last‑10‑minute median, effectively recovering telescope time that would otherwise be lost due to mis‑predicted seeing.[^14][^13]
A separate 2024 MSc thesis from Universidad de Chile (Lazcano González, "Astronomical seeing prediction at Paranal Observatory") built a pure ML pipeline using the ESO ambient‑conditions database (DIMM seeing plus met data) to predict the hour‑ahead mean seeing, achieving a root‑mean‑square error of 0.151 arcsec and a success rate of 0.753, representing ~14% RMSE and ~4% success‑rate improvement over the existing operational model and yielding an estimated 28 hours per semester of additional time in which executed observations meet requested seeing constraints.[^15]
ESO and Microsoft have also announced a joint "Turbulence Nowcasting" project that applies AI to large archives of atmospheric data at Paranal to deliver real‑time suitability predictions for different observing modes, alongside ML‑based anomaly detection in calibration frames and predictive adaptive‑optics control.[^17]
These efforts complement, rather than replace, mesoscale OT forecasting, with ML used for short‑horizon nowcasting and calibration of physics‑based models.[^14][^11]

## 2. Rubin Observatory / LSST scheduler and weather predictions

### 2.1 Scheduling framework and use of weather information

Rubin Observatory’s Legacy Survey of Space and Time (LSST) requires a fully automated scheduler capable of reacting to changing weather, seeing, and sky brightness while optimising a complex multi‑objective survey strategy.[^18][^19][^20]
The core algorithm is the Feature‑Based Scheduler (FBS), a Markov‑decision‑process controller that scores candidate pointings using a vector of "features" (e.g. airmass, sky brightness, slew time, time since last visit) and selects the highest‑utility visit at each step.[^19][^21]
Rubin’s operations simulator (OpSim) and rubin_scheduler package provide a simulated environment including realistic weather telemetry (cloud cover, seeing histories) and pre‑computed sky‑brightness maps, enabling FBS tuning and survey‑strategy experimentation before operations.[^22][^23][^18]

### 2.2 Atmospheric parameters in simulations

In OpSim, the Scheduler queries simulated weather telemetry modules that replay historical or synthetic time series of seeing, cloud fraction, and sky brightness, against which the scheduler enforces per‑field seeing and sky‑brightness limits.[^24][^20][^22]
Historical work on LSST cloud monitoring (Sebag et al. 2007, RMxAC 31, 102) envisioned using all‑sky cloud cameras and satellite‑based cloud cover to provide a cloud map that feeds the scheduler, allowing real‑time adjustment of the pointing sequence when photometric conditions vary across the sky.[^24]
Sky‑brightness maps used in simulations are derived from models of natural airglow, zodiacal light, Milky Way structure, and lunar contribution, and are combined with airmass and filter to evaluate whether a candidate visit satisfies the brightness constraints of a given science program.[^21][^20]

### 2.3 Operational weather constraints and real‑time data

Operational procedures for Rubin specify that decisions to open the dome and to continue observing depend primarily on humidity (and dew‑point margin), cloud cover, and wind speed, monitored by a summit weather station with data updated every 2 minutes.[^25]
The weather station provides 10‑minute averaged wind speeds; observers and the control system are instructed to close vent gates when winds exceed 8 m/s and to avoid drawing in humid air with the extraction fan when humidity approaches 65–70%, reflecting safety‑driven thresholds rather than purely scientific constraints.[^25]
Scheduler requirements discussed in LSST community documents call for the Scheduler to be provided with external wind speed, direction, RMS, and peak values, as well as dome interior wind speed, along with weather conditions and downtime events from summit telemetry services.[^26][^22]
In operations, rubin_scheduler is intended to consume live telemetry of weather and observing conditions plus any available short‑term forecasts (e.g. cloud and humidity trends) to choose the next visit, with additional safety checks executed by separate weather and facility control systems.[^18][^25]

### 2.4 Data sources and prediction methods

Rubin will rely on a combination of on‑site sensors (meteorological tower, all‑sky cameras, cloud and lightning detection) and external weather archives and forecasts, though specific NWP providers are not yet hard‑coded in public documentation.[^27][^18][^25]
PSTN‑051 and related technical notes describe the observing‑condition model used in simulations, which is derived from extended historical weather records at Cerro Pachón, including cloud climatology (fraction of time with cloud level below 3/10) and distributions of available observing hours per night.[^27]
While explicit accuracy metrics for operational cloud/seeing forecasts at Rubin have not yet been published, the simulation framework effectively assumes that historical statistics are a good proxy for long‑term averages and that real‑time deviations (e.g. storms) will be handled by safety systems and near‑term forecasts supplied to the scheduler.[^22][^18][^25]

## 3. TMT and ELT site selection: forecasting methods and data fusion

### 3.1 TMT site testing data sources and methods

The TMT site‑testing campaign (2003–2009) deployed nearly identical instrument suites at five candidate sites (San Pedro Mártir, Mauna Kea 13N, Tolar, Armazones, Tolonchar) to build a homogeneous climatology of astroclimatic parameters over ~6 years.[^28][^29][^30]
Each station included a MASS–DIMM on a 6.5 m tower for integrated and free‑atmosphere seeing and isoplanatic angle, SODARs for turbulence and wind profiles in the lowest ~800 m, a 30 m tower with sonic anemometers and temperature sensors at multiple heights, an IRMA radiometer for PWV, all‑sky cameras for clouds and light pollution, dust sensors, and standard weather stations.[^31][^32][^28]
Travouillon et al. (2009, PASP 121, 787–796) used MASS–DIMM measurements plus radiosonde and NCEP reanalysis data to characterise turbulence coherence time at the sites, finding debiased median \(\tau_0\) values between 4.2 and 5.6 ms and showing that MASS alone underestimates free‑atmosphere \(\tau_0\) by a factor ~1.73 unless corrected.[^33][^34]
Els et al. (2009, PASP 121, 384–400) reported turbulence profiles from combined MASS, DIMM, and SODAR data, concluding that the lowest 200 m contribute the majority of total seeing at all sites and that the Chilean sites have comparatively weaker ground‑layer turbulence.[^34][^30]

Although the TMT campaign itself focused on site characterisation rather than operational forecasting, it laid the groundwork for later use of statistical turbulence models and mesoscale forecasts to inform adaptive‑optics design and flexible scheduling at the chosen site.[^35][^33][^34]

### 3.2 E-ELT site characterisation and mesoscale forecasting

The E‑ELT site characterisation program, carried out under the FP6 Design Study, deployed MASS–DIMM and AWS systems at four candidate sites (Aklim in Morocco, ORM in La Palma, Macón in Argentina, Ventarrones in Chile), using identical instruments and procedures to derive integrated seeing, free‑atmosphere seeing, boundary‑layer seeing, and isoplanatic angle.[^36][^37]
Vernin et al. (2011, PASP 123, 1334–1346) provide an overview of the campaign, while a companion paper (Vázquez‑Ramió et al. 2012) focuses on high‑angular‑resolution parameters, supplementing turbulence measurements with wind profiles from NOAA reanalysis and ground‑level AWS data to estimate coherence time and coherence étendue.[^38][^36]
In parallel, Giordano et al. (2013, MNRAS 430, 3102–3117) evaluated the WRF mesoscale model at ORM by running ~4500 h of simulations in 2009 and comparing forecasts of meteorological and optical parameters (seeing, coherence time, isoplanatic angle) with AWS, DIMM, and MASS data from the E‑ELT campaign.[^38]
They found that WRF, coupled with the Trinquet–Vernin OT parametrisation, can provide 24‑h‑ahead seeing forecasts that perform significantly better than persistence or random guesses, with good agreement on nightly and monthly statistics and spatial patterns across the island.[^38]
A follow‑up study (Giordano et al. 2014, MNRAS 440, 1964–1970) used WRF + TV to map a quality parameter \(Q\) across La Palma, showing that the ORM site coincides with the maximum of \(Q\) within about 2 km and arguing that the method is robust enough for both site search and operational flexible scheduling.[^39]

### 3.3 Optical turbulence forecast projects linked to ELT operations

Beyond site selection, the FOROT project and subsequent MOSE feasibility study developed 3D OT forecast capability using Meso‑NH, aimed at future operational use on VLT and ELT.[^40][^35][^11]
Masciadri et al. (2017, MNRAS 466, 520–539) conclude that astro‑Meso‑NH forecasts of \(C_N^2\), seeing, isoplanatic angle, and coherence time over Paranal and Armazones achieve bias and RMSE small enough, and POD/PC scores high enough, to "definitely guarantee a not negligible positive impact" on service‑mode operations of top‑class 8–10 m telescopes and ELTs.[^11]
Recent initiatives like FATE and optical‑turbulence forecasting for the European Solar Telescope (EST) in the Canary Islands extend the same methodology to other facilities and daytime conditions, confirming that WRF/Meso‑NH‑based OT forecasts can support flexible scheduling when fed with appropriate initial and boundary conditions from centres such as ECMWF.[^41][^10][^12]

### 3.4 Combined data sources and accuracy summary

Across the TMT and E‑ELT campaigns and follow‑on forecast projects, the typical data fusion strategy combines:

- **In situ sensors:** AWS (T, RH, wind, pressure), MASS–DIMM, SODAR/SCIDAR, towers, PWV radiometers, all‑sky cameras, dust sensors.[^32][^28][^31][^36]
- **Upper‑air and climatological data:** radiosondes, NCEP/NOAA reanalysis, long historical climate series.[^33][^34][^36]
- **NWP models:** global (ECMWF, GFS) for large‑scale forcing and mesoscale (WRF, Meso‑NH) for local forecasting of meteorology and OT.[^42][^38][^11]

Reported forecast performance for key variables includes ~1–2 °C MAE in 24‑h temperature at Paranal/La Silla (ECMWF), WRF seeing forecasts at ORM accurate enough for one‑day‑ahead flexible scheduling with clear skill over persistence, and astro‑Meso‑NH OT forecasts at Paranal/Armazones meeting thresholds deemed adequate for operational deployment.[^42][^38][^11]

## 4. Smaller observatories and robotic telescopes

### 4.1 Typical weather‑forecasting approaches at small facilities

Smaller observatories and robotic telescopes (30–60 cm class) generally lack on‑site mesoscale modelling but still require robust weather monitoring and simple forecasting to enable unattended operations.[^43][^44][^45]
Common practice is to combine low‑cost local sensors (weather station, all‑sky camera, sometimes a cloud sensor and SQM) with external forecasts from services such as Meteoblue, Clear Sky Chart, or Astrospheric, which ingest multiple NWP models and satellite products.[^46][^47][^48]
These external services provide hour‑by‑hour predictions of cloud cover, seeing, transparency, wind, temperature, and dew point that can be polled by observatory control software via APIs or simply consulted by human operators.[^47][^48][^46]

At the Astronomical Station Vidojevica (Serbia), a 60 cm telescope is operated with supporting infrastructure including an all‑sky camera, seeing monitor, and weather station, with a long‑term goal of integrating all sensors into a fully robotic observatory.[^44]
Similarly, a 50 cm robotic telescope at the Indian Astronomical Observatory uses an observatory control system (OCS) that monitors a weather station and incorporates safety interlocks to run the telescope in robotic mode, closing the dome automatically when weather thresholds are violated.[^49]
Robotic 36 cm telescopes for space‑debris tracking in China are equipped with environmental monitoring and reliable domes; their control software coordinates weather data, equipment status, and scheduling for unattended operation across a small network.[^45]

### 4.2 Open‑source and low‑cost monitoring solutions

Several open‑source hardware and software projects explicitly target small observatories.
The Q‑Astro ASCOM Weather Station is an Arduino‑based open‑source project that aggregates data from inexpensive sensors (BME280 for T/RH/P, light sensor TSL2591, IR thermometer MLX90614) and exposes rain, cloud cover, pressure, temperature, humidity, dew point, and sky brightness via the ASCOM weather interface.[^50]
DIY platforms such as StratoSense (ESP32 + IR camera + BME280 + lux sensor) and Raspberry Pi‑based stations combine cloud temperature, humidity, and SQM‑LE data to estimate cloud coverage, dew‑point risk, and limiting magnitude, often integrating with ASCOM Alpaca or custom dashboards.[^51][^52]
Open‑source observatory control systems like pyobs (Python‑based) provide abstractions for telescopes, domes, cameras, and weather stations and include a "mastermind" component for robotic operation that can use weather inputs to decide whether it is safe to open or to continue observations.[^53]
These systems generally do not perform their own NWP; instead, they implement rule‑based safety logic (e.g. close if wind > X m/s, humidity > Y %, rain detected, cloud sensor indicates overcast) and may query third‑party forecast services for planning.[^43][^50][^53]

### 4.3 Examples of forecast integration in small observatories

Many small remote observatories advertise combined use of on‑site sensors and external forecast products.
For example, a Bortle‑1 remote observatory in the US uses Meteoblue data to provide live forecasts of cloud cover, transparency, wind, seeing, and dew point, updating hourly and displaying them alongside local measurements to guide imaging plans.[^54][^46]
Meteoblue’s astronomy‑seeing service itself blends more than 25 weather models with satellite and radar observations to provide global forecasts of seeing, cloud, and related parameters at 15‑minute to hourly resolution up to 14 days ahead, free for basic usage and via subscription for extended horizons.[^48][^47]
Robotic frameworks such as pyobs, RTS2, and custom TCS/OCS stacks in the literature generally treat weather forecasts as advisory inputs for nightly planning (e.g. selecting targets that require good seeing on predicted clear nights), while real‑time decisions are based on local sensors for safety and image quality.[^49][^44][^53]

Accuracy reporting for these small‑scale systems is sparse in the peer‑reviewed literature; most quantitative performance discussions focus on pointing/tracking accuracy of the telescope hardware rather than weather forecast skill, though anecdotal reports suggest Meteoblue‑based seeing indices and cloud forecasts are sufficiently accurate for amateur and small‑facility scheduling.
[^46][^54][^47]

## 5. Role of Sky Quality Meters (SQM) in observatory operations and networks

### 5.1 Instrument characteristics and link to observing conditions

The Sky Quality Meter (SQM) is a low‑cost photometer that measures zenith night‑sky brightness, typically reporting magnitudes per square arcsecond (mag/arcsec²) via a TAOS TSL237 light‑to‑frequency sensor and a wide (~80°) field of view for the basic model, or ~20° for lens versions.[^55][^56]
Unihedron’s SQM‑LE and SQM‑LU‑DL variants are Ethernet or USB devices intended for permanent outdoor monitoring, enabling continuous recording of night‑sky brightness for both astronomical and environmental applications.[^57][^58]
SQM readings correlate with overall sky darkness and therefore with limiting stellar magnitude, but they are sensitive to moonlight, airglow, Milky Way position, light pollution, and clouds; natural dark‑sky levels are around 21.6 mag/arcsec², with bright urban skies often <18 mag/arcsec².[^59][^55]
Unihedron documentation emphasizes that SQM readings assume "best transparency" and recommends using local visibility, humidity, or Clear Sky Chart/SkippySky products as proxies for transparency, highlighting that cloud and haze can brighten or dim the sky relative to clear conditions with the same artificial light emission.[^60][^61]

### 5.2 SQM for operational cloud and condition monitoring

SQMs are increasingly integrated into observatory weather systems to provide an additional indicator of sky state.
Operational practice in many small observatories is to combine SQM readings with all‑sky cameras and cloud sensors to decide whether conditions are photometric, spectroscopic, or unusable, and to trigger automatic closure when sky brightness exceeds thresholds indicative of clouds or twilight.[^52][^62][^63]
A 2020 MNRAS study by Falchi et al. ("Sky Quality Meter and satellite correlation for night cloud‑cover analysis at astronomical sites") analysed high‑time‑resolution SQM data (3–5 min sampling) at ESO La Silla and Asiago Ekar Observatory, correlating them with GOES and Aqua satellite imagery.[^64]
They developed an algorithm to classify clouds using SQM light‑curve patterns and calibrated clear‑sky brightness levels with VIIRS data, achieving cloud‑detection correlations of 97.2% at La Silla and 94.6% at Asiago against satellite‑derived cloud cover and automatically classifying photometric and spectroscopic nights (≈59% and 22% photometric/spectroscopic clear time at La Silla in 2018, 31% and 24% at Asiago).[^64]
The authors explicitly propose applying this SQM‑based cloud‑classification algorithm to SQM networks for long‑ and short‑term statistics of clear‑sky time and for real‑time support of astronomical observation and forecasting, suggesting a path from simple monitoring to intelligent condition prediction.[^64]

### 5.3 SQM networks for light‑pollution and condition monitoring

Several regional and national networks use SQM‑LE devices for long‑term monitoring of night‑sky brightness and its drivers.
The Dutch Night Sky Brightness Monitoring Network (MHN) deploys nine SQM‑LE units and has conducted intercomparison campaigns to assess stability, finding year‑to‑year uncertainties of ~5% in median luminance and recommending annual inter‑comparisons and consideration of device ageing when interpreting trends.[^65]
The Veneto Region and La Silla networks analyse SQM data using twilight‑based calibration methods to correct for sensor ageing, revealing true trends in light pollution once instrumental darkening is accounted for; typical ageing rates are 29–86 mmag/arcsec² per year, and after correction some sites show statistically significant brightening corresponding to increased installed luminous flux.[^66]
A Hong Kong night‑sky brightness monitoring project deployed SQM‑LE units at multiple urban, rural, and country‑park sites for more than a year, showing that SQM‑LE instruments perform stably over such durations and enabling assessments of spatial and temporal variation in light pollution in a dense metropolis.[^67]
Long‑term SQM‑based trend studies at 26 European sites (Puschnig et al. 2023, MNRAS 518, 4449–4468) combine SQM measurements with atmospheric data from Copernicus climate and aerosol products to infer trends in artificial skyglow while correcting for atmospheric variability and SQM ageing, demonstrating how SQM data can be linked to changes in outdoor lighting and policy.[^68]

The Globe at Night – Monitoring Network (GaN‑MN) is an offshoot of the citizen‑science Globe at Night campaign that sets up a global SQM‑LE network for long‑term NSB monitoring, with data accessible via interactive maps and downloadable spreadsheets for cross‑comparison with ecological or health datasets.[^69]
These networks primarily target environmental monitoring, but their data can inform observatory operations by characterising long‑term sky‑brightness distributions and seasonal patterns at or near astronomical sites.
[^69][^66][^65]

### 5.4 TESS-W and related photometer networks

The TESS‑W (Telescope Encoder and Sky Sensor – Wi‑Fi) photometer, developed within the EU STARS4ALL project, is a low‑cost, weather‑proof night‑sky brightness monitor with a bandpass extended slightly redward relative to the SQM and an IR sensor to estimate cloud coverage.[^70][^71]
Hundreds of TESS‑W units have been deployed worldwide, reporting data in real time via Wi‑Fi to an open repository with Grafana dashboards and monthly sky‑brightness files following IDA–IAU standards, enabling detailed studies of light‑pollution patterns.[^72][^70]
TESS‑W and similar devices can serve as alternatives to SQMs for observatories needing continuous monitoring; their built‑in cloud‑sensing capability makes them particularly relevant for forecasting whether a night will remain photometric or revert to bright cloudy conditions.[^71][^70][^72]

### 5.5 Relationship between SQM readings, clouds, and observing quality

Studies of sky brightness and clouds using SQMs and related devices show that clouds strongly modulate observed sky brightness, often increasing it by several magnitudes in urban and suburban environments where they reflect artificial light, but sometimes darkening the sky at remote sites by blocking airglow and starlight.[^73][^74]
At La Silla and Asiago, Falchi et al. demonstrate that SQM temporal derivatives and deviations from clear‑sky baselines reliably indicate cloud passages on time scales relevant to observing blocks (~15 minutes), enabling classification of photometric versus spectroscopic versus unusable conditions.[^64]
The Unihedron FAQ and community practice note that transparency changes (e.g. thin cirrus) can subtly dim or brighten SQM readings without visible cloud, implying that SQM alone is not a complete proxy for seeing or extinction but must be interpreted together with meteorological data and, ideally, all‑sky imagery.[^62][^60][^59]
Nevertheless, when combined with satellite data and atmospheric products, SQM networks can contribute to statistical or ML‑based forecasting of clear‑sky probability and photometric night fractions at specific sites.[^73][^68][^64]

## 6. Cross‑system comparison

### 6.1 Data sources and methods overview

The following table summarises the main data sources and prediction methods for the systems discussed.

| System | Local data sources | External / model data | Prediction methods | Reported accuracy / impact |
|--------|--------------------|-----------------------|--------------------|----------------------------|
| ESO Paranal ASM & forecasts | ASM DIMM, MASS, SLODAR, PWV radiometer, AWS, sky‑conditions flags | ECMWF analyses/forecasts, Meso‑NH (MOSE/ALTA), future FATE WRF/Meso‑NH | Statistical post‑processing (Kalman), mesoscale OT forecasting, ML seeing nowcasts | ~1.3–1.7 °C MAE in 24‑h T at Paranal/La Silla; good OT forecast skill (POD/PC sufficient for operations); ML seeing RMSE 0.151 arcsec and +28 h/semester of in‑spec observations vs current model.[^6][^42][^8][^15][^9][^11] |
| Rubin / LSST scheduler | Summit weather station (T, RH, wind), cloud cover, future all‑sky and seeing monitors | Historical weather archives for Cerro Pachón; sky‑brightness models; external forecasts (not fully specified) | Feature‑Based Scheduler (MDP), using simulated or real telemetry; safety rules for weather constraints | Simulations indicate compliance with survey strategy under realistic historical conditions; formal forecast accuracy metrics not yet public.[^18][^19][^22][^25][^20] |
| TMT site selection | MASS–DIMM, SODAR, 30 m towers, AWS, IRMA PWV, all‑sky cameras, dust sensors | Radiosondes, NCEP reanalysis | Statistical climatology of seeing, \(\tau_0\), profiles; some use of reanalysis for debiasing | Median \(\tau_0\) 4.2–5.6 ms at candidate sites; recognition that ground layer dominates seeing; not an operational forecast system.[^28][^33][^34][^30] |
| E‑ELT site selection & MOSE | MASS–DIMM, AWS, campaign instruments (incl. turbulence profilers) | NOAA reanalysis, WRF and Meso‑NH driven by ECMWF/GFS | WRF + Trinquet–Vernin OT model; astro‑Meso‑NH OT forecast; quality parameter maps | WRF OT forecasts at ORM suitable for 24‑h flexible scheduling; astro‑Meso‑NH OT forecasts at Paranal/Armazones meet operational‑readiness thresholds.[^38][^39][^36][^11] |
| Small/robotic observatories | Local AWS, all‑sky cameras, cloud sensors, SQM/TESS, sometimes seeing monitors | Web services (Meteoblue, Clear Sky Chart, Astrospheric, national weather services) | Rule‑based safety logic in OCS/TCS; human‑in‑the‑loop planning using forecasts | Quantitative forecast skill rarely published; anecdotal evidence that Meteoblue‑style products are adequate for small‑facility scheduling.[^43][^46][^49][^44][^47][^53][^48] |
| SQM networks (GaN‑MN, MHN, Veneto, Hong Kong, TESS‑W) | SQM‑LE/SQM‑L/TESS‑W photometers, sometimes with co‑located meteorological sensors | Satellite products (VIIRS, GOES/Aqua), Copernicus climate/aerosol data for advanced analyses | Statistical trend analysis, twilight calibration, cloud‑classification algorithms; potential ML for condition forecasting | Cloud‑detection accuracy 94–97% when correlating SQM with GOES/Aqua; long‑term trend uncertainties ~5% in inter‑calibrated networks; ageing corrections essential.[^69][^64][^66][^67][^68][^65] |

### 6.2 Gaps and future directions

Large observatories are moving toward hybrid systems that combine mesoscale OT forecasts with ML nowcasts trained on rich local databases (ASM, MASS–DIMM, AWS), integrated tightly with dynamic schedulers.
[^13][^10][^14][^9][^11]
Smaller facilities, including 60 cm‑class telescopes, generally rely on rule‑based weather interlocks and external forecast products but could benefit from adopting SQM/TESS‑based cloud‑classification algorithms and simple ML models trained on local sensor and forecast archives to predict clear‑time windows.
[^50][^54][^47][^53][^64]
SQM and TESS networks demonstrate that inexpensive photometers, when combined with satellite and atmospheric datasets, can support both environmental policy and potential forecasting of photometric night fractions, suggesting a scalable, low‑cost path for intelligent forecasting at small observatories and in developing regions.

---

## References

1. [Paranal ASM Website](https://www.eso.org/sci/facilities/paranal/astroclimate.html) - The ESO Paranal Observatory's ASM comprises a suite of instruments available for the continuous moni...

2. [Astronomical Site Monitor (ASM) instruments](https://www.eso.org/sci/facilities/paranal/astroclimate/asm-instruments.html) - The ASM instrument suite is critical for our operations. This page contains information about the AS...

3. [ASM Database](https://www.eso.org/sci/facilities/paranal/astroclimate/ASMDatabase.html) - The meteorological and atmospheric turbulence data, provided by the various ASM instruments, is avai...

4. [The ESO astronomical site monitor upgrade](https://ui.adsabs.harvard.edu/abs/2016SPIE.9913E..14C/abstract) - Monitoring and prediction of astronomical observing conditions are essential for planning and optimi...

5. [Astronomical Site Monitor Data User Manual](https://archive.eso.org/cms/eso-data/ambient-conditions/Astronomical_Site_Monitor_Data_User_Manual_v20181026.pdf) - The ASM Upgrade Project aims at replacing the current Paranal ASM (since 1998) by an upgraded and ex...

6. [How forecasts help astronomers peer deep into space](https://www.ecmwf.int/en/about/media-centre/news/2015/how-forecasts-help-astronomers-peer-deep-space) - ECMWF weather forecasts help one of the world's top astronomical organisations, the European Souther...

7. [Meteorological Forecasts at ESO Sites](https://www.eso.org/gen-fac/pubs/astclim/forecast/meteo/)

8. [Meteorological forecasting for the European Southern ...](http://eprints.bice.rm.cnr.it/13713/1/ncc7732.pdf) - With this aim, analysis and 24-48 hour forecasts from ECMWF are systematically compared with observa...

9. [Forecasting water vapour above the sites of ESO's Very Large ...](https://academic.oup.com/mnras/article/482/1/206/5113488) - by A Turchi · 2019 · Cited by 21 — This study represents a further step in validating outputs of atm...

10. [FATE: forecasting optical turbulence to push the Very ...](http://www.inaf.it/en/inaf-news/fate-project) - FATE: forecasting optical turbulence to push the Very Large Telescope to its full potential. The FAT...

11. [Optical turbulence forecast: ready for an operational application](https://academic.oup.com/mnras/article/466/1/520/2617734) - Abstract. One of the main goals of the feasibility study MOSE (MOdelling ESO Sites) is to evaluate t...

12. [Optical turbulence forecasts using ECMWF products ...](https://www.ecmwf.int/en/newsletter/178/news/optical-turbulence-forecasts-using-ecmwf-products-support-large-binocular) - ECMWF products help the ALTA Center in Italy to forecast optical turbulence in order to support astr...

13. [The optimisation of short-term scheduling of science observations at ...](https://arxiv.org/html/2407.16049v1)

14. [[PDF] arXiv:2407.16049v1 [astro-ph.IM] 22 Jul 2024](https://arxiv.org/pdf/2407.16049.pdf)

15. [Astronomical seeing prediction at paranal observatory](https://repositorio.uchile.cl/handle/2250/203172?show=full) - La visión o visibilidad astronómica (en inglés, seeing) es una variable de turbulencia óptica que re...

16. [The optimisation of short-term scheduling of science ...](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13098/1309805/The-optimisation-of-short-term-scheduling-of-science-observations-at/10.1117/12.3019072.short) - by JP Anderson · 2024 — A PARANAL SHORT-TERM SCHEDULING SIMULATOR; 4. NOWCASTING: MACHINE-LEARNING S...

17. [ESO and Microsoft will work with artificial intelligence to ...](https://news.microsoft.com/source/latam/company-news-es/eso-and-microsoft-will-work-with-artificial-intelligence-to-boost-astronomy/) - The first project is Turbulence Nowcasting, which makes real-time weather and atmospheric prediction...

18. [Introduction](https://rubin-scheduler.lsst.io/introduction.html) - A scheduler that is both fully automated and adaptable to weather conditions, observatory performanc...

19. [[1810.04815] A Framework for Telescope Schedulers](https://arxiv.org/abs/1810.04815) - by E Naghib · 2018 · Cited by 92 — In this paper we introduce the Feature-Based telescope scheduler ...

20. [Optimization of the Observing Cadence for the Rubin Observatory Legacy Survey of Space and Time: a pioneering process of community-focused experimental design](https://ar5iv.labs.arxiv.org/html/2108.01683) - Vera C. Rubin Observatory is a ground-based astronomical facility under construction, a joint projec...

21. [Feature-based telescope scheduler](https://discovery.researcher.life/article/feature-based-telescope-scheduler/676aec92ad063ee49b9647672037aa4a) - Feature-based Scheduler offers a sequencing strategy for ground-based telescopes. This scheduler is ...

22. [Sample manuscript showing specifications and style](https://docushare.lsstcorp.org/docushare/dsweb/Get/Document-16572/SPIE_9150-39_TheLsstOperationsSimulator-1.9.pdf)

23. [A Report from the LSST Science Advisory Committee:](https://project.lsst.org/groups/sac/sites/lsst.org.groups.sac/files/OpSim_experiments.pdf)

24. [LSST CLOUD COVER MEASUREMENT FOR OBSERVATION ...](https://www.astroscu.unam.mx/rmaa/RMxAC..31/PDF/RMxAC..31_jsebag.pdf) - by J Sebag · 2007 · Cited by 6 — The scheduler will be able to adjust the sequence of observations b...

25. [Weather Constraints](https://obs-ops.lsst.io/v/SITCOM-526/Nighttime-Operations/Weather-Constraints/index.html) - Humidity (especially the dew point difference), cloud cover, and wind speed are the three largest de...

26. [Scheduler Requirements Document Discussion](https://community.lsst.org/t/scheduler-requirements-document-discussion/540) - In preparation for the JTM session on the scheduler requirements document the latest version is atta...

27. [Background on the external conditions for Rubin - Support](https://community.lsst.org/t/background-on-the-external-conditions-for-rubin/9646) - Is there a document that defines the conditions for Rubin operations as to average hours available e...

28. [The Thirty Meter Telescope Site Testing Database](https://ifa.uv.cl/astromet/sitetestingdata/talks/day1/1.7)Reed_Riddle_valparaiso.pdf) - MASS/DIMM telescope. On 6.5 m tower. Weather station. All-sky camera ... The MASS seeing excludes th...

29. [TMT SITE TESTING FINAL REPORT](https://sitedata.tmt.org/docs/TMT.SiteTestingFinalReport.08-04-08.pdf) - At each site, a sonic anemometer (CSAT-3 model by Campbell Scientific) is placed at the level of the...

30. [Thirty Meter Telescope Site Testing I: Overview](https://www.jstor.org/stable/10.1086/599287) - by M Schöck · 2009 · Cited by 212 — The MASS is a scintillation-based instrument which measures six-...

31. [Instruments Used During TMT Site Testing](https://sitedata.tmt.org/Available_data/instruments.html)

32. [STATUS OF THE TMT SITE EVALUATION PROCESS](https://www.astroscu.unam.mx/rmaa/RMxAC..31/PDF/RMxAC..31_mschoeck.pdf) - by M Schöck · 2007 · Cited by 8 — Sonic Anemometers: Mounted at the. MASS/DIMM telescope level and/o...

33. [Thirty Meter Telescope Site Testing VII](https://ui.adsabs.harvard.edu/abs/2009PASP..121..787T/abstract) - by T Travouillon · 2009 · Cited by 18 — As one of the atmospheric turbulence figures of merit, the T...

34. [Thirty Meter Telescope Site Testing VI: Turbulence Profiles](https://arxiv.org/abs/0904.1865) - by SG Els · 2009 · Cited by 61 — The obtained turbulence profiles indicate that at all sites the low...

35. [Optical Turbulence Characterization for Ground-Based ...](https://www.diva-portal.org/smash/get/diva2:359217/FULLTEXT01.pdf) - by S Hagelin · 2010 · Cited by 1 — A model is able to reconstruct the past, making it an excellent t...

36. [European Extremely Large Telescope Site Characterization II: High angular resolution parameters](http://arxiv.org/abs/1207.4229) - This is the second article of a series devoted to European Extremely Large Telescope (E-ELT) site ch...

37. [European Extremely Large Telescope Site Characterization I: Overview](https://iac.edu.es/en/science-and-technology/publications/european-extremely-large-telescope-site-characterization-i-overview?overridden_route_name=entity.node.canonical&base_route_name=entity.node.canonical&page_manager_page=node_view&page_manager_page_variant=node_view-panels_variant-15&page_manager_page_variant_weight=-6) - The site for the future European Extremely Large Telescope (E-ELT) is already known to be Armazones,...

38. [Atmospheric and seeing forecast: WRF model validation with ...](https://academic.oup.com/mnras/article/430/4/3102/1111310) - by C Giordano · 2013 · Cited by 86 — The purpose of this study is to validate the capability of the ...

39. [Weather Research and Forecasting prevision model as a tool ...](https://academic.oup.com/mnras/article/440/3/1964/1076239) - by C Giordano · 2014 · Cited by 47 — In the aforementioned article, we compared the WRF forecasts wi...

40. [3D Optical Turbulence Forecasts above Astronomical Sites | FP6](https://cordis.europa.eu/project/id/23878/reporting) - The scientific activity of the FOROT Team concerns the characterisation of the optical turbulence de...

41. [Optical turbulence forecast for the European Solar ...](https://arxiv.org/html/2409.05149v1) - This analysis aimed to investigate the possibility to extend the methodology of the forecast of the ...

42. [Validation of the vertical profiles of three meteorological ...](https://www.astroscu.unam.mx/rmaa/RMxAC..41/PDF/RMxAC..41_lcortes.pdf) - by L Cortés · 2011 · Cited by 4 — The temperature vertical profile at low levels is better represent...

43. [Autonomous Observatories](https://www.cilium.pl/autonomous-observatories/) - A robotic and automatic observatory must be able to operate without human intervention in autonomous...

44. [Future Robotic observatory on Mountain Vidojevica](https://bulletin.astron-soc.in/asics_vol007/187-Martinovic.pdf) - by N Martinovic · Cited by 3 — With the all-sky camera, seeing monitor and meteorological station in...

45. [A 36 cm robotic optical telescope: Equipment and software](https://www.frontiersin.org/journals/astronomy-and-space-sciences/articles/10.3389/fspas.2022.897065/full) - by J Sun · 2022 · Cited by 2 — The paper describes an optical telescope system and control software ...

46. [Live Bortle 1 Sky Conditions](https://www.dspremote.com/conditions/) - Astrospheric & Clear Sky Chart: Get an all-in-one live forecast showing moon position, cloud cover, ...

47. [Astronomy Seeing](https://content.meteoblue.com/en/private-customers/website-help/outdoor-and-sports/astronomy-seeing/) - With the Astronomy Seeing, meteoblue is building services for astronomers, meteorologists and other ...

48. [Home - meteoblue](https://content.meteoblue.com/en) - weather close to you

49. [The 50cm robotic telescope: control system upgrade and ...](https://ui.adsabs.harvard.edu/abs/2022SPIE12182E..0ES/abstract) - by T Stanzin · 2022 · Cited by 1 — We describe the details into the design and development of a low-...

50. [ASCOM Weather Station - Q-Astro](https://www.q-astro.com/ascom-weather-station)

51. [StratoSense - An ESP32 based cloud watcher and sky quality meter - Observatories - Cloudy Nights](https://www.cloudynights.com/topic/962163-stratosense-an-esp32-based-cloud-watcher-and-sky-quality-meter/) - StratoSense - An ESP32 based cloud watcher and sky quality meter - posted in Observatories: Hi All, ...

52. [DIY sensor station and dashboard build - Observatories - Cloudy Nights](https://www.cloudynights.com/topic/792241-diy-sensor-station-and-dashboard-build/) - DIY sensor station and dashboard build - posted in Observatories: While I dont have an observatory, ...

53. [pyobs - An Observatory Control System for Robotic ...](https://www.frontiersin.org/journals/astronomy-and-space-sciences/articles/10.3389/fspas.2022.891486/full) - by TO Husser · 2022 · Cited by 7 — We present a Python-based framework for the complete operation of...

54. [Observations](https://content.meteoblue.com/en/research-education/specifications/data-sources/observations/) - meteoblue gives access to different spatially continuous observational datasets. Observations from s...

55. [Sky quality meter](https://en.wikipedia.org/wiki/Sky_quality_meter) - A sky quality meter (SQM) is an instrument used to measure the luminance of the night sky, more spec...

56. [Sky Quality Meter - FAQ - Unihedron](https://www.unihedron.com/projects/darksky/faqsqm.php) - General SQM Questions. What kind of sensor is used in the Sky Quality Meter? A TAOS TSL237S sensor i...

57. [Sky Quality Meter-LE - Unihedron](https://unihedron.com/projects/sqm-le/) - The "Sky Quality Meter - LE" measures the brightness of the night sky in magnitudes per square arcse...

58. [Sky Quality Meter-LU-DL - Unihedron](https://www.unihedron.com/projects/sqm-lu-dl/) - The "Sky Quality Meter - LU-DL" (SQM-LU-DL) measures the brightness of the night sky in magnitudes p...

59. [Sky Quality Meter (SQM) - Nightwise Lighting Issues](https://old.nightwise.org/sqm.htm)

60. [Sky Quality Meter - FAQ - Unihedron](https://www.unihedron.com/projects/darksky/faq.php)

61. [Sky Quality Meter LE - FAQ](https://unihedron.com/projects/darksky/faqsqmle.php) - The SQM's readings are assuming 'best transparency'. You can get an updated definition of the transp...

62. [Skybadger::SQM build](https://www.skybadger.net/projects/SQM/SQM.shtml) - The Sky quality Meter (SQM) is the sensor that tells the observatory the state of the sky. It provid...

63. [What Do You Do With Your SQM data? - Cloudy Nights](https://www.cloudynights.com/topic/267488-what-do-you-do-with-your-sqm-data/) - The sky-cam will let me eyeball where the moon really is in the observatory's local sky. It can see ...

64. [Sky Quality Meter and satellite correlation for night cloud-cover analysis at astronomical sites](https://academic.oup.com/mnras/article/493/2/2463/5780109?login=false) - ABSTRACT. The analysis of night cloud cover is very important for astronomical observations in real ...

65. [Stability of the Nine Sky Quality Meters in the Dutch Night Sky Brightness Monitoring Network](https://pmc.ncbi.nlm.nih.gov/articles/PMC4431212/) - In the context of monitoring abundance of artificial light at night, the year-to-year stability of S...

66. [Long-Time Trends in Night Sky Brightness and Ageing ...](https://ui.adsabs.harvard.edu/abs/2022RemS...14.5787F) - One of its important issues is tracking NSB for long time and connecting its variations to changes i...

67. [Report of Hong Kong Night Sky Brightness Monitoring ...](https://nightsky.physics.hku.hk/sites/default/files/2021-11/ECF_2009_10_Final_Report.pdf) - The Sky Quality Meter - Lens Ethernet (SQM-LE) was the light sensing device used to make measurement...

68. [Long-term trends of light pollution assessed from SQM ...](https://academic.oup.com/mnras/article/518/3/4449/6764726) - by J Puschnig · 2023 · Cited by 34 — We present long-term (4–10 yr) trends of light pollution observ...

69. [Globe at Night - Sky Brightness Monitoring Network](http://globeatnight-network.org)

70. [Photometers - GUAIX GROUP](https://guaix.ucm.es/instrumentation/photometers)

71. [Night Sky Photometers - John Barentine](https://www.johncbarentine.com/night-sky-photometers.html) - There are three devices operating at my home in east Tucson, Arizona, that continuously monitor the ...

72. [STARS4ALL TESS photometers - GUAIX](https://guaix.fis.ucm.es/tess/models)

73. [Worldwide variations in artificial skyglow](https://gfzpublic.gfz.de/pubman/item/item_887892_4/component/file_896892/887892.pdf) - by C Kyba · 2015 · Cited by 242 — Artificial skyglow is approximately equal in radiance to natural s...

74. [The impact of clouds on the brightness of the night sky](https://www.sciencedirect.com/science/article/pii/S0022407319308726) - by T Ściężor · 2020 · Cited by 61 — In the case of a cloudless sky, changes in the value of the deri...

