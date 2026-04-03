# Deep Learning Architectures for Meteorological Time Series Forecasting

## 1. Introduction

Meteorological time series forecasting involves predicting atmospheric variables such as temperature, precipitation, wind, humidity, and cloud cover across a wide range of spatial and temporal scales, from point measurements at stations to global gridded fields. Classical statistical approaches, including autoregressive integrated moving average (ARIMA) models and numerical weather prediction (NWP) systems based on discretized partial differential equations, have long underpinned operational weather forecasting but struggle with highly nonlinear dynamics, multi‑scale variability, and the need for rapid updates at high spatial resolution. Over the past decade, deep learning (DL) has emerged as a powerful alternative and complement, with architectures ranging from recurrent neural networks (RNNs) and long short‑term memory (LSTM) networks to attention‑based Transformers and, more recently, large foundation models trained on decades of reanalysis and simulation data.[^1][^2][^3][^4]

This chapter reviews the evolution and current state of deep learning architectures for meteorological time series forecasting, emphasizing their architectural principles, adaptations for weather and climate data, dataset characteristics, reported performance, and limitations.


## 2. Evolution of Deep Learning for Time Series Forecasting

### 2.1 From RNNs to gated architectures (LSTM, GRU)

Early RNNs such as Elman networks provided a generic mechanism for modeling sequences but were hampered by vanishing and exploding gradients, which prevented learning long‑range temporal dependencies. Hochreiter and Schmidhuber’s long short‑term memory (LSTM) architecture solved this by introducing memory cells with constant error carousels and multiplicative input, output, and forget gates that enable gradients to flow over hundreds to thousands of time steps, making RNNs practical for long sequences. Cho et al. later proposed the gated recurrent unit (GRU), which simplifies LSTM by merging the input and forget gates into a single update gate and introducing a reset gate, retaining much of LSTM’s performance with fewer parameters and lower computational cost.[^5][^6][^7][^8]

In parallel, the encoder–decoder paradigm for sequence‑to‑sequence (seq2seq) learning emerged, where one RNN compresses an input sequence into a fixed‑length vector and another RNN decodes this representation into an output sequence, initially applied to machine translation but quickly generalized to generic time series forecasting.[^5]


### 2.2 Attention mechanisms and Transformers

The fixed‑vector bottleneck in early seq2seq models motivated the introduction of attention mechanisms, which learn to weight different parts of the input sequence when producing each output step. Bahdanau et al. demonstrated that soft attention greatly improves translation quality, especially for long sentences, by jointly learning to align and translate, and the same idea readily extends to long meteorological sequences where different past times are differentially relevant to a given forecast horizon.[^9][^10]

Vaswani et al.’s Transformer architecture removed recurrence altogether and replaced it with multi‑head self‑attention and feed‑forward layers, enabling highly parallel training with \\(O(L^2)\\) complexity in sequence length and achieving state‑of‑the‑art performance on language tasks. Subsequent work adapted Transformers to time series, but naïve application faced challenges: quadratic complexity for long horizons, overfitting on small datasets, and difficulty capturing trend and seasonality.[^11][^12][^13]


### 2.3 Transformers specialized for time series

Several architectures modified Transformers to better handle long‑horizon forecasting, including Informer, Autoformer, and FEDformer. Informer introduces ProbSparse self‑attention, which keeps only dominant queries to reduce complexity to \\(O(L \log L)\\), a self‑attention distilling operation that progressively reduces sequence length across layers, and a generative decoder that predicts an entire output horizon in a single forward pass, significantly improving efficiency on long sequence time series forecasting (LSTF) benchmarks. Autoformer embeds progressive trend–seasonal decomposition blocks as inner operators and replaces pointwise attention with an auto‑correlation mechanism that aggregates information over sub‑series aligned by lags, achieving large relative improvements over earlier baselines on long‑term benchmarks that include weather datasets. FEDformer further combines seasonal‑trend decomposition with frequency‑domain attention using Fourier bases, achieving linear complexity in length and reducing multivariate and univariate long‑term forecast errors by roughly 15–23% relative to previous state‑of‑the‑art methods.[^14][^15][^16][^17][^18][^19][^20][^21]

Recent architectures such as PatchTST and iTransformer continue this trend. PatchTST segments each univariate series into overlapping patches that serve as tokens and adopts a channel‑independent design where each variable is modeled with shared Transformer weights, improving long‑horizon accuracy and reducing mean‑squared error (MSE) by around 20% relative to earlier Transformer baselines across standard benchmarks including a weather dataset. iTransformer inverts the usual tokenization by treating each variable’s entire history as a token and using attention to model inter‑variable correlations while per‑token feed‑forward networks handle temporal patterns, yielding state‑of‑the‑art results on multivariate long sequence benchmarks and better utilization of long lookback windows.[^22][^23][^24][^25]


### 2.4 From task‑specific models to weather foundation models

Parallel to generic time‑series Transformers, the weather and climate community has begun to train large, task‑agnostic models on decades of global reanalysis and climate model output, analogous to foundation models in language. Pangu‑Weather, FourCastNet, GraphCast, FuXi, ClimaX, and Aurora exemplify this shift; these systems use variants of Transformers, Fourier neural operators, or graph neural networks and are trained on 40+ years of ERA5 or CMIP6 data to emulate atmospheric dynamics, often outperforming state‑of‑the‑art NWP systems in medium‑range forecasts while running orders of magnitude faster. ClimaX and Aurora explicitly adopt a foundation‑model strategy, pretraining on heterogeneous multi‑variable climate data with self‑supervision and then fine‑tuning for diverse downstream tasks, including regional weather prediction and climate projections.[^26][^3][^27][^28][^29][^30][^31][^32][^4]


## 3. LSTM and Variants in Meteorological Time Series Forecasting

### 3.1 Standard LSTM architecture and suitability for weather data

An LSTM cell maintains a hidden state \\(h_t\\) and a cell state \\(c_t\\), with gated updates controlled by input, forget, and output gates that selectively incorporate new information, retain long‑term memory, and expose relevant content to downstream layers. Weather and hydrological time series often exhibit strong autocorrelation, multi‑scale temporal structure (e.g., diurnal and seasonal cycles), and nonlinear responses to exogenous forcings, which LSTM’s gating naturally accommodates by allowing the cell state to integrate information over long lags while discarding irrelevant fluctuations. In addition, LSTMs can ingest multivariate inputs (e.g., temperature, humidity, pressure, and wind) at each time step, capturing cross‑variable interactions important for processes such as convection, snowmelt, and runoff.[^2][^33][^6][^8][^34]

Large‑sample hydrology studies demonstrate that standard LSTMs trained on basin‑averaged meteorological forcings can match or exceed conceptual rainfall–runoff models over hundreds of catchments, even under extrapolation to extreme events. For example, Kratzert et al. used LSTMs on the CAMELS dataset (241 US catchments) and showed that a regional LSTM trained across catchments outperformed the SAC‑SMA + Snow‑17 conceptual model in terms of Nash–Sutcliffe efficiency (NSE), highlighting the architecture’s ability to learn catchment‑specific memory effects from meteorological inputs alone.[^35][^34][^2]


### 3.2 Stacked versus shallow LSTMs

