# Weather Forecasting and Site Characterization for Astronomical Observations (2018–2025 Literature Survey)

## Executive summary

Ground‑based observatories increasingly rely on quantitative forecasts of atmospheric conditions to optimise scheduling, protect assets, and exploit adaptive optics and infrared capabilities. Recent work has moved from purely climatological “site testing” toward operational numerical weather prediction (NWP), hybrid statistical–mesoscale systems, and machine‑learning nowcasting tailored to specific telescope sites. This report surveys key concepts, observatories, methods, and results from roughly 2018–2025, with an emphasis on short‑range (0–6 h) support for operations.


## Concepts and definitions

### Astronomical site characterization

Astronomical site characterization is the long‑term quantitative assessment of a candidate or existing observatory site’s atmosphere and environment, using multi‑year measurements and modelling to determine whether it can support the required science performance. It typically covers cloudiness and clear‑sky fraction, photometric and spectroscopic sky transparency, optical turbulence statistics (seeing, isoplanatic angle, wavefront coherence time, vertical \(C_N^2\) profiles), wind and temperature structure, precipitable water vapour (PWV), sky brightness, dust/aerosols, and extreme weather risk.\ Site‑characterization campaigns combine dedicated instruments (DIMM/MASS, SCIDAR, all‑sky cameras, radiometers, lidars), existing meteorological networks, satellite products, and increasingly reanalysis and climate‑model data.\[^1][^2]

Site characterization underpins site selection (e.g. for the ELT, CTA, SKA), defines facility design envelopes (domes, enclosures, AO systems), and provides climatological priors used by forecasting and scheduling systems.\


### Astronomical weather forecasting and nowcasting

Astronomical weather forecasting is the production of time‑dependent predictions of meteorological and astro‑climatic parameters directly relevant for observations, typically with horizons from a few hours to several days.\[^3] It differs from general weather forecasting by focusing on variables such as seeing, coherence time, PWV, cloud optical depth, and sky brightness, and by optimising for telescope‑scale spatial resolution and time sampling.\

Nowcasting usually denotes very short‑range forecasts (0–2 or 0–6 h ahead) that extrapolate current conditions using a mix of local sensors, numerical models, and machine‑learning methods.\[^4] For observatories operated in queue or service mode, nowcasting aims to predict whether conditions will remain within observing constraints over the duration of an observing block (often 30–120 min), allowing aggressive but safe scheduling.\


## Critical atmospheric parameters for astronomy

### Overview of key parameters

Modern literature converges on a core set of atmospheric parameters that most strongly affect image quality, AO performance, and instrument sensitivity.\[^5][^6]

| Parameter | Role for astronomy | Typical measurement / forecast target |
|-----------|--------------------|----------------------------------------|
| Seeing (\(\varepsilon\)) | Image full width at half maximum from integrated turbulence; primary image‑quality constraint | Median and distribution at zenith and along line of sight; sometimes decomposed into ground and free atmosphere components |
| Coherence time (\(\tau_0\)) | Temporal stability of wavefront; critical for AO control loops and fringe tracking | Median and distribution, joint with seeing |
| Isoplanatic angle (\(\theta_0\)) | Angular field over which AO correction is correlated | Statistics from \(C_N^2\) profiles |
| Optical turbulence profile (\(C_N^2(h)\)) | Vertical distribution of turbulence; drives MCAO/tomography design and performance | 0–20 km profiles with 10s–100s m vertical resolution |
| Ground‑layer fraction (GLF) | Fraction of turbulence in the lowest ~1 km; key for GLAO | Distribution and joint statistics with seeing and \(\tau_0\) |
| Cloud cover / sky transparency | Determines whether observations are feasible and whether conditions are photometric | Cloud fraction and type, optical depth, IR sky temperature fluctuations |
| Precipitable water vapour (PWV) | Dominant absorber in IR/sub‑mm; affects thermal background and atmospheric transmission | Zenith PWV and, increasingly, line‑of‑sight PWV with \(<\)1 mm accuracy in dry regimes |
| Wind speed and direction | Drive dome seeing, tracking limits, and turbulence advection; high winds can close domes | Profiles up to jet stream plus local 10–30 m winds |
| Temperature and vertical gradients | Influence refractive index structure and dome/ground‑layer turbulence | Near‑surface profiles and inversion strength |
| Relative humidity and dew point | Control condensation risk and influence IR sky background | Local RH and dew point with thresholds for closure |
| Sky brightness | Sets S/N in broadband imaging and spectroscopy | Dark‑sky brightness plus light‑pollution and airglow variability |

