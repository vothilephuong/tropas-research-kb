# Meteorological Datasets in Observatory Operations: A Comprehensive Survey and Benchmark for Quy Nhon Observatory

The Quy Nhon Observatory dataset — with **~1 million records at 1-minute resolution, 99.7% uptime, and integrated SQM–meteorology measurements** — stands as the first comprehensive in-situ observatory weather and sky-quality dataset from Vietnam and one of very few from tropical monsoon environments worldwide. This survey of 13 major observatory and atmospheric datasets reveals that the TROPAS dataset fills a critical geographic and methodological gap: no published dataset from tropical Southeast Asia combines co-located, simultaneous, high-cadence sky brightness and full meteorological instrumentation. The dataset is highly publishable as a standalone data paper, most suitably in *Scientific Data* (Nature) or *Geoscience Data Journal*, and would constitute a pioneering contribution to the severely data-sparse tropical observatory characterization literature.

---

## PART 1: Individual Dataset Profiles

### 1. ESO Ambient Conditions Database — Paranal and La Silla

**Full name and institution.** ESO Ambient Conditions Database, operated by the European Southern Observatory (ESO) through the ESO Science Archive Facility. This is the gold standard for public observatory meteorological archives.

**Location and climate.** Cerro Paranal (2,635 m; 24°40′S, 70°25′W) and Cerro La Silla (2,400 m; 29°16′S, 70°42′W), Atacama Desert, Chile. APEX on Chajnantor (5,064 m) is also included. All sites are classified **BWk** (cold desert) under Köppen, with Paranal reporting **85% clear nights**.

**Time coverage and resolution.** Paranal meteorological data begins October 1984 (Vaisala station); the Astronomical Site Monitor (ASM) database runs from **August 1998 to present**. La Silla data extends from **January 1994 to present**. DIMM seeing at Paranal has been recorded since April 1987. Meteorological parameters are averaged over **20-minute periods** (sampling at 2-second intervals for wind, 1-minute for temperature/humidity). DIMM seeing integrations span a few minutes each. The LHATPRO precipitable water vapor radiometer operates at ~1-minute cadence since April 2016.

**Measured parameters.** The post-2016 ASM suite includes: DIMM seeing (FWHM at 500 nm, zenith-corrected), MASS free-atmosphere seeing, coherence time (τ₀), isoplanatic angle (θ₀), 6-layer Cn² turbulence profile (0.5–16 km), SLODAR ground-layer Cn², LHATPRO precipitable water vapor and IR brightness temperature profiles, wind speed and direction (30 m mast), temperature and humidity (30 m level for Paranal), barometric pressure, and **dust particle counts**. La Silla adds LOSSAM photometricity monitoring.

**Sky brightness.** Patat (2003) published UBVRI zenith sky brightness measurements from FORS1 at Paranal (April 2000–September 2001; ~3,900 images on 174 nights; V = 21.6 mag/arcsec²; DOI: 10.1051/0004-6361:20030030). A dedicated V-band Night Sky Brightness monitor has operated at Paranal since **October 2023**. The Cerro Paranal Advanced Sky Model (SkyCalc) provides predictions (Noll et al. 2012, DOI: 10.1051/0004-6361/201219040).

**Data quality.** Uptime and missing-data rates are not published as single metrics, but the archive spans **25+ years at Paranal and 30+ years at La Silla** with documented gaps only during instrument upgrades. Cross-calibration of old and new DIMMs ran for ~6 months in 2016.

**Access.** Fully public via web GUI (archive.eso.org/cms/eso-data/ambient-conditions.html), programmatic TAP/ADQL access, and a detailed ASM Data User Manual (v2.0).

**Key publications.** Patat (2003; DOI: 10.1051/0004-6361:20030030), Noll et al. (2012; DOI: 10.1051/0004-6361/201219040), Lombardi et al. (2009; DOI: 10.1111/j.1365-2966.2009.15349.x), Murtagh & Sarazin (1993; DOI: 10.1086/133254).

---

### 2. Mauna Kea Weather Center (MKWC)

**Institution and location.** University of Hawaiʻi at Mānoa, School of Ocean and Earth Science and Technology (SOEST). Summit at **4,200 m** (19°49′N, 155°28′W), Big Island, Hawaiʻi. Köppen classification is **BWk/ET** (cold desert to tundra) — the summit sits above the tropical inversion layer.

**Time coverage.** MKWC has been operational since the late 1990s; summit weather monitoring extends further via individual observatories. CFHT has maintained weather logs since 1979. Haslebacher et al. (2022; DOI: 10.1051/0004-6361/202142493) analyzed in-situ meteorological data covering approximately 2000–2020.

**Temporal resolution.** ~15 minutes for archived automated weather station data; near-real-time updates on the MKWC website; WRF model forecasts updated 4× daily.

**Measured parameters.** Temperature, relative humidity, wind speed/direction, barometric pressure, seeing (MASS instrument), precipitable water vapor (PWV), weather loss statistics, cloud cover derived from satellite imagery. CFHT and Subaru maintain independent weather logs; Gemini North publishes seeing and sky background per band.

**Sky brightness.** Not directly part of MKWC core data, but individual observatories (Gemini, Keck) report per-band sky background.

**Access.** Freely accessible at mkwc.ifa.hawaii.edu (forecasts, current conditions, seeing, archive). CFHT weather data available through cfht.hawaii.edu and the Canadian Astronomy Data Centre.