Deep LSTM architectures stack multiple recurrent layers so that each layer processes the entire sequence of hidden states from the previous layer, potentially capturing hierarchical temporal abstractions analogous to deep convolutional networks in space. In rainfall–runoff and streamflow forecasting, stacked LSTMs sometimes yield modest accuracy gains, particularly when training data cover diverse hydrological regimes, but they also increase the risk of overfitting in basins with limited records. For example, stacked two‑layer LSTMs have been used to predict hourly rainfall in Japan based on 12 hours of antecedent meteorological conditions, achieving lower root‑mean‑square error (RMSE) and higher threat scores than a mesoscale NWP model for many stations but struggling with the onset of new convective events.[^36][^33][^37][^1][^2]

In meteorological station forecasts with relatively short records (e.g., a few decades of hourly data), shallow single‑layer LSTMs often provide a better bias–variance trade‑off, especially when combined with strong regularization and feature engineering (e.g., encoding seasonality, diurnal cycle, and calendar effects).[^38][^39]


### 3.3 Bidirectional LSTM for meteorological applications

Bidirectional LSTMs (BiLSTMs) process sequences in both forward and backward directions, concatenating hidden states so that each time step’s representation depends on past and future context, which can improve accuracy when the entire sequence is available at inference time. BiLSTMs have been applied to short‑term wind speed and wind power forecasting, where continuous streams of turbine or anemometer data are used to predict near‑future values; hybrid BiLSTM models with advanced feature selection and Bayesian hyperparameter optimization have shown lower mean absolute percentage error and better capture of rapid wind fluctuations than unidirectional LSTMs. For operational weather prediction, strict causality is required, so BiLSTMs are most appropriate in post‑processing (e.g., statistical correction of NWP forecasts) or for offline analysis such as quality control and reanalysis downscaling, rather than direct real‑time forecasting.[^40][^41][^42][^43]


### 3.4 LSTM with attention mechanisms

Attention mechanisms can be layered on top of LSTM encoders to reweight time steps when generating forecasts, providing both performance gains and interpretability. Abbasimehr and Paki showed that adding multi‑head attention over LSTM hidden states improved forecasts of nonlinear time series relative to vanilla LSTM and BiLSTM baselines by focusing on informative subsequences, and proposed an attention‑enhanced LSTM that outperformed traditional statistical models on several benchmark datasets. In hydrometeorological contexts, Liu et al. proposed a spatiotemporal ST‑LSTM‑SA model that combines 3D convolution with self‑attention over radar echo sequences, improving hourly rainfall nowcasts up to 3 hours ahead and enhancing detection of intense small‑scale events compared with baseline ConvLSTM variants.[^44][^40]

These examples illustrate a general pattern: attention layers help LSTM‑based models differentiate between routine and extreme conditions and capture non‑local temporal dependencies (e.g., precursors several days earlier) that are difficult for purely local recurrent updates to encode.


### 3.5 LSTM applications by meteorological variable

#### 3.5.1 Temperature and multivariate station forecasts

Numerous studies use LSTMs to forecast near‑surface temperature from station or gridded data, often alongside humidity, wind speed, and precipitation. For instance, a weather prediction study based on LSTM on the Nigeria Meteorological Agency’s 20‑year station dataset reported that LSTM achieved substantially lower RMSE than SARIMA for temperature and rainfall, with the SARIMA–LSTM hybrid yielding further improvement, indicating that LSTM can capture nonlinear residual structure beyond linear seasonal components. Project‑scale case studies using hourly Kaggle station datasets from 1996–2017 show that one‑layer LSTMs with several hundred units trained on 9–10 meteorological variables can reproduce daily mean temperature with low RMSE and visually faithful time series, even in the presence of noise and missing values.[^45][^46][^47][^39][^38]

Hybrid CNN–LSTM models push this further by using one‑dimensional convolutions over short temporal windows to extract local patterns before feeding them into LSTMs for longer‑term integration; recent work on temperature forecasting for the Delhi region found that such CNN–LSTM models significantly outperformed classical baselines, achieving mean square error (MSE) around 3.3 and RMSE near 1.8 \\(^{\\circ}\\)C on multi‑decadal daily records.[^48]


#### 3.5.2 Rainfall, precipitation, and rainfall–runoff

In hydrology, LSTMs are now widely used for rainfall–runoff modeling, where inputs include precipitation, temperature, potential evaporation, and sometimes snow indices, and outputs are streamflow time series. Kratzert et al. showed that an LSTM trained on 241 CAMELS catchments with daily meteorological inputs achieved median NSE values exceeding those of a calibrated SAC‑SMA + Snow‑17 model, particularly in snow‑dominated basins, underscoring LSTM’s ability to represent storage effects and delayed runoff. Follow‑up work indicates that LSTMs can maintain skill during extreme events and generalize better than conceptual models when trained regionally, although imposing physical constraints such as mass conservation may slightly degrade performance on extremes.[^34][^2][^35]

At shorter timescales, LSTMs are used for direct precipitation prediction. Empirical mode decomposition (EEMD) combined with LSTM (EEMD–LSTM) has been applied to station precipitation in Beijing, where decomposed components are forecast separately and recombined, yielding lower RMSE and higher correlation coefficients than raw LSTM and traditional baselines. A daily precipitation prediction model that couples LSTM with a weighted broad learning system (LSTM–WBLS) demonstrated consistent improvements in RMSE, MAE, and \\(R^2\\) over pure LSTM across multiple forecast horizons at a Hubei province station, illustrating the benefit of post‑hoc linear correction on LSTM outputs.[^49][^50]


#### 3.5.3 Cloud cover and total cloud cover

Cloud cover and total cloud cover (TCC) are critical for solar energy, aviation, and radiation budget studies, but are difficult to predict due to the complex microphysical and dynamical processes involved. Bandara et al. proposed deep learning‑based short‑term TCC forecasting using satellite images: cloud masks are generated via Otsu segmentation, spatial summaries are converted to time series, and LSTM, BiLSTM, and CNN–LSTM models are trained to predict future TCC over specific regions. Their experiments show that all three LSTM variants achieve competitive RMSEs relative to baseline models, with BiLSTM and CNN–LSTM offering slight improvements, suggesting that both bidirectional context and convolutional pre‑processing can enhance TCC prediction.[^51][^52]

Other studies combine LSTM encoders with generative adversarial networks (GANs) to forecast future cloud cover images from time series of meteorological features, with the LSTM providing a compact latent representation that conditions a GAN generator to produce plausible future cloud fields.[^53]


#### 3.5.4 Atmospheric seeing and optical turbulence

Atmospheric seeing and optical turbulence strongly affect astronomical observations and free‑space optical (FSO) communication. Li et al. proposed an EMD‑Seq2Seq‑LSTM model for multistep atmospheric optical turbulence forecasting, where empirical mode decomposition splits a non‑stationary turbulence index into intrinsic mode functions that are predicted separately using an encoder–decoder LSTM before recombination. Their experiments on FSO turbulence data show that EMD‑Seq2Seq‑LSTM yields lower prediction errors and better multi‑step stability than baseline LSTM and statistical models, demonstrating that LSTM‑based architectures can capture complex refractive‑index fluctuations relevant to seeing.[^54]

More broadly, machine‑learning‑based seeing estimation and prediction frameworks at remote sites such as Dome A combine meteorological tower measurements with learned models to provide 20‑minute‑ahead forecasts with RMSE around 0.12 arcsec, although many such systems rely on generic regression or tree‑based models rather than explicit LSTM, and long‑term data scarcity remains a bottleneck.[^55]


