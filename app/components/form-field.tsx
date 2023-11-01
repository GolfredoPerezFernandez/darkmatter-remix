// app/components/form-field.tsx
interface FormFieldProps {
    htmlFor: string
    label: string
    type?: string
    value: any
    onChange?: (...args: any) => any
  }
  
  export function FormField({ htmlFor, label, type = 'text', value, onChange = () => {} }: FormFieldProps) {
    return (
      <>
        <input
          onChange={onChange}
          type={type}
          id={htmlFor}
          name={htmlFor}
          style={{fontFamily:"orbitron",borderRadius:10,height:45,marginTop:5,marginBottom:5,textAlign:"center"}}
          placeholder=   {label}
          className="w-full  p-2  my-2"
          value={value}
        />
      </>
    )
  }