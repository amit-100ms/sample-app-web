import React from 'react';
import { LocalVideoView, MainVideoView, SmallVideoView } from '../../videoview';

const Pinned = ({
  id,
  client,
  localScreen,
  localStream,
  audioMuted,
  videoMuted,
  streams,
  onUnpin,
  pinned,
  loginInfo,
  onRequest,
}) => {
  const isLocalScreenPinned = localScreen && pinned === id + '-screen';
  const isLocalStreamPinned = localStream && pinned === id + '-video';
  const [pinnedStream] = streams.filter(s => s.sid === pinned);
  const newStreams = streams.filter(s => s.sid !== pinned);

  return (
    <div
      className={`relative top-0 bottom-0 w-full flex justify-between`}
      style={{ height: 'calc(100vh - 128px)', backgroundColor: '#1a1619' }}
    >
      <div className="w-4/5 h-full max-w-full">
        {isLocalStreamPinned && (
          <LocalVideoView
            id={id + '-video'}
            label={`${loginInfo.displayName} (You)`}
            client={client}
            stream={localStream}
            audioMuted={audioMuted}
            videoMuted={videoMuted}
            pinned
            videoType="localVideo"
            onUnpin={() => {
              onUnpin();
            }}
          />
        )}

        {isLocalScreenPinned && (
          <LocalVideoView
            id={id + '-screen'}
            label="Your Screen"
            client={client}
            stream={localScreen}
            audioMuted={audioMuted}
            pinned
            videoMuted={videoMuted}
            videoType="localScreen"
            onUnpin={() => {
              onUnpin();
            }}
          />
        )}

        {pinnedStream && (
          <MainVideoView
            key={pinnedStream.mid}
            id={pinnedStream.mid}
            stream={pinnedStream.stream}
            pinned
            onUnpin={onUnpin}
            audioEnabled={pinnedStream.audioEnabled}
            videoEnabled={pinnedStream.videoEnabled}
            screenshare={pinnedStream.screenshare}
            uid={pinnedStream.uid}
            onRequest={onRequest}
          />
        )}
      </div>

      <div className={`w-1/5 max-h-full overflow-y-auto mx-auto`}>
        {newStreams.map((item, index) => (
          <div key={`stream-${index}`} className="w-full">
            <SmallVideoView key={item.mid} id={item.mid} stream={item.stream} />
          </div>
        ))}

        {localScreen && !isLocalScreenPinned && (
          <div className="w-full">
            <SmallVideoView
              id={id + '-screen'}
              stream={localScreen}
              label="Your Screen"
              isMuted={true}
            />
          </div>
        )}

        {localStream && !isLocalStreamPinned && (
          <div className="w-full">
            <SmallVideoView
              id={id + '-video'}
              stream={localStream}
              isLocal={true}
              label={`${loginInfo.displayName} (You)`}
              isMuted={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { Pinned };
