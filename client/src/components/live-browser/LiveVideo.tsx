import { useMediaSynchronizer } from "@microsoft/live-share-react";
import { UserMeetingRole } from "@microsoft/live-share";
import {
    IMediaPlayerSynchronizerEvent,
    MediaPlayerSynchronizerEvents,
} from "@microsoft/live-share-media";
import { FC, useRef, useEffect, useCallback, useState, memo } from "react";
import { FlexColumn, FlexRow } from "../common";
import { Button } from "@fluentui/react-components";
import { Play24Regular, Pause24Regular, Speaker224Regular, SpeakerMute24Regular } from "@fluentui/react-icons";

interface ILiveVideoProps {
    videoUrl: string;
}

const ALLOWED_ROLES = [UserMeetingRole.organizer, UserMeetingRole.presenter];

export const LiveVideo: FC<ILiveVideoProps> = memo(({ videoUrl }) => {
    console.log(videoUrl);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const { play, pause, setTrack, mediaSynchronizer } = useMediaSynchronizer(
        "MEDIA-SESSION-ID",
        videoRef,
        videoUrl,
        ALLOWED_ROLES
    );

    // Listen for player group actions for errors (e.g., play error)
    useEffect(() => {
        const onGroupAction = (evt: IMediaPlayerSynchronizerEvent) => {
            if (evt.error) {
                if (
                    videoRef.current &&
                    evt.details.action === "play" &&
                    evt.error.name === "NotAllowedError"
                ) {
                    // The user has not interacted with the document so the browser blocked the play action
                    // mute the player and try again
                    videoRef.current.muted = true;
                    videoRef.current.play();
                    setMuted(true);
                } else {
                    console.error(evt.error);
                }
            }
        };
        mediaSynchronizer?.addEventListener(
            MediaPlayerSynchronizerEvents.groupaction,
            onGroupAction
        );
        return () => {
            mediaSynchronizer?.removeEventListener(
                MediaPlayerSynchronizerEvents.groupaction,
                onGroupAction
            );
        };
    }, [mediaSynchronizer]);

    // Effect to listen for changes to player state so to render correct play/pause buttons
    useEffect(() => {
        if (!videoRef.current) return;
        let mounted = true;
        const onPlayingListener = () => {
            if (!mounted) return;
            setPlaying(true);
        };
        videoRef.current.addEventListener("playing", onPlayingListener);
        const onPauseListener = () => {
            if (!mounted) return;
            setPlaying(false);
        };
        videoRef.current.addEventListener("pause", onPauseListener);
        return () => {
            mounted = false;
            videoRef.current?.removeEventListener("playing", onPlayingListener);
            videoRef.current?.removeEventListener("pause", onPauseListener);
        };
    }, []);

    // Effect to change the track when the URL changes
    useEffect(() => {
        if (!mediaSynchronizer || !mediaSynchronizer.mediaSession.isInitialized) return;
        setTrack(videoUrl);
    }, [setTrack, videoUrl, mediaSynchronizer]);

    const onTogglePlayPause = useCallback(() => {
        if (videoRef.current?.paused) {
            play();
        } else {
            pause();
        }
    }, [play, pause]);

    return (
        <>
            <FlexColumn gap="small">
                <video
                    ref={videoRef}
                    height={9 * 40}
                    width={16 * 40}
                    onClick={onTogglePlayPause}
                />
                <FlexRow gap="smaller">
                    <Button
                        onClick={onTogglePlayPause}
                        icon={playing ? <Pause24Regular /> : <Play24Regular />}
                    />
                    <Button
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.muted =
                                    !videoRef.current.muted;
                                setMuted(videoRef.current.muted);
                            }
                        }}
                        icon={muted ? <SpeakerMute24Regular /> : <Speaker224Regular />}
                    />
                </FlexRow>
            </FlexColumn>
        </>
    );
});
