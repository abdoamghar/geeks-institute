function Input({ label, name, value, onChange, errors, autoComplete }) {
  const errorId = `${name}-errors`

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={errors.length > 0}
        aria-describedby={errors.length > 0 ? errorId : undefined}
      />
      {errors.length > 0 && (
        <div className="field-errors" id={errorId} aria-live="polite">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Input