**Key publications.** Haslebacher et al. (2022; DOI: 10.1051/0004-6361/202142493), Schöck et al. (2009; DOI: 10.1086/599287).

---

### 3. CTIO meteorological records

**Institution and location.** Cerro Tololo Inter-American Observatory (CTIO), operated by NOIRLab/NSF. Cerro Tololo sits at **2,200 m** (30°10′S, 70°48′W), Coquimbo Region, Chile. Köppen **BWk to BSk** (cold desert to semi-arid).

**Time coverage.** Night logs from **1975–2005** (used for LSST cloud cover model), with weather station data from at least the 1970s. The weather station was **destroyed by lightning in September 2008** and replaced. MASS-DIMM seeing data from the early 1990s through a major campaign in May–July 2002 (~28,000 profiles). The MASS-DIMM is now decommissioned.

**Measured parameters.** Temperature, humidity, wind speed/direction, barometric pressure, precipitation; MASS-DIMM seeing and 6-layer turbulence profiles (decommissioned); RASICAM all-sky IR camera for cloud monitoring; night-log observer assessments of cloud cover (0–8 scale, 3-hour intervals). CCD-based UBVRI sky brightness measurements cover **1992–2006** (Krisciunas et al. 2007; DOI: 10.1086/519564); long-term V-band mean ~21.7–21.8 mag/arcsec².

**Data quality and access.** **60% photometric nights, ~90% usable**. Real-time data is VPN/internal only. No systematic public archive equivalent to ESO's exists. Published statistics are available through referenced papers.

**Key publications.** Tokovinin et al. (2003; DOI: 10.1046/j.1365-8711.2003.06231.x), Krisciunas et al. (2007; DOI: 10.1086/519564).

---

### 4. Vera C. Rubin Observatory / LSST site characterization

**Location.** Cerro Pachón (El Peñón peak), 2,682 m (30°14′S, 70°45′W), Chile. Köppen **BWk**. Adjacent to Gemini South and SOAR.

**Time coverage.** Site characterization: **~2003–2006** (intensive) with DIMM seeing from 1998–2006. All-Sky Camera operational since January 2014. Operational DIMM running since commissioning (2023+). Weather model for scheduling based on CTIO night logs 1975–2005.

**Measured parameters.** DIMM/MASS-DIMM seeing and turbulence profiles, surface-layer turbulence (microthermal sensors, LuSci lunar scintillometer), all-sky cameras (visible and IR) for cloud cover and sky brightness, standard meteorology (temperature, humidity, wind, pressure). V-band zenith sky brightness: **21.7 mag/arcsec²** (Smith et al. 2009). The Rubin Engineering Facilities Database (EFD) stores operational environmental data. Over **80% usable nights**.

**Access.** Partially public. Site characterization data is distributed across papers and LSST Confluence documentation. The operational EFD access policy is evolving.

**Key publications.** Ivezić et al. (2019; DOI: 10.3847/1538-4357/ab042c), Tokovinin & Travouillon (2006; DOI: 10.1111/j.1365-2966.2005.09813.x), Sebag et al. (2008; DOI: 10.1117/12.787593).

---

### 5. TMT site testing campaigns

**Institution and sites.** Thirty Meter Telescope International Observatory (TIO). Five candidate sites tested with **identical instrumentation** (2003–2008): Cerro Tolar (2,290 m, Chile), Cerro Armazones (3,064 m, Chile), Cerro Tolonchar (4,480 m, Chile), San Pedro Mártir (2,830 m, Mexico), and **Mauna Kea 13N** (4,050 m, Hawaiʻi — selected site).

**Measured parameters.** The most comprehensive site-testing suite ever deployed: automatic weather stations (temperature, humidity, pressure, wind, solar irradiance, precipitation); sonic anemometers at 7 m (3D wind, sonic temperature, raw turbulence); **30-m instrumented towers** at Armazones and Tolonchar (sonic anemometers and temperature at 11, 20, 28 m); DIMM seeing; MASS 6-layer Cn² profiles; SODAR turbulence and wind profiles (10–800 m); dust/particle sensor (5 channels, ≥0.3 to ≥5.0 μm); all-sky camera; IRMA precipitable water vapor; soil temperature; net radiation and ground heat flux.

**Temporal resolution.** DIMM/MASS at ~1-minute integration; weather stations sampled at 2-second (wind) to 1-minute intervals; SODAR every 30 minutes.

**Data quality.** Instrument precision documented in the TMT Site Testing Final Report: DIMM accuracy better than 0.05″, MASS accuracy better than 0.05″. Critically, **data is unfiltered** — users must consult the Known Issues page for sensor malfunction periods.

**Access.** **Fully public** at sitedata.tmt.org with free registration. ASCII tables, online plotting tools, and raw DIMM image frames available on request. Database released January 2010.

**Key publications.** Schöck et al. (2009; DOI: 10.1086/599287), Skidmore et al. (2009; DOI: 10.1086/644758), Els et al. (2009; DOI: 10.1086/599384), Wang et al. (2007; DOI: 10.1364/AO.46.006460).

---

### 6. SDSS weather logs — Apache Point Observatory

**Location.** Sacramento Mountains, Sunspot, New Mexico (32°47′N, 105°49′W), **2,788 m** elevation. Köppen **BSk** (cold semi-arid).

