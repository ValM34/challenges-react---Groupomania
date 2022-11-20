export default function ValidationMessage({ validation }) {
  return (
    <>
      <div className={validation.ok ? 'succes-message' : 'error-message'}>{validation.message}</div>
    </>
  )
}