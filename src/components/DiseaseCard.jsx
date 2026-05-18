function DiseaseCard({ data, imgSrc }) {
  const confidence = data.confidence_score;
  const badgeClass = confidence >= 80 ? 'high' : confidence >= 60 ? 'medium' : 'low';
  const badgeColors = {
    high:   { bg: '#d8f3dc', color: '#1a4a2e' },
    medium: { bg: '#fff3cd', color: '#856404' },
    low:    { bg: '#fee2e2', color: '#991b1b' },
  };
  const isHealthy = data.disease.toLowerCase().includes('healthy');
  const diseaseName = data.disease.replace(/___/g, ' — ').replace(/_/g, ' ');

  return (
    <div>
      {imgSrc && (
        <img src={imgSrc} alt="Plant analyzed" style={{
          maxWidth: '200px', borderRadius: '10px',
          marginBottom: '10px', display: 'block'
        }}/>
      )}

      <p style={{ fontSize: '14px', marginBottom: '10px', color: '#1a2e1a' }}>
        {isHealthy
          ? '🎉 Great news! Your plant looks healthy!'
          : "I've analyzed your plant. Here's what I found:"}
      </p>

      {/* Result card */}
      <div style={{
        background: 'white', border: '1px solid #f0ead6',
        borderRadius: '12px', overflow: 'hidden'
      }}>
        {/* Card header */}
        <div style={{
          background: '#1a4a2e', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>
            {isHealthy ? '✅' : '🔬'} Diagnosis Result
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: '12px 14px' }}>
          {/* Disease name */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '6px 0',
            borderBottom: '1px solid #f0ead6', fontSize: '13px'
          }}>
            <span style={{ color: '#8a9e8a', fontWeight: '500' }}>Condition</span>
            <span style={{ fontWeight: '600', color: '#1a4a2e', textAlign: 'right', maxWidth: '65%' }}>
              {diseaseName}
            </span>
          </div>

          {/* Confidence */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '6px 0',
            borderBottom: '1px solid #f0ead6', fontSize: '13px'
          }}>
            <span style={{ color: '#8a9e8a', fontWeight: '500' }}>Confidence</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {confidence.toFixed(1)}%
              <span style={{
                display: 'inline-block', padding: '2px 10px',
                borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                background: badgeColors[badgeClass].bg,
                color: badgeColors[badgeClass].color
              }}>
                {badgeClass.charAt(0).toUpperCase() + badgeClass.slice(1)}
              </span>
            </span>
          </div>

          {/* Status */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '6px 0',
            fontSize: '13px'
          }}>
            <span style={{ color: '#8a9e8a', fontWeight: '500' }}>Status</span>
            <span style={{ fontWeight: '500', color: '#1a2e1a' }}>
              {isHealthy ? '✅ Healthy' : '⚠️ Treatment needed'}
            </span>
          </div>

          {/* Treatment */}
          {data.treatment && !isHealthy && (
            <div style={{
              marginTop: '10px', background: '#f0f9f4',
              borderLeft: '3px solid #52b788',
              borderRadius: '0 8px 8px 0', padding: '10px 12px',
              fontSize: '13px', color: '#4a5e4a', lineHeight: '1.6'
            }}>
              <strong style={{
                color: '#1a4a2e', display: 'block',
                marginBottom: '4px', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                🌿 Recommended Treatment
              </strong>
              {data.treatment}
            </div>
          )}
        </div>
      </div>

      {!isHealthy && (
        <p style={{ fontSize: '12px', color: '#8a9e8a', marginTop: '8px' }}>
          Always consult a local agricultural extension officer for serious outbreaks.
        </p>
      )}
    </div>
  );
}

export default DiseaseCard;