### 3.6 Limitations of LSTM‑based meteorological models

Despite their success, LSTMs have several limitations in meteorological applications. They are data‑hungry and can overfit when trained on single‑station records of only a few years, particularly for rare extremes, necessitating regional training or careful regularization. Their sequential nature limits parallelism and makes training slow for very long sequences, and they often struggle to capture very long‑range dependencies (e.g., multi‑year climate variability) without architectural extensions or exogenous indices. Studies of extreme rainfall–runoff prediction indicate that data‑driven LSTMs can remain relatively accurate even when extremes are absent from the training period, but there is concern about robustness under climate non‑stationarity.[^1][^36][^2][^35][^34]

Interpretability is another challenge: while attention‑augmented LSTM models provide some insight into which time steps or variables drive forecasts, standard LSTMs remain largely black‑box, complicating their integration into physically informed decision‑making frameworks.[^40][^44]


## 4. Transformer‑based Models for Weather and Climate Time Series

### 4.1 Temporal Fusion Transformer (TFT)

The Temporal Fusion Transformer (TFT) is an attention‑based architecture designed for multi‑horizon forecasting with heterogeneous inputs, combining recurrent and Transformer components. TFT uses static covariate encoders and variable selection networks to selectively gate static and time‑varying inputs, LSTM layers for local sequence processing, and multi‑head self‑attention layers for capturing long‑term dependencies, all wrapped in gating and skip‑connection structures to suppress unnecessary components. It employs quantile loss to produce probabilistic forecasts and includes interpretability tools such as attention‑based temporal importance and input variable attributions, demonstrated on datasets spanning commerce, energy, and traffic.[^56][^57][^58][^59]

Although the original TFT paper did not target meteorology specifically, its ability to handle static geography (e.g., elevation, land cover), known future inputs (e.g., calendar features, planned control actions), and historical exogenous variables makes it well suited for multi‑horizon weather and renewable‑energy forecasting, and subsequent studies have adapted TFT or similar hybrid RNN–Transformer architectures to wind power, solar irradiance, and load forecasting with meteorological drivers.[^4][^40]


### 4.2 Long‑sequence time‑series Transformers: Informer, Autoformer, FEDformer

Informer addresses the quadratic complexity and memory usage of vanilla Transformers for long sequences by introducing ProbSparse self‑attention, which retains only queries with large attention scores and reduces complexity to \\(O(L \log L)\\), self‑attention distilling that halves sequence length across layers, and a generative decoder that outputs the full forecast horizon at once. Experiments on large‑scale benchmarks show that Informer significantly outperforms LSTM and earlier Transformers in multivariate long‑horizon forecasting tasks, including a weather dataset in the ETT benchmark family.[^60][^16][^18]

Autoformer embeds series decomposition directly into the architecture, with each encoder and decoder layer including a decomposition block that separates trend and seasonal components via moving averages, and replaces self‑attention with auto‑correlation, which aggregates information across lags corresponding to dominant periods. On six long‑term benchmarks spanning energy, traffic, economics, weather, and epidemiology, Autoformer achieves an average 38% relative improvement in MSE over prior methods and demonstrates robustness even on datasets without clear periodicity, suggesting strong potential for long‑range meteorological forecasting where seasonal and intraseasonal cycles are prominent.[^15][^19][^20]

FEDformer further refines this decomposition approach by applying Transformers in the frequency domain: it decomposes series into trend and seasonal components, then uses frequency‑enhanced attention over Fourier bases to capture global structures efficiently, achieving linear complexity in sequence length. Across six benchmarks, FEDformer reduces prediction error by about 14.8% (multivariate) and 22.6% (univariate) relative to state‑of‑the‑art baselines, including Autoformer, indicating its strength for very long horizons.[^17][^61][^21][^14]


### 4.3 PatchTST and iTransformer: recent advances

PatchTST revisits tokenization by segmenting each univariate time series into fixed‑length patches and treating these patches as tokens, while modeling each channel independently with shared Transformer weights (channel‑independent design). Patching preserves local temporal structure in embeddings, reduces attention map size quadratically for a given lookback, and allows the model to attend over much longer effective histories compared to tokenizing at single time steps. On standard long‑horizon benchmarks, including electricity and weather datasets, PatchTST variants reduce MSE by around 20% relative to the best previous Transformer‑based models and outperform non‑Transformer baselines such as DLinear.[^62][^63][^23][^24]

iTransformer inverts the usual orientation of time‑series data: instead of treating time steps as tokens with multivariate features, it treats each variable’s entire history as a token and applies self‑attention over variables while feed‑forward networks act on temporal dimensions within each token. This reallocation better matches the structure of multivariate meteorological datasets where the number of stations, grid points, or variables can be large but the temporal dimension is not necessarily extreme; experiments show that iTransformer achieves state‑of‑the‑art forecasting accuracy and scales more gracefully with lookback window length than standard Transformers or linear baselines, suggesting utility for high‑dimensional meteorological prediction problems such as regional networks of stations.[^64][^25][^22]


### 4.4 When do Transformers outperform LSTMs in meteorology?

Comparative studies across generic time‑series domains indicate that Transformers tend to outperform LSTM and GRU models when sequences are long, input dimensionality is high, and capturing complex, non‑local temporal patterns is critical, while LSTMs remain competitive or superior on shorter sequences and limited data regimes due to their inductive bias and smaller parameter counts. In meteorological applications, this trade‑off is evident in precipitation nowcasting and global weather emulation: ConvLSTM and LSTM variants excel on relatively short lead times (e.g., up to 2–3 hours) with dense radar data, whereas Transformer‑like architectures such as Pangu‑Weather’s 3D Earth‑Specific Transformer (3DEST) and foundation models like GraphCast and FourCastNet achieve better medium‑range skill (up to 10–15 days) on global grids by leveraging attention or spectral operations over large spatiotemporal contexts.[^65][^66][^67][^3][^27][^29][^30][^36][^26][^1]

For station‑level forecasting with limited history, well‑regularized LSTMs and CNN–LSTM hybrids often outperform Transformers, which are more prone to overfitting and require careful design (e.g., decomposition blocks, patching) and larger training sets to realize their potential.[^68][^38][^48]


## 5. Hybrid Architectures for Meteorological Time Series

### 5.1 CNN–LSTM hybrids

CNN–LSTM hybrids combine convolutional layers for local feature extraction with LSTM layers for temporal integration, leveraging CNNs’ strength in pattern recognition and LSTMs’ ability to track long‑term dependencies. In weather and climate, CNN–LSTM models are widely used for precipitation and temperature forecasting from gridded or station data: convolutions process spatial neighborhoods or short temporal windows, while LSTMs propagate information over longer horizons.[^68][^40]

For example, CNN–LSTM architectures applied to multivariate weather prediction (temperature, humidity, wind speed, and precipitation) have demonstrated improved accuracy and robustness relative to either CNN or LSTM alone, with reported increases in \\(R^2\\) above 0.9 and reductions in MAE for daily temperature forecasts on multi‑decadal station records. These models typically use one or more 1D or 2D convolutional layers followed by one or two LSTM layers and fully connected output heads, trained with MSE or MAE losses; overfitting and computational cost rise with depth, motivating architectural search and regularization.[^69][^70][^48][^68]


### 5.2 ConvLSTM for spatiotemporal weather fields