Multi‑parameter joint distributions (e.g. seeing–PWV, seeing–\(\tau_0\), seeing–cloudiness) are increasingly important for AO instruments and multi‑arm survey facilities like VLT/MUSE, VLT/SPHERE, ALMA, and Rubin Observatory.\


## Forecasting methodologies (2018–2025)

### Mesoscale NWP with astro‑specific physics

The dominant “state‑of‑the‑art” approach for site‑specific forecasts uses non‑hydrostatic mesoscale models such as Meso‑NH or WRF, nested down to horizontal resolutions of a few hundred metres around the observatory and combined with dedicated optical‑turbulence parameterisations.\[^6][^7]

The MOSE project and subsequent work at ESO and INAF demonstrated that Meso‑NH plus the Astro‑Meso‑NH optical‑turbulence package can reconstruct vertical profiles of wind, temperature, and \(C_N^2\) up to 20 km over Cerro Paranal and Cerro Armazones, with biases and RMSEs small enough for operational use.\ For example, near‑surface wind speed and temperature RMSEs at Paranal are typically a few metres per second and \(< 1\) K respectively, while integrated seeing and coherence‑time forecasts show useful skill over 1–3 day horizons.\[^6]

The FATE project (Forecast system for Atmosphere and Turbulence for ESO) represents the operational successor to MOSE at Paranal. It runs Astro‑Meso‑NH on a three‑domain nested grid with 500 m resolution in the innermost domain, forced by ECMWF HRES data, and delivers forecasts for wind, humidity, PWV, cloud cover (via sky‑transparency categories), seeing, coherence time, and ground‑layer fraction at lead times of 1, 2, and 3 days, sampled every 10 minutes.\ Commissioning results show strong correlation between forecasts and observations for surface meteorology and astro‑climatic parameters, with forecast uncertainties already smaller than the intrinsic scatter between different turbulence instruments (e.g. MASS‑DIMM vs stereo‑SCIDAR).\

The ALTA Center at the Large Binocular Telescope (LBT) similarly runs Meso‑NH/Astro‑Meso‑NH in an operational mode over Mount Graham, forecasting near‑surface meteorology, PWV, and optical‑turbulence parameters (seeing, isoplanatic angle, coherence time) to support LBT and LBTI scheduling.\ Extensive validation has shown sub‑Kelvin biases and \(< 2\)–3 m s\(^{-1}\) RMSE for surface temperature and wind, and good agreement for bulk turbulence integrals, broadly comparable to Paranal results.\


### PWV forecasting at optical/IR sites

Turchi et al. (2019, MNRAS 482, 206–218) validated Meso‑NH forecasts of PWV above Paranal (VLT) and Mount Graham (LBT) against the LHATPRO microwave radiometer and satellite products.\ Using a 500 m inner domain and 62 vertical levels up to ~23 km, they achieved RMSE of about 0.65 mm for PWV \(\leq 5\) mm after a simple linear bias correction, with negligible bias and similar performance in 2013 and 2017 samples.\ For extremely dry conditions (PWV \(\leq 1\) mm), the corrected RMSE is \(\sim 0.27\) mm and the bias‑corrected dispersion \(\sigma\) is \(\sim 0.25\) mm, comparable to instrument precision.\

Contingency‑table analysis shows probability of detection (POD) of dry episodes is very high: for PWV \(\leq 1\) mm, POD \(\approx 84\)–86% without tolerance and \(\approx 93\)% allowing a 0.2 mm measurement uncertainty; for PWV \(\leq 2\) mm, POD exceeds 95%.\ Meso‑NH outperforms the underlying ECMWF GCM by roughly a factor of two in dispersion for PWV \(\leq 1\) mm (\(\sigma\) \(\sim 0.26\) mm vs \(\sim 0.54\) mm), illustrating the value of mesoscale downscaling for IR scheduling.\

For the Chajnantor plateau (APEX and ALMA region), WRF‑based studies have begun to resolve spatial structure in PWV along individual lines of sight. Marin et al. (2023, MNRAS 522, 457–474) used a 1.5 km WRF configuration plus radiative‑transfer post‑processing to predict directional PWV and effective transmission for APEX, finding that line‑of‑sight PWV typically differs from zenith values by \(< 0.26\) mm in most cases, but can deviate by \(\sim 0.5\) mm in certain directions, motivating directional PWV forecasting for high‑frequency sub‑mm observations.\

Reanalysis‑based studies have also compared MERRA‑2 and ERA5 PWV to ground radiometers at Paranal and Chajnantor, finding that modern reanalyses capture the broad distribution of PWV but still show seasonal and site‑dependent biases that limit their direct use for night‑to‑night scheduling without local calibration.\


