import {View} from 'react-native';
import React from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';

interface FormProps<TFormValues extends FieldValues> {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
}

const Form = <TFormValues extends FieldValues>({
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return <View>{children(methods)}</View>;
};

export default Form;
