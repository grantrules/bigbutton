import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation, useQuery } from 'urql';
import { useParams } from 'react-router-dom';
import { useI18N } from '../context/I18NProvider';
import { useStore } from '../context/StoreProvider';
import { Button } from '../widgets/Button';

const CLASSROOM_QUERY = 'query ($code: String!) { findClassByCode(code: $code) { id, name, code, Teacher { name }, Students { id, name }, Buttons { id, color } } }';

const CLICK_MUTATION = 'mutation ($id: Integer!) { click(classId: $classId, buttonId: $buttonId, buttonState: $buttonState ) }';

function StudentEntry() {
  const store = useStore();
  const [values, setValues] = useState({ name: '', error: '' });
  const submit = () => {
    if (values.name.length > 2) {
      store.set('studentName', values.name);
    } else {
      setValues({ ...values, error: 'Too short' });
    }
  };

  const handleChange = (name) => (e) => { setValues({ ...values, [name]: e.target.value }); };

  return (
    <>
      <h1>Enter your name:</h1>
      <input type="text" onChange={handleChange('name')} value={values.name} />
      {values.error && (<span>{values.error}</span>)}
      <button type="button" onClick={submit}>Go</button>

    </>
  );
}

function ClassroomPage() {
  const store = useStore();

  const { code } = useParams();

  const { t } = useI18N();

  const [{ data, fetching, error }/* , reexecuteQuery */] = useQuery({
    query: CLASSROOM_QUERY, variables: { code },
  });

  const [click] = useMutation(CLICK_MUTATION);
  const studentName = store.use(() => store.get('studentName'));
  const buttonClick = (buttonId) => () => click({ buttonId, buttonState: true });
  const setName = (name) => () => {
    store.set('studentName', name);
  };
  if (data) {
    return (
      <>
        <h1>{t`This is a class`}</h1>
        <h2>{data.findClassByCode.name}</h2>
        {!studentName
          && data.findClassByCode.Students?.map(({ name }) => (
            <button type="button" onClick={setName(name)}>{name}</button>
          ))}
        {studentName
          && data.findClassByCode.Buttons?.map(({ id, color }) => (
            <Button
              onClick={buttonClick(id)}
              id={id}
              color={color}
              key={id}
            />
          ))}
      </>
    );
  }

  if (fetching) {
    return (
      <>
        <h1>{t`Loading class`}</h1>
      </>
    );
  }
  if (error) {
    return (
      <>
        <h1>{t`Could not load classroom`}</h1>
      </>
    );
  }
}

export default ClassroomPage;