**Time coverage.** Weather tower installed **1984** under Kurt Anderson (NMSU), in near-continuous operation for 40+ years. SDSS-I began 2000; SDSS-V started October 2020 and continues.

**Measured parameters.** The SDSS CAS Field table stores per-field (53.9-second) observing conditions: PSF width (seeing) in five bands, **sky brightness in all five bands** (u, g, r, i, z in mag/arcsec²; providing de facto sky brightness measurements), airmass, atmospheric extinction coefficients, and photometric quality flags. The APO weather tower provides continuous temperature, humidity, wind speed/direction, barometric pressure, and transparency assessments.

**Sky brightness.** Yes — quantitative per-field sky brightness in all SDSS bands is archived in the Field table across DR17's ~930,000+ photometric fields.

**Access.** Fully public. CAS at skyserver.sdss.org, SAS at data.sdss.org. Raw weather tower data may require contacting APO directly.

**Key publications.** York et al. (2000; DOI: 10.1086/301513), Gunn et al. (2006; DOI: 10.1086/500975).

---

### 7. AERONET

**Full name.** AErosol RObotic NETwork, operated by NASA Goddard Space Flight Center since **1993**, with partner sub-networks worldwide (PHOTONS/France, RIMA/Spain, AeroSpan/Australia, CARSNET/China).

**Coverage.** **600+ active stations** globally across all continents and climate zones.

**Measured parameters.** Spectral aerosol optical depth (AOD) at 8 wavelengths (340–1640 nm), Ångström exponent, **precipitable water vapor (PWV)** from the 935/940 nm absorption band, fine-mode fraction, plus inversion products: aerosol size distribution, single scattering albedo, refractive index, phase function. Since ~2014, **lunar AOD** measurements extend coverage to nighttime.

**Temporal resolution.** Direct sun measurements every ~15 minutes during daytime; sky radiance scans several times daily.

**Data quality.** Three-tier system: Level 1.0 (unscreened), Level 1.5 (cloud-screened), Level 2.0 (quality-assured with post-field calibration). AOD uncertainty: **±0.01–0.02** for field instruments.

**Stations near observatories.** Mauna Loa (3,397 m, Hawaiʻi — calibration site), Izaña (Tenerife, near La Palma ORM), Paranal (ESO), Arizona (near Kitt Peak). Southeast Asian stations include **Bac Giang, Bac Lieu, Nghia Do (Hanoi), and Ho Chi Minh City in Vietnam**; Phimai, Chiang Mai, and Bangkok in Thailand; Singapore; and Manila.

**Access.** Fully public domain at aeronet.gsfc.nasa.gov. No registration required for downloads. Web service API available.

**Key publications.** Holben et al. (1998; DOI: 10.1016/S0034-4257(98)00031-5), Giles et al. (2019; DOI: 10.5194/amt-12-169-2019).

---

### 8. ERA5 reanalysis

**Institution.** European Centre for Medium-Range Weather Forecasts (ECMWF), produced by the Copernicus Climate Change Service (C3S).

**Specifications.** Spatial resolution: **~31 km (0.25° × 0.25°)**. Temporal resolution: **hourly** (HRES); 3-hourly for the 10-member ensemble. **137 model levels** from surface to 0.01 hPa (~80 km), plus 37 pressure levels. Time coverage: **January 1940 to present** (updated within ~5 days of real time). Total volume: ~9 petabytes. ERA5-Land provides enhanced **~9 km (0.1°)** resolution for surface parameters (1950–present).

**Variables.** Temperature (all levels, 2 m, skin), specific/relative humidity, dewpoint, total column water vapor (PWV), U/V wind components at all levels plus 10 m and 100 m, surface/mean sea-level pressure, total/low/medium/high cloud cover, cloud base height, precipitation (total, convective, large-scale), surface and TOA radiation, boundary layer height, friction velocity, geopotential, ozone, vertical velocity.

**Limitations for observatory use.** Smoothed orography underestimates mountain-top elevations. Surface-layer turbulence poorly represented. Cloud cover shows biases at some sites. Near-surface Cn² estimation "poorly representative" (Qian et al. 2024; DOI: 10.1093/mnras/stad3818).

**Access.** Copernicus Climate Data Store (CDS) at cds.climate.copernicus.eu — web interface or Python CDS API. Free registration required. Also available in Analysis Ready Cloud Optimised (ARCO) format.

**Key observatory publications.** Haslebacher et al. (2022; DOI: 10.1051/0004-6361/202142493), He et al. (2022; DOI: 10.1051/0004-6361/202243735), Qian et al. (2024; DOI: 10.1093/mnras/stad3818), Zhang et al. (2024; DOI: 10.1093/mnras/stae2586).

---

### 9. MERRA-2 reanalysis

**Institution.** NASA Global Modeling and Assimilation Office (GMAO), Goddard Space Flight Center. GEOS-5.12.4 model with Gridpoint Statistical Interpolation analysis.

**Specifications.** Spatial resolution: **0.5° × 0.625° (~50 km)**. 72 hybrid-sigma levels (surface to 0.01 hPa). Temporal resolution: hourly (2D diagnostics), 3-hourly (3D fields), 6-hourly (analyses). Time coverage: **January 1980 to present**. ~100 data collections.

