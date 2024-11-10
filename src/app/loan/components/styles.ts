/* eslint-disable @typescript-eslint/no-explicit-any */
export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#f2f2f2',  // Custom background color (tailwind color)
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '0.375rem',    // Tailwind rounded-md
    boxShadow: 'none',           // Remove shadow
    color: '#868686',
    fontSize: '14px',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#d1d5db' : '#ffffff',  // Tailwind color on selection
    color: state.isSelected ? '#000000' : '#4b5563',            // Tailwind text color
    padding: '0.5rem',                                             // Tailwind padding
    cursor: 'pointer',                                            // Tailwind pointer cursor
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#ffffff', // Tailwind background color
    borderRadius: '0.375rem',   // Tailwind rounded-md
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',  // Tailwind shadow
  }),
};