The ConvLSTM architecture extends fully connected LSTMs by replacing matrix multiplications in input‑to‑state and state‑to‑state transitions with convolutions, making both hidden and cell states 3D tensors representing spatial grids. Shi et al. originally proposed ConvLSTM for precipitation nowcasting from radar echo images, formulating the problem as spatiotemporal sequence forecasting in which both inputs and outputs are sequences of 2D fields; their ConvLSTM model consistently outperformed both FC‑LSTM and an operational optical‑flow‑based ROVER system on real‑world radar datasets. ConvLSTM has since become a standard baseline for radar‑based nowcasting and has inspired numerous variants (e.g., two‑stream ConvLSTM, ConvLSTM with attention) that further improve extreme rainfall prediction and lead time.[^67][^71][^72][^73]

ConvLSTM’s main strengths in meteorology are its ability to jointly model spatial and temporal correlations in gridded fields (radar, satellite, reanalysis) and its compatibility with existing CNN infrastructure. Limitations include high memory cost for large domains or many vertical levels and difficulty in capturing very long‑range dependencies without stacking many layers, which can degrade training stability; these factors have motivated the adoption of alternative architectures such as Fourier neural operators and graph neural networks in global models.[^74][^27][^4]


### 5.3 ResNet–LSTM and Inception–LSTM variants

ResNet–LSTM hybrids incorporate deep residual convolutional networks (e.g., ResNet‑50) before LSTM layers to extract high‑level spatial or temporal features, particularly useful when input data include images (cloud fields, radar) or complex spatiotemporal patterns. A recent climate‑change‑focused study proposed a CNN–ResNet50–LSTM model for forecasting both temperature and wind power, showing that the hybrid outperformed several regression baselines on multiple datasets with \\(R^2\\) levels around 0.99 for temperature and wind power, indicating excellent fit but also highlighting the risk of overfitting when models are very deep relative to data size.[^75][^76][^77]

Inception‑style LSTMs that use multi‑scale convolutions (Inception modules) upstream of recurrent layers have been explored primarily in video prediction but are conceptually applicable to meteorological fields where features occur across a range of spatial scales; integrating Inception blocks with LSTM could, in principle, better capture multi‑scale cloud structures or precipitation systems, though domain‑specific evaluations remain limited.[^78][^4]


### 5.4 Graph neural networks combined with temporal models

Graph neural networks (GNNs) provide a natural framework for representing irregular spatial structures such as river networks, station networks, or adaptive meshes and can be combined with temporal models to capture spatiotemporal dependencies. In weather forecasting, hierarchical spatiotemporal GNNs such as HiSTGNN construct graphs where nodes represent regions and meteorological variables, with edges capturing physical or statistical relationships; dilated convolutional and inception‑style temporal modules then process time evolution, enabling multi‑variable, multi‑location forecasts that outperform CNNs, RNNs, and classical spatiotemporal models on several meteorological datasets.[^79][^80]

In hydrology, LSTM–GNN hybrids have been proposed where LSTMs model local runoff generation at sub‑basin nodes and GNNs route flows along river networks, leading to substantial improvements in NSE and Kling–Gupta efficiency (KGE) over standalone LSTMs, especially in downstream stations with complex connectivity. At the global scale, GraphCast uses an encode–process–decode GNN on a mesh of atmospheric grid cells to emulate medium‑range weather dynamics, achieving better skill than the ECMWF High‑Resolution Forecast (HRES) system for 10‑day forecasts while running in under a minute on a single TPU, and its architecture can be viewed as a GNN‑based alternative to ConvLSTM and Transformers for global fields.[^81][^82][^30][^83]

GNN‑based approaches excel at modeling physical connectivity and multi‑scale interactions but require careful graph construction (e.g., adjacency based on geography, flow routes, or learned relations) and can be computationally intensive for high‑resolution global graphs.[^80][^79]


## 6. Weather Foundation Models (2022–2025)

### 6.1 Pangu‑Weather

Pangu‑Weather is a deep learning system trained on 43 years of hourly ERA5 reanalysis data (1979–2021) at 0.25\\(^{\\circ}\\) resolution and multiple pressure levels, using a 3D Earth‑Specific Transformer (3DEST) architecture that treats height (pressure level) as an additional dimension in a 3D cube. The model comprises several networks totaling roughly 256 million parameters and uses a hierarchical temporal aggregation strategy, training separate networks for different lead times (1, 3, 6, and 24 hours) to reduce accumulation of forecast errors over long horizons. Pangu‑Weather is the first AI‑based global model shown to outperform ECMWF’s Integrated Forecast System (IFS) across all standard variables (geopotential, specific humidity, wind, temperature, etc.) and all lead times from 1 hour to 7 days in terms of latitude‑weighted RMSE and anomaly correlation coefficient, while being about 10,000 times faster at inference, producing a 24‑hour global forecast in roughly 1.4 seconds on a single V100 GPU.[^84][^85][^3][^26]


### 6.2 FourCastNet

FourCastNet is a global data‑driven weather forecasting model based on adaptive Fourier neural operators (AFNOs), trained on a subset of the ERA5 reanalysis at 0.25\\(^{\\circ}\\) resolution for around 20 atmospheric variables sampled every 6 hours. It uses spectral convolution in the spatial dimensions to emulate quasi‑linear atmospheric dynamics efficiently and recursively applies the AFNO network to propagate states forward in time, producing week‑long forecasts in less than 2 seconds on a single GPU, which is five orders of magnitude faster than traditional NWP. FourCastNet matches or approaches the accuracy of ECMWF IFS for large‑scale variables and outperforms IFS for high‑resolution, fast‑varying phenomena such as surface wind speed and precipitation, enabling very large ensembles (e.g., 100‑member, 24‑hour forecasts in 7 seconds) that are infeasible with conventional models.[^27][^29][^86]


### 6.3 GraphCast and GenCast

GraphCast is a medium‑range global forecasting model that uses an autoregressive encode–process–decode GNN on a multi‑mesh representation of the spherical Earth, trained directly on ERA5 reanalysis. It predicts hundreds of atmospheric variables at 0.25\\(^{\\circ}\\) resolution and 37 vertical levels for up to 10 days ahead in under a minute on a single TPU v4, and the Science paper reporting GraphCast shows that it significantly outperforms ECMWF’s HRES deterministic system on about 90% of 1380 verification targets, including substantial gains in extreme event prediction such as tropical cyclones, atmospheric rivers, and heat extremes.[^82][^30][^81]

The open‑source GraphCast repository also includes GenCast, a generative extension for ensemble forecasting, although detailed peer‑reviewed descriptions are still emerging; GenCast leverages GraphCast’s learned dynamics while incorporating stochasticity to sample multiple plausible future realizations, an important capability for uncertainty quantification.[^87][^4]


### 6.4 FuXi and FuXi‑2.0

FuXi is a cascade machine‑learning forecasting system developed in China to produce 15‑day global weather forecasts, with an ensemble configuration (FuXi‑ENS) designed to rival ECMWF’s ensemble. The original FuXi system achieves performance comparable to ECMWF’s ensemble mean (EM) in 15‑day forecasts across a range of variables, using cascaded deep networks trained on reanalysis data; FuXi‑ENS perturbs initial conditions and model parameters to produce probabilistic forecasts and has been shown to outperform ECMWF’s ensemble in continuous ranked probability score (CRPS) for the majority of variable–lead‑time combinations.[^88]

