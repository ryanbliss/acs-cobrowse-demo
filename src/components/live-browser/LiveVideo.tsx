import { useMediaSynchronizer } from "@microsoft/live-share-react";
import { UserMeetingRole } from "@microsoft/live-share";
import {
    IMediaPlayerSynchronizerEvent,
    MediaPlayerSynchronizerEvents,
} from "@microsoft/live-share-media";
import { FC, useRef, useEffect, useCallback } from "react";
import { FlexColumn, FlexRow } from "../flex";
import { Button } from "@fluentui/react-components";

interface ILiveVideoProps {
    videoUrl: string;
}

const ALLOWED_ROLES = [UserMeetingRole.organizer, UserMeetingRole.presenter];

export const LiveVideo: FC<ILiveVideoProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { play, pause, seekTo, mediaSynchronizer } = useMediaSynchronizer(
        "MEDIA-SESSION-ID",
        videoRef,
        videoUrl,
        ALLOWED_ROLES
    );

    useEffect(() => {
        // Listen for player group actions for errors (e.g., play error)
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
                    poster="https://images4.alphacoders.com/247/247356.jpg"
                    height={9 * 40}
                    width={16 * 40}
                />
                <FlexRow gap="small">
                    <Button onClick={onTogglePlayPause}>{"Play/pause"}</Button>
                    <Button
                        onClick={() => {
                            seekTo(0);
                        }}
                    >
                        {"Start over"}
                    </Button>
                    <Button
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.muted =
                                    !videoRef.current.muted;
                            }
                        }}
                    >
                        {"Mute/unmute"}
                    </Button>
                </FlexRow>
            </FlexColumn>
        </>
    );
};
