import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Add onChange here
};

const PHInput = ({ type, name, label, disabled, onChange }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);  // Keep react-hook-form's onChange functionality
                if (onChange) onChange(e);  // Call the custom onChange passed as prop
              }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