FuXi‑2.0 extends this work by providing 1‑hourly global forecasts for a richer set of variables relevant to wind and solar power, aviation, and shipping, using a two‑model strategy (6‑hourly backbone plus 1‑hour interpolation network) and demonstrating improved performance relative to ECMWF’s high‑resolution forecast (HRES) in several practical scenarios. FuXi‑Nowcast further introduces a multi‑task Swin‑Transformer architecture for 1 km resolution convective nowcasting over eastern China, jointly predicting radar reflectivity, precipitation, near‑surface temperature, and winds with convective‑signal enhancement and distribution‑aware hybrid losses to better capture intense storms and mitigate rapid decay seen in earlier deep‑learning nowcasts.[^89][^90]


### 6.5 ClimaX

ClimaX is a foundation model for weather and climate that extends the Transformer architecture with novel encoding and aggregation blocks to handle heterogeneous datasets spanning different variables, spatiotemporal coverages, and physical groundings. It is pretrained with a self‑supervised objective on CMIP6 climate model outputs, then fine‑tuned on diverse downstream tasks such as global weather forecasting, climate downscaling, and projections of extreme indices, including tasks with variables and scales unseen during pretraining. Compared with existing data‑driven baselines, ClimaX achieves superior performance on benchmarks for both weather forecasting and climate projections, even when pretrained at relatively low resolution and compute budgets, demonstrating the viability of a general foundation model for Earth system tasks.[^28][^91][^31]


### 6.6 Aurora

Aurora is a large‑scale foundation model of the atmosphere developed by Microsoft, trained on more than a million hours of diverse weather and climate simulations to learn a flexible 3D representation of atmospheric dynamics. It operates at high spatial resolution (0.1\\(^{\\circ}\\), around 11 km at the equator) and supports several specialized versions for medium‑ and high‑resolution weather prediction, air pollution, and ocean wave forecasting, each obtained by fine‑tuning the pretrained backbone. Aurora delivers more accurate operational forecasts than the IFS at comparable resolutions while consuming a fraction of the computational cost; analyses indicate substantial speed‑ups and strong skill in extreme event prediction, as well as benefits from scaling both data diversity and model size.[^92][^93][^32]


### 6.7 Comparison with traditional NWP and potential for hyperlocal fine‑tuning

Across these models, a consistent pattern emerges: AI‑based global emulators can match or exceed the predictive skill of state‑of‑the‑art NWP systems like ECMWF’s IFS and HRES for many variables and lead times, while being orders of magnitude faster at inference. This speed enables large ensembles, probabilistic post‑processing, and real‑time scenario exploration that are challenging for traditional models, especially in resource‑constrained settings.[^3][^29][^30][^90][^32][^26][^27][^82]

Regarding hyperlocal forecasting, these foundation models are typically trained on coarse global grids (0.25–0.1\\(^{\\circ}\\)) and do not directly resolve microscale phenomena such as urban heat islands or complex topographic flows, but their open‑source implementations and flexible architectures allow several adaptation strategies. ClimaX explicitly supports fine‑tuning to new tasks and resolutions using transfer learning; GraphCast’s public weights and code allow regional bias‑correction or downscaling via learned mappings from global fields to station‑level observations; and Aurora provides specialized high‑resolution variants that can be further adapted with limited regional data. Nonetheless, robust hyperlocal forecasting with these models remains an open research area, requiring careful treatment of observational representativeness, local physics (e.g., urban canopy), and uncertainty quantification.[^30][^93][^32][^28][^4]


### 6.8 Limitations and opportunities

Despite their impressive performance, foundation models for weather and climate face several limitations. They are trained on historical or simulated datasets that may reflect past climate statistics, raising concerns about distributional shift under rapid climate change and the need for continual learning or climate‑aware training strategies. Their physical consistency is not guaranteed, although physics‑aware architectures and loss functions (e.g., enforcing conservation laws or energy budgets) are an active area of research; biases and artifacts can arise, particularly for small‑scale or poorly observed processes, and error growth over long lead times remains a challenge.[^29][^3][^27][^28][^4]

Opportunities include integrating these models within hybrid physics–ML frameworks (e.g., using AI for parameterization or as fast surrogates in data assimilation), leveraging their learned representations for other tasks such as extreme event attribution and climate risk assessment, and extending foundation models to multi‑modal inputs (e.g., combining satellite imagery, in situ data, and reanalysis).[^32][^28][^4]


## 7. Multi‑task Learning in Weather Prediction

### 7.1 Simultaneous prediction of multiple weather variables

Meteorological forecasting naturally lends itself to multi‑task learning (MTL) because many atmospheric variables are physically coupled and must be predicted together. Global foundation models such as Pangu‑Weather, GraphCast, FourCastNet, FuXi, ClimaX, and Aurora inherently adopt a multi‑output setup, predicting dozens to hundreds of variables (temperature, winds, humidity, geopotential, precipitation, etc.) from shared latent representations, thereby implicitly sharing information across tasks. At regional scales, hierarchical spatiotemporal GNNs like HiSTGNN forecast multiple variables (e.g., temperature, humidity, wind) at many locations simultaneously through shared graph‑based encoders and decoders.[^26][^27][^28][^30][^32][^80]

FuXi‑Nowcast explicitly embraces multi‑task learning by jointly predicting radar reflectivity, surface precipitation, near‑surface temperature, wind speed, and wind gusts using a shared Swin‑Transformer backbone and task‑specific output layers, with a convective signal enhancement module and hybrid loss functions designed to maintain intense convective structures across tasks.[^89]


### 7.2 Shared versus task‑specific layers

Typical MTL architectures in meteorology follow a shared‑backbone, task‑head pattern: convolutional, recurrent, Transformer, or GNN layers encode common spatiotemporal representations, followed by separate heads (fully connected or convolutional) for each predicted variable or group of variables. Shared layers capture joint dynamics (e.g., linkage between humidity, vertical motion, and precipitation), while task‑specific heads allow for differences in scales, noise characteristics, and evaluation metrics; soft parameter sharing via regularization can also be used when tasks are related but not identical.[^94][^80][^89]

For example, the passive microwave precipitation MTL framework proposed by Bae et al. uses a shared CNN backbone to extract features from satellite brightness temperatures and then splits into two heads: one for binary rain/no‑rain classification and another for continuous rain‑rate regression, with both heads sharing earlier convolutional filters. Similarly, FuXi‑Nowcast’s Swin‑Transformer backbone is shared across reflectivity, precipitation, and near‑surface variables, with additional layers tailored to each output to capture distinct distributional properties.[^95][^94][^89]


### 7.3 Loss function design for multi‑task weather forecasting