**Unique strength: aerosol diagnostics.** MERRA-2 is the **first satellite-era reanalysis to assimilate space-based aerosol observations** (AVHRR, MODIS). It provides AOD at 550 nm, speciated surface mass concentrations (sulfate, black carbon, organic carbon, dust, sea salt), extinction coefficients, and aerosol scattering — directly relevant to atmospheric extinction at observatories.

**Access.** NASA GES DISC (disc.gsfc.nasa.gov). NASA Earthdata login (free). Available on AWS S3 (us-west-2) since May 2023. Each collection has its own DOI.

**Key observatory publications.** Kuo (2017; DOI: 10.3847/1538-4357/aa8b74 — PWV assessment for mm-wave sites), Li et al. (2019; arXiv: 1906.01967 — atmospheric transparency for LSST), He et al. (2022; DOI: 10.1051/0004-6361/202243735), Pozo et al. (2024; DOI: 10.1051/0004-6361/202347773).

---

### 10. WRF model output for observatory sites

The **Weather Research and Forecasting (WRF)** model and the closely related **Astro-Meso-Nh** system (Meso-NH with specialized optical turbulence code) form the backbone of mesoscale atmospheric forecasting for observatories. Typical configurations use **3–4 nested domains** from ~27 km down to 0.5–1 km horizontal resolution, initialized from ECMWF or GFS analyses.

**Operational systems.** Three systems are currently operational: **FATE** (Forecast of Atmospheric Turbulence for ESO) at Cerro Paranal/Armazones using Astro-Meso-Nh; the **ALTA Center** at the Large Binocular Telescope (Mt. Graham) since 2019; and the **Maunakea Weather Center** WRF-based system updated 4× daily.

**Sites studied with WRF/Meso-Nh.** Cerro Paranal (Masciadri et al. 1999; DOI: 10.1051/aas:1999474), La Palma ORM (Giordano et al. 2013; DOI: 10.1093/mnras/stt117), Mt. Graham (Hagelin et al. 2010; DOI: 10.1111/j.1365-2966.2010.17072.x), Mauna Kea (Cherubini et al. 2022; DOI: 10.1093/mnras/stab2916), Dome C and Dome A in Antarctica (Lascaux et al. 2009, 2011), San Pedro Mártir (Masciadri & Egner 2006; DOI: 10.1086/509601), Ali Observatory in Tibet (Qian et al. 2021), **Thai National Observatory** (Macatangay et al. 2024; DOI: 10.1093/mnras/stae727 — using WRF-Chem), and Baikal Observatory (Shikhovtsev et al. 2023; DOI: 10.3390/app13106354).

**Performance.** Typical WRF seeing RMSE: **0.19–0.45 arcsec** versus DIMM at Paranal/Armazones. Autoregressive methods combining model forecasts with real-time observations achieve "unprecedented model accuracies" on 1–2 hour timescales (Masciadri et al. 2020; DOI: 10.1093/mnras/stz3381). Free atmosphere turbulence is generally well-reproduced; the surface/boundary layer remains the primary challenge.

---

### 11. Asian and Southeast Asian observatory datasets

**Maidanak Observatory** (Uzbekistan, 2,700 m, 38°40′N, BSk). Median seeing **0.69″** from ESO-standard DIMM over two campaigns (1996–2003 and 2018–2022; 133,420 measurements in the latter). Weather station recording every 5 minutes since September 2021. Parameters: air temperature, pressure, wind speed/direction, seeing, clear-time fraction (**90% clear in July–September**). Key publications: Ehgamberdiev et al. (2000; DOI: 10.1051/aas:2000348), Tillayev et al. (2023; DOI: 10.3390/atmos14020199).

**Thai National Observatory** (Doi Inthanon, 2,457 m, 18°34′N, Cwb). Typical seeing ~2″ during the November–May observing season. DIMM and SLODAR instruments operational; real-time weather at weather.narit.or.th/tno_observer (active Nov–May only). WRF-Chem simulations conducted for site characterization (Macatangay et al. 2024; DOI: 10.1093/mnras/stae727). Limited published meteorological datasets.

**Lijiang/Gaomeigu Observatory** (Yunnan, China, 3,200 m, 26°42′N, Cwb). The **best-documented modern Asian observatory monitoring system**. Astronomical Site Monitoring System (ASMS) operational since 2017, with SQM, all-sky camera, cloud sensor, and Davis Vantage Pro2 weather station integrated into a robotic suite. Median seeing **0.70″** at Gaomeigu; >200 useful nights/year. Key publication: Xin et al. (2020; DOI: 10.1088/1674-4527/20/9/149).

**Indian Astronomical Observatory (IAO), Hanle** (Ladakh, 4,500 m, 32°47′N, BWk). **~270 clear nights/year**, precipitation <10 cm/yr. Weather station recording every 10 minutes; cloud logs hourly since late 1990s. AOD 0.02–0.04 at 500 nm — extremely clean. Automated Extinction and Sky Brightness Monitor since 2014. Designated India's first dark-sky preserve (September 2022, Bortle Class "Black"). Key publications: Ningombam et al. (2021; DOI: 10.1093/mnras/stab1971), Sharma et al. (2017; DOI: 10.1093/mnras/stx1259).

**Vainu Bappu Observatory** (Kavalur, India, 725 m, 12°35′N, Aw). Operational since 1968 but with limited published quantitative meteorological data. Typical seeing 1.5″; observing peak January–April.

