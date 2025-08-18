import React from 'react';

// Individual Index Info Component (Bootstrap-friendly version)
const IndexInfoComponent = ({ indexData }) => {
  if (!indexData) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p className="text-gray-600">No index data available</p>
      </div>
    );
  }

  const formatChange = (change) => {
    return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  };

  const formatPercentChange = (percent) => {
    const formatted = (percent * 100).toFixed(2);
    return percent > 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatPrice = (price, hint) => {
    return price.toFixed(hint || 2);
  };

  const isPositive = indexData.regularMarketChange > 0;
  const isNegative = indexData.regularMarketChange < 0;

  return (
    <div className="w-100 p-4 bg-white rounded shadow-sm border">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h3 mb-0 text-dark fw-bold">
            {indexData.shortName}
          </h2>
          <span className="badge bg-primary">
            {indexData.typeDisp}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2 text-muted small">
          <span className="font-monospace fw-medium">{indexData.symbol}</span>
          <span>•</span>
          <span>{indexData.fullExchangeName}</span>
          <span>•</span>
          <span>{indexData.region}</span>
        </div>
      </div>

      {/* Price Information */}
      <div className="mb-4 p-3 bg-light rounded">
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <div className="h2 mb-0 fw-bold text-dark">
            {formatPrice(indexData.regularMarketPrice, indexData.priceHint)}
          </div>
          <div className={`d-flex align-items-center gap-2 h5 mb-0 fw-semibold ${
            isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-muted'
          }`}>
            <span>{isPositive ? '↗' : isNegative ? '↘' : '→'}</span>
            <span>{formatChange(indexData.regularMarketChange)}</span>
            <span>({formatPercentChange(indexData.regularMarketChangePercent)})</span>
          </div>
        </div>
        <div className="text-muted small">
          <span>🕒 Last updated: {formatTime(indexData.regularMarketTime)}</span>
        </div>
      </div>

      {/* Market Details */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h4 className="h6 fw-semibold text-dark border-bottom border-light pb-1 mb-3">
            Market Details
          </h4>
          <div className="small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Previous Close:</span>
              <span className="fw-medium">
                {formatPrice(indexData.regularMarketPreviousClose, indexData.priceHint)}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Market State:</span>
              <span className={`badge ${
                indexData.marketState === 'REGULAR' ? 'bg-success' : 'bg-warning'
              }`}>
                {indexData.marketState}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Quote Source:</span>
              <span className="fw-medium">{indexData.quoteSourceName}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4 className="h6 fw-semibold text-dark border-bottom border-light pb-1 mb-3">
            Exchange Info
          </h4>
          <div className="small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Exchange:</span>
              <span className="fw-medium">{indexData.exchange}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Timezone:</span>
              <span className="fw-medium">{indexData.exchangeTimezoneShortName}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Data Delay:</span>
              <span className="fw-medium">
                {indexData.exchangeDataDelayedBy === 0 ? 'Real-time' : `${indexData.exchangeDataDelayedBy}min`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Status */}
      <div className="p-3 bg-light rounded">
        <h4 className="h6 fw-semibold text-dark mb-3">Trading Status</h4>
        <div className="row g-2">
          <div className="col-6 col-md-3">
            <div className="text-center p-2 bg-white rounded border">
              <div className="text-muted small">Tradeable</div>
              <span className={`badge mt-1 ${
                indexData.tradeable ? 'bg-success' : 'bg-danger'
              }`}>
                {indexData.tradeable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center p-2 bg-white rounded border">
              <div className="text-muted small">Crypto Tradeable</div>
              <span className={`badge mt-1 ${
                indexData.cryptoTradeable ? 'bg-success' : 'bg-danger'
              }`}>
                {indexData.cryptoTradeable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center p-2 bg-white rounded border">
              <div className="text-muted small">Pre/Post Market</div>
              <span className={`badge mt-1 ${
                indexData.hasPrePostMarketData ? 'bg-success' : 'bg-danger'
              }`}>
                {indexData.hasPrePostMarketData ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="text-center p-2 bg-white rounded border">
              <div className="text-muted small">Alert Confidence</div>
              <span className={`badge mt-1 ${
                indexData.customPriceAlertConfidence === 'HIGH' ? 'bg-success' :
                indexData.customPriceAlertConfidence === 'MEDIUM' ? 'bg-warning' :
                'bg-danger'
              }`}>
                {indexData.customPriceAlertConfidence}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexInfoComponent