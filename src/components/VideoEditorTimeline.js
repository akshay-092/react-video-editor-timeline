import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Menu, Button, message } from 'antd';
import {
  VideoCameraOutlined,
  SoundOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import './css/videoEditor.css';

const VideoEditorTimeline = ({
  videoURL,
  audioURL,
  customStyles = {},
  customIcons = {},
  videoMenu,
  audioMenu,
}) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [videoMenuVisible, setVideoMenuVisible] = useState(false);
  const [audioMenuVisible, setAudioMenuVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const timelineRef = useRef(null);
  const videoIndicatorRef = useRef(null);
  const audioIndicatorRef = useRef(null);

  const largestDuration = Math.max(videoDuration, audioDuration);

  useEffect(() => {
    if (videoRef.current && audioRef.current) {
      audioRef.current.currentTime = videoRef.current.currentTime;
    }
  }, [videoCurrentTime]);

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVideoEnd = () => {
    setVideoCurrentTime(videoDuration);
    videoRef.current.currentTime = videoDuration;
  };

  const handleAudioEnd = () => {
    setAudioCurrentTime(audioDuration);
    audioRef.current.currentTime = audioDuration;
  };

  const calculateIndicatorPosition = (currentTime, duration) => {
    if (duration !== 0) {
      return (currentTime / duration) * 100;
    }
    return 0;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause();
    } else {
      videoRef.current.play();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;
      setVideoCurrentTime(0);
      setAudioCurrentTime(0);
      if (isPlaying) {
        videoRef.current.play();
        audioRef.current.play();
      }
    }
  };

  const handleTimelineClick = (e) => {
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - timelineRect.left;
    const newTime = (clickPosition / timelineRect.width) * largestDuration;

    if (
      videoIndicatorRef.current.contains(e.target) ||
      audioIndicatorRef.current.contains(e.target)
    ) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    setVideoCurrentTime(newTime);
    setAudioCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-editor-timeline" style={customStyles.container}>
      {videoURL && (
        <div className="video-container" style={customStyles.videoContainer}>
          <div className="video-wrapper" style={customStyles.videoWrapper}>
            <video
              ref={videoRef}
              src={videoURL}
              onLoadedMetadata={handleVideoLoadedMetadata}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnd}
              muted
              className="video-element"
              style={customStyles.videoElement}
            />
          </div>
          <Button
            type="primary"
            icon={isPlaying ? customIcons.pause || <PauseCircleOutlined /> : customIcons.play || <PlayCircleOutlined />}
            onClick={handlePlayPause}
            className="play-pause-button"
            style={customStyles.playPauseButton}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            type="default"
            icon={customIcons.restart || <RedoOutlined />}
            onClick={handleRestart}
            className="restart-button"
            style={customStyles.restartButton}
          >
            Restart
          </Button>
        </div>
      )}
      {audioURL && (
        <audio
          ref={audioRef}
          src={audioURL}
          style={{ display: 'none' }}
          onLoadedMetadata={handleAudioLoadedMetadata}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnd}
        />
      )}

      {videoURL && (
        <div className="combined-timeline-container" style={customStyles.timelineContainer}>
          <div className="combined-timeline" style={customStyles.combinedTimeline} ref={timelineRef} onClick={handleTimelineClick}>
            <div className="timeline-shadow" style={customStyles.timelineShadow}>
              <Row gutter={16} align="middle">
                <Col span={3} className="timeline-icons" style={customStyles.timelineIcons}>
                  {customIcons.video || <VideoCameraOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                  <div className="timeline-duration" style={customStyles.timelineDuration}>
                    {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
                  </div>
                </Col>
                <Col span={21} className="timeline-bars" style={customStyles.timelineBars}>
                  <div className="timeline video-timeline" style={customStyles.videoTimeline}>
                    <div
                      className="timeline-bar video-bar"
                      style={{
                        width: `${(videoDuration / largestDuration) * 100}%`,
                        backgroundColor: customStyles.videoBarColor || '#a0d911',
                      }}
                    />
                    <Dropdown
                      overlay={videoMenu}
                      trigger={['contextMenu']}
                      visible={videoMenuVisible}
                      onVisibleChange={(flag) => setVideoMenuVisible(flag)}
                    >
                      <div
                        ref={videoIndicatorRef}
                        className="timeline-indicator video-indicator"
                        style={{
                          left: `${calculateIndicatorPosition(videoCurrentTime, largestDuration)}%`,
                          backgroundColor: customStyles.videoIndicatorColor || '#ff4d4f',
                        }}
                      />
                    </Dropdown>
                  </div>
                </Col>
              </Row>
              <hr className="timeline-divider" style={customStyles.timelineDivider} />
              {audioURL && (
                <Row gutter={16} align="middle">
                  <Col span={3} className="timeline-icons" style={customStyles.timelineIcons}>
                    {customIcons.audio || <SoundOutlined style={{ fontSize: '24px', color: '#1890ff' }} />}
                    <div className="timeline-duration" style={customStyles.timelineDuration}>
                      {formatTime(audioCurrentTime)} / {formatTime(audioDuration)}
                    </div>
                  </Col>
                  <Col span={21} className="timeline-bars" style={customStyles.timelineBars}>
                    <div className="timeline audio-timeline" style={customStyles.audioTimeline}>
                      <div
                        className="timeline-bar audio-bar"
                        style={{
                          width: `${(audioDuration / largestDuration) * 100}%`,
                          backgroundColor: customStyles.audioBarColor || '#69c0ff',
                        }}
                      />
                      <Dropdown
                        overlay={audioMenu}
                        trigger={['contextMenu']}
                        visible={audioMenuVisible}
                        onVisibleChange={(flag) => setAudioMenuVisible(flag)}
                      >
                        <div
                          ref={audioIndicatorRef}
                          className="timeline-indicator audio-indicator"
                          style={{
                            left: `${calculateIndicatorPosition(audioCurrentTime, largestDuration)}%`,
                            backgroundColor: customStyles.audioIndicatorColor || '#0050b3',
                          }}
                        />
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditorTimeline;
