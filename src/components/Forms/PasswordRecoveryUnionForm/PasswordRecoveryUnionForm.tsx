import React, { useState } from 'react';
import OtpCodeForm from '../OtpCodeForm/OtpCodeForm';
import PasswordRecoveryForm from '../PasswordRecoveryForm/PasswordRecoveryForm';
import useValidation from '../../../services/useValidation';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
import { useDispatch } from '../../../services/hooks';
import { closeModal, openModalAuth } from '../../../store';

const PasswordRecoveryUnionForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [code, setCode] = useState('');

  const {
    values,
    handleChange,
    errors,
    errorsText,
    errorsDescription,
    isValid,
    resetForm,
  } = useValidation();

  const dispatch = useDispatch();

  const moveToPrevStep = () => {
    if (formStep === 1) {
      dispatch(openModalAuth());
      return;
    }
    resetForm(values, {}, errors, true);
    setFormStep(formStep - 1);
  };

  const moveToNextStep = () => {
    resetForm(values, {}, errors, false);
    setFormStep(formStep + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStep === 3) {
      console.log('submit data', { login: values.login, password: values.password, code });
      dispatch(closeModal());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formStep === 1 && (
        <PasswordRecoveryForm
          inputName='email'
          value={values.email || ''}
          inputError={errors.email || false}
          isFormValid={isValid}
          errorText={errorsText.email}
          errorDescription={errorsDescription.email}
          onChange={handleChange}
          onSubmitBtnClick={moveToNextStep} />
      )}

      {formStep === 2 && (
        <OtpCodeForm
          getNewCode={() => { alert('новый код'); }}
          code={code}
          onChange={(val) => setCode(val)}
          onSubmitBtnClick={moveToNextStep}
          onBackClick={moveToPrevStep}
          title='Восстановление пароля'
          description='Введите код, отправленный по указанному адресу электронной почты. ' />
      )}

      {formStep === 3 && (
        <PasswordChangeForm
          values={values}
          errors={errors}
          errorsText={errorsText}
          errorsDescription={errorsDescription}
          isFormValid={isValid}
          onChange={handleChange} />
      )}

    </form>
  );
};

export default PasswordRecoveryUnionForm;
