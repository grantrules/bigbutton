import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AudioRecorder({ id }) {
  const [recording, setRecording] = useState(false);

  const record = () => {
    if (recording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
        });
    }
    setRecording(!recording);
  };

  return (<button type="button" onClick={() => record()}>{recording ? 'Stop' : 'Record'}</button>);
}

AudioRecorder.propTypes = {
  id: PropTypes.number,
};

AudioRecorder.defaultProps = {
  id: 0,
};

export default AudioRecorder;