Designing appropriate loss functions is critical in MTL to balance tasks and reflect their physical and decision‑making importance. A standard approach is to use a weighted sum of individual task losses, such as mean‑squared error for regression outputs (e.g

---

## References

1. [A Comparative Study of LSTM, GRU, and Transformer ...](https://al-kindipublisher.com/index.php/jcsts/article/view/10919) - Time series prediction is especially important in fields of finances, energy, and healthcare where c...

2. [Rainfall–runoff modelling using Long Short-Term Memory (LSTM ...](https://hess.copernicus.org/articles/22/6005/2018/) - Abstract. Rainfall–runoff modelling is one of the key challenges in the field of hydrology. Various ...

3. [Accurate medium-range global weather forecasting with ...](https://www.nature.com/articles/s41586-023-06185-3) - by K Bi · 2023 · Cited by 2167 — In this paper, we present Pangu-Weather, an AI-based system that tr...

4. [Deep Learning and Foundation Models for Weather ...](https://arxiv.org/html/2501.06907v1) - This paper presents a comprehensive survey of recent deep learning and foundation models for weather...

5. [Learning Phrase Representations using RNN Encoder- ...](https://arxiv.org/abs/1406.1078) - by K Cho · 2014 · Cited by 39866 — In this paper, we propose a novel neural network model called RNN...

6. [Long short-term memory - PubMed](https://pubmed.ncbi.nlm.nih.gov/9377276/) - Learning to store information over extended time intervals by recurrent backpropagation takes a very...

7. [arXiv:1406.1078v3 [cs.CL] 3 Sep 2014](https://arxiv.org/pdf/1406.1078.pdf) - by K Cho · 2014 · Cited by 39827 — Learning Phrase Representations using RNN Encoder–Decoder for Sta...

8. [[PDF] Long Short-Term Memory | Semantic Scholar](https://www.semanticscholar.org/paper/Long-Short-Term-Memory-Hochreiter-Schmidhuber/2e9d221c206e9503ceb452302d68d10e293f2a10) - A novel, efficient, gradient based method called long short-term memory (LSTM) is introduced, which ...

9. [Neural Machine Translation by Jointly Learning to Align ... - Ruofei Du](https://duruofei.com/cites/Bahdanau2014Neural.html)

10. [Neural Machine Translation by Jointly Learning to Align ...](https://www.semanticscholar.org/paper/Neural-Machine-Translation-by-Jointly-Learning-to-Bahdanau-Cho/fa72afa9b2cbc8f0d7b05d52548906610ffbb9c5) - Neural Machine Translation by Jointly Learning to Align and Translate · Dzmitry Bahdanau, Kyunghyun ...

11. [[PDF] Attention is All you Need](https://www.semanticscholar.org/paper/Attention-is-All-you-Need-Vaswani-Shazeer/204e3073870fae3d05bcbc2f6a8e263d9b72e776) - A new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing...

12. [Attention is All you Need](https://papers.neurips.cc/paper/7181-attention-is-all-you-need.pdf) - by A Vaswani · Cited by 238029 — We propose a new simple network architecture, the Transformer, base...

13. [[1706.03762] Attention Is All You Need](https://arxiv.org/abs/1706.03762) - We propose a new simple network architecture, the Transformer, based solely on attention mechanisms,...

14. [FEDformer: Frequency Enhanced Decomposed Transformer ...](https://proceedings.mlr.press/v162/zhou22g.html) - by T Zhou · 2022 · Cited by 3984 — Long-term time series forecasting is challenging since prediction...

15. [Autoformer: Decomposition Transformers with Auto ...](https://arxiv.org/abs/2106.13008) - by H Wu · 2021 · Cited by 5733 — This paper studies the long-term forecasting problem of time series...

16. [Informer: Beyond Efficient Transformer for Long Sequence ...](https://arxiv.org/abs/2012.07436) - by H Zhou · 2020 · Cited by 9800 — We design an efficient transformer-based model for LSTF, named In...

17. [Frequency Enhanced Decomposed Transformer for Long ...](https://arxiv.org/abs/2201.12740) - by T Zhou · 2022 · Cited by 3984 — Our empirical studies with six benchmark datasets show that compa...

18. [Informer ; Beyond Efficient Transformer for Long Sequence ...](https://seunghan96.github.io/ts/Informer(2021)/) - 1) Propose Informer to successfully enhance prediction capacity in LSTF problems · 2) Propose ProbSp...

19. [Autoformer: Decomposition Transformers with Auto- ...](https://ise.thss.tsinghua.edu.cn/~mlong/doc/Autoformer-nips21.pdf) - by H Wu · Cited by 5703 — Autoformer achieves a 38% relative improvement under the long-term setting...

20. [Autoformer (NeurIPS 2021)](https://github.com/thuml/Autoformer) - In long-term forecasting, Autoformer achieves SOTA, with a 38% relative improvement on six benchmark...

21. [Frequency Enhanced Decomposed Transformer for Long-term ...](https://proceedings.mlr.press/v162/zhou22g/zhou22g.pdf) - by T Zhou · 2022 · Cited by 3984 — Although Transformer-based methods have sig- nificantly improved ...

22. [iTransformer: Inverted Transformers Are Effective for Time ...](https://arxiv.org/abs/2310.06625) - by Y Liu · 2023 · Cited by 3039 — We propose iTransformer that simply applies the attention and feed...

23. [A Time Series is Worth 64 Words: Long-term Forecasting ...](https://arxiv.org/abs/2211.14730) - by Y Nie · 2022 · Cited by 4495 — We propose an efficient design of Transformer-based models for mul...

24. [PatchTST (ICLR 2023)](https://github.com/yuqinie98/PatchTST) - This is an offical implementation of PatchTST: A Time Series is Worth 64 Words: Long-term Forecastin...

25. [iTransformer: Inverted Transformers Are Effective for Time ...](https://arxiv.org/html/2310.06625v4) - We propose iTransformer that regards independent time series as tokens to capture multivariate corre...

26. [Pangu-Weather: A 3D High-Resolution Model for Fast and ...](https://arxiv.org/abs/2211.02556) - by K Bi · 2022 · Cited by 325 — In this paper, we present Pangu-Weather, a deep learning based syste...

27. [Accelerating Global High-Resolution Weather Forecasting ...](https://arxiv.org/abs/2208.05419) - by T Kurth · 2022 · Cited by 421 — We report that a data-driven deep learning Earth system emulator,...

28. [ClimaX: A foundation model for weather and climate - arXiv](https://arxiv.org/abs/2301.10343) - Most state-of-the-art approaches for weather and climate modeling are based on physics-informed nume...

29. [FourCastNet: A Global Data-driven High-resolution ...](https://arxiv.org/abs/2202.11214) - by J Pathak · 2022 · Cited by 1326 — FourCastNet generates a week-long forecast in less than 2 secon...

30. [GraphCast: Learning skillful medium-range global weather ...](https://arxiv.org/abs/2212.12794) - by R Lam · 2022 · Cited by 2221 — We introduce a machine learning-based method called "GraphCast", w...

31. [[PDF] ClimaX: A foundation model for weather and climate | Semantic Scholar](https://www.semanticscholar.org/paper/ClimaX:-A-foundation-model-for-weather-and-climate-Nguyen-Brandstetter/874deb5f06f35e52ae13a921b23611eec4abd1da) - ClimaX is developed and demonstrated, a flexible and generalizable deep learning model for weather a...

32. [Aurora: A Foundation Model of the Atmosphere](https://arxiv.org/html/2405.13063v2) - Here we introduce Aurora, a large-scale foundation model of the atmosphere trained on over a million...

33. [Using a long short-term memory (LSTM) neural network to ...](https://hess.copernicus.org/articles/26/5449/2022/) - by KMR Hunt · 2022 · Cited by 189 — In this study, we test the efficacy of a type of neural network,...

34. [Deep learning for monthly rainfall–runoff modelling - HESS](https://hess.copernicus.org/articles/28/1191/2024/) - Abstract. A deep learning model designed for time series predictions, the long short-term memory (LS...

35. [Deep learning rainfall–runoff predictions of extreme events - HESS](https://hess.copernicus.org/articles/26/3377/2022/hess-26-3377-2022.html) - Abstract. The most accurate rainfall–runoff predictions are currently based on deep learning. There ...

36. [Time Series Forecasting Using Deep Learning](https://al-kindipublisher.com/index.php/jcsts/article/download/10919/9684/29861) - Time Series Forecasting Using Deep Learning: A Comparative Study of LSTM, GRU, and Transformer Model...

37. [Rainfall Prediction by a Recurrent Neural Network ...](http://ui.adsabs.harvard.edu/abs/2019AGUFMGC43D1354K/abstract) - by R Kaneko · 2019 · Cited by 13 — The LSTM model successfully predicted hourly rainfall and surpris...

38. [Weather prediction based on LSTM model implemented ...](https://www.academia.edu/43142754/Weather_prediction_based_on_LSTM_model_implemented_AWS_Machine_Learning_Platform) - The LSTM model implemented on AWS significantly enhances weather forecasting accuracy compared to co...

39. [Weather forecast using LSTM networks](https://www.digitalocean.com/community/tutorials/weather-forecast-using-ltsm-networks) - In this post, we presented the LSTM subclass and used it to construct a weather forecasting model. W...

40. [Improving time series forecasting using LSTM and attention ...](https://www.semanticscholar.org/paper/Improving-time-series-forecasting-using-LSTM-and-Abbasimehr-Paki/d144405244986d1647de041582d5b9e830d0e096) - Comparative study of long short-term memory (LSTM), bidirectional LSTM, and traditional machine lear...

41. [Near real-time wind speed forecast model with ...](https://www.sciencedirect.com/science/article/abs/pii/S0960148122019164) - by LP Joseph · 2023 · Cited by 162 — This research proposes a novel hybrid bidirectional LSTM (BiLST...

42. [Short-term wind power forecasting through stacked and bi ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC11042035/) - by MA Khan · 2024 · Cited by 4 — ML techniques such as neural networks and LSTM can estimate wind sp...

43. [Wind speed forecasting using optimized bidirectional ...](https://www.frontiersin.org/journals/energy-research/articles/10.3389/fenrg.2023.1172176/full) - by AA Alhussan · 2023 · Cited by 36 — In this paper, an optimized model is proposed for boosting the...

44. [A spatiotemporal deep learning model ST-LSTM-SA for ...](https://www.sciencedirect.com/science/article/abs/pii/S0022169422003237) - by J Liu · 2022 · Cited by 80 — In this paper, we proposed a spatiotemporal prediction model, namely...

45. [Predicting Weather Using LSTM](https://www.geeksforgeeks.org/machine-learning/predicting-weather-using-lstm/) - LSTM models are great for weather forecasting, their accuracy still depends on the quality of data a...

46. [Predicting weather using LSTM neural networks | LSTM ...](https://flybirdcl.github.io) - LSTM Implementation

47. [Unlocking the Future: How to Predict Weather with LSTM](https://www.youtube.com/watch?v=J6r11SKBSWY) - LSTM, which stands for Long Short-Term Memory, is a type of recurrent neural network (RNN) architect...

48. [Weather prediction using CNN-LSTM for time series analysis](https://www.ewadirect.com/proceedings/ace/article/view/15610) - As global climate change intensifies, accurate weather forecasting is increasingly crucial for secto...

49. [Application of LSTM Machine Learning to Prediction ...](https://www.scitepress.org/Papers/2022/119175/119175.pdf)

50. [Journal of Information and Computing Science](https://global-sci.com/article/91652/download)

51. [Deep learning based short-term total cloud cover forecasting.](https://rgu-repository.worktribe.com/preview/1769311/BANDARA%202022%20Deep%20learning%20based%20(AAM).pdf) - Moreover, LSTM, BiLSTM and CNN-LSTM have produced competent RMSE results for TCC prediction based on...

52. [Deep Learning Based Short-Term Total Cloud Cover ...](https://ieeexplore.ieee.org/document/9892773/) - by I Bandara · 2022 · Cited by 6 — In this research, we conduct deep learning based Total Cloud Cove...

53. [CLOUD COVER FORECASTING USING LSTM AND GANs](https://www.irjet.net/archives/V8/i5/IRJET-V8I5699.pdf) - The eventual goal is to enable humans to make more informed choices and produce scientifically credi...

54. [Multistep ahead atmospheric optical turbulence forecasting ...](https://www.frontiersin.org/journals/physics/articles/10.3389/fphy.2023.1070762/full) - by Y Li · 2023 · Cited by 14 — In this research, a hybrid multi-step prediction model for atmospheri...

55. [Machine learning-based seeing estimation and prediction ...](https://www.sciencedirect.com/science/article/abs/pii/S2213133723000252) - by X Hou · 2023 · Cited by 9 — In this paper, we present a novel machine learning-based framework fo...

56. [(PDF) Temporal Fusion Transformers for interpretable multi ...](https://www.academia.edu/73454140/Temporal_Fusion_Transformers_for_interpretable_multi_horizon_time_series_forecasting) - In this paper, we introduce the Temporal Fusion Transformer (TFT)-a novel attention-based architectu...

57. [Temporal Fusion Transformers for Interpretable Multi ...](https://arxiv.org/abs/1912.09363) - by B Lim · 2019 · Cited by 3560 — Temporal Fusion Transformers for Interpretable Multi-horizon Time ...

58. [Temporal Fusion Transformers for Interpretable Multi ...](https://research.google/pubs/temporal-fusion-transformers-for-interpretable-multi-horizon-time-series-forecasting/)

59. [[PDF] Temporal Fusion Transformers for Interpretable Multi ...](https://www.semanticscholar.org/paper/Temporal-Fusion-Transformers-for-Interpretable-Time-Lim-Arik/6a9d69fb35414b8461573df333dba800f254519f) - The Temporal Fusion Transformer is introduced -- a novel attention-based architecture which combines...

60. [Beyond Efficient Transformer for Long Sequence Time-Series ...](https://papertalk.org/papertalks/30021) - Informer: Beyond Efficient Transformer for Long Sequence Time-Series Forecasting ... Talk and the re...

61. [DAMO-DI-ML/ICML2022-FEDformer: Source code of ICML' ...](https://github.com/DAMO-DI-ML/ICML2022-FEDformer) - Our empirical studies with six benchmark datasets show that compared with state-of-the-art methods, ...

62. [[PatchTST] A Time Series is Worth 64 Words: Long-Term ...](https://letter-night.tistory.com/450) - We propose an efficient design of Transformer-based models for multivariate time series forecasting ...

63. [GitHub - yuqinie98/PatchTST: An offical implementation of PatchTST: "A Time Series is Worth 64 Words: Long-term Forecasting with Transformers." (ICLR 2023) https://arxiv.org/abs/2211.14730](https://github.com/yuqinie98/patchtst) - An offical implementation of PatchTST: "A Time Series is Worth 64 Words: Long-term Forecasting with ...

64. [iTransformer: Inverted Transformers Are Effective for Time ...](https://www.semanticscholar.org/paper/iTransformer:-Inverted-Transformers-Are-Effective-Liu-Hu/afeeb8f5018eebb1a1d334b94dbbfc48d167efef) - The iTransformer model achieves state-of-the-art on challenging real-world datasets, which further e...

65. [Investigating the Use of LSTM, GRU, and Transformer- ...](https://ijarsct.co.in/Paper30207.pdf) - Results demonstrate that Transformer-based models outperform LSTM and GRU in capturing long-term dep...

66. [Comparative Analysis of LSTM, GRU, and Transformer ...](https://arxiv.org/pdf/2411.05790.pdf) - by J Xiao · 2024 · Cited by 63 — Utilizing advanced deep learning models such as. GRU, LSTM, and Tra...

67. [A Machine Learning Approach for Precipitation Nowcasting](https://arxiv.org/abs/1506.04214) - The goal of precipitation nowcasting is to predict the future rainfall intensity in a local region o...

68. [Weather Prediction Using CNN-LSTM for Time Series ...](https://www.arxiv.org/pdf/2409.09414.pdf)

69. [Deep Learning for Weather Forecasting: A CNN-LSTM ...](https://arxiv.org/pdf/2410.14963.pdf)

70. [Hybrid CNN–LSTM for Multivariate Weather Prediction](https://iarjset.com/wp-content/uploads/2025/10/IARJSET.2025.121022-deep.pdf)

71. [[PDF] Convolutional LSTM Network: A Machine Learning Approach for Precipitation Nowcasting | Semantic Scholar](https://www.semanticscholar.org/paper/Convolutional-LSTM-Network:-A-Machine-Learning-for-Shi-Chen/f9c990b1b5724e50e5632b94fdb7484ece8a6ce7) - This paper proposes the convolutional LSTM (ConvLSTM) and uses it to build an end-to-end trainable m...

72. [Convolutional LSTM Network | Proceedings of the 28th International Conference on Neural Information Processing Systems - Volume 1](https://dl.acm.org/doi/10.5555/2969239.2969329)

73. [Convolutional LSTM Network: A Machine Learning ...](https://proceedings.neurips.cc/paper_files/paper/2015/file/07563a3fe3bbe7e3ba84431ad9d055af-Paper.pdf)

74. [[2406.04867] Deep learning for precipitation nowcasting: A survey ...](https://ar5iv.labs.arxiv.org/html/2406.04867) - Deep learning-based time series forecasting has dominated the short-term precipitation forecasting f...

75. [An enhanced CNN with ResNet50 and LSTM deep ...](https://pmc.ncbi.nlm.nih.gov/articles/PMC12022274/) - Climate change poses a significant challenge to wind energy production. It involves long-term, notic...

76. [雲画像と気象情報を用いたResNetとLSTMに基づく降雨予測](https://www.jstage.jst.go.jp/article/jacc/65/0/65_1499/_pdf)

77. [An enhanced CNN with ResNet50 and LSTM deep ...](https://www.nature.com/articles/s41598-025-97401-9) - by AM Elshewey · 2025 · Cited by 24 — The proposed CNN-ResNet50-LSTM model aims to provide accurate ...

78. [Inception-inspired LSTM for Next-frame Video Prediction - ar5iv](https://ar5iv.labs.arxiv.org/html/1909.05622) - In this paper, we provide a novel self-supervised deep-learning method called Inception-based LSTM f...

79. [DeepMind & Google’s ML-Based GraphCast Outperforms the World’s Best Medium-Range Weather Forecasting System | Synced](https://syncedreview.com/2022/12/28/deepmind-googles-ml-based-graphcast-outperforms-the-worlds-best-medium-range-weather-forecasting-system/) - Medium-range weather forecasts play a crucial role in agriculture, construction, travel and other in...

80. [HiSTGNN: Hierarchical spatio-temporal graph neural network for weather forecasting](https://www.sciencedirect.com/science/article/abs/pii/S0020025523011659) - Weather forecasting is an attractive yet challenging task due to its significant impacts on human li...

81. [GraphCast: AI model for faster and more accurate global ...](https://deepmind.google/blog/graphcast-ai-model-for-faster-and-more-accurate-global-weather-forecasting/) - Our state-of-the-art model delivers 10-day weather predictions at unprecedented accuracy in under on...

82. [Learning skillful medium-range global weather forecasting](https://www.science.org/doi/10.1126/science.adi2336) - by R Lam · 2023 · Cited by 2226 — We introduce GraphCast, a machine learning–based method trained di...

83. [A GNN Routing Module Is All You Need for LSTM Rainfall–Runoff ...](https://egusphere.copernicus.org/preprints/2025/egusphere-2025-5008/) - Abstract. Rainfall-Runoff (R-R) modeling is crucial for hydrological forecasting and water resource ...

84. [Pangu-Weather: A 3D High-Resolution Model for Fast and Accurate Global Weather Forecast](https://deepai.org/publication/pangu-weather-a-3d-high-resolution-model-for-fast-and-accurate-global-weather-forecast) - 11/03/22 - In this paper, we present Pangu-Weather, a deep learning based system for fast and accura...

85. [Prestigious science journal Nature publishes paper about ...](https://www.huawei.com/en/news/2023/7/pangu-ai-model-nature-publish) - Pangu-Weather is the first AI prediction model to demonstrate higher precision than traditional nume...

86. [FourCastNet - NVIDIA Docs](https://docs.nvidia.com/deeplearning/modulus/modulus-v2209/user_guide/neural_operators/fourcastnet.html) - FourCastNet generates a week long forecast in less than 2 seconds, orders of magnitude faster than t...

87. [Google DeepMind GraphCast and GenCast](https://github.com/google-deepmind/graphcast) - GraphCast: Learning skillful medium-range global weather forecasting. This package provides three pr...

88. [FuXi: a cascade machine learning forecasting system for ...](https://www.semanticscholar.org/paper/FuXi:-a-cascade-machine-learning-forecasting-system-Chen-Zhong/e795f62df9ccac2a39e126f95404e5364d55193c) - FuXi-2.0: Advancing machine learning weather forecasting model ... Pangu-Weather: A 3D High-Resoluti...

89. [FuXi-Nowcast: Meet the longstanding challenge of ...](https://arxiv.org/html/2512.08974v1) - Here, we introduce FuXi-Nowcast, a machine learning nowcasting model capable of simultaneously proce...

90. [FuXi-2.0: Advancing machine learning weather forecasting ...](https://arxiv.org/html/2409.07188v1) - It consists of two models: one for generating 6-hourly forecasts and another for interpolating 1-hou...

91. [ClimaX: A foundation model for weather and climateproceedings.mlr.press › ...](https://proceedings.mlr.press/v202/nguyen23a/nguyen23a.pdf)

92. [Introducing Aurora: The first large-scale foundation model ...](https://www.microsoft.com/en-us/research/blog/introducing-aurora-the-first-large-scale-foundation-model-of-the-atmosphere/) - Aurora is a 1.3 billion parameter foundation model for high-resolution forecasting of weather and at...

93. [Aurora: A Foundation Model for the Earth System](https://microsoft.github.io/aurora/intro.html) - Aurora is a machine learning model that can predict atmospheric variables, such as temperature. It i...

94. [Multi-Task Learning for Simultaneous Retrievals of Passive Microwave Precipitation Estimates and Rain/No-Rain Classification](https://ui.adsabs.harvard.edu/abs/2023GeoRL..5002283B/abstract) - Satellite-based precipitation estimations provide frequent, large-scale measurements. Deep learning ...

95. [Multi-Task Learning for Simultaneous Retrievals of Passive ...](https://pure.kaist.ac.kr/en/publications/multi-task-learning-for-simultaneous-retrievals-of-passive-microw/)