### General‑circulation models and statistical post‑processing

Because mesoscale models are computationally expensive, several groups have explored using global models plus statistical post‑processing for astro‑specific parameters. Osborn and Sarazin (2018, MNRAS 480, 1278–1299) used ECMWF operational GCM output to forecast integrated seeing, coherence time, and ground‑layer fraction at Paranal.\ Despite the coarse horizontal resolution (tens of kilometres), they obtained useful skill for free‑atmosphere seeing and coherence time, with correlation coefficients \(\sim 0.6\) and RMSEs competitive with early mesoscale efforts, though performance for surface‑layer turbulence is weaker.\

Global models also underpin worldwide services such as Clear Sky Chart (based on the Canadian GEM/CMC model), which provides cloud, transparency, seeing, and darkness forecasts for thousands of amateur and professional sites. Validation studies report that 0–12 h “mostly clear” and “mostly cloudy” forecasts are correct roughly 80–91% of the time, degrading modestly toward 36–48 h horizons, illustrating the baseline performance achievable without site‑specific tuning.\


### Machine‑learning and hybrid nowcasting

Short‑range forecasting and nowcasting are an active area for machine‑learning methods, often in hybrid configurations that use NWP as a baseline and local measurements for rapid updates.\

At ESO Paranal, Milli et al. (2019, AO4ELT6; arXiv:1910.13767) trained Random Forest (RF), multilayer perceptron (MLP), and LSTM recurrent neural‑network models on three years of DIMM seeing, MASS–DIMM coherence time and ground‑layer fraction, surface meteorology, and a single high‑altitude wind parameter to nowcast seeing, coherence time, and GLF over the next two hours.\[^8] Using 2 h history blocks resampled every 5 minutes, they obtained 1 h‑ahead RMSE of 0.2–0.25 arcsec for seeing for all algorithms tested, with MLP maintaining RMSE \(< 0.24\) arcsec out to 2 h while RF degrades to \(> 0.26\) arcsec.\ Compared to a simple persistence model (constant seeing equal to the last 15 min average), machine‑learning yields little improvement for lead times \(< 40\) minutes but reduces 2 h‑ahead RMSE by about 10% (RF) to 21% (MLP).\[^8]

Milli et al. further showed that high‑frequency “seeing bursts” drive most failures and are hard to anticipate from local history alone, suggesting that adding spatial information (from nearby peaks and free‑atmosphere wind/\(C_N^2\) structure) or more sophisticated recurrent/chaotic‑system architectures may be required to improve nowcasting of extreme events.\

The FATE system at Paranal integrates a hybrid short‑term forecast scheme in which 1–2 h “AR” (autoregressive) forecasts use recent time series from site monitors together with the latest Astro‑Meso‑NH outputs, with updates nominally every hour and planned upgrades toward 10 min refresh.\ Commissioning results show that short‑term forecasts for seeing, \(\tau_0\), and GLF already achieve uncertainties smaller than the observed discrepancies between independent instruments (e.g. RINGSS vs MASS–DIMM), although performance is still slightly below the best offline tuning reported in Masciadri et al. (2023, MNRAS 523, 3487).\

At Dome A in Antarctica, recent work has used surface meteorological data to drive machine‑learning models that estimate and predict seeing at polar sites. One study reports an RMSE of \(\sim 0.18\) arcsec for instantaneous seeing estimates and \(\sim 0.12\) arcsec for 20‑minute‑ahead predictions, corresponding to roughly a 37% reduction in RMSE relative to persistence for short‑lead nowcasts.\

More generally, the meteorological community has demonstrated convolutional and recurrent neural‑network nowcasting of radar and satellite imagery (e.g. ConvLSTM and attention‑based models) with lead times of 0–6 h for convective storms and cloud evolution, which are directly relevant for future cloud and transparency nowcasting at observatories.\


### Satellite, reanalysis, and climate‑change studies

Satellite retrievals and global reanalyses (ERA5, MERRA‑2) have been widely used to extend site‑characterization timescales and to study climate‑driven trends in observing conditions.\[^9] For example, a multi‑site study using ERA5 and CMIP‑class climate models found statistically significant warming and moistening trends at several premier observatory sites, with associated increases in high‑level cloudiness and PWV projected over the coming decades, potentially degrading IR and sub‑mm observing windows.\

Although reanalyses currently lack the resolution and bias characteristics needed for direct operational use, they provide important context for understanding interannual variability, extremes, and long‑term changes in astro‑climate, and they supply boundary conditions and initial states for nested mesoscale models.\[^9]