**Vietnamese observatories.** Nha Trang and Hoa Lac have been characterized only through **ERA5 reanalysis** (Shikhovtsev et al. 2021; DOI: 10.3390/atmos12121680) — not in-situ measurements. **No published in-situ meteorological or sky-quality datasets exist from any Vietnamese observatory.** Quy Nhon Observatory (ICISE/ExploraScience, Ghenh Rang Ward) hosts the CDK600 telescope (largest in Vietnam) and the SAGI observational astronomy program, but no peer-reviewed site characterization data has been published.

**Timau National Observatory** (Indonesia, 1,300 m, 9.5°S, Aw/BSh). Under construction for a 3.8 m telescope (largest in SE Asia). SQM data yields background brightness **21.86 ± 0.38 mag/arcsec²**; median seeing 0.92″; ~70% clear-sky fraction. Key publication: Priyatikanto et al. (2023; DOI: 10.1093/mnras/stac3386).

---

### 12. Globe at Night

**Institution.** NSF's NOIRLab. Global citizen science campaign operational since **2006**; 180+ countries; **>250,000 data points** accumulated through 2023.

**Data collected.** Naked Eye Limiting Magnitude (NELM, integer 1–7), location, time, cloud cover, constellation observed. SQM readings also accepted since ~2009. The Globe at Night Monitoring Network (GaN-MN) extends the program with fixed SQM-LE stations for continuous monitoring.

**Temporal resolution.** Campaign-based (2-week windows around new moon). Individual observation uncertainty: **±1.2 stellar magnitudes**. GaN-MN stations measure every few minutes continuously.

**Access.** Fully open under CC BY 4.0 at globeatnight.org/maps-data/. Yearly CSV downloads for 2006–2024.

**Key publication.** Kyba et al. (2023; DOI: 10.1126/science.abq7781) used Globe at Night data to demonstrate a **9.6% per year increase** in artificial skyglow globally. Falchi et al. (2016; DOI: 10.1126/sciadv.1600377) used Globe at Night SQM data to calibrate the New World Atlas of Artificial Night Sky Brightness.

**Limitations.** Strong geographic bias toward North America and Europe. Southeast Asia is severely underrepresented.

---

### 13. TESS-W, SQM networks, and IDA monitoring

**TESS-W** (Telescope Encoder and Sky Sensor – WiFi), developed by the STARS4ALL Foundation / Universidad Complutense de Madrid. Measures sky brightness in mag/arcsec² with broadband panchromatic response, plus IR sky temperature for cloud estimation and ambient temperature. Hundreds of units deployed, primarily in Europe. **Continuous monitoring at ~1-minute intervals.** Open data under CC BY 4.0 at tess.dashboards.stars4all.eu and tess-data.stars4all.eu. Hardware is open source. Key publication: Bará et al. (2019; DOI: 10.3390/s19061336).

**SQM networks** span multiple countries. The **Austrian network** (University of Vienna) operates 23–26 SQM-LE stations since 2015, most co-located at weather stations, with 2–7 second cadence. The **Dutch network** (MHN/"Was het donker") operates 67 SQM-LU stations at 42-second intervals. The **Veneto (Italy) network** runs 7 stations. Key publications: Posch et al. (2018; DOI: 10.1016/j.jqsrt.2018.03.010), Shah et al. (2025; DOI: 10.1093/mnras/staf1200). Known limitation: SQM sensitivity degrades at **34–53 mmag/arcsec²/year** from UV exposure (Puschnig et al. 2021; DOI: 10.1093/mnras/staa4019).

**DarkSky International** (formerly IDA) does not operate a centralized monitoring network but certifies >250 International Dark Sky Places, requiring SQM measurements (threshold ~21.2 mag/arcsec²). Data feeds into Globe at Night.

**Southeast Asian sky brightness monitoring is extremely sparse.** Bosscha Observatory (Indonesia) has a 7-year SQM record averaging ~19.99 mag/arcsec² (severe light pollution). Malaysian observatories (Langkawi, KUSZA) have published limited SQM data. **No TESS-W stations or published continuous SQM monitoring networks exist in Vietnam.**

---

## PART 2: Multi-source data integration in the literature

### Combining local sensors, satellite, and NWP for observatory forecasting

The most mature operational integration paradigm is the **Maunakea Weather Center (MKWC)** approach: human forecasters synthesize local sensor data (CFHT instrument tower, MASS-DIMM), WRF mesoscale model output at 1 km resolution, GFS global model guidance, and satellite imagery to produce daily seeing and weather forecasts. Lyman et al. (2020; DOI: 10.1093/mnras/staa1787) document this 20+ year operational system. Cherubini et al. (2022; DOI: 10.1093/mnras/stab2916) subsequently automated parts of this process using Random Forest ML with local weather sensors and GFS 250 mb wind speed as inputs, predicting nightly average seeing for 5 nights ahead.

The **MOSE project** (Masciadri et al. 2013; DOI: 10.1093/mnras/stt1708) and its operational descendant **FATE** integrate ECMWF global analyses as boundary conditions for Astro-Meso-Nh mesoscale simulations, validated against in-situ DIMM, MASS, and weather station data at Cerro Paranal. Osborn et al. (2018; DOI: 10.1093/mnras/sty1898) demonstrated that ECMWF GCM forecasts at 137 model levels, combined with stereo-SCIDAR turbulence profiler measurements, can predict Cn² profiles for VLT scheduling. For precipitable water vapor, Matus-Bello et al. (2025; arXiv: 2509.09575) combined two 183 GHz radiometers with weather station data and GFS forecasts using LSTM, achieving **50% RMSE reduction** over GFS alone at the ALMA/APEX site on Chajnantor.

