import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import * as queries from '../../queries';

export interface SelectProps {
  value?: string | number;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const Select = ({
  value,
  name,
  placeholder,
  onChange,
  onBlur,
}: SelectProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { data, loading, error } = useQuery(queries.ORGANISATIONS);

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error...</option>;
  if (data) {
    return (
      <select
        name={name}
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => {
          if (onChange) onChange(e);
          setCurrentValue(e.target.value);
        }}
        onBlur={onBlur}
      >
        <option value='Geen organisatie'>Geen organisatie</option>
        {data.organisations.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }
};

export default Select;
