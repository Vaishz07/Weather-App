function ErrorDisplay({ error }) {
    return (
        <>
        {error && (
  <div className="text-danger small fw-bold mb-3 opacity-90 animate-fade">
    ⚠️ {error}
  </div>
)}
</>
    );
}

export default ErrorDisplay;
