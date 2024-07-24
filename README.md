# React Video Editor Timeline

A customizable video and audio timeline component for React projects. This component allows you to integrate and control video and audio playback, and provides a flexible timeline for visual representation. You can also customize the timeline's appearance and add context menus with custom actions.

## Features

- **Video and Audio Integration**: Sync video and audio playback with a unified timeline.
- **Customizable Styles**: Adjust the timeline and controls to match your project's design.
- **Context Menus**: Add custom context menus for additional functionality on the timeline.
- **Flexible API**: Pass menus, actions, and styles as props to tailor the component to your needs.

## Installation

To install the `react-video-editor-timeline` package, use npm or yarn:

```bash
npm install react-video-editor-timeline
```

or

```bash
yarn add react-video-editor-timeline
```

## Usage

Here is a basic example of how to use the `VideoEditorTimeline` component in your React project.

**src/App.js**

```jsx
import React from 'react';
import VideoEditorTimeline from 'react-video-editor-timeline';
import { Menu, message } from 'antd';
import { VideoCameraOutlined, SoundOutlined, PlayCircleOutlined, PauseCircleOutlined, RedoOutlined } from '@ant-design/icons';

const videoMenu = (
  <Menu>
    <Menu.Item onClick={() => message.info('Edit Video')}>
      Edit Video
    </Menu.Item>
    <Menu.Item onClick={() => message.info('Delete Video')}>
      Delete Video
    </Menu.Item>
  </Menu>
);

const audioMenu = (
  <Menu>
    <Menu.Item onClick={() => message.info('Edit Audio')}>
      Edit Audio
    </Menu.Item>
    <Menu.Item onClick={() => message.info('Delete Audio')}>
      Delete Audio
    </Menu.Item>
  </Menu>
);

function App() {
  return (
    <div className="App">
      <VideoEditorTimeline
        videoURL="your-video-url.mp4"
        audioURL="your-audio-url.mp3"
        customStyles={{
          container: { backgroundColor: '#fff' },
          videoContainer: { padding: '20px' },
          videoWrapper: { borderRadius: '10px', overflow: 'hidden' },
          videoElement: { width: '100%' },
          playPauseButton: { marginRight: '10px' },
          restartButton: { marginRight: '10px' },
          timelineContainer: { marginTop: '20px' },
          combinedTimeline: { position: 'relative', height: '50px' },
          timelineShadow: { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' },
          timelineIcons: { display: 'flex', alignItems: 'center' },
          timelineDuration: { marginLeft: '10px' },
          timelineBars: { display: 'flex', alignItems: 'center' },
          videoTimeline: { height: '10px', position: 'relative' },
          videoBarColor: '#a0d911',
          videoIndicatorColor: '#ff4d4f',
          audioTimeline: { height: '10px', position: 'relative' },
          audioBarColor: '#69c0ff',
          audioIndicatorColor: '#0050b3',
          timelineDivider: { margin: '10px 0' },
        }}
        customIcons={{
          video: <VideoCameraOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
          audio: <SoundOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
          play: <PlayCircleOutlined />,
          pause: <PauseCircleOutlined />,
          restart: <RedoOutlined />,
        }}
        videoMenu={videoMenu}
        audioMenu={audioMenu}
      />
    </div>
  );
}

export default App;
```

## Props

### `videoURL` (string)

- **Description**: URL of the video to be played.
- **Required**: Yes

### `audioURL` (string)

- **Description**: URL of the audio to be played.
- **Required**: No

### `customStyles` (object)

- **Description**: Custom styles for the component. Use this to adjust the appearance of different parts of the component.
- **Required**: No

### `customIcons` (object)

- **Description**: Custom icons for different buttons.
- **Required**: No

### `videoMenu` (ReactNode)

- **Description**: Custom context menu for the video timeline.
- **Required**: No

### `audioMenu` (ReactNode)

- **Description**: Custom context menu for the audio timeline.
- **Required**: No

## Development

To develop or contribute to this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/akshay-092/react-video-editor-timeline.git
cd react-video-editor-timeline
npm install
```

To run the development server:

```bash
npm start
```

To build the project:

```bash
npm run build
```

To run tests:

```bash
npm test
```

To lint the code:

```bash
npm run lint
```