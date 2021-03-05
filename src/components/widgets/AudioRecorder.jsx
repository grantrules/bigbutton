import React from 'react';
import { useReactMediaRecorder } from "react-media-recorder";

const AudioRecorder = function() {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  return (
    <div>
      <p>{status}</p>
      <button type="button" onClick={startRecording}>Start Recording</button>
      <button type="button" onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls autoplay loop />
    </div>
  );
};
export default AudioRecorder;
