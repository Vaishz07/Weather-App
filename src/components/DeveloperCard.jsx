function DeveloperCard() {
  const fields = [
    { label: "Application", value: "SkyPulse Weather" },
    { label: "College", value: "Kongunadu Arts and Science College, Coimbatore" },
    { label: "Department", value: "Bachelor of Computer Applications" },
  ];

  return (
    <div className="glass-card text-light p-4 d-flex flex-column justify-content-center w-100" style={{ minHeight: "450px" }}>
      
      <h6 className="text-uppercase mb-4 opacity-75" style={{ letterSpacing: "1.5px", fontSize: "0.9rem" }}>
        Developer Profile
      </h6>

      <h2 className="fw-bold mb-4">P Vaishnav</h2>

      {fields.map(({ label, value }) => (
        <div key={label} className="mb-4">
          <small className="text-uppercase opacity-50 d-block mb-1" style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}>
            {label}
          </small>
          <p className="mb-0" style={{ fontSize: "1.05rem" }}>{value}</p>
        </div>
      ))}

    </div>
  );
}

export default DeveloperCard;