### How temporal resolution mismatches are handled

The literature employs several strategies for reconciling data sources at different cadences. **Temporal aggregation** is the most common: Cherubini et al. (2022) aggregate sub-minute MASS-DIMM data to nightly averages to match GFS 6-hourly guidance. ALMA site studies resample 11 weather stations into a single dataset at **6-minute intervals** (Matus-Bello et al. 2025). Cerlini et al. (2020; DOI: 10.1002/met.1913) apply linear interpolation for gaps under 1 hour and **Empirical Orthogonal Function (EOF) analysis** for longer gaps. The MFSP-Net architecture (Zhang et al. 2021) retains separate spatiotemporal information flows for each resolution source, fusing them at the hidden state level within a dual-input LSTM. The MUST model uses **Bicubic Convolutional Interpolation (BCI)** to reconcile spatial resolution differences, while STCNet employs 1D convolution for time-series and 2D convolution for spatial features simultaneously.

### Missing data strategies

Observatory-specific gap-filling follows a well-established hierarchy. **Short gaps (<1 hour)** are typically handled by linear interpolation. **Medium gaps (1–24 hours)** use EOF algorithms or ERA5 reanalysis as a gap-filling reference (Cerlini et al. 2020). **Longer gaps** involve ML-based imputation: the **ClimateFiller** framework (Biddoccu et al. 2023) uses ERA5-Land reanalysis combined with Random Forest and KNN models. Costa et al. (2021) apply **MICE (Multivariate Imputation by Chained Equations)** for multi-variable gap-filling across 96 stations and 54 years. At ALMA, IQR-based outlier detection precedes LSTM training (Matus-Bello et al. 2025). Dupont et al. (2021) demonstrated that **attention networks** outperform interpolation for gap-filling micro-meteorological data at remote sites. The WMO-recommended quality control pipeline is: automated QC → manual inspection → gap filling → validation.

### Feature engineering for ML-based sky condition prediction

Several derived features recur across the observatory ML literature. **Temperature difference features** (ΔT between mirror, dome, and ambient) are identified as the single most impactful engineered feature for seeing prediction at LAMOST (Ni et al. 2022, RAA 22, 125003). **Time since sunset** serves as a proxy for radiative cooling (Cherubini et al. 2022; Milli et al. 2020, arXiv: 1910.13767). Wind speed variability metrics — particularly **maximum wind speed over 1-minute intervals and wind speed standard deviation** — rank as the top two features for Random Forest seeing prediction at La Palma (2025 RNAAS study, feature importance 0.23 and 0.17, respectively). Ni et al. (2022) further show that k-means clustering of atmospheric turbulence states into 4 categories (calm/active ground layer × calm/active free atmosphere) improves prediction accuracy. Shikhovtsev et al. (2024; DOI: 10.3390/atmos15010038) used ERA5 multilevel wind, temperature, humidity, and turbulent stresses at Maidanak, finding that feature importance is highly site-specific — atmospheric vorticities, useful at some sites, provided no benefit at Maidanak.

### Data fusion techniques applied in observatory contexts

**Random Forest and XGBoost dominate operational observatory ML.** Milli et al. (2020) use Random Forest for Paranal turbulence nowcasting (2-hour ahead). Ni et al. (2022) demonstrate that XGBoost with engineered features matches Transformer accuracy at **~500× lower computational cost** for LAMOST seeing prediction. Mommert (2020; AJ 159, 178) achieves 95% cloud detection accuracy with LightGBM applied to all-sky camera features.

**LSTM architectures** serve longer-horizon forecasting: Hou et al. (2023, Astronomy and Computing 43, 100710) achieve RMSE 0.12″ for 20-minute seeing prediction at Dome A; Matus-Bello et al. (2025) achieve MAPE ~22% for 12–24 hour PWV prediction at Chajnantor. The **SeeROCKET** approach (Ni et al. 2023, Engineering Applications of AI) uses random convolutional kernel transformation without backpropagation, achieving state-of-the-art seeing prediction (MAE 0.1125″) with dramatically faster training.

For multi-modal fusion, the literature reveals that **early fusion (feature concatenation)** remains standard in observatory applications, with intermediate fusion gaining traction. The **MFSP-Net** fuses at the hidden state level in dual-input LSTM. Late fusion (simple ensemble) performs poorly: Ni et al. (2022) report that "simply assembling results of single models does not necessarily lead to improved performance." Attention-based fusion (cross-attention gating, as in XFMNet) and transformer architectures show promise but remain computationally expensive and have not yet entered operational observatory forecasting.

---

## PART 3: Benchmarking the Quy Nhon Observatory dataset

### The TROPAS dataset compared against international benchmarks

The table below positions the Quy Nhon dataset against key comparators across critical dimensions.

| Attribute | Quy Nhon (TROPAS) | ESO Paranal | TMT Campaign | Lijiang ASMS | Maidanak | Timau (Indonesia) |
|---|---|---|---|---|---|---|
| **Altitude** | Coastal mountain | 2,635 m | 2,290–4,480 m | 3,200 m | 2,700 m | 1,300 m |
| **Köppen** | Am (tropical monsoon) | BWk (cold desert) | BWk–BSk | Cwb | BSk | Aw/BSh |
| **Time span** | 2.5 yr (2022–2025) | 25+ yr | 5 yr (2003–2008) | 7+ yr (ASMS since 2017) | 4 yr (2018–2022) | ~2 yr |
| **Resolution** | **1 min** | 20 min | 1–30 min | Continuous/robotic | 5 min | Nightly |
| **Records** | **~1 million** | Not enumerated | Not enumerated | Not enumerated | 133,420 (seeing) | Limited |
| **Parameters** | 16+ incl. SQM+meteo | ~15 (no SQM in ASM) | ~12 per site | SQM, seeing, meteo, cloud | 6 meteo + seeing | SQM, meteo, seeing |
| **SQM + meteo co-located** | **Yes, 1-min sync** | Separate instruments | No SQM | Yes (ASMS) | No | Separate |
| **Uptime** | **99.7%** | High but unpublished | Variable (unfiltered) | Not reported | Not reported | Not reported |
| **Public archive** | Planned (Zenodo) | Yes (TAP/web) | Yes (sitedata.tmt.org) | Via papers | Via papers | Via papers |

### Strengths of the Quy Nhon dataset

**Temporal resolution and co-location are the dataset's defining advantages.** At 1-minute intervals with SQM, NELM, lux, IR sky temperature, cloud cover, and full meteorological parameters recorded simultaneously from co-located sensors, the TROPAS dataset offers a **synchronization of sky-quality and atmospheric measurements that is unprecedented in the published literature**. The Austrian SQM network co-locates sky brightness monitors at weather stations but uses separate data systems. The Lijiang ASMS integrates SQM with meteorology but at coarser effective cadence. No published dataset matches the Quy Nhon combination of parameters, cadence, and co-location.

**Uptime of 99.7%** over 2.5 years is exceptional. ESO does not publish a comparable metric. The TMT campaign explicitly warns of data gaps and unfiltered corruption. For a custom ESP32-based IoT system, this reliability demonstrates that low-cost instrumentation can achieve publication-grade data continuity — a significant finding for the developing-world observatory community.

**Geographic uniqueness is substantial.** The dataset represents the **first in-situ observatory meteorological and sky-quality dataset from Vietnam** and one of very few from any tropical monsoon (Köppen Am) site globally. Only ERA5 reanalysis data has previously been published for Vietnamese observatory sites (Shikhovtsev et al. 2021; DOI: 10.3390/atmos12121680). The tropical monsoon climate presents fundamentally different atmospheric challenges — high humidity, aerosol variability, seasonal monsoon disruption — that are poorly represented in the global observatory characterization literature, which overwhelmingly draws from arid/semi-arid sites.

**The combined parameter set** — including VPD (Vapor Pressure Deficit), dual pressure measurements (station + sea level), binary rain status with hourly and daily accumulation, and IR-derived cloud cover alongside SQM — provides a **machine-learning-ready feature space** that surpasses many professional observatory datasets in breadth for ML applications.

### Weaknesses and gaps relative to professional observatories

**No seeing (DIMM) or optical turbulence measurements.** This is the most significant gap. Every major observatory dataset includes DIMM seeing, and most include MASS turbulence profiles, coherence time, and isoplanatic angle. Without seeing data, the TROPAS dataset cannot directly characterize the site's imaging quality — the single most important parameter for optical telescope scheduling. Adding a DIMM would transform the dataset's value.

**No dust/aerosol monitoring.** ESO and TMT datasets include particle counters; AERONET provides spectral AOD. Dust and aerosol content directly affect atmospheric extinction and sky transparency. The nearest AERONET stations (Bac Giang, Ho Chi Minh City) are hundreds of kilometers from Quy Nhon.

**No precipitable water vapor (PWV) measurement.** PWV is critical for infrared and submillimeter astronomy and is increasingly measured at observatory sites (LHATPRO at Paranal, IRMA at TMT sites, 183 GHz radiometers at ALMA). ERA5 or MERRA-2 PWV could partially compensate.

**Limited altitude and environment.** A coastal mountain site at tropical sea level faces fundamental physical limitations compared to the high-altitude arid sites that dominate professional astronomy. This is not a dataset weakness per se, but it constrains the astronomical utility of the site characterization.

**Time span of 2.5 years** is adequate for a data paper but short for climate trend analysis. Most benchmark datasets span 5–25+ years. Extending to at least 3 full years before publication would strengthen the seasonal characterization, capturing complete dry and wet monsoon cycles.

### Supplementary data sources to integrate

The following data products would significantly enhance the TROPAS dataset's analytical power:

- **ERA5 reanalysis** (hourly, 0.25°): Total column water vapor (PWV proxy), multilevel wind profiles (jet stream for free-atmosphere turbulence estimation), cloud cover, boundary layer height. ERA5-Land (0.1°) for higher-resolution surface parameters. Access via CDS API.
- **MERRA-2** (hourly–3-hourly, 0.5° × 0.625°): Uniquely provides **speciated aerosol diagnostics** (AOD, dust, organic carbon) essential for atmospheric extinction modeling absent from in-situ measurements. Access via NASA GES DISC.
- **AERONET Vietnam stations**: Nghia Do (Hanoi) and Ho Chi Minh City provide regional AOD and PWV context. While distant from Quy Nhon, they establish baseline aerosol climatology for Vietnam.
- **Himawari-8/9 satellite imagery**: Geostationary satellite providing 10-minute cadence cloud cover over Southeast Asia — ideal for validating IR-derived cloud estimates from the TROPAS system.
- **VIIRS Day-Night Band**: Satellite-based sky brightness measurements for regional light pollution context.
- **MODIS AOD** (daily, 1 km): Aerosol optical depth retrievals for the Quy Nhon region.
- **Vietnam Meteorological and Hydrological Administration (VMHA)**: Nearby weather stations for cross-validation of TROPAS meteorological parameters.

### Publishability as a standalone data paper

**The dataset is highly publishable.** The assessment rests on four pillars.

First, **the dataset fills a documented gap**. No published in-situ observatory meteorological or sky-quality dataset exists from Vietnam. Southeast Asian tropical observatory data is severely underrepresented globally. The Cape Verde Atmospheric Observatory published its first 3 years of tropical data successfully, explicitly noting that "the tropics are under-populated with long-term measurements."

Second, **the combination of co-located 1-minute SQM and meteorological data is unprecedented.** Most SQM networks rely on separate meteorological data from external agencies at daily resolution (e.g., Bosscha used BMKG data). The Dutch network uses satellite cloud data rather than co-located sensors. The Quy Nhon co-located, synchronous approach at 1-minute cadence is novel.

Third, **the volume and quality exceed common thresholds.** At ~1 million records with 99.7% uptime, the dataset exceeds what many published observatory characterization papers provide. *Scientific Data* (Nature) has no minimum data volume requirement — the criterion is that data must be "useful to at least one other research group."

Fourth, **the IoT innovation angle adds value.** Demonstrating that a custom ESP32-based system achieves publication-grade data continuity provides a replicable model for developing countries.

**Recommended journal targets**, in priority order:

1. ***Scientific Data* (Nature)** — Best fit. Data Descriptor format is ideal. Requires deposit in a trusted repository (Zenodo recommended), ISA-Tab metadata, and a Technical Validation section demonstrating data quality. No minimum data volume; values uniqueness and reusability. APC ~€1,790.

2. ***Geoscience Data Journal* (Wiley/RMetS)** — Excellent fit for the meteorological component. Requires deposit in an approved data center with DOI. Impact factor 5.10. APC ~$1,500 with LMIC waivers available.

3. ***Data in Brief* (Elsevier)** — Fastest and easiest path, especially as a co-submission with a TROPAS research article. Lower prestige but rapid review. APC ~$600–1,200.

4. ***MNRAS*** — Suitable as a **research paper** (not pure data paper) with substantial analysis of SQM-meteorological correlations, cloud cover estimation, and tropical site characterization findings. Comparable precedent: Shah et al. (2025; DOI: 10.1093/mnras/staf1200) on the Dutch SQM network.

5. ***ESSD* (Copernicus)** — Higher bar requiring ISO 19115 metadata compliance and demonstration of broader community value beyond astronomy. Open peer review process.

**Practical recommendations for publication.** Deposit the full dataset on **Zenodo** (free, DOI, accepted by all target journals) in both CF-convention NetCDF and CSV formats. Prepare ISA-Tab metadata for *Scientific Data* compatibility. Consider extending data collection to **March 2026 (3 full years)** to strengthen seasonal characterization. Frame the paper around three value propositions: (1) first Vietnamese observatory dataset, (2) novel co-located SQM+meteorology at 1-minute cadence, and (3) a replicable low-cost IoT model for developing-country observatories. A companion research paper in MNRAS or A&A analyzing TROPAS-derived tropical atmospheric patterns, SQM-cloud-meteorology correlations, and ML forecasting results would maximize the dataset's academic impact.

---

## Conclusion

This survey reveals a clear hierarchy in observatory meteorological datasets: **ESO's Ambient Conditions Database and the TMT Site Testing Campaign** set the global standard for public accessibility, parameter breadth, and documentation quality. ERA5 and MERRA-2 reanalysis products provide indispensable supplementary context, with MERRA-2's unique aerosol diagnostics proving increasingly valuable for atmospheric extinction modeling. WRF/Astro-Meso-Nh mesoscale simulations have matured into operational forecast tools at ESO, LBT, and Mauna Kea, though surface-layer turbulence remains their Achilles' heel.

The critical finding for TROPAS is geographic: **tropical Asian observatory characterization exists in a data desert**. Among Asian observatories, only Hanle (India) and Lijiang (China) approach international benchmarks in published data quality. Southeast Asia has virtually no published in-situ observatory datasets. The ML literature for observatory forecasting is dominated by Random Forest, XGBoost, and LSTM architectures operating on feature-concatenated multi-source data, with attention-based fusion emerging but not yet operational. The Quy Nhon dataset, with its unique combination of tropical monsoon location, 1-minute co-located SQM–meteorology, ESP32-based instrumentation, and 99.7% uptime, occupies a genuine niche that no existing dataset fills. Its primary limitations — absence of DIMM seeing, aerosol monitoring, and PWV — are addressable through instrumental upgrades and integration with ERA5, MERRA-2, and regional satellite products. Publication as a data paper, followed by a companion ML forecasting study, would establish TROPAS as a reference dataset for tropical observatory atmospheric science.