## Observatory‑specific systems (2018–2025)

### Summary table

The table below summarises major observatories and systems with documented forecasting or advanced site‑characterization efforts relevant to operations.

| Site / system | Location | Key forecasted parameters | Methods / models | Typical horizon | Reported accuracy (examples) | Key recent publications |
|---------------|----------|---------------------------|------------------|-----------------|------------------------------|-------------------------|
| VLT / ELT – MOSE & FATE | Cerro Paranal & Cerro Armazones, Chile | Surface T, RH, wind; PWV; cloud/sky transparency; seeing, \(\tau_0\), GLF, \(C_N^2(h)\) | Astro‑Meso‑NH (mesoscale, 500 m); hybrid AR nowcasting | 1–3 days (NWP); 1–2 h (AR) | Surface T bias \(< 1\) K; wind RMSE \(< 3\) m s\(^{-1}\); seeing and \(\tau_0\) errors comparable to instrument scatter; PWV RMSE \(\sim 0.65\) mm for PWV \(\leq 5\) mm, \(\sim 0.27\) mm for PWV \(\leq 1\) mm | Masciadri et al. 2013, 2017, 2023, MNRAS; Turchi et al. 2019, MNRAS; Masciadri et al. 2024, SPIE (FATE)\ |
| VLT Paranal – turbulence nowcasting | Cerro Paranal, Chile | Seeing, coherence time, GLF | RF, MLP, LSTM ML on ASM data | 0–2 h | Seeing RMSE 0.2–0.25 arcsec at 1 h; MLP keeps \(< 0.24\) arcsec at 2 h; 21% RMSE reduction vs persistence at 2 h | Milli et al. 2019, AO4ELT6; arXiv:1910.13767\[^8] |
| Paranal STS seeing nowcast | Cerro Paranal, Chile | Seeing (for scheduling) | RF nowcast integrated into STS simulator | 0–1 h | Across UTs and semesters, \(~ 3.5\) h more successful A/B‑rank OBs and \(~ 4.4\) h fewer failed A/B OBs per telescope per semester vs persistence; larger gains for stricter seeing constraints | Anderson et al. 2024, SPIE / arXiv:2407.16049\ |
| VLT/LBT PWV forecast | Paranal, Chile; Mount Graham, USA | PWV | Meso‑NH nested to 500 m | Overnight windows (\(\sim\) 9 h analysed) within 1–3 day runs | PWV RMSE 0.65 mm for PWV \(\leq 5\) mm; POD of PWV \(\leq 1\) mm \(\sim 84\)–86% (\(> 93\)% with 0.2 mm tolerance) | Turchi et al. 2019, MNRAS 482, 206–218\ |
| ALTA Center | Mount Graham (LBT), Arizona, USA | Surface meteorology; optical turbulence (seeing, \(\theta_0\), \(\tau_0\)); PWV | Meso‑NH + Astro‑Meso‑NH, nested down to 500 m | 1–2 days, with intra‑night updates | Surface T bias \(< 1\) K; wind RMSE \(< 2\)–3 m s\(^{-1}\); good agreement for integrated seeing and \(\tau_0\) vs SCIDAR and DIMM | Masciadri et al. 2017, MNRAS 466, 520–539; Turchi et al. 2017, MNRAS 466, 1925–1943\ |
| APEX / Chajnantor PWV WRF | Chajnantor plateau, Chile | PWV along line of sight; atmospheric transmission | WRF (\(\sim 1.5\) km) plus radiative transfer | 0–24 h | Typical LOS–zenith PWV differences \(< 0.26\) mm but can reach \(\sim 0.5\) mm in specific directions; good agreement with radiometer climatology | Marin et al. 2023, MNRAS 522, 457–474\ |
| Maunakea ML seeing forecast | Maunakea, Hawaii, USA | Free‑ and total‑atmosphere seeing | ML models (e.g. Bayesian ridge regression, k‑means) trained on NWP and observational data | 1–5 nights | Correlation coefficients \(\sim 0.6\) for free‑atmosphere and total seeing vs observations; RMSE \(\sim 0.2\) arcsec | Cherubini et al. 2022, MNRAS 514, 3262–3276\ |
| Dome A seeing ML nowcast | Dome A, Antarctica | Seeing | ML on local meteorological data | \(\sim 20\) min | Seeing RMSE \(\sim 0.12\) arcsec at 20 min lead; \(~37\)% RMSE reduction vs persistence | Hou et al. 2023, Astronomy & Computing 43 (and related works)\ |
| ECMWF GCM turbulence forecast | Cerro Paranal, Chile | Seeing, \(\tau_0\), GLF | ECMWF operational GCM with turbulence parameterisation | 0–3 days | Correlation \(\sim 0.6\) for free‑atmosphere seeing and \(\tau_0\); lower skill for surface layer | Osborn & Sarazin 2018, MNRAS 480, 1278–1299\ |
| Clear Sky Chart | Global (thousands of sites) | Cloud, transparency, seeing, darkness | GEM/CMC global NWP with astro‑specific diagnostics | 0–48 h | 0–12 h “mostly clear/cloudy” forecasts correct \(\sim 80\)–91%; modest degradation at 36–48 h | Clear Sky Chart documentation and validation notes (2019–2023)\ |

Many other facilities (e.g. La Silla, Cerro Tololo/Pachón, Roque de los Muchachos, Sutherland, Siding Spring) rely primarily on high‑quality general forecasts from national meteorological services, augmented by local measurements and, in some cases, by global astro‑oriented products like Clear Sky Chart and ECMWF‑based turbulence forecasts.\


### Chilean Andes: Paranal, Armazones, La Silla, Tololo, Pachón, Chajnantor

The Paranal–Armazones complex currently represents the most advanced integration of site characterization, NWP, ML nowcasting, and scheduling. Long‑term astro‑climate studies using DIMM/MASS, all‑sky cameras, LHATPRO, and other instruments underpinned ELT site selection and provided the training and validation data for MOSE and FATE.\[^5][^10][^11]

For Paranal, Meso‑NH/Astro‑Meso‑NH modeling has been validated for surface meteorology, vertical profiles, and integrated turbulence, and is now operated continuously within FATE for 1–3 day forecasts, while AR nowcasting and separate ML models provide short‑term guidance.\ Similar model configurations and PWV validation have been applied at Mount Graham (LBT) and are being ported to other ESO sites.\[^7]

Tololo and Pachón (hosting CTIO, SOAR, Gemini South, and Rubin Observatory) have rich site‑characterization archives (e.g. DIMM, MASS, RoboDIMM, all‑sky cameras) but, as of 2025, there is relatively little published on dedicated high‑resolution optical‑turbulence forecasting analogous to MOSE/FATE, beyond the use of general NWP forecasts and Chilean meteorological services for operational decision‑making.\ Rubin Observatory operations documentation emphasises real‑time site monitoring and threshold‑based rules rather than bespoke OT forecasts, although integration with external NWP products is planned.\

On the Chajnantor plateau, where ALMA and APEX operate, forecasting efforts have focused strongly on PWV and sky transparency at mm/sub‑mm wavelengths. The PWV‑focused WRF work by Marin et al. and reanalysis validation studies illustrate the emerging trend toward line‑of‑sight and directional PWV forecasts, though fully integrated OT forecasts for AO are less of a priority given the long wavelengths and interferometric techniques used at ALMA.\


### Maunakea observatories

The Maunakea Weather Center (MKWC) has long provided daily meteorological and cloud forecasts using mesoscale models (e.g. WRF) and satellite analysis, but recent work has begun to add ML‑based seeing predictions tailored to the site. Cherubini et al. (2022) used machine‑learning techniques (including Bayesian ridge regression and clustering) applied to NWP and observational inputs to predict free‑ and total‑atmosphere seeing several nights ahead, obtaining correlation coefficients \(\sim 0.6\) and RMSE \(\sim 0.2\) arcsec.\ These mid‑range forecasts complement more qualitative short‑range nowcasts produced by forecasters using high‑frequency WRF and satellite products.


### Large Binocular Telescope (Mount Graham)

The ALTA Center has been operating for nearly a decade to provide automatic, nightly forecasts of meteorological and optical‑turbulence parameters for the LBT and LBTI.\ Its Meso‑NH/Astro‑Meso‑NH configuration is similar to that used in MOSE/FATE, with a three‑domain grid‑nesting system and inner resolution of 500 m, initialised from ECMWF.\

Validation work shows good performance for near‑surface wind and temperature, high‑altitude winds relevant for AO design, and integrated seeing and coherence time, supporting both queue scheduling and instrument planning.\ Turchi et al. (2019) extended this framework to PWV, showing excellent agreement with satellite‑derived PWV climatology at LBT.\


### Roque de los Muchachos and Teide (Canary Islands)

The Canary Island observatories have extensive site‑testing histories (e.g. RoboDIMM seeing statistics, turbulence profiling, cloud and dust monitoring) and are included in several global or regional modeling studies, including ERA5‑based climate‑trend analyses and ECMWF/Meso‑NH optical‑turbulence studies.\ However, there is limited public documentation of fully operational, site‑specific OT forecasting systems comparable to FATE or ALTA, and operations primarily rely on national meteorological forecasts (AEMET), satellite imagery, and local measurements.\

The Cherenkov Telescope Array (CTA) site‑selection and characterisation programme, which considered La Palma and Paranal among others, has used regional climate models and long‑term cloud and aerosol statistics that may provide a basis for future dedicated forecasting, but detailed nowcasting implementations have not yet been widely reported in the literature.\


### Antarctic sites

Antarctic sites such as Dome C and Dome A are attractive for their extremely good seeing and low PWV but pose unique forecasting challenges due to sparse observations and polar‑specific meteorology. ML‑based seeing estimation and short‑term prediction at Dome A, using local meteorological data and supervised learning, indicate that 20‑minute‑ahead nowcasts can significantly outperform persistence, with RMSE \(\sim 0.12\) arcsec and substantial reduction in error for operationally relevant timescales.\ However, there is little evidence yet of integrated NWP–ML forecasting pipelines comparable to those at mid‑latitude observatories.


### Global astro‑forecast services

Services like Clear Sky Chart, MeteoBlue’s astronomy forecasts, and other publicly available tools provide cloud cover, seeing proxies, and darkness estimates for thousands of sites worldwide using global or regional NWP plus empirical seeing models.\ These are invaluable for small observatories and amateur astronomers, but their spatial resolution (often \(\geq 2.5\)–10 km) and lack of explicit \(C_N^2\) modeling limit their usefulness for cutting‑edge AO and IR facilities where dome‑scale effects and detailed turbulence structure matter.


## State of the art in nowcasting for observatory operations

### Short‑range turbulence and seeing nowcasting

Several lines of work illustrate the current state of the art in 0–6 h nowcasting of turbulence‑related parameters for observatories.

At Paranal, the Milli et al. ML study remains one of the most detailed analyses of turbulence nowcasting from in situ measurements. RF, MLP, and LSTM models trained on ASM data can predict DIMM seeing with RMSE of 0.2–0.25 arcsec at 1 h lead, modestly outperforming a carefully tuned persistence model for 1–2 h horizons.\[^8] The work argues that the main limitation is the intrinsic stochasticity of seeing and the lack of upstream spatial information, rather than model capacity, and suggests extending the input space using nearby site monitors and free‑atmosphere data.\

The FATE AR short‑forecast module operationalises a hybrid philosophy: using high‑resolution Meso‑NH predictions as a physically constrained baseline and autoregressive correction based on recent observations to improve 1–2 h forecasts.\ Although detailed RMSE statistics from the commissioning phase are not yet widely published, qualitative density plots show good agreement between forecasts and measurements for seeing, \(\tau_0\), and GLF, and the reported forecast errors are already below instrument‑to‑instrument discrepancies.\

At Dome A, machine‑learning nowcasting of seeing on 10–20 min horizons demonstrates that even relatively simple models using local meteorological predictors can substantially beat persistence, encouraging similar developments at temperate observatories, especially where turbulence is dominated by boundary‑layer processes strongly linked to surface variables.\


### Integration with scheduling and operations

The Anderson et al. (2024) Paranal STS study represents a key step from proof‑of‑concept nowcasting toward quantitative operational impact assessment. Using a detailed simulator that ingests real observing queues, atmospheric time series, and a Random‑Forest–based seeing nowcast, they compared the current “precast” model (which assumes constant seeing equal to the last 10 min median) with a nowcast‑driven model.\

For real VLT queue conditions between semesters P107 and P111, nowcasting yields on average about 3.5 additional hours of successfully completed A/B‑rank science observations and about 4.4 fewer hours of failed A/B‑rank observations per UT per semester, relative to precast, without changing any other aspects of the scheduling algorithm.\ When they artificially tightened seeing constraints to match the empirical seeing distribution (mimicking an ELT‑era queue), gains are much larger: roughly 25 additional successful hours and 40 fewer failed hours of A/B‑rank observations per semester for each of UT1 and UT2.\ These results indicate that even moderate improvements in short‑term seeing prediction can translate into substantial science‑efficiency gains, especially for AO‑intensive programmes.


### Generic meteorological nowcasting technologies

Outside astronomy, 0–6 h nowcasting of precipitation and clouds using radar and satellite imagery has rapidly progressed through ConvLSTM, attention‑based, and generative adversarial models that learn spatio‑temporal evolution directly from image sequences, often outperforming traditional extrapolation or NWP at very short leads.\[^12] These advances are directly applicable to astronomical nowcasting of cloud cover, cloud optical depth, and perhaps even sky brightness fluctuations, especially when combined with IR all‑sky cameras and geostationary satellite data.


## Key challenges in hyperlocal prediction for telescope sites

### Orography, boundary layers, and representativeness

Mountain observatories sit on sharp peaks or ridges, where flow separation, katabatic winds, and local inversions generate complex boundary‑layer structures that are hard to resolve even at 500 m horizontal resolution.\ Surface‑layer parameters (temperature, wind, turbulence) show steep vertical gradients over the first 30–50 m, requiring fine vertical grids and carefully validated surface schemes.\[^7] Instruments measure at specific heights and locations on large platforms (e.g. VLT’s four UTs and ATs), so mapping model grid cells onto instrument footprints introduces additional representativeness errors.\


### Stochastic turbulence and limited predictability

Optical turbulence, especially in the ground layer, exhibits intermittency and “bursts” of seeing on timescales of minutes that can dominate scheduling failures.\[^8] Milli et al. showed that even with rich local input data, ML models struggle to anticipate these bursts, and that persistence is nearly optimal for \(< 40\) min horizons.\ This suggests an intrinsic limit to deterministic predictability at very short scales, motivating probabilistic forecasts (predicting the probability of seeing remaining within a constraint band) and ensemble approaches rather than single deterministic nowcasts.\[^11]


### Data limitations and instrument uncertainties

High‑quality training and validation of forecasts require long, homogeneous, and well‑calibrated time series of turbulence and meteorological measurements. However, many sites have seen instrument upgrades, relocations, or changes in sampling cadence that complicate ML training and bias estimation.\ FATE’s experience shows that even when forecast skill is high, instrument‑to‑instrument discrepancies (e.g. MASS‑DIMM vs stereo‑SCIDAR vs RINGSS) can exceed forecast errors, making it difficult to define “ground truth” and very tight accuracy specifications.\

In addition, some key variables, such as full \(C_N^2\) profiles and high‑altitude winds, are measured only sporadically (e.g. SCIDAR campaigns, radiosondes), limiting their use for real‑time assimilation or ML training.\


### Line‑of‑sight vs zenith and array‑wide considerations

Most current PWV and turbulence forecasts target zenith or a single direction, but telescopes observe across a wide range of elevations and azimuths, and large facilities (e.g. ALMA) operate as distributed arrays. Marin et al. showed that line‑of‑sight PWV can deviate significantly from zenith values for some directions, and that resolving such structure may matter for highest‑frequency sub‑mm work.\ For the ELT and multi‑UT AO systems, turbulence structure and wind profiles may also vary across the array footprint, complicating the mapping between a single monitor (e.g. MASS‑DIMM) and conditions at each telescope.\


### Cloud and sky‑brightness prediction

Cloud cover and transparency remain challenging to predict accurately at the spatial and temporal scales relevant for telescopes, especially for thin cirrus and broken clouds that cause photometric instabilities rather than hard closures.\[^13][^14] Infrared sky‑temperature fluctuations measured by instruments like LHATPRO can provide fine‑scale cloud signatures, but robust quantitative links between such measures, photometric quality, and forecasted cloud fields are still being developed.\

Accurate prediction of sky brightness (airglow, zodiacal light, scattered moonlight, anthropogenic light pollution) is an additional, relatively under‑developed area, though moonlight models and airglow climatologies exist and have been incorporated into some exposure‑time calculators.\[^2]


### Climate change and non‑stationarity

Long‑term trends in temperature, PWV, and large‑scale circulation patterns mean that climatological baselines used by scheduling systems are slowly shifting. Multi‑decadal ERA5‑based studies show warming and moistening trends at several leading observatory sites, along with indications of increasing high‑level cloudiness in some regions.\ Forecast models and ML training sets built on historical data must therefore be updated and recalibrated to avoid systematic drift and to remain optimal as underlying distributions change.\[^9]


## Gaps and opportunities for future work

Recent work has established the feasibility and operational value of high‑resolution NWP and ML nowcasting for major observatories, but several gaps remain where further research would be particularly impactful for a PhD‑level project.

1. **Probabilistic nowcasting of turbulence and PWV.** Most current systems deliver deterministic values, whereas operations would benefit from calibrated probability distributions for parameters staying within constraint bands over given horizons. Extending ML and hybrid systems to produce such probabilistic outputs (e.g. via quantile regression, Bayesian neural networks, or ensemble methods) is a natural next step.\
2. **Assimilation of advanced turbulence profilers.** Integrating stereo‑SCIDAR, RINGSS, and other profilers into mesoscale models and ML pipelines could improve high‑altitude \(C_N^2\) representation and AO‑relevant forecasts but requires new data‑assimilation strategies and careful handling of instrument biases.\[^6][^11]
3. **Spatio‑temporal ML using multi‑site networks.** The Paranal–Armazones/nearby peaks constellation and the ALMA/APEX region offer natural laboratories for exploring graph‑based or convolutional sequence models that ingest multi‑site meteorological and turbulence data to predict the advection of turbulent layers and clouds.\
4. **Cloud and transparency nowcasting from satellite and all‑sky imagery.** Applying state‑of‑the‑art ConvLSTM/attention architectures from meteorological nowcasting to geostationary satellite imagery and IR all‑sky cameras, tuned for photometric quality metrics, is an under‑explored but promising direction.\[^12]
5. **Coupled scheduling–forecast optimisation.** Building on Anderson et al.’s STS simulator, joint optimisation of forecast systems and scheduling policies (e.g. adjusting queue constraints in response to forecast skill, or exploiting probabilistic forecasts) could yield further gains beyond using nowcasts as simple replacements for persistence.\

Overall, the 2018–2025 period has seen the maturation of site‑specific atmospheric forecasting and the emergence of ML‑based nowcasting as a serious tool for observatory operations. Continued integration of these methods with AO design, queue management, and long‑term climate assessment will be central to maximising the scientific return of current and next‑generation facilities.

---

## References

1. [Hong Kong Observatory 2020](https://www.weather.gov.hk/en/abouthko/files/hko2020e.pdf) - The year 2020 was the second warmest in Hong. Kong since records began in 1884, with an annual mean ...

2. [Forecast of surface layer meteorological parameters at Cerro ...](https://academic.oup.com/mnras/article/449/2/1664/1069715) - by F Lascaux · 2015 · Cited by 36 — The forecasts of the absolute temperature and the wind direction...

3. [A Convection Nowcasting Method Based on Machine ...](https://onlinelibrary.wiley.com/doi/10.1155/2020/5124274) - Convection nowcasting refers to the short-term forecasting of the convective weather system and the ...

4. [Machine learning-based seeing estimation and prediction ...](https://www.sciencedirect.com/science/article/abs/pii/S2213133723000252) - by X Hou · 2023 · Cited by 9 — In this paper, we present a novel machine learning-based framework fo...

5. [13-1](https://celt.ucolick.org/greenbook/ch13.pdf)

6. [MOSE: operational forecast of the optical turbulence and ...](https://academic.oup.com/mnras/article/436/4/3147/986083) - by F Lascaux · 2013 · Cited by 27 — Abstract. This paper is the second of a series in which we aim t...

7. [Nowcasting the turbulence at the Paranal Observatory](https://ao4elt6.copl.ulaval.ca/proceedings/401-9pcJ-241.pdf) - by J Millia · Cited by 14 — 12–15 This Paranal mesoscale model has significantly evolved since its d...

8. [Forecasting water vapour above the sites of ESO's Very Large ...](https://academic.oup.com/mnras/article/482/1/206/5113488) - ABSTRACT. Water vapour in the atmosphere is the main source of the atmospheric opacity in the infrar...

9. [Forecasting seeing for the Maunakea observatories with ...](https://academic.oup.com/mnras/article/509/1/232/6391506) - by T Cherubini · 2022 · Cited by 23 — This paper presents a machine-learning approach to translate t...

10. [[PDF] 14. Site Characterisation - ESO.org](https://www.eso.org/sci/facilities/eelt/owl/Blue_Book/14_Site_characterization.pdf)

11. [astronomical site selection: Topics by Science.gov](https://www.science.gov/topicpages/a/astronomical+site+selection.html)

12. [ClearDarkSky](http://www.cleardarksky.com)

13. [verification of Meso-NH forecasts of the atmospheric ...](https://www.semanticscholar.org/paper/MOSE:-verification-of-Meso-NH-forecasts-of-the-at-Lascaux-Masciadri/7187a2b75d6fb60af80aeaf57d185678e7e069b9) - This study is done in the framework of the MOSE (MOdeling ESO Sites) project, and focused above the ...

14. [Weather Constraints](https://obs-ops.lsst.io/v/SITCOM-526/Nighttime-Operations/Weather-Constraints/index.html) - Go outside and look for incoming cloud fronts, and inspect the buildings and cars for condensation